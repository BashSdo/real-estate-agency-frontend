# Development requirements

To develop this project you need to have the following tools installed:

- [Node](https://nodejs.org) - required for building the frontend;
- [Yarn](https://yarnpkg.com) - optional, but recommended (npm can be used instead);
- [Just](https://just.systems/man/en) - optional, but recommended;
- [Docker](https://docs.docker.com/get-docker) - optional, but recommended (different container runtime can be used, but requires manual configuration).

# Installing the dependencies

To install the dependencies run the following command:

```sh
just install
```

# Building the project

To build the project run the following command:

```sh
just build
```

# Building the release Docker image

To build the release Docker image run the following command:

```sh
just image_build
```

For building the image with a specific tag run:

```sh
just image_name=<name> image_tag=<tag> image_build
```

# Importing/exporting the release Docker image

To export the release Docker image run the following command:

```sh
just image_save
```

And archive will be created in the project directory.

To import the release Docker image run the following command:

```sh
just image_load
```

To import/export archive with a specific name run:

```sh
just image_archive=<name> [image_save|image_load]
```

# Pull requests requirements

Before sending a pull request make sure you do the following:

- run `just fmt` to format the code;
- run `just lint` to lint the code;
- run `just image_build` to build the Docker image.

After all the checks pass, you can submit a pull request.

If you have any questions/suggestions, feel free to open an issue.
