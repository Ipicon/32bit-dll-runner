import { teardown as teardownDevServer } from "jest-dev-server";

module.exports = async () => {
	// @ts-expect-error
	await teardownDevServer(globalThis.servers);
};
