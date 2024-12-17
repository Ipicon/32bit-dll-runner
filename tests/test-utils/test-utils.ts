import { DllRunnerClient } from "../../gen/dllrunner_grpc_pb";
import type { RunDllRequest, RunDllResponse } from "../../gen/dllrunner_pb";
import { credentials } from "@grpc/grpc-js";
import { promisify } from "util";

export const getDllRunnerClient = async (port: number) => {
	const dllRunnerClient = new DllRunnerClient(
		`0.0.0.0:${port}`,
		credentials.createInsecure(),
	);

	const runDll = promisify(dllRunnerClient.runDll).bind(dllRunnerClient) as (
		arg1: RunDllRequest,
	) => Promise<RunDllResponse>;

	return runDll;
};

export const unpackResponse = (response: RunDllResponse) => {
	const responseMessage = response.getResponse();

	if (responseMessage === undefined)
		throw new Error("error unpacking response.");
	return responseMessage.toJavaScript();
};
