#!/bin/bash

set -x 

PACKAGE_DIR="./src/launcher"
PACKAGE_NAME="$(awk -F'"' 'BEGIN {found=0} /[[bin]]/{found=1} /^name/ {if (found == 1) {print $2}}' ${PACKAGE_DIR}/Cargo.toml)"

pushd ./dist
RANDOM_TOKEN=$(dd if=/dev/urandom bs=1 count=30 2>/dev/null | base64 | sed 's/[^a-zA-Z0-9]//g')
BP_SERVER_TOKEN="${RANDOM_TOKEN}" ./${PACKAGE_NAME}

