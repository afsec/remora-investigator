{
  inputs = {
    nixpkgs.url = "nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        libraries = with pkgs;[
          webkitgtk
          gtk3
          cairo
          gdk-pixbuf
          glib
          dbus
          openssl_3
          librsvg
        ];

        packages = with pkgs; [
          curl
          wget
          pkg-config
          dbus
          openssl_3
          glib
          gtk3
          libsoup
          webkitgtk
          librsvg
          vim tmux rsync cacert
          curl git cmake tree
          unzip zstd iproute2 jq
          clang llvm lldb glibc pkg-config
          rustup musl
          cargo-sort cargo-audit cargo-deny cargo-vet cargo-generate
          wasm-pack wabt binaryen wasm-bindgen-cli trunk
          helix cocogitto difftastic watchexec
          sea-orm-cli cargo-tauri
          hexyl
          nodejs_20
          vscodium
          nixd
        ];
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = packages;

          shellHook =
            ''
              rustup default stable
              rustup component add rust-analyzer
              rustup target add wasm32-unknown-unknown
              export LD_LIBRARY_PATH=${pkgs.lib.makeLibraryPath libraries}:$LD_LIBRARY_PATH
            '';
        };
      });
}
