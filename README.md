# 32bit DLL Runner

The **32-bit DLL Runner** is a utility designed to enable the execution of 32-bit Dynamic Link Libraries (DLLs) within a 64-bit process. 

This tool allows seamless interaction with legacy 32-bit libraries by running them through a 32-bit executable, which communicates their output to a 64-bit client application via gRPC.

It effectively bridges the gap between 32-bit components and modern 64-bit systems, making it easier to integrate older software with newer architectures.

This utility is ideal for situations where you need to maintain compatibility with legacy 32-bit software while operating within a 64-bit system environment.

## Usage

1. Download the latest [release](https://github.com/Ipicon/32bit-dll-runner/releases).
2. Add `32bit-dll-runner.exe` to your system's `PATH`.
3. compile the `dllrunner.proto` file to a language of your choice.
4. Start interacting with your DLLs via the provided API.

## Build and install from source

Due to the need for compatibility with older architectures, certain older versions of tools and dependencies must be used to enable compilation for 32-bit architecture. These older versions are necessary to ensure that the tools your application relies on can run properly in a 32-bit environment.

- **ffi-napi**
    - `ffi-napi` package requires specific [build tools](https://github.com/TooTallNate/node-gyp#installation) for installation, which are essential for compiling native bindings on your system.

- **Node.js Version Compatibility**
    - **Ensure you are using a 32-bit version of Node.js**. This is crucial for compiling and running the application in a 32-bit environment. A 64-bit version of Node.js will not work as expected when building for 32-bit targets.

    - Due to the dependency on `ffi-napi`, development is limited to **Node.js v18**.
        - [issue #269](https://github.com/node-ffi-napi/node-ffi-napi/issues/269) in `ffi-napi`
        - [issue #49737](https://github.com/nodejs/node/issues/49737) in `Node.js`
        
    - For **production environments**, Node.js **v14** support is mandatory because it is the last version to ship prebuilt patched Node.js pkg binaries for 32-bit (x86) systems. Special thanks to [amexn-me](https://github.com/amexn-me) for pointing this out in [issue #1634](https://github.com/vercel/pkg/issues/1634), and creation of [pkg-x86](https://github.com/flick-network/pkg-x86) for providing further insights.

    - **Development** occurs in **Node.js v18** primarily because of dependencies on `tsx` and `pkgroll`, which handle project execution and bundling. While it's possible to use `ts-node` and `webpack`, I encountered challenges when working with TypeScript ESM modules and consuming the generated protobuf files in CommonJS format, which is why **Node.js v18** is chosen for development.

- **EXE Compilation**
    - Both `ffi-napi` and `ref-napi` include native modules (`.node` files), which require special handling when bundled. To compile the bundled code and correctly reference these native modules at runtime, we use [pkg](https://github.com/vercel/pkg).

    - Note that the **Node.js Single Executable** feature (introduced in **Node.js v19**) does not automatically handle native modules, as discussed in [issue #75](https://github.com/nodejs/single-executable/issues/75).

## Examples

### TypeScript Example
while `@grpc/proto-loader` is a popular options for working with Protocol Buffers in TypeScript and generating Typescript definitions. I opted not to use it extensively due to its behavior with google.protobuf.Value fields.

#### with `@grpc/proto-loader` Generation:
1. **Install Dependencies**: First, install the required gRPC packages:
    ```sh
    npm i @grpc/grpc-js @grpc/proto-loader
    ```

2. compile `dllrunner.proto`:Use `proto-loader-gen-types` to generate TypeScript types from your `.proto` files:
   ```sh
    proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=gen/ proto/*.proto
    ```

3. **Create Your TypeScript File**: After generating the necessary files, create your TypeScript file to interact with the generated gRPC services:
    ```ts
    import { credentials } from "@grpc/grpc-js";
    import { promisify } from "util";
    import { FieldTypeEnum } from "../gen/dllrunner_pb";
    import { spawn } from "node:child_process";
    import type { ProtoGrpcType } from "@gen/dllrunner";
    import * as grpc from "@grpc/grpc-js";
    import * as protoLoader from "@grpc/proto-loader";

    const example = async () => {
        const child = spawn("../32bit-dll-runner.exe", ["--port", "5001"], {
            cwd: __dirname,
            detached: true,
            stdio: ["ignore"],
        });

        const packageDefinition = protoLoader.loadSync("./proto/dllrunner.proto");
        const proto = grpc.loadPackageDefinition(
            packageDefinition,
        ) as unknown as ProtoGrpcType;

        // wait for the server to start
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const dllRunnerClient = new proto.dllrunner.DllRunner(
            "0.0.0.0:5001",
            credentials.createInsecure(),
        );

        const runDll = promisify(dllRunnerClient.runDll).bind(dllRunnerClient); // extra, but recommended.

        // dllPath, funcName and returnType are required, other fields are optional.
        const response = await runDll({
            dllPath: "mylib32.dll", // absolute or relative path to the DLL according to the 32bit-dll-runner executable.
            funcName: "checkString", // the name of the function to invoke
            returnType: FieldTypeEnum.STRING, // the type of the return value
        });

        console.log(Object.values(response?.response || {})[0]);

        child.kill();
    };

    example();

    ```

#### With `grpc_tools_node_protoc_ts` generation:
1. Install `protoc`

2. **Install Dependencies**: install the required gRPC packages:
    ```sh
    npm i @grpc/grpc-js util google-protobuf
    npm i -D grpc_tools_node_protoc_ts grpc-tools @types/google-protobuf
    ```

3. compile `dllrunner.proto`:Use `grpc_tools_node_protoc` to generate JS and d.ts files from your `.proto` files:
    ```sh
    #!/bin/sh

    # generate js code
    grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:./gen \
    --grpc_out=grpc_js:./gen \
    --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`.cmd \
    -I ./proto \
    ./proto/*.proto

    # generate d.ts codes
    protoc \
    --plugin=protoc-gen-ts=.\\node_modules\\.bin\\protoc-gen-ts.cmd \
    --ts_out=grpc_js:./gen \
    -I ./proto \
    ./proto/*.proto
    ```

4. **Create Your TypeScript File**: After generating the necessary files, create your TypeScript file to interact with the generated gRPC services:
    ```ts
    import { credentials } from "@grpc/grpc-js";
    import { promisify } from "util";
    import { DllRunnerClient } from "../gen/dllrunner_grpc_pb";
    import {
        FieldTypeEnum,
        RunDllRequest,
        type RunDllResponse,
    } from "../gen/dllrunner_pb";
    import { spawn } from "node:child_process";

    const example = async () => {
        const child = spawn("../32bit-dll-runner.exe", ["--port", "5001"], {
            cwd: __dirname,
            detached: true,
            stdio: ["ignore"],
        });

        // wait for the server to start
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const dllRunnerClient = new DllRunnerClient(
            "0.0.0.0:5001",
            credentials.createInsecure(),
        );

        const runDll = promisify(dllRunnerClient.runDll).bind(dllRunnerClient) as (
            arg1: RunDllRequest,
        ) => Promise<RunDllResponse>;

        const response = await runDll(
            new RunDllRequest()
                .setDllPath("mylib32.dll")
                .setFuncName("checkString")
                .setReturnType(FieldTypeEnum.STRING),
        );

        console.log(response.getResponse()?.getStringValue());

        child.kill();
    };

    example();
    ```

5. **Note on CommonJS and ESM Modules**: The generated code will be in CommonJS format. If you need to work with both CommonJS and ESM modules, it’s recommended to use `tsx` to handle this mixed module system.

### Python Example
1. **Install Dependencies**: Install the required Python gRPC libraries:
    ```sh
    pip install grpcio grpcio-tools
    ```

2. compile `dllrunner.proto`: Use `grpc_tools.protoc` to generate the Python gRPC code:
   ```sh
    python -m grpc_tools.protoc -I. --python_out=./gen --grpc_python_out=./gen ./proto/*.proto
    ```

3. **Create Your Python File**: After generating the necessary Python files, create a Python file to interact with the gRPC service:
    ```py
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
    ```

### Structs Examples:

When working with structs you have to pass `struct_shape` which is used to define what type of data the struct contains, like integers, string and even sub arrays and structs that will need their shape also described.

### with `@grpc/proto-loader`:

```ts
const shape = {
		a: {
			fieldType: FieldTypeEnum.INT,
		},

		b: {
			fieldType: FieldTypeEnum.CHAR,
		},

		c: {
			fieldType: FieldTypeEnum.CHAR,
		},
	};

	const response = await runDll({
		dllPath: "mylib32.dll",
		funcName: "structArg",
		returnType: FieldTypeEnum.STRUCT,
		structShape: shape,
		arguments: [
			{
				type: FieldTypeEnum.STRUCT,
				structShape: shape,
				value: {
					structValue: {
						fields: {
							a: { numberValue: 5 },
							b: { stringValue: "A" },
							c: { stringValue: "D" },
						},
					},
				},
			},
		],
	});
```

### with `grpc_tools_node_protoc_ts`:

```ts
const structArg = new Argument()
		.setType(FieldTypeEnum.STRUCT)
		.setValue(Value.fromJavaScript({ a: 5, b: "A", c: "D" }));

	structArg
		.getStructShapeMap()
		.set("a", new FieldType().setFieldType(FieldTypeEnum.INT));
	structArg
		.getStructShapeMap()
		.set("b", new FieldType().setFieldType(FieldTypeEnum.CHAR));
	structArg
		.getStructShapeMap()
		.set("c", new FieldType().setFieldType(FieldTypeEnum.CHAR));

	const dllRequest = new RunDllRequest()
		.setDllPath(DLL_PATH)
		.setFuncName("structArg")
		.setReturnType(FieldTypeEnum.STRUCT)
		.setArgumentsList([structArg]);

	dllRequest
		.getStructShapeMap()
		.set("a", new FieldType().setFieldType(FieldTypeEnum.INT));
	dllRequest
		.getStructShapeMap()
		.set("b", new FieldType().setFieldType(FieldTypeEnum.CHAR));
	dllRequest
		.getStructShapeMap()
		.set("c", new FieldType().setFieldType(FieldTypeEnum.CHAR));

	const response = await runDll(dllRequest);
```

### Pointers/Arrays Example:

When working with arrays you have to pass `array_shape` which is used to define what type of data the array contains, like integers, string and even sub arrays and structs that will need their shape also described.


If you want to reference a predefined array, for example:

```c
struct structWithArray {
	int arr[3];
};
```

you should use `FieldTypeEnum.ARRAY`,  which tells the FFI module to preallocate the buffer for the array before calling the DLL function. if you pass `FieldTypeEnum.POINTER`, it will treat the array as a pointer and only read the memory address instead of returning the array's values.

It’s important to note that `array_length` is required when using `FieldTypeEnum.ARRAY` to specify the number of elements in the array that the FFI module should allocate space for.

#### Pointer:
while the `array_length` isn't mandatory, because the application runs on a subprocess when it returns the data to the consuming client, it has to truncate the data somehwere because it can't send a pointer to the client.

if `array_length` isn't provided it will truncate upon seeing the first `\0` symbol.
```ts
const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("returnPoint")
			.setReturnType(FieldTypeEnum.POINTER)
			.setArrayShape(new FieldType().setFieldType(FieldTypeEnum.INT))
			.setArrayLength(3),
	);
```

### Array:

In contrast to pointers, If you don’t pass `array_length`, the FFI module will treat the array length as zero and ignore any additional data.

```ts
const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("checkArr")
			.setReturnType(FieldTypeEnum.INT)
			.setArgumentsList([
				new Argument()
					.setType(FieldTypeEnum.POINTER)
					.setValue(Value.fromJavaScript([1, 2, 3]))
					.setArrayShape(new FieldType().setFieldType(FieldTypeEnum.INT)),
			]),
	);
```

**Important Note**: In C, arrays are always treated as pointers when returned, so you should not expect an array to be returned directly.

### Further Examples and References
For additional examples and detailed use cases, please refer to the following:

- [Examples](https://github.com/Ipicon/32bit-dll-runner/tree/main/examples)
- [Tests](https://github.com/Ipicon/32bit-dll-runner/tree/main/tests)

These resources contain practical code snippets and testing setups to help you get the most out of **32bit-dll-runner**. 


### API

The API defines several message types used for interacting with the 32-bit DLL runner. Below is an overview of the key message types and their structure.

#### FieldTypeEnum

Each `type` or `return_type`  field expects a value of type `FieldTypeEnum`. The available values are:
```proto
enum FieldTypeEnum {
    STRING = 0;
    INT = 1;
    CHAR = 2;
    FLOAT = 3;
    DOUBLE = 4;
    BOOLEAN = 5;
    VOID = 6;
    STRUCT = 7;
    ARRAY = 8;
    POINTER = 9; // The main difference between a pointer and an array is that an array requires explicit memory allocation, and therefore, the length must be specified.
    BYTE = 10;
    LONG = 11;
    INT64 = 12;
    INT8 = 13;
    INT16 = 14;
    INT32 = 15;
    UINT8 = 16;
    UINT16 = 17;
    UINT32 = 18;
    UINT64 = 19;
    LONGLONG = 20;
    SHORT = 21;
    USHORT = 22;
    SIZE_T = 23;
    UCHAR = 24;
    UINT = 25;
    ULONG = 26;
    ULONGLONG = 27;
}
```

#### FieldType and Argument Messages

Both `FieldType` and `Argument` messages are similar. The primary difference is that the `Argument` message also contains a `value` field.

- Both `FieldType` and `Argument` require a `type` field of type `FieldTypeEnum`.
- The `Argument` message additionally includes a `value` field, which is of type [google.protobuf.Value](https://protobuf.dev/reference/protobuf/.google.protobuf/#value).

#### RunDllRequest Message

The `RunDllRequest` message is used to invoke a function in the DLL. It requires the following fields:

- **dll_path**: The path to the DLL.
- **func_name**: The name of the function to invoke.
- **return_type**: The return type of the function, specified as a `FieldTypeEnum`.

If the invoked function expects arguments, they should be passed in the `arguments` field as an array of `Argument` messages.

#### Handling Complex Types

For fields where the type is `FieldTypeEnum.STRUCT`, `FieldTypeEnum.ARRAY`, or `FieldTypeEnum.POINTER`, additional shape information is required:

- **STRUCT**: If the `type` or `return_type` is `FieldTypeEnum.STRUCT`, the field `struct_shape` (of type `FieldType`) is required.
- **ARRAY** or **POINTER**: If the `type` or `return_type` is `FieldTypeEnum.ARRAY` or `FieldTypeEnum.POINTER`, the `array_shape` field (of type `FieldType`) is required.
    - For `FieldTypeEnum.ARRAY`, the `array_length` field is also required. While it is not mandatory for `FieldTypeEnum.POINTER`, it is highly recommended to specify `array_length` as well.
    - If the `array_length` is unknown, you should specify the maximum possible length.

#### RunDllResponse Message

The response to a `RunDllRequest` is of type `RunDllResponse`. It contains a `response` field, which is of type [google.protobuf.Value](https://protobuf.dev/reference/protobuf/.google.protobuf/#value).
