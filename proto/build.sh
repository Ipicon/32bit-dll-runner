#!/bin/sh

grpc_tools_node_protoc \
--js_out=import_style=commonjs,binary:./gen \
--grpc_out=grpc_js:./gen \
--plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`.cmd \
-I ./proto \
./proto/*.proto

# generate d.ts codes
protoc \
--plugin=protoc-gen-ts=.\\node_modules\\.bin\\protoc-gen-ts.cmd \
--ts_out=grpc_js:./gen \
-I ./proto \
./proto/*.proto