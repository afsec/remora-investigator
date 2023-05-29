FROM node:18.12-bullseye

# Install a basic environment needed for our build tools
RUN apt -yq update && \
    apt upgrade -y && \
    apt -yqq install --no-install-recommends \ 
    curl jq git ca-certificates \
    build-essential pkg-config \
    libssl-dev llvm-dev liblmdb-dev \
    clang cmake rsync \
    libunwind-dev musl-tools\
    binaryen wabt \
    tmux unzip vim \
    tree iproute2


RUN npm install -g npm@latest http-server uglify-js

COPY .devcontainer/install_tooling.sh /usr/local/bin/

WORKDIR /usr/local/bin

# Install Dev Tooling
RUN sh ./install_tooling.sh

ENV RUSTUP_HOME=/opt/rustup
ENV CARGO_HOME=/opt/cargo

ENV PATH=${RUSTUP_HOME}/bin:${CARGO_HOME}/bin:${PATH}

# Install Rust and wasm target
RUN curl --fail https://sh.rustup.rs -sSf \
    | sh -s -- -y --default-toolchain stable-x86_64-unknown-linux-gnu --no-modify-path && \
    rustup default stable-x86_64-unknown-linux-gnu && \
    rustup target add x86_64-unknown-linux-musl && \
    rustup target add wasm32-unknown-unknown

# RUN cargo install -f wasm-bindgen-cli

RUN rm -rf /opt/cargo/registry/

# Fix permission in rustup and cargo folders
RUN chown -R node:node /opt 


# EXPOSE 4000
