#!/bin/bash

# Spin up a postgres, cleaning up any leftovers
cname=pg-day1
docker stop $cname && docker rm $cname
docker run --name $cname -e "POSTGRES_HOST_AUTH_METHOD=trust" -p "5432:5432" -d postgres
# Wait for startup
sleep 3
# Copy the input txt file into the container
docker cp ./input.txt $cname:/opt/input.txt
# Invoke psql
psql -U postgres -d postgres -h localhost -p 5432 -f day1.sql