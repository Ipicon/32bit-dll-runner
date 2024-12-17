import { buildResponseValue, buildType } from "./utils";
import { RunDllResponse } from "../gen/dllrunner_pb";
import { Library } from "ffi-napi";
import {
	Value,
	type JavaScriptValue,
} from "google-protobuf/google/protobuf/struct_pb";
import type { IDllRunnerServer } from "../gen/dllrunner_grpc_pb";
import type { Type } from "ref-napi";

const runDll: IDllRunnerServer["runDll"] = ({ request }, callback) => {
	const dll = Library(request.getDllPath(), {
		[request.getFuncName()]: [
			buildType(
				request.getReturnType(),
				request.getStructShapeMap(),
				request.getArrayShape(),
				request.getArrayLength(),
			),
			request
				.getArgumentsList()
				.map((arg) =>
					buildType(
						arg.getType(),
						arg.getStructShapeMap(),
						arg.getArrayShape(),
						arg.getArrayLength(),
					),
				),
		],
	});

	const response = dll[request.getFuncName()](
		...request
			.getArgumentsList()
			.map((arg) => arg.getValue()?.toJavaScript() as Type),
	);

	callback(
		null,
		new RunDllResponse().setResponse(
			Value.fromJavaScript(
				buildResponseValue(
					response,
					request.getReturnType(),
					request.getStructShapeMap(),
					request.getArrayShape(),
					request.getArrayLength(),
				) as JavaScriptValue,
			),
		),
	);
};

export const dllRunnerService: IDllRunnerServer = {
	runDll: runDll,
};
