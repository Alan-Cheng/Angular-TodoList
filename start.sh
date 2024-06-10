#!/bin/bash
node_modules/.bin/ng serve --host 0.0.0.0 &

sleep 5

json-server ./data/data.json --port 4000
