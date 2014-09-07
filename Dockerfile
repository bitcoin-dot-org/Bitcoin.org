FROM fedora:20
RUN yum install -y gcc gcc-c++ libicu make ruby ruby-devel
RUN gem update -N --system
RUN gem install -N bundler
