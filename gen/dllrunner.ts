import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { DllRunnerClient as _dllrunner_DllRunnerClient, DllRunnerDefinition as _dllrunner_DllRunnerDefinition } from './dllrunner/DllRunner';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  dllrunner: {
    Argument: MessageTypeDefinition
    DllRunner: SubtypeConstructor<typeof grpc.Client, _dllrunner_DllRunnerClient> & { service: _dllrunner_DllRunnerDefinition }
    FieldType: MessageTypeDefinition
    FieldTypeEnum: EnumTypeDefinition
    RunDllRequest: MessageTypeDefinition
    RunDllResponse: MessageTypeDefinition
  }
  google: {
    protobuf: {
      ListValue: MessageTypeDefinition
      NullValue: EnumTypeDefinition
      Struct: MessageTypeDefinition
      Value: MessageTypeDefinition
    }
  }
}

