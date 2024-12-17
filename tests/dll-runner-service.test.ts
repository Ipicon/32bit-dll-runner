import {
	ListValue,
	Struct,
	Value,
} from "google-protobuf/google/protobuf/struct_pb";
import {
	Argument,
	FieldType,
	FieldTypeEnum,
	RunDllRequest,
	type RunDllResponse,
} from "../gen/dllrunner_pb";
import {
	getDllRunnerClient,
	unpackResponse,
} from "./test-utils/test-utils";
import * as jspb from "google-protobuf";

const DLL_PATH = "./mylib32.dll";
let runDll: (arg1: RunDllRequest) => Promise<RunDllResponse>;

beforeAll(async () => {
	runDll = await getDllRunnerClient(5000);
});

it("works with void functions", async () => {
	const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("checkVoid")
			.setReturnType(FieldTypeEnum.VOID),
	);

	expect(unpackResponse(response)).toBeNull();
});

it("returns a long ", async () => {
	const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("checkLong")
			.setReturnType(FieldTypeEnum.LONG),
	);

	expect(unpackResponse(response)).toBe(300000000);
});

it("returns a string", async () => {
	const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("checkString")
			.setReturnType(FieldTypeEnum.STRING),
	);

	expect(unpackResponse(response)).toBe("hello node");
});

it("returns a uff-8 encoded string", async () => {
	const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("checkUTF")
			.setReturnType(FieldTypeEnum.STRING),
	);

	expect(unpackResponse(response)).toBe("שלום");
});

it("returns a Hebrew string", async () => {
	const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("checkUTF")
			.setReturnType(FieldTypeEnum.STRING),
	);

	expect(unpackResponse(response)).toBe("שלום");
});

it("returns a character", async () => {
	const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("checkChar")
			.setReturnType(FieldTypeEnum.CHAR)
			.setArgumentsList([
				new Argument()
					.setType(FieldTypeEnum.CHAR)
					.setValue(Value.fromJavaScript("B")),
			]),
	);

	expect(unpackResponse(response)).toBe("C");
});

it("returns an integer", async () => {
	const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("checkInt")
			.setReturnType(FieldTypeEnum.INT)
			.setArgumentsList([
				new Argument()
					.setType(FieldTypeEnum.INT)
					.setValue(Value.fromJavaScript(5)),
				new Argument()
					.setType(FieldTypeEnum.INT)
					.setValue(Value.fromJavaScript(8)),
			]),
	);

	expect(unpackResponse(response)).toBe(15);
});

it("returns a float", async () => {
	const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("checkFloat")
			.setReturnType(FieldTypeEnum.FLOAT),
	);

	expect(unpackResponse(response)).toBeCloseTo(789.1234741210938);
});

it("returns a double", async () => {
	const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("checkDouble")
			.setReturnType(FieldTypeEnum.DOUBLE),
	);

	expect(unpackResponse(response)).toBeCloseTo(789.1234741210938);
});

it("returns a struct", async () => {
	const dllRequest = new RunDllRequest()
		.setDllPath(DLL_PATH)
		.setFuncName("checkStruct")
		.setReturnType(FieldTypeEnum.STRUCT);

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

	expect(unpackResponse(response)).toEqual({ a: 5, b: "A", c: "D" });
});

it("returns a boolean", async () => {
	const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("checkBool")
			.setReturnType(FieldTypeEnum.BOOLEAN),
	);

	expect(unpackResponse(response)).toBe(true);
});

it("returns a pointer", async () => {
	const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("returnPoint")
			.setReturnType(FieldTypeEnum.POINTER)
			.setArrayShape(new FieldType().setFieldType(FieldTypeEnum.INT))
			.setArrayLength(3),
	);

	expect(unpackResponse(response)).toEqual([9, 10, 11]);
});

