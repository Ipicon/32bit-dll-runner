// Original file: proto/dllrunner.proto

import type { FieldTypeEnum as _dllrunner_FieldTypeEnum, FieldTypeEnum__Output as _dllrunner_FieldTypeEnum__Output } from '../dllrunner/FieldTypeEnum';
import type { Value as _google_protobuf_Value, Value__Output as _google_protobuf_Value__Output } from '../google/protobuf/Value';
import type { FieldType as _dllrunner_FieldType, FieldType__Output as _dllrunner_FieldType__Output } from '../dllrunner/FieldType';

export interface Argument {
  'type'?: (_dllrunner_FieldTypeEnum);
  'value'?: (_google_protobuf_Value | null);
  'structShape'?: ({[key: string]: _dllrunner_FieldType});
  'arrayShape'?: (_dllrunner_FieldType | null);
  'arrayLength'?: (number);
}

export interface Argument__Output {
  'type'?: (_dllrunner_FieldTypeEnum__Output);
  'value'?: (_google_protobuf_Value__Output);
  'structShape'?: ({[key: string]: _dllrunner_FieldType__Output});
  'arrayShape'?: (_dllrunner_FieldType__Output);
  'arrayLength'?: (number);
}
