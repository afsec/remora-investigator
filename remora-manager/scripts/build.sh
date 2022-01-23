#!/bin/bash
set -x
mkdir -p ./dist
PACKAGE_NAME="$(awk -F'"' 'BEGIN {found=0} /[[bin]]/{found=1} /^name/ {if (found == 1) {print $2}}' ./src/launcher/Cargo.toml)"

if [ X"$1" == X"-d" ]; then
    cargo build
    strip ./target/x86_64-unknown-linux-musl/debug/${PACKAGE_NAME}
    cp -v ./target/x86_64-unknown-linux-musl/debug/${PACKAGE_NAME} ./dist/${PACKAGE_NAME}
else
    cargo build --release
    strip ./target/x86_64-unknown-linux-musl/release/${PACKAGE_NAME}
    cp -v ./target/x86_64-unknown-linux-musl/release/${PACKAGE_NAME} ./dist/${PACKAGE_NAME}
fi

