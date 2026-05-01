#!/bin/bash
echo "Installing dependencies and building McDash.app..."
mvn clean package

echo "Build complete. To start the dashboard, use:"
echo "pm2 start java --name McDash.app -- -jar target/mcdash-standalone-1.0-SNAPSHOT.jar"
