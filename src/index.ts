import { Server, ServerCredentials } from "@grpc/grpc-js";
import { dllRunnerService } from "./dll-runner-service";
import { Command } from "commander";
import { DllRunnerService } from "@gen/dllrunner_grpc_pb";

const server = new Server();
const program = new Command();

program
	.name("32bit-dll-runner")
	.description(
		"grpc server for consuming 32 bit dll functions from a 64 bit process.",
	)
	.version("0.1.0")
	.option("-p, --port <PORT>", "port for running the grpc server", "5000");
program.parse();

server.addService(DllRunnerService, dllRunnerService);
server.bindAsync(
	`0.0.0.0:${Number(program.opts().port)}`,
	ServerCredentials.createInsecure(),
	(err, port) => {
		if (err) {
			console.error(err);
			return;
		}

		console.log(`32bit-dll-runner service running on port ${port}`);
	},
);
