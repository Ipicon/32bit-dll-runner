// Original file: proto/dllrunner.proto

import type { FieldTypeEnum as _dllrunner_FieldTypeEnum, FieldTypeEnum__Output as _dllrunner_FieldTypeEnum__Output } from '../dllrunner/FieldTypeEnum';
import type { FieldType as _dllrunner_FieldType, FieldType__Output as _dllrunner_FieldType__Output } from '../dllrunner/FieldType';

export interface FieldType {
  'fieldType'?: (_dllrunner_FieldTypeEnum);
  'structShape'?: ({[key: string]: _dllrunner_FieldType});
  'arrayShape'?: (_dllrunner_FieldType | null);
  'arrayLength'?: (number);
}

export interface FieldType__Output {
  'fieldType'?: (_dllrunner_FieldTypeEnum__Output);
  'structShape'?: ({[key: string]: _dllrunner_FieldType__Output});
  'arrayShape'?: (_dllrunner_FieldType__Output);
  'arrayLength'?: (number);
}
