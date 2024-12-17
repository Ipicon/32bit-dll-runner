/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	testEnvironment: "node",
	transform: {
		"^.+.tsx?$": [
			"ts-jest",
			{
				isolatedModules: true,
				useESM: true,
			},
		],
	},
	globalSetup: "./tests/test-utils/prepare-server.ts",
	globalTeardown: "./tests/test-utils/shutdown-server.ts",
};
