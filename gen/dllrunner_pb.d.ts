// package: dllrunner
// file: dllrunner.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

export class FieldType extends jspb.Message { 
    getFieldType(): FieldTypeEnum;
    setFieldType(value: FieldTypeEnum): FieldType;

    getStructShapeMap(): jspb.Map<string, FieldType>;
    clearStructShapeMap(): void;

    hasArrayShape(): boolean;
    clearArrayShape(): void;
    getArrayShape(): FieldType | undefined;
    setArrayShape(value?: FieldType): FieldType;
    getArrayLength(): number;
    setArrayLength(value: number): FieldType;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FieldType.AsObject;
    static toObject(includeInstance: boolean, msg: FieldType): FieldType.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FieldType, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FieldType;
    static deserializeBinaryFromReader(message: FieldType, reader: jspb.BinaryReader): FieldType;
}

export namespace FieldType {
    export type AsObject = {
        fieldType: FieldTypeEnum,

        structShapeMap: Array<[string, FieldType.AsObject]>,
        arrayShape?: FieldType.AsObject,
        arrayLength: number,
    }
}

export class Argument extends jspb.Message { 
    getType(): FieldTypeEnum;
    setType(value: FieldTypeEnum): Argument;

    hasValue(): boolean;
    clearValue(): void;
    getValue(): google_protobuf_struct_pb.Value | undefined;
    setValue(value?: google_protobuf_struct_pb.Value): Argument;

    getStructShapeMap(): jspb.Map<string, FieldType>;
    clearStructShapeMap(): void;

    hasArrayShape(): boolean;
    clearArrayShape(): void;
    getArrayShape(): FieldType | undefined;
    setArrayShape(value?: FieldType): Argument;
    getArrayLength(): number;
    setArrayLength(value: number): Argument;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Argument.AsObject;
    static toObject(includeInstance: boolean, msg: Argument): Argument.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Argument, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Argument;
    static deserializeBinaryFromReader(message: Argument, reader: jspb.BinaryReader): Argument;
}

export namespace Argument {
    export type AsObject = {
        type: FieldTypeEnum,
        value?: google_protobuf_struct_pb.Value.AsObject,

        structShapeMap: Array<[string, FieldType.AsObject]>,
        arrayShape?: FieldType.AsObject,
        arrayLength: number,
    }
}

export class RunDllRequest extends jspb.Message { 
    getDllPath(): string;
    setDllPath(value: string): RunDllRequest;
    getFuncName(): string;
    setFuncName(value: string): RunDllRequest;
    getReturnType(): FieldTypeEnum;
    setReturnType(value: FieldTypeEnum): RunDllRequest;
    clearArgumentsList(): void;
    getArgumentsList(): Array<Argument>;
    setArgumentsList(value: Array<Argument>): RunDllRequest;
    addArguments(value?: Argument, index?: number): Argument;

    getStructShapeMap(): jspb.Map<string, FieldType>;
    clearStructShapeMap(): void;

    hasArrayShape(): boolean;
    clearArrayShape(): void;
    getArrayShape(): FieldType | undefined;
    setArrayShape(value?: FieldType): RunDllRequest;
    getArrayLength(): number;
    setArrayLength(value: number): RunDllRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RunDllRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RunDllRequest): RunDllRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RunDllRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RunDllRequest;
    static deserializeBinaryFromReader(message: RunDllRequest, reader: jspb.BinaryReader): RunDllRequest;
}

export namespace RunDllRequest {
    export type AsObject = {
        dllPath: string,
        funcName: string,
        returnType: FieldTypeEnum,
        argumentsList: Array<Argument.AsObject>,

        structShapeMap: Array<[string, FieldType.AsObject]>,
        arrayShape?: FieldType.AsObject,
        arrayLength: number,
    }
}

export class RunDllResponse extends jspb.Message { 

    hasResponse(): boolean;
    clearResponse(): void;
    getResponse(): google_protobuf_struct_pb.Value | undefined;
    setResponse(value?: google_protobuf_struct_pb.Value): RunDllResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RunDllResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RunDllResponse): RunDllResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RunDllResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RunDllResponse;
    static deserializeBinaryFromReader(message: RunDllResponse, reader: jspb.BinaryReader): RunDllResponse;
}

export namespace RunDllResponse {
    export type AsObject = {
        response?: google_protobuf_struct_pb.Value.AsObject,
    }
}

export enum FieldTypeEnum {
    STRING = 0,
    INT = 1,
    CHAR = 2,
    FLOAT = 3,
    DOUBLE = 4,
    BOOLEAN = 5,
    VOID = 6,
    STRUCT = 7,
    ARRAY = 8,
    POINTER = 9,
    BYTE = 10,
    LONG = 11,
    INT64 = 12,
    INT8 = 13,
    INT16 = 14,
    INT32 = 15,
    UINT8 = 16,
    UINT16 = 17,
    UINT32 = 18,
    UINT64 = 19,
    LONGLONG = 20,
    SHORT = 21,
    USHORT = 22,
    SIZE_T = 23,
    UCHAR = 24,
    UINT = 25,
    ULONG = 26,
    ULONGLONG = 27,
}
