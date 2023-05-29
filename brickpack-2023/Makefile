### GLOBAL VARIABLES ###
TARGET_PATH:="/target/x86_64-unknown-linux-musl"
# TARGET_PATH:="/target"
PROGRAM:= "brickpack-2023"
DIST_DIR:= "./dist"

STIME = date '+%s' > /tmp/brickpack_$@_time
ETIME = read st < /tmp/brickpack_$@_time ; echo $$((`date '+%s'`-$$st)) secs

#CARGO_AUDIT = test -f `which cargo-audit` && cargo audit || echo "ERROR: 'cargo-audit' is not installed."
CARGO_AUDIT = test -f `which cargo-audit` && echo "`cargo audit || true`" || echo "ERROR: 'cargo-audit' is not installed."
CARGO_DENY = test -f `which cargo-deny` && echo "`cargo deny check || true `" || echo "ERROR: 'cargo-deny' is not installed."
CARGO_CHECK = test -f ./Cargo.toml && echo "`cargo check || false`" || echo "ERROR: Could not find 'Cargo.toml' in current directory."
TREE_CMD = test -f `which tree` && echo "`tree $(DIST_DIR) || true`" || echo "WARN: 'tree' is not installed."


###### make ######
#all: debug-post-build


help:
	@echo
	@echo "Makefile Help"
	@echo "======== ===="
	@echo
	@echo "\t$(MAKE)\t\t- This message!"
	@echo "\t$(MAKE) help\t- This message!"
	@echo "\t$(MAKE) prep\t- Prepare project to open inside vscode"
	@echo "\t$(MAKE) release\t- Generate release artifact"
	@echo "\t$(MAKE) debug\t- Generate debug artifact"
	@echo "\t$(MAKE) tests\t- Compile and run tests"
	@echo "\t$(MAKE) audit\t- Check dependencies licenses and disclosured vulnerabilities"
	@echo "\t$(MAKE) clean\t- Clean compilation files and artifact folder: '$(DIST_DIR)'"
	@echo
	@echo "   If you don't know what to choose, type:"
	@echo
	@echo "\t$(MAKE) release"
	@echo


depend:
	@sudo apt-get install tree musl-tools -y

pre-build:
	@[ -d $(DIST_DIR) ] && true || mkdir -vp $(DIST_DIR)

###### make debug ######
debug:	debug-post-build

debug-build: pre-build
	@[ -d $(DIST_DIR)/debug ] && true || mkdir -vp $(DIST_DIR)/debug
	cargo build

debug-post-build: debug-build
	@cp -v ./target/debug/$(PROGRAM) $(DIST_DIR)/debug/


###### make release ######
release: rel-post-build

rel-build: pre-build
	cargo fmt -- --check
	@[ -d $(DIST_DIR)/release ] && true || mkdir -vp $(DIST_DIR)/release
	cargo build --release

rel-post-build: rel-build
	@cp -v .$(TARGET_PATH)/release/$(PROGRAM) $(DIST_DIR)/release/


####### make check ######
check:
	@$(CARGO_CHECK)


audit:
	@echo "================================== CARGO AUDIT ======================================"
	@printf "Running cargo audit...\n\n"
	@$(CARGO_AUDIT)
	@echo "=================================== CARGO DENY ======================================"
	@printf "Running cargo deny...\n\n"
	@$(CARGO_DENY)


####### make prep ######
prep:
	@$(STIME)
	@$(MAKE) check
	@#$(MAKE) debug
	@$(MAKE) release
	@$(TREE_CMD)
	@#ls -lha $(DIST_DIR)/debug
	ls -lha $(DIST_DIR)/release
	@echo ""
	@echo -n "Elapsed time: "
	@$(ETIME)
	

####### make clean ######
clean:
	cargo clean
	rm -rf $(DIST_DIR)


####### make run_debug ######
run_debug: debug-post-build
	RUST_LOG=info ENABLE_TOKIO_CONSOLE= $(DIST_DIR)/debug/$(PROGRAM)


####### make run_release ######
run_release: rel-post-build
	RUST_LOG=info ENABLE_TOKIO_CONSOLE= $(DIST_DIR)/debug/$(PROGRAM)


####### make run_prod ######
run_prod:  rel-post-build
	$(DIST_DIR)/debug/$(PROGRAM)


tests:
	cargo test --package application-models -- --test-threads=1