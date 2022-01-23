all: run

pre_build:
	mkdir -p ./dist/pkg
	@cp -v index.html ./dist/
	@cp -v bg-loader.js ./dist/

build: pre_build
	@wasm-pack build --target no-modules

post_build_debug: build
	@cp -v ./pkg/background.js ./dist/pkg/
	@# @wasm-strip ./pkg/background_bg.wasm
	@# wasm-opt -Os ./pkg/background_bg.wasm -o ./dist/pkg/background_bg.wasm
	@cp -v ./pkg/background_bg.wasm ./dist/pkg/


run: post_build_debug
	@python3 -mhttp.server --directory ./dist


build_release: pre_build
	@wasm-pack build --release --target no-modules

post_build_release: build_release
	@cp -v ./pkg/background.js ./dist/pkg/
	@# @wasm-strip ./pkg/background_bg.wasm
	@# wasm-opt -Os ./pkg/background_bg.wasm -o ./dist/pkg/background_bg.wasm
	@cp -v ./pkg/background_bg.wasm ./dist/pkg/


release: post_build_release


clean:
	rm -rf ./dist ./pkg
	cargo clean
