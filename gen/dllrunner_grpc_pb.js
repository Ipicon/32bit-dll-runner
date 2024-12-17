// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var dllrunner_pb = require('./dllrunner_pb.js');
var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');

function serialize_dllrunner_RunDllRequest(arg) {
  if (!(arg instanceof dllrunner_pb.RunDllRequest)) {
    throw new Error('Expected argument of type dllrunner.RunDllRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dllrunner_RunDllRequest(buffer_arg) {
  return dllrunner_pb.RunDllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dllrunner_RunDllResponse(arg) {
  if (!(arg instanceof dllrunner_pb.RunDllResponse)) {
    throw new Error('Expected argument of type dllrunner.RunDllResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dllrunner_RunDllResponse(buffer_arg) {
  return dllrunner_pb.RunDllResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DllRunnerService = exports.DllRunnerService = {
  runDll: {
    path: '/dllrunner.DllRunner/RunDll',
    requestStream: false,
    responseStream: false,
    requestType: dllrunner_pb.RunDllRequest,
    responseType: dllrunner_pb.RunDllResponse,
    requestSerialize: serialize_dllrunner_RunDllRequest,
    requestDeserialize: deserialize_dllrunner_RunDllRequest,
    responseSerialize: serialize_dllrunner_RunDllResponse,
    responseDeserialize: deserialize_dllrunner_RunDllResponse,
  },
};

exports.DllRunnerClient = grpc.makeGenericClientConstructor(DllRunnerService);
