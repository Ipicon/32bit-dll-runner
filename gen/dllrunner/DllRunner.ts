// Original file: proto/dllrunner.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { RunDllRequest as _dllrunner_RunDllRequest, RunDllRequest__Output as _dllrunner_RunDllRequest__Output } from '../dllrunner/RunDllRequest';
import type { RunDllResponse as _dllrunner_RunDllResponse, RunDllResponse__Output as _dllrunner_RunDllResponse__Output } from '../dllrunner/RunDllResponse';

export interface DllRunnerClient extends grpc.Client {
  RunDll(argument: _dllrunner_RunDllRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_dllrunner_RunDllResponse__Output>): grpc.ClientUnaryCall;
  RunDll(argument: _dllrunner_RunDllRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_dllrunner_RunDllResponse__Output>): grpc.ClientUnaryCall;
  RunDll(argument: _dllrunner_RunDllRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_dllrunner_RunDllResponse__Output>): grpc.ClientUnaryCall;
  RunDll(argument: _dllrunner_RunDllRequest, callback: grpc.requestCallback<_dllrunner_RunDllResponse__Output>): grpc.ClientUnaryCall;
  runDll(argument: _dllrunner_RunDllRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_dllrunner_RunDllResponse__Output>): grpc.ClientUnaryCall;
  runDll(argument: _dllrunner_RunDllRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_dllrunner_RunDllResponse__Output>): grpc.ClientUnaryCall;
  runDll(argument: _dllrunner_RunDllRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_dllrunner_RunDllResponse__Output>): grpc.ClientUnaryCall;
  runDll(argument: _dllrunner_RunDllRequest, callback: grpc.requestCallback<_dllrunner_RunDllResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface DllRunnerHandlers extends grpc.UntypedServiceImplementation {
  RunDll: grpc.handleUnaryCall<_dllrunner_RunDllRequest__Output, _dllrunner_RunDllResponse>;
  
}

export interface DllRunnerDefinition extends grpc.ServiceDefinition {
  RunDll: MethodDefinition<_dllrunner_RunDllRequest, _dllrunner_RunDllResponse, _dllrunner_RunDllRequest__Output, _dllrunner_RunDllResponse__Output>
}
