# Arguments
image_name := "frontend"
image_tag := "latest"
image_archive := "frontend.tar"



# Install
#
# Installs the dependencies.
install:
    yarn install



# Build
#
# Builds the application.
build:
    yarn run build


# Run
#
# Runs application.
run: build
    yarn run preview


# Dev
#
# Runs development application server.
dev:
    yarn run dev


# Fmt
#
# Formats the code.
fmt:
    yarn run fmt


# Lint
#
# Lints the code.
lint:
    yarn run lint


# Image build
#
# Builds the Docker image.
#
# Args:
#   image_name: Name of the Docker image to build
#   image_tag: Tag of the Docker image to build
image_build:
    docker build -t {{image_name}}:{{image_tag}} .


# Image save
#
# Exports the Docker image to a tar file.
#
# Args:
#   image_name: Name of the Docker image to export
#   image_tag: Tag of the Docker image to export
#   output: Path to the output tar file
image_save:
    docker save -o {{image_archive}} {{image_name}}:{{image_tag}}


# Image load
#
# Imports the Docker image from a tar file.
#
# Args:
#   input: Path to the input tar file
image_load:
    docker load -i {{image_archive}}


# Down
#
# Stops the local enviroment.
down:
    docker-compose -f docker-compose.yml \
                   down


# Up
#
# Starts the local enviroment.
#
# Args:
#   start_app: "true" or "false"
up: down
    docker-compose -f docker-compose.yml \
                   up --abort-on-container-exit