it("returns a nested struct", async () => {
	const nestedStructField = new FieldType().setFieldType(FieldTypeEnum.STRUCT);
	const nestedStruct = new jspb.Map<string, FieldType>([
		["a", new FieldType().setFieldType(FieldTypeEnum.INT)],
		["b", new FieldType().setFieldType(FieldTypeEnum.CHAR)],
		["c", new FieldType().setFieldType(FieldTypeEnum.CHAR)],
	]);

	nestedStruct.forEach((value, key) => {
		nestedStructField.getStructShapeMap().set(key, value);
	});

	const parentStructField = new FieldType().setFieldType(FieldTypeEnum.STRUCT);
	const parentStruct = new jspb.Map<string, FieldType>([
		["childStruct", nestedStructField],
		["d", new FieldType().setFieldType(FieldTypeEnum.INT)],
	]);

	parentStruct.forEach((value, key) => {
		parentStructField.getStructShapeMap().set(key, value);
	});

	const dllRequest = new RunDllRequest()
		.setDllPath(DLL_PATH)
		.setFuncName("checkArrayOfNestedStructs")
		.setReturnType(FieldTypeEnum.POINTER)
		.setArrayLength(1)
		.setArrayShape(parentStructField)
		.setArgumentsList([
			new Argument()
				.setType(FieldTypeEnum.ARRAY)
				.setArrayShape(nestedStructField)
				.setValue(
					Value.fromJavaScript([
						{
							a: 5,
							b: "A",
							c: "B",
						},
						{
							a: 50,
							b: "A",
							c: "B",
						},
					]),
				),

			new Argument()
				.setType(FieldTypeEnum.ARRAY)
				.setValue(
					new Value().setListValue(
						new ListValue().setValuesList([
							new Value().setStructValue(
								Struct.fromJavaScript({
									childStruct: {
										a: 100,
										b: "h",
										c: "e",
									},
									d: 909,
								}),
							),
						]),
					),
				)
				.setArrayShape(parentStructField),

			new Argument()
				.setType(FieldTypeEnum.INT)
				.setValue(Value.fromJavaScript(1)),
		]);

	const response = await runDll(dllRequest);

	expect(unpackResponse(response)).toEqual([
		{
			childStruct: {
				a: 960,
				b: "h",
				c: "e",
			},
			d: 909,
		},
	]);
});

it("returns a struct with an array and pointer", async () => {
	const structArrayField = new FieldType()
		.setFieldType(FieldTypeEnum.ARRAY)
		.setArrayLength(3)
		.setArrayShape(new FieldType().setFieldType(FieldTypeEnum.INT));
	const structPointerField = new FieldType()
		.setFieldType(FieldTypeEnum.POINTER)
		.setArrayLength(3)
		.setArrayShape(new FieldType().setFieldType(FieldTypeEnum.INT));

	const structArgument = new Argument()
		.setType(FieldTypeEnum.STRUCT)
		.setValue(Value.fromJavaScript({ arr: [10, 20, 30], arr2: [10, 20, 30] }));
	structArgument.getStructShapeMap().set("arr", structArrayField);
	structArgument.getStructShapeMap().set("arr2", structPointerField);

	const dllRequest = new RunDllRequest()
		.setDllPath(DLL_PATH)
		.setFuncName("checkStructWithArray")
		.setReturnType(FieldTypeEnum.STRUCT)
		.setArgumentsList([structArgument]);

	dllRequest.getStructShapeMap().set("arr", structArrayField);
	dllRequest.getStructShapeMap().set("arr2", structPointerField);

	const response = await runDll(dllRequest);

	expect(unpackResponse(response)).toEqual({
		arr: [30, 20, 10],
		arr2: [10, 30, 30],
	});
});

it("handles 2D arrays", async () => {
	const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("compute2D")
			.setReturnType(FieldTypeEnum.INT)
			.setArgumentsList([
				new Argument()
					.setType(FieldTypeEnum.INT)
					.setValue(Value.fromJavaScript(3)),
				new Argument()
					.setType(FieldTypeEnum.INT)
					.setValue(Value.fromJavaScript(3)),
				new Argument()
					.setType(FieldTypeEnum.ARRAY)
					.setValue(
						Value.fromJavaScript([
							[1, 2, 3],
							[1, 2, 3],
							[3, 0, 0],
						]),
					)
					.setArrayShape(
						new FieldType()
							.setFieldType(FieldTypeEnum.ARRAY)
							.setArrayLength(3)
							.setArrayShape(new FieldType().setFieldType(FieldTypeEnum.INT)),
					),
			]),
	);

	expect(unpackResponse(response)).toBe(15);
});

