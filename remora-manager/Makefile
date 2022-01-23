STIME = date '+%s' > ./tmp/$@_time
ETIME = read st < ./tmp/$@_time ; echo $$((`date '+%s'`-$$st)) secs

all: build run

test:
	cargo test --release

prep:
	mkdir -p tmp
	@$(STIME)
	@cargo check
	@$(MAKE) build
	@$(MAKE) release
	@$(ETIME)



release:
	./scripts/build.sh

build:
	./scripts/build.sh -d

check:
	./scripts/check.sh

fetch:
	./scripts/fetch.sh

clean:
	rm -rf ./dist ./tmp
	cargo clean

run:
	./scripts/run.sh

deploy:
	./scripts/deploy.sh

undeploy:
	./scripts/deploy.sh -u
