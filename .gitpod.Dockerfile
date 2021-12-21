FROM gitpod/workspace-full:latest

RUN curl -fsSL https://get.pulumi.com | sh  && \
    sudo -H /usr/bin/pip3 install pulumi_docker pylint black
RUN python -m pip install --upgrade pip
RUN pip3 --no-cache-dir install awscli
RUN sed -i 's/export PIP_USER=yes/export PIP_USER=no/g' /home/gitpod/.bashrc

ENV PATH="${PATH}:/home/gitpod/.pulumi/bin"
ENV PIP_USER=no
