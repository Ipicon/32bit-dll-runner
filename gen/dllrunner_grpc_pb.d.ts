// package: dllrunner
// file: dllrunner.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as dllrunner_pb from "./dllrunner_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

interface IDllRunnerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    runDll: IDllRunnerService_IRunDll;
}

interface IDllRunnerService_IRunDll extends grpc.MethodDefinition<dllrunner_pb.RunDllRequest, dllrunner_pb.RunDllResponse> {
    path: "/dllrunner.DllRunner/RunDll";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dllrunner_pb.RunDllRequest>;
    requestDeserialize: grpc.deserialize<dllrunner_pb.RunDllRequest>;
    responseSerialize: grpc.serialize<dllrunner_pb.RunDllResponse>;
    responseDeserialize: grpc.deserialize<dllrunner_pb.RunDllResponse>;
}

export const DllRunnerService: IDllRunnerService;

export interface IDllRunnerServer extends grpc.UntypedServiceImplementation {
    runDll: grpc.handleUnaryCall<dllrunner_pb.RunDllRequest, dllrunner_pb.RunDllResponse>;
}

export interface IDllRunnerClient {
    runDll(request: dllrunner_pb.RunDllRequest, callback: (error: grpc.ServiceError | null, response: dllrunner_pb.RunDllResponse) => void): grpc.ClientUnaryCall;
    runDll(request: dllrunner_pb.RunDllRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dllrunner_pb.RunDllResponse) => void): grpc.ClientUnaryCall;
    runDll(request: dllrunner_pb.RunDllRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dllrunner_pb.RunDllResponse) => void): grpc.ClientUnaryCall;
}

export class DllRunnerClient extends grpc.Client implements IDllRunnerClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public runDll(request: dllrunner_pb.RunDllRequest, callback: (error: grpc.ServiceError | null, response: dllrunner_pb.RunDllResponse) => void): grpc.ClientUnaryCall;
    public runDll(request: dllrunner_pb.RunDllRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dllrunner_pb.RunDllResponse) => void): grpc.ClientUnaryCall;
    public runDll(request: dllrunner_pb.RunDllRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dllrunner_pb.RunDllResponse) => void): grpc.ClientUnaryCall;
}
