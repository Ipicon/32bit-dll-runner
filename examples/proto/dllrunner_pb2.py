# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: proto/dllrunner.proto
# Protobuf Python Version: 5.28.1
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import runtime_version as _runtime_version
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
_runtime_version.ValidateProtobufRuntimeVersion(
    _runtime_version.Domain.PUBLIC,
    5,
    28,
    1,
    '',
    'proto/dllrunner.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from google.protobuf import struct_pb2 as google_dot_protobuf_dot_struct__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x15proto/dllrunner.proto\x12\tdllrunner\x1a\x1cgoogle/protobuf/struct.proto\"\x81\x02\n\tFieldType\x12,\n\nfield_type\x18\x01 \x01(\x0e\x32\x18.dllrunner.FieldTypeEnum\x12;\n\x0cstruct_shape\x18\x02 \x03(\x0b\x32%.dllrunner.FieldType.StructShapeEntry\x12)\n\x0b\x61rray_shape\x18\x03 \x01(\x0b\x32\x14.dllrunner.FieldType\x12\x14\n\x0c\x61rray_length\x18\x04 \x01(\x05\x1aH\n\x10StructShapeEntry\x12\x0b\n\x03key\x18\x01 \x01(\t\x12#\n\x05value\x18\x02 \x01(\x0b\x32\x14.dllrunner.FieldType:\x02\x38\x01\"\xa0\x02\n\x08\x41rgument\x12&\n\x04type\x18\x01 \x01(\x0e\x32\x18.dllrunner.FieldTypeEnum\x12%\n\x05value\x18\x02 \x01(\x0b\x32\x16.google.protobuf.Value\x12:\n\x0cstruct_shape\x18\x03 \x03(\x0b\x32$.dllrunner.Argument.StructShapeEntry\x12)\n\x0b\x61rray_shape\x18\x04 \x01(\x0b\x32\x14.dllrunner.FieldType\x12\x14\n\x0c\x61rray_length\x18\x05 \x01(\x05\x1aH\n\x10StructShapeEntry\x12\x0b\n\x03key\x18\x01 \x01(\t\x12#\n\x05value\x18\x02 \x01(\x0b\x32\x14.dllrunner.FieldType:\x02\x38\x01\"\xd7\x02\n\rRunDllRequest\x12\x10\n\x08\x64ll_path\x18\x01 \x01(\t\x12\x11\n\tfunc_name\x18\x02 \x01(\t\x12-\n\x0breturn_type\x18\x03 \x01(\x0e\x32\x18.dllrunner.FieldTypeEnum\x12&\n\targuments\x18\x04 \x03(\x0b\x32\x13.dllrunner.Argument\x12?\n\x0cstruct_shape\x18\x05 \x03(\x0b\x32).dllrunner.RunDllRequest.StructShapeEntry\x12)\n\x0b\x61rray_shape\x18\x06 \x01(\x0b\x32\x14.dllrunner.FieldType\x12\x14\n\x0c\x61rray_length\x18\x07 \x01(\x05\x1aH\n\x10StructShapeEntry\x12\x0b\n\x03key\x18\x01 \x01(\t\x12#\n\x05value\x18\x02 \x01(\x0b\x32\x14.dllrunner.FieldType:\x02\x38\x01\":\n\x0eRunDllResponse\x12(\n\x08response\x18\x01 \x01(\x0b\x32\x16.google.protobuf.Value*\xce\x02\n\rFieldTypeEnum\x12\n\n\x06STRING\x10\x00\x12\x07\n\x03INT\x10\x01\x12\x08\n\x04\x43HAR\x10\x02\x12\t\n\x05\x46LOAT\x10\x03\x12\n\n\x06\x44OUBLE\x10\x04\x12\x0b\n\x07\x42OOLEAN\x10\x05\x12\x08\n\x04VOID\x10\x06\x12\n\n\x06STRUCT\x10\x07\x12\t\n\x05\x41RRAY\x10\x08\x12\x0b\n\x07POINTER\x10\t\x12\x08\n\x04\x42YTE\x10\n\x12\x08\n\x04LONG\x10\x0b\x12\t\n\x05INT64\x10\x0c\x12\x08\n\x04INT8\x10\r\x12\t\n\x05INT16\x10\x0e\x12\t\n\x05INT32\x10\x0f\x12\t\n\x05UINT8\x10\x10\x12\n\n\x06UINT16\x10\x11\x12\n\n\x06UINT32\x10\x12\x12\n\n\x06UINT64\x10\x13\x12\x0c\n\x08LONGLONG\x10\x14\x12\t\n\x05SHORT\x10\x15\x12\n\n\x06USHORT\x10\x16\x12\n\n\x06SIZE_T\x10\x17\x12\t\n\x05UCHAR\x10\x18\x12\x08\n\x04UINT\x10\x19\x12\t\n\x05ULONG\x10\x1a\x12\r\n\tULONGLONG\x10\x1b\x32J\n\tDllRunner\x12=\n\x06RunDll\x12\x18.dllrunner.RunDllRequest\x1a\x19.dllrunner.RunDllResponseb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'proto.dllrunner_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  DESCRIPTOR._loaded_options = None
  _globals['_FIELDTYPE_STRUCTSHAPEENTRY']._loaded_options = None
  _globals['_FIELDTYPE_STRUCTSHAPEENTRY']._serialized_options = b'8\001'
  _globals['_ARGUMENT_STRUCTSHAPEENTRY']._loaded_options = None
  _globals['_ARGUMENT_STRUCTSHAPEENTRY']._serialized_options = b'8\001'
  _globals['_RUNDLLREQUEST_STRUCTSHAPEENTRY']._loaded_options = None
  _globals['_RUNDLLREQUEST_STRUCTSHAPEENTRY']._serialized_options = b'8\001'
  _globals['_FIELDTYPEENUM']._serialized_start=1024
  _globals['_FIELDTYPEENUM']._serialized_end=1358
  _globals['_FIELDTYPE']._serialized_start=67
  _globals['_FIELDTYPE']._serialized_end=324
  _globals['_FIELDTYPE_STRUCTSHAPEENTRY']._serialized_start=252
  _globals['_FIELDTYPE_STRUCTSHAPEENTRY']._serialized_end=324
  _globals['_ARGUMENT']._serialized_start=327
  _globals['_ARGUMENT']._serialized_end=615
  _globals['_ARGUMENT_STRUCTSHAPEENTRY']._serialized_start=252
  _globals['_ARGUMENT_STRUCTSHAPEENTRY']._serialized_end=324
  _globals['_RUNDLLREQUEST']._serialized_start=618
  _globals['_RUNDLLREQUEST']._serialized_end=961
  _globals['_RUNDLLREQUEST_STRUCTSHAPEENTRY']._serialized_start=252
  _globals['_RUNDLLREQUEST_STRUCTSHAPEENTRY']._serialized_end=324
  _globals['_RUNDLLRESPONSE']._serialized_start=963
  _globals['_RUNDLLRESPONSE']._serialized_end=1021
  _globals['_DLLRUNNER']._serialized_start=1360
  _globals['_DLLRUNNER']._serialized_end=1434
# @@protoc_insertion_point(module_scope)
