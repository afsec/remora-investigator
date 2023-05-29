#!/bin/bash

docker run --rm --name lldb --cap-add=SYS_PTRACE --security-opt seccomp=unconfined -v $PWD:/home/node -ti node:18.12-bullseye  /bin/bash

