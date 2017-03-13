#!/usr/bin/env bash
docker build -t quickbits/quickbits-test-db:latest .
docker push quickbits/quickbits-test-db
#docker run -d -p 5432:5432 -t bowmanmc/quickbits-test-db:latest
