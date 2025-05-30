docker stop otel-demo
docker rm otel-demo
docker build -t otel-demo .
docker run -d -p 3001:3001 -p 3002:3002 --name otel-demo otel-demo
