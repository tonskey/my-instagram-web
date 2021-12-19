FROM gitpod/workspace-full

# Install custom tools, runtime, etc.
RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y \
    curl \
    build-essential \
    git

RUN curl -fsSL https://get.pulumi.com/

FROM node:lts-bullseye-slim
LABEL org.opencontainers.image.description="Pulumi CLI container for nodejs"
WORKDIR /pulumi/projects

RUN apt-get update -y && \
    apt-get install -y \
    git \
    ca-certificates

# Uses the workdir, copies from pulumi interim container
COPY --from=builder /root/.pulumi/bin/pulumi /pulumi/bin/pulumi
COPY --from=builder /root/.pulumi/bin/*-nodejs* /pulumi/bin/
COPY --from=builder /root/.pulumi/bin/pulumi-analyzer-policy /pulumi/bin/
ENV PATH "/pulumi/bin:${PATH}"
CMD ["pulumi"]