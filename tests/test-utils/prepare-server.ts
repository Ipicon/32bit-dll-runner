import { execSync } from "node:child_process";
import { setup as setupDevServer } from "jest-dev-server";

module.exports = async () => {
	execSync("npm run build-protos");

	// @ts-expect-error
	globalThis.servers = await setupDevServer({
		command: "tsx src/index.ts --port=5000",
		launchTimeout: 50000,
		port: 5000,
	});
};
