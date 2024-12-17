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
