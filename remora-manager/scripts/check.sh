#!/bin/bash
PACKAGE_NAME=$(head Cargo.toml | awk '/^name/{print $3}' | tr -d '"' | tr -d "'")
cargo check --release --target $(rustup target list | awk '/musl.*installed/{print $1}')
