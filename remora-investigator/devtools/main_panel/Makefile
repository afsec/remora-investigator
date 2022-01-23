all: build

build:
	elm make --optimize --output=main.js src/Main.elm

debug:
	elm make --output=main.js src/Main.elm --debug

run: debug
	python3 -m http.server
