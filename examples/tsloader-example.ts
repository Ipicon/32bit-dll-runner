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

	const runDll = promisify(dllRunnerClient.runDll).bind(dllRunnerClient);
	const simpleResponse = await runDll({
		dllPath: "mylib32.dll",
		funcName: "checkString",
		returnType: FieldTypeEnum.STRING,
	});

	console.log(Object.values(simpleResponse?.response)[0]);

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

	console.log(Object.values(response?.response)[0]);

	child.kill();
};

example();
