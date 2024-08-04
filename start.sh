#!/bin/bash
npm install &

sleep 5

ng serve --host 0.0.0.0 &

sleep 5

json-server ./data/data.json --port 4000
