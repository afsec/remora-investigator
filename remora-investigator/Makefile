

all: xpi_local

base:
	@[ -d ./dist ] && true || mkdir -p ./dist

remora.zip: base
	mkdir -p background/wasm
	cp -rv background/dist/pkg/background.js background/wasm/
	cp -rv background/dist/pkg/background_bg.wasm background/wasm/
	rm -f ./dist/remora.zip
	zip -r ./dist/remora.zip devtools/devtools.html devtools/devtools.js \
		devtools/main_panel/main.html devtools/main_panel/main_panel-loader.js devtools/main_panel/main.js\
		devtools/panel_popup \
	   	options/* \
		background/bg-loader.js \
		background/firefox-api.js \
		background/wasm/background.js \
		background/wasm/background_bg.wasm \
		ui/index.html icons manifest.json


xpi_local: remora.zip
	rm -rf ./dist/xpi_local
	mkdir ./dist/xpi_local
	cd ./dist/xpi_local && unzip ../remora.zip
	cd ./dist && mv -v remora.zip remora.xpi



clean:
	rm -rf ./dist