it("handles array pointer", async () => {
	const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("computePointerArr")
			.setReturnType(FieldTypeEnum.INT)
			.setArgumentsList([
				new Argument()
					.setType(FieldTypeEnum.INT)
					.setValue(Value.fromJavaScript(3)),
				new Argument()
					.setType(FieldTypeEnum.INT)
					.setValue(Value.fromJavaScript(3)),
				new Argument()
					.setType(FieldTypeEnum.POINTER)
					.setValue(
						Value.fromJavaScript([
							[1, 2, 3],
							[1, 2, 3],
							[3, 0, 0],
						]),
					)
					.setArrayShape(
						new FieldType()
							.setFieldType(FieldTypeEnum.ARRAY)
							.setArrayLength(3)
							.setArrayShape(new FieldType().setFieldType(FieldTypeEnum.INT)),
					),
			]),
	);

	expect(unpackResponse(response)).toBe(15);
});

it("handles double pointer", async () => {
	const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("computePP")
			.setReturnType(FieldTypeEnum.INT)
			.setArgumentsList([
				new Argument()
					.setType(FieldTypeEnum.INT)
					.setValue(Value.fromJavaScript(3)),
				new Argument()
					.setType(FieldTypeEnum.INT)
					.setValue(Value.fromJavaScript(3)),
				new Argument()
					.setType(FieldTypeEnum.POINTER)
					.setValue(
						Value.fromJavaScript([
							[1, 2, 3],
							[1, 2, 3],
							[3, 0, 0],
						]),
					)
					.setArrayLength(3)
					.setArrayShape(
						new FieldType()
							.setFieldType(FieldTypeEnum.POINTER)
							.setArrayLength(3)
							.setArrayShape(new FieldType().setFieldType(FieldTypeEnum.INT)),
					),
			]),
	);

	expect(unpackResponse(response)).toBe(15);
});

it("handles pointer array", async () => {
	const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("computeArrPointer")
			.setReturnType(FieldTypeEnum.INT)
			.setArgumentsList([
				new Argument()
					.setType(FieldTypeEnum.INT)
					.setValue(Value.fromJavaScript(3)),
				new Argument()
					.setType(FieldTypeEnum.INT)
					.setValue(Value.fromJavaScript(3)),
				new Argument()
					.setType(FieldTypeEnum.POINTER)
					.setValue(
						Value.fromJavaScript([
							[1, 2, 3],
							[1, 2, 3],
							[3, 0, 0],
						]),
					)
					.setArrayLength(3)
					.setArrayShape(
						new FieldType()
							.setFieldType(FieldTypeEnum.POINTER)
							.setArrayLength(3)
							.setArrayShape(new FieldType().setFieldType(FieldTypeEnum.INT)),
					),
			]),
	);

	expect(unpackResponse(response)).toBe(15);
});

it("accepts a pointer as an argument", async () => {
	const response = await runDll(
		new RunDllRequest()
			.setDllPath(DLL_PATH)
			.setFuncName("checkPoint")
			.setReturnType(FieldTypeEnum.INT)
			.setArgumentsList([
				new Argument()
					.setType(FieldTypeEnum.POINTER)
					.setValue(Value.fromJavaScript([1, 2, 3]))
					.setArrayShape(new FieldType().setFieldType(FieldTypeEnum.INT)),
			]),
	);

	expect(unpackResponse(response)).toBe(2);
});

it("accepts an array as an argument", async () => {
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

	expect(unpackResponse(response)).toBe(1);
});

it("accept a struct as an argument", async () => {
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

	expect(unpackResponse(response)).toEqual({ a: 10, b: "A", c: "D" });
});
