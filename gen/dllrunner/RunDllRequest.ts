// Original file: proto/dllrunner.proto

import type { FieldTypeEnum as _dllrunner_FieldTypeEnum, FieldTypeEnum__Output as _dllrunner_FieldTypeEnum__Output } from '../dllrunner/FieldTypeEnum';
import type { Argument as _dllrunner_Argument, Argument__Output as _dllrunner_Argument__Output } from '../dllrunner/Argument';
import type { FieldType as _dllrunner_FieldType, FieldType__Output as _dllrunner_FieldType__Output } from '../dllrunner/FieldType';

export interface RunDllRequest {
  'dllPath'?: (string);
  'funcName'?: (string);
  'returnType'?: (_dllrunner_FieldTypeEnum);
  'arguments'?: (_dllrunner_Argument)[];
  'structShape'?: ({[key: string]: _dllrunner_FieldType});
  'arrayShape'?: (_dllrunner_FieldType | null);
  'arrayLength'?: (number);
}

export interface RunDllRequest__Output {
  'dllPath'?: (string);
  'funcName'?: (string);
  'returnType'?: (_dllrunner_FieldTypeEnum__Output);
  'arguments'?: (_dllrunner_Argument__Output)[];
  'structShape'?: ({[key: string]: _dllrunner_FieldType__Output});
  'arrayShape'?: (_dllrunner_FieldType__Output);
  'arrayLength'?: (number);
}
