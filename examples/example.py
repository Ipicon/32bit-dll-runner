"""
Make sure to generate the correct proto files before running this example.
python for example:
python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. dllrunner.proto
"""

import grpc
import time
import psutil
import proto.dllrunner_pb2 as dllrunner_pb2
import proto.dllrunner_pb2_grpc as dllrunner_pb2_grpc
import subprocess
from google.protobuf.struct_pb2 import Value

# opening the exe in a subprocess
main_proc = subprocess.Popen(
    ["..\\32bit-dll-runner.exe", "-p", "3000"], shell=True)

# bunch of ways to check if the server is up, this is just convenient for this example
time.sleep(5)

with grpc.insecure_channel('localhost:3000') as channel:
    stub = dllrunner_pb2_grpc.DllRunnerStub(channel)
    response = stub.RunDll(dllrunner_pb2.RunDllRequest(
        dll_path="mylib32.dll",
        func_name="checkInt",
        return_type=dllrunner_pb2.FieldTypeEnum.INT,
        arguments=[
            dllrunner_pb2.Argument(
                type=dllrunner_pb2.FieldTypeEnum.INT,
                value=Value(number_value=5)
            ),
            dllrunner_pb2.Argument(
                type=dllrunner_pb2.FieldTypeEnum.INT,
                value=Value(number_value=5)
            )
        ]
    ))

print(f"Result: {response.response.number_value}")

# killing the process
process = psutil.Process(main_proc.pid)
for proc in process.children(recursive=True):
    proc.kill()
process.kill()
