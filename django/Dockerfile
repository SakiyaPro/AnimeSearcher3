# 公式からpython3.7 on alpine linuxイメージをpull
FROM python:3.9-slim-buster

# 作業ディレクトリを設定
WORKDIR /usr/src/django

# environment
# Pythonがpyc filesとdiscへ書き込むことを防ぐ
ENV PYTHONDONTWRITEBYTECODE 1
# Pythonが標準入出力をバッファリングすることを防ぐ
ENV PYTHONUNBUFFERED 1

# Pipenvをインストール
RUN pip install --upgrade setuptools pip \
    && pip install pipenv \
    && apt update \
    && apt install -y sqlite3 unzip wget vim gnupg2 gcc tk

#google-chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && wget http://dl.google.com/linux/deb/pool/main/g/google-chrome-unstable/google-chrome-unstable_93.0.4577.18-1_amd64.deb \
    && apt-get install -y -f ./google-chrome-unstable_93.0.4577.18-1_amd64.deb
# chromeDriver
ADD https://chromedriver.storage.googleapis.com/93.0.4577.15/chromedriver_linux64.zip /opt/chrome/
RUN cd /opt/chrome/ \
    && unzip chromedriver_linux64.zip

ENV PATH /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/opt/chrome

# ホストのpipfileをコンテナの作業ディレクトリにコピー
COPY ./Pipfile /usr/src/django/Pipfile

# pipfileからパッケージをインストールしてDjango環境を構築
RUN pip3 install django==3.2
RUN pipenv install --skip-lock --system --dev

# ホストのカレントディレクトリ（現在はappディレクトリ）を作業ディレクトリにコピー
COPY . /usr/src/django/
