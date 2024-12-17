import ref, { types } from "ref-napi";
import StructType, { type StructObject } from "ref-struct-di";
import ArrayType, { type TypedArray } from "ref-array-di";
import { type FieldType, FieldTypeEnum } from "../../gen/dllrunner_pb";
import type { Type } from "ref-napi";
import type * as jspb from "google-protobuf";
import type { JavaScriptValue } from "google-protobuf/google/protobuf/struct_pb";

const ffiTypes: Partial<Record<FieldTypeEnum, Type>> = {
	[FieldTypeEnum.STRING]: types.CString,
	[FieldTypeEnum.INT]: types.int,
	[FieldTypeEnum.CHAR]: types.char,
	[FieldTypeEnum.FLOAT]: types.float,
	[FieldTypeEnum.DOUBLE]: types.double,
	[FieldTypeEnum.BOOLEAN]: types.bool,
	[FieldTypeEnum.VOID]: types.void,
	[FieldTypeEnum.BYTE]: types.byte,
	[FieldTypeEnum.LONG]: types.long,
	[FieldTypeEnum.INT8]: types.int8,
	[FieldTypeEnum.INT16]: types.int16,
	[FieldTypeEnum.INT32]: types.int32,
	[FieldTypeEnum.INT64]: types.int64,
	[FieldTypeEnum.UINT8]: types.uint8,
	[FieldTypeEnum.UINT16]: types.uint16,
	[FieldTypeEnum.UINT32]: types.uint32,
	[FieldTypeEnum.UINT64]: types.uint64,
	[FieldTypeEnum.LONGLONG]: types.longlong,
	[FieldTypeEnum.SHORT]: types.short,
	[FieldTypeEnum.USHORT]: types.ushort,
	[FieldTypeEnum.SIZE_T]: types.size_t,
	[FieldTypeEnum.UCHAR]: types.uchar,
	[FieldTypeEnum.UINT]: types.uint,
	[FieldTypeEnum.ULONG]: types.ulong,
	[FieldTypeEnum.ULONGLONG]: types.ulonglong,
} as const;

const structShapeToJson = (shape: jspb.Map<string, FieldType>) => {
	const structType: Record<string, Type> = {};

	for (const [key, type] of shape.entries()) {
		structType[key] = buildType(
			type.getFieldType(),
			type.getStructShapeMap(),
			type.getArrayShape(),
			type.getArrayLength(),
		);
	}

	return structType;
};

const getArrayType = (
	arrayShape: FieldType | undefined,
	arrayLength?: number,
) => {
	if (arrayShape === undefined)
		throw new Error("array shape isn't initialized.");
	return ArrayType(ref)(
		buildType(
			arrayShape.getFieldType(),
			arrayShape.getStructShapeMap(),
			arrayShape.getArrayShape(),
			arrayShape.getArrayLength(),
		),
		arrayLength,
	);
};

// given a return type and shape of a FieldType, we're building a correct ffi Type used for loading the library's functions
export const buildType: (
	type: FieldTypeEnum,
	structShape: jspb.Map<string, FieldType>,
	arrayShape: FieldType | undefined,
	arrayLength: number,
) => Type = (type, structShape, arrayShape, arrayLength) => {
	switch (type) {
		case FieldTypeEnum.STRUCT:
			return StructType(ref)(structShapeToJson(structShape));
		case FieldTypeEnum.ARRAY:
			return getArrayType(arrayShape, arrayLength);
		case FieldTypeEnum.POINTER:
			return getArrayType(arrayShape);
		default:
			return ffiTypes[type] || types.void;
	}
};

// returns a JavaScriptValue which loads into a google.protobuf.Value message and sends to the client
export const buildResponseValue = (
	response: unknown,
	returnType: FieldTypeEnum,
	structShape: jspb.Map<string, FieldType>,
	arrayShape: FieldType | undefined,
	arrayLength: number,
): JavaScriptValue => {
	switch (returnType) {
		case FieldTypeEnum.CHAR: {
			if (typeof response !== "number") throw new Error("Bad Return Type.");
			return String.fromCharCode(response);
		}

		case FieldTypeEnum.STRUCT: {
			const structRes = (response as StructObject<unknown>).toJSON();

			for (const key in structRes) {
				const type = structShape.get(key);

				if (type === undefined) throw new Error("Struct Defined Incorrectly.");
				structRes[key] = buildResponseValue(
					structRes[key],
					type.getFieldType(),
					type.getStructShapeMap(),
					type.getArrayShape(),
					type.getArrayLength(),
				);
			}

			return structRes;
		}

		case FieldTypeEnum.POINTER:
		case FieldTypeEnum.ARRAY: {
			const typedArray = response as TypedArray<unknown>;
			let arrRes: unknown[];

			if (arrayLength === 0) {
				arrRes = getArrayType(arrayShape)
					.untilZeros(typedArray.buffer)
					.toArray();
			} else {
				typedArray.length = arrayLength;
				arrRes = typedArray.toArray();
			}

			if (arrayShape === undefined)
				throw new Error("Array Defined Incorrectly.");

			return arrRes.map((item) =>
				buildResponseValue(
					item,
					arrayShape.getFieldType(),
					arrayShape.getStructShapeMap(),
					arrayShape.getArrayShape(),
					arrayShape.getArrayLength(),
				),
			);
		}

		default:
			return response as JavaScriptValue;
	}
};
