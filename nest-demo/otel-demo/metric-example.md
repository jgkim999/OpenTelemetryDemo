# metric

```typescript
// app.module.ts
const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
      ...
      prefix: 'demo', // Add a custom prefix to all API metrics
      ...
```

```text
# HELP demo_http_server_request_count_total Total number of HTTP requests
# UNIT demo_http_server_request_count_total requests
# TYPE demo_http_server_request_count_total counter
demo_http_server_request_count_total{method="GET",path="/movies/:id"} 12
demo_http_server_request_count_total{method="GET",path="/movies/getAll"} 11
# HELP demo_http_server_response_count_total Total number of HTTP responses
# UNIT demo_http_server_response_count_total responses
# TYPE demo_http_server_response_count_total counter
demo_http_server_response_count_total{method="GET",status="200",path="/movies/:id",custom="nest"} 9
demo_http_server_response_count_total{method="GET",status="200",path="/movies/getAll",custom="nest"} 11
demo_http_server_response_count_total{method="GET",status="400",path="/movies/:id",custom="nest"} 3
# HELP demo_http_server_duration The duration of the inbound HTTP request
# UNIT demo_http_server_duration ms
# TYPE demo_http_server_duration histogram
demo_http_server_duration_count{method="GET",status="200",path="/movies/:id",custom="nest"} 9
demo_http_server_duration_sum{method="GET",status="200",path="/movies/:id",custom="nest"} 11.037624000000001
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="0"} 0
...
```

> 주의!
> `prefix` 설정에 따라 `demo` 접두사로 표시되는 metric이 있습니다.
> 해당 설정을 삭제해도 무방합니다.

```text
# HELP target_info Target metadata
# TYPE target_info gauge
target_info{host_name="jgkim-MacMini.local",host_arch="arm64",host_id="E81B4E65-6B50-52A7-AD29-D0AE6874923E",process_pid="14766",process_executable_name="node",process_executable_path="/Users/jgkim/.nvm/versions/node/v22.15.0/bin/node",process_command_args="[\"/Users/jgkim/.nvm/versions/node/v22.15.0/bin/node\",\"--enable-source-maps\",\"/Users/jgkim/github/node-js/nest-demo/otel-demo/dist/main\"]",process_runtime_version="22.15.0",process_runtime_name="nodejs",process_runtime_description="Node.js",process_command="/Users/jgkim/github/node-js/nest-demo/otel-demo/dist/main",process_owner="jgkim",service_version="2.0.0",service_group="instrumentation-group",service_instance_id="localhost",service_environment="development",service_name="otel-demo-service"} 1
# HELP http_server_duration Measures the duration of inbound HTTP requests.
# UNIT http_server_duration ms
# TYPE http_server_duration histogram
http_server_duration_count{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001"} 20
http_server_duration_sum{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001"} 68.41379099999999
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001",le="0"} 0
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001",le="5"} 17
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001",le="10"} 20
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001",le="25"} 20
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001",le="50"} 20
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001",le="75"} 20
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001",le="100"} 20
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001",le="250"} 20
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001",le="500"} 20
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001",le="750"} 20
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001",le="1000"} 20
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001",le="2500"} 20
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001",le="5000"} 20
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001",le="7500"} 20
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001",le="10000"} 20
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="200",net_host_port="3001",le="+Inf"} 20
http_server_duration_count{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001"} 3
http_server_duration_sum{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001"} 11.945958000000001
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001",le="0"} 0
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001",le="5"} 2
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001",le="10"} 3
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001",le="25"} 3
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001",le="50"} 3
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001",le="75"} 3
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001",le="100"} 3
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001",le="250"} 3
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001",le="500"} 3
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001",le="750"} 3
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001",le="1000"} 3
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001",le="2500"} 3
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001",le="5000"} 3
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001",le="7500"} 3
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001",le="10000"} 3
http_server_duration_bucket{http_scheme="http",http_method="GET",net_host_name="localhost",http_flavor="1.1",http_status_code="400",net_host_port="3001",le="+Inf"} 3
# HELP http_client_duration Measures the duration of outbound HTTP requests.
# UNIT http_client_duration ms
# TYPE http_client_duration histogram
http_client_duration_count{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1"} 8
http_client_duration_sum{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1"} 48.273250000000004
http_client_duration_bucket{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1",le="0"} 0
http_client_duration_bucket{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1",le="5"} 4
http_client_duration_bucket{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1",le="10"} 7
http_client_duration_bucket{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1",le="25"} 8
http_client_duration_bucket{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1",le="50"} 8
http_client_duration_bucket{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1",le="75"} 8
http_client_duration_bucket{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1",le="100"} 8
http_client_duration_bucket{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1",le="250"} 8
http_client_duration_bucket{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1",le="500"} 8
http_client_duration_bucket{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1",le="750"} 8
http_client_duration_bucket{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1",le="1000"} 8
http_client_duration_bucket{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1",le="2500"} 8
http_client_duration_bucket{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1",le="5000"} 8
http_client_duration_bucket{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1",le="7500"} 8
http_client_duration_bucket{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1",le="10000"} 8
http_client_duration_bucket{http_method="POST",net_peer_name="localhost",net_peer_port="4318",http_status_code="200",http_flavor="1.1",le="+Inf"} 8
# HELP demo_http_server_request_count_total Total number of HTTP requests
# UNIT demo_http_server_request_count_total requests
# TYPE demo_http_server_request_count_total counter
demo_http_server_request_count_total{method="GET",path="/movies/:id"} 12
demo_http_server_request_count_total{method="GET",path="/movies/getAll"} 11
# HELP demo_http_server_response_count_total Total number of HTTP responses
# UNIT demo_http_server_response_count_total responses
# TYPE demo_http_server_response_count_total counter
demo_http_server_response_count_total{method="GET",status="200",path="/movies/:id",custom="nest"} 9
demo_http_server_response_count_total{method="GET",status="200",path="/movies/getAll",custom="nest"} 11
demo_http_server_response_count_total{method="GET",status="400",path="/movies/:id",custom="nest"} 3
# HELP demo_http_server_duration The duration of the inbound HTTP request
# UNIT demo_http_server_duration ms
# TYPE demo_http_server_duration histogram
demo_http_server_duration_count{method="GET",status="200",path="/movies/:id",custom="nest"} 9
demo_http_server_duration_sum{method="GET",status="200",path="/movies/:id",custom="nest"} 11.037624000000001
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="0"} 0
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="5"} 9
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="10"} 9
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="25"} 9
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="50"} 9
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="75"} 9
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="100"} 9
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="250"} 9
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="500"} 9
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="750"} 9
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="1000"} 9
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="2500"} 9
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="5000"} 9
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="7500"} 9
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="10000"} 9
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="+Inf"} 9
demo_http_server_duration_count{method="GET",status="200",path="/movies/getAll",custom="nest"} 11
demo_http_server_duration_sum{method="GET",status="200",path="/movies/getAll",custom="nest"} 20.198665
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="0"} 0
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="5"} 11
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="10"} 11
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="25"} 11
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="50"} 11
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="75"} 11
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="100"} 11
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="250"} 11
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="500"} 11
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="750"} 11
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="1000"} 11
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="2500"} 11
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="5000"} 11
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="7500"} 11
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="10000"} 11
demo_http_server_duration_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="+Inf"} 11
demo_http_server_duration_count{method="GET",status="400",path="/movies/:id",custom="nest"} 3
demo_http_server_duration_sum{method="GET",status="400",path="/movies/:id",custom="nest"} 7.903917000000001
demo_http_server_duration_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="0"} 0
demo_http_server_duration_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="5"} 3
demo_http_server_duration_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="10"} 3
demo_http_server_duration_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="25"} 3
demo_http_server_duration_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="50"} 3
demo_http_server_duration_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="75"} 3
demo_http_server_duration_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="100"} 3
demo_http_server_duration_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="250"} 3
demo_http_server_duration_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="500"} 3
demo_http_server_duration_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="750"} 3
demo_http_server_duration_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="1000"} 3
demo_http_server_duration_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="2500"} 3
demo_http_server_duration_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="5000"} 3
demo_http_server_duration_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="7500"} 3
demo_http_server_duration_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="10000"} 3
demo_http_server_duration_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="+Inf"} 3
# HELP demo_http_server_request_size Size of incoming bytes
# UNIT demo_http_server_request_size By
# TYPE demo_http_server_request_size histogram
demo_http_server_request_size_count{method="GET",status="200",path="/movies/:id",custom="nest"} 9
demo_http_server_request_size_sum{method="GET",status="200",path="/movies/:id",custom="nest"} 0
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="0"} 9
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="5"} 9
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="10"} 9
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="25"} 9
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="50"} 9
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="75"} 9
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="100"} 9
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="250"} 9
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="500"} 9
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="750"} 9
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="1000"} 9
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="2500"} 9
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="5000"} 9
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="7500"} 9
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="10000"} 9
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="+Inf"} 9
demo_http_server_request_size_count{method="GET",status="200",path="/movies/getAll",custom="nest"} 11
demo_http_server_request_size_sum{method="GET",status="200",path="/movies/getAll",custom="nest"} 0
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="0"} 11
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="5"} 11
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="10"} 11
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="25"} 11
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="50"} 11
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="75"} 11
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="100"} 11
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="250"} 11
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="500"} 11
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="750"} 11
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="1000"} 11
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="2500"} 11
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="5000"} 11
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="7500"} 11
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="10000"} 11
demo_http_server_request_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="+Inf"} 11
demo_http_server_request_size_count{method="GET",status="400",path="/movies/:id",custom="nest"} 3
demo_http_server_request_size_sum{method="GET",status="400",path="/movies/:id",custom="nest"} 0
demo_http_server_request_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="0"} 3
demo_http_server_request_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="5"} 3
demo_http_server_request_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="10"} 3
demo_http_server_request_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="25"} 3
demo_http_server_request_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="50"} 3
demo_http_server_request_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="75"} 3
demo_http_server_request_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="100"} 3
demo_http_server_request_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="250"} 3
demo_http_server_request_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="500"} 3
demo_http_server_request_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="750"} 3
demo_http_server_request_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="1000"} 3
demo_http_server_request_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="2500"} 3
demo_http_server_request_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="5000"} 3
demo_http_server_request_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="7500"} 3
demo_http_server_request_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="10000"} 3
demo_http_server_request_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="+Inf"} 3
# HELP demo_http_server_response_size Size of outgoing bytes
# UNIT demo_http_server_response_size By
# TYPE demo_http_server_response_size histogram
demo_http_server_response_size_count{method="GET",status="200",path="/movies/:id",custom="nest"} 9
demo_http_server_response_size_sum{method="GET",status="200",path="/movies/:id",custom="nest"} 387
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="0"} 0
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="5"} 0
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="10"} 0
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="25"} 0
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="50"} 9
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="75"} 9
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="100"} 9
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="250"} 9
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="500"} 9
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="750"} 9
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="1000"} 9
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="2500"} 9
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="5000"} 9
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="7500"} 9
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="10000"} 9
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/:id",custom="nest",le="+Inf"} 9
demo_http_server_response_size_count{method="GET",status="200",path="/movies/getAll",custom="nest"} 11
demo_http_server_response_size_sum{method="GET",status="200",path="/movies/getAll",custom="nest"} 297
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="0"} 0
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="5"} 0
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="10"} 0
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="25"} 0
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="50"} 11
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="75"} 11
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="100"} 11
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="250"} 11
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="500"} 11
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="750"} 11
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="1000"} 11
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="2500"} 11
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="5000"} 11
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="7500"} 11
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="10000"} 11
demo_http_server_response_size_bucket{method="GET",status="200",path="/movies/getAll",custom="nest",le="+Inf"} 11
demo_http_server_response_size_count{method="GET",status="400",path="/movies/:id",custom="nest"} 3
demo_http_server_response_size_sum{method="GET",status="400",path="/movies/:id",custom="nest"} 222
demo_http_server_response_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="0"} 0
demo_http_server_response_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="5"} 0
demo_http_server_response_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="10"} 0
demo_http_server_response_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="25"} 0
demo_http_server_response_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="50"} 0
demo_http_server_response_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="75"} 3
demo_http_server_response_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="100"} 3
demo_http_server_response_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="250"} 3
demo_http_server_response_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="500"} 3
demo_http_server_response_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="750"} 3
demo_http_server_response_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="1000"} 3
demo_http_server_response_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="2500"} 3
demo_http_server_response_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="5000"} 3
demo_http_server_response_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="7500"} 3
demo_http_server_response_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="10000"} 3
demo_http_server_response_size_bucket{method="GET",status="400",path="/movies/:id",custom="nest",le="+Inf"} 3
# HELP demo_http_server_response_success_count_total Total number of all successful responses
# UNIT demo_http_server_response_success_count_total responses
# TYPE demo_http_server_response_success_count_total counter
demo_http_server_response_success_count_total 20
# HELP demo_http_client_request_error_count_total Total number of client error requests
# TYPE demo_http_client_request_error_count_total counter
demo_http_client_request_error_count_total 3
# HELP nodejs_eventloop_utilization Event loop utilization
# UNIT nodejs_eventloop_utilization 1
# TYPE nodejs_eventloop_utilization gauge
nodejs_eventloop_utilization 0.012761115162208635
# HELP nodejs_eventloop_time_total Cumulative duration of time the event loop has been in each state.
# UNIT nodejs_eventloop_time_total s
# TYPE nodejs_eventloop_time_total counter
nodejs_eventloop_time_total{nodejs_eventloop_state="active"} 0.2942312840045852
nodejs_eventloop_time_total{nodejs_eventloop_state="idle"} 22.750708133
# HELP nodejs_eventloop_delay_min Event loop minimum delay.
# UNIT nodejs_eventloop_delay_min s
# TYPE nodejs_eventloop_delay_min gauge
nodejs_eventloop_delay_min 0.009003008
# HELP nodejs_eventloop_delay_max Event loop maximum delay.
# UNIT nodejs_eventloop_delay_max s
# TYPE nodejs_eventloop_delay_max gauge
nodejs_eventloop_delay_max 0.024035327
# HELP nodejs_eventloop_delay_mean Event loop mean delay.
# UNIT nodejs_eventloop_delay_mean s
# TYPE nodejs_eventloop_delay_mean gauge
nodejs_eventloop_delay_mean 0.010920838672985782
# HELP nodejs_eventloop_delay_stddev Event loop standard deviation delay.
# UNIT nodejs_eventloop_delay_stddev s
# TYPE nodejs_eventloop_delay_stddev gauge
nodejs_eventloop_delay_stddev 0.0005820337545800044
# HELP nodejs_eventloop_delay_p50 Event loop 50 percentile delay.
# UNIT nodejs_eventloop_delay_p50 s
# TYPE nodejs_eventloop_delay_p50 gauge
nodejs_eventloop_delay_p50 0.011042815
# HELP nodejs_eventloop_delay_p90 Event loop 90 percentile delay.
# UNIT nodejs_eventloop_delay_p90 s
# TYPE nodejs_eventloop_delay_p90 gauge
nodejs_eventloop_delay_p90 0.011067391
# HELP nodejs_eventloop_delay_p99 Event loop 99 percentile delay.
# UNIT nodejs_eventloop_delay_p99 s
# TYPE nodejs_eventloop_delay_p99 gauge
nodejs_eventloop_delay_p99 0.011706367
# HELP v8js_gc_duration Garbage collection duration by kind, one of major, minor, incremental or weakcb.
# UNIT v8js_gc_duration s
# TYPE v8js_gc_duration histogram
v8js_gc_duration_count{v8js_gc_type="minor"} 4
v8js_gc_duration_sum{v8js_gc_type="minor"} 0.0028133340030908585
v8js_gc_duration_bucket{v8js_gc_type="minor",le="0.01"} 4
v8js_gc_duration_bucket{v8js_gc_type="minor",le="0.1"} 4
v8js_gc_duration_bucket{v8js_gc_type="minor",le="1"} 4
v8js_gc_duration_bucket{v8js_gc_type="minor",le="10"} 4
v8js_gc_duration_bucket{v8js_gc_type="minor",le="+Inf"} 4
v8js_gc_duration_count{v8js_gc_type="incremental"} 2
v8js_gc_duration_sum{v8js_gc_type="incremental"} 0.0017372509986162184
v8js_gc_duration_bucket{v8js_gc_type="incremental",le="0.01"} 2
v8js_gc_duration_bucket{v8js_gc_type="incremental",le="0.1"} 2
v8js_gc_duration_bucket{v8js_gc_type="incremental",le="1"} 2
v8js_gc_duration_bucket{v8js_gc_type="incremental",le="10"} 2
v8js_gc_duration_bucket{v8js_gc_type="incremental",le="+Inf"} 2
v8js_gc_duration_count{v8js_gc_type="major"} 2
v8js_gc_duration_sum{v8js_gc_type="major"} 0.01185029198229313
v8js_gc_duration_bucket{v8js_gc_type="major",le="0.01"} 2
v8js_gc_duration_bucket{v8js_gc_type="major",le="0.1"} 2
v8js_gc_duration_bucket{v8js_gc_type="major",le="1"} 2
v8js_gc_duration_bucket{v8js_gc_type="major",le="10"} 2
v8js_gc_duration_bucket{v8js_gc_type="major",le="+Inf"} 2
# HELP v8js_memory_heap_limit Total heap memory size pre-allocated.
# UNIT v8js_memory_heap_limit By
# TYPE v8js_memory_heap_limit gauge
v8js_memory_heap_limit{v8js_heap_space_name="read_only_space"} 0
v8js_memory_heap_limit{v8js_heap_space_name="new_space"} 1048576
v8js_memory_heap_limit{v8js_heap_space_name="old_space"} 29081600
v8js_memory_heap_limit{v8js_heap_space_name="code_space"} 1835008
v8js_memory_heap_limit{v8js_heap_space_name="shared_space"} 0
v8js_memory_heap_limit{v8js_heap_space_name="trusted_space"} 3227648
v8js_memory_heap_limit{v8js_heap_space_name="new_large_object_space"} 0
v8js_memory_heap_limit{v8js_heap_space_name="large_object_space"} 2686976
v8js_memory_heap_limit{v8js_heap_space_name="code_large_object_space"} 212992
v8js_memory_heap_limit{v8js_heap_space_name="shared_large_object_space"} 0
v8js_memory_heap_limit{v8js_heap_space_name="trusted_large_object_space"} 0
# HELP v8js_memory_heap_used Heap Memory size allocated.
# UNIT v8js_memory_heap_used By
# TYPE v8js_memory_heap_used gauge
v8js_memory_heap_used{v8js_heap_space_name="read_only_space"} 0
v8js_memory_heap_used{v8js_heap_space_name="new_space"} 663128
v8js_memory_heap_used{v8js_heap_space_name="old_space"} 27431888
v8js_memory_heap_used{v8js_heap_space_name="code_space"} 1446528
v8js_memory_heap_used{v8js_heap_space_name="shared_space"} 0
v8js_memory_heap_used{v8js_heap_space_name="trusted_space"} 2730928
v8js_memory_heap_used{v8js_heap_space_name="new_large_object_space"} 0
v8js_memory_heap_used{v8js_heap_space_name="large_object_space"} 2610688
v8js_memory_heap_used{v8js_heap_space_name="code_large_object_space"} 155328
v8js_memory_heap_used{v8js_heap_space_name="shared_large_object_space"} 0
v8js_memory_heap_used{v8js_heap_space_name="trusted_large_object_space"} 0
# HELP v8js_memory_heap_space_available_size Heap space available size.
# UNIT v8js_memory_heap_space_available_size By
# TYPE v8js_memory_heap_space_available_size gauge
v8js_memory_heap_space_available_size{v8js_heap_space_name="read_only_space"} 0
v8js_memory_heap_space_available_size{v8js_heap_space_name="new_space"} 367784
v8js_memory_heap_space_available_size{v8js_heap_space_name="old_space"} 1106168
v8js_memory_heap_space_available_size{v8js_heap_space_name="code_space"} 44416
v8js_memory_heap_space_available_size{v8js_heap_space_name="shared_space"} 0
v8js_memory_heap_space_available_size{v8js_heap_space_name="trusted_space"} 439064
v8js_memory_heap_space_available_size{v8js_heap_space_name="new_large_object_space"} 1048576
v8js_memory_heap_space_available_size{v8js_heap_space_name="large_object_space"} 0
v8js_memory_heap_space_available_size{v8js_heap_space_name="code_large_object_space"} 0
v8js_memory_heap_space_available_size{v8js_heap_space_name="shared_large_object_space"} 0
v8js_memory_heap_space_available_size{v8js_heap_space_name="trusted_large_object_space"} 0
# HELP v8js_memory_heap_space_physical_size Committed size of a heap space.
# UNIT v8js_memory_heap_space_physical_size By
# TYPE v8js_memory_heap_space_physical_size gauge
v8js_memory_heap_space_physical_size{v8js_heap_space_name="read_only_space"} 0
v8js_memory_heap_space_physical_size{v8js_heap_space_name="new_space"} 802816
v8js_memory_heap_space_physical_size{v8js_heap_space_name="old_space"} 29081600
v8js_memory_heap_space_physical_size{v8js_heap_space_name="code_space"} 1605632
v8js_memory_heap_space_physical_size{v8js_heap_space_name="shared_space"} 0
v8js_memory_heap_space_physical_size{v8js_heap_space_name="trusted_space"} 3227648
v8js_memory_heap_space_physical_size{v8js_heap_space_name="new_large_object_space"} 0
v8js_memory_heap_space_physical_size{v8js_heap_space_name="large_object_space"} 2686976
v8js_memory_heap_space_physical_size{v8js_heap_space_name="code_large_object_space"} 212992
v8js_memory_heap_space_physical_size{v8js_heap_space_name="shared_large_object_space"} 0
v8js_memory_heap_space_physical_size{v8js_heap_space_name="trusted_large_object_space"} 0
# HELP system_cpu_time_total Cpu time in seconds
# UNIT system_cpu_time_total s
# TYPE system_cpu_time_total counter
system_cpu_time_total{system_cpu_state="user",system_cpu_logical_number="0"} 8304.47
system_cpu_time_total{system_cpu_state="system",system_cpu_logical_number="0"} 5953.7
system_cpu_time_total{system_cpu_state="idle",system_cpu_logical_number="0"} 47091.47
system_cpu_time_total{system_cpu_state="interrupt",system_cpu_logical_number="0"} 0
system_cpu_time_total{system_cpu_state="nice",system_cpu_logical_number="0"} 0
system_cpu_time_total{system_cpu_state="user",system_cpu_logical_number="1"} 6694.99
system_cpu_time_total{system_cpu_state="system",system_cpu_logical_number="1"} 4436.7
system_cpu_time_total{system_cpu_state="idle",system_cpu_logical_number="1"} 50318.14
system_cpu_time_total{system_cpu_state="interrupt",system_cpu_logical_number="1"} 0
system_cpu_time_total{system_cpu_state="nice",system_cpu_logical_number="1"} 0
system_cpu_time_total{system_cpu_state="user",system_cpu_logical_number="2"} 4715.21
system_cpu_time_total{system_cpu_state="system",system_cpu_logical_number="2"} 2813.62
system_cpu_time_total{system_cpu_state="idle",system_cpu_logical_number="2"} 54077.04
system_cpu_time_total{system_cpu_state="interrupt",system_cpu_logical_number="2"} 0
system_cpu_time_total{system_cpu_state="nice",system_cpu_logical_number="2"} 0
system_cpu_time_total{system_cpu_state="user",system_cpu_logical_number="3"} 2901.91
system_cpu_time_total{system_cpu_state="system",system_cpu_logical_number="3"} 1513.65
system_cpu_time_total{system_cpu_state="idle",system_cpu_logical_number="3"} 57307.5
system_cpu_time_total{system_cpu_state="interrupt",system_cpu_logical_number="3"} 0
system_cpu_time_total{system_cpu_state="nice",system_cpu_logical_number="3"} 0
system_cpu_time_total{system_cpu_state="user",system_cpu_logical_number="4"} 1937.8
system_cpu_time_total{system_cpu_state="system",system_cpu_logical_number="4"} 912.04
system_cpu_time_total{system_cpu_state="idle",system_cpu_logical_number="4"} 58943.26
system_cpu_time_total{system_cpu_state="interrupt",system_cpu_logical_number="4"} 0
system_cpu_time_total{system_cpu_state="nice",system_cpu_logical_number="4"} 0
system_cpu_time_total{system_cpu_state="user",system_cpu_logical_number="5"} 1355.56
system_cpu_time_total{system_cpu_state="system",system_cpu_logical_number="5"} 605.4
system_cpu_time_total{system_cpu_state="idle",system_cpu_logical_number="5"} 59871.37
system_cpu_time_total{system_cpu_state="interrupt",system_cpu_logical_number="5"} 0
system_cpu_time_total{system_cpu_state="nice",system_cpu_logical_number="5"} 0
system_cpu_time_total{system_cpu_state="user",system_cpu_logical_number="6"} 2166.03
system_cpu_time_total{system_cpu_state="system",system_cpu_logical_number="6"} 519.32
system_cpu_time_total{system_cpu_state="idle",system_cpu_logical_number="6"} 59122.01
system_cpu_time_total{system_cpu_state="interrupt",system_cpu_logical_number="6"} 0
system_cpu_time_total{system_cpu_state="nice",system_cpu_logical_number="6"} 0
system_cpu_time_total{system_cpu_state="user",system_cpu_logical_number="7"} 2158.78
system_cpu_time_total{system_cpu_state="system",system_cpu_logical_number="7"} 493.44
system_cpu_time_total{system_cpu_state="idle",system_cpu_logical_number="7"} 59159.3
system_cpu_time_total{system_cpu_state="interrupt",system_cpu_logical_number="7"} 0
system_cpu_time_total{system_cpu_state="nice",system_cpu_logical_number="7"} 0
system_cpu_time_total{system_cpu_state="user",system_cpu_logical_number="8"} 2152.88
system_cpu_time_total{system_cpu_state="system",system_cpu_logical_number="8"} 481.35
system_cpu_time_total{system_cpu_state="idle",system_cpu_logical_number="8"} 59179.33
system_cpu_time_total{system_cpu_state="interrupt",system_cpu_logical_number="8"} 0
system_cpu_time_total{system_cpu_state="nice",system_cpu_logical_number="8"} 0
system_cpu_time_total{system_cpu_state="user",system_cpu_logical_number="9"} 2117.84
system_cpu_time_total{system_cpu_state="system",system_cpu_logical_number="9"} 470.1
system_cpu_time_total{system_cpu_state="idle",system_cpu_logical_number="9"} 59226.62
system_cpu_time_total{system_cpu_state="interrupt",system_cpu_logical_number="9"} 0
system_cpu_time_total{system_cpu_state="nice",system_cpu_logical_number="9"} 0
# HELP system_cpu_utilization Cpu usage time 0-1
# TYPE system_cpu_utilization gauge
system_cpu_utilization{system_cpu_state="user",system_cpu_logical_number="0"} 0.2519429498676232
system_cpu_utilization{system_cpu_state="system",system_cpu_logical_number="0"} 0.15458194551199933
system_cpu_utilization{system_cpu_state="idle",system_cpu_logical_number="0"} 0.5803228285933897
system_cpu_utilization{system_cpu_state="interrupt",system_cpu_logical_number="0"} 0
system_cpu_utilization{system_cpu_state="nice",system_cpu_logical_number="0"} 0
system_cpu_utilization{system_cpu_state="user",system_cpu_logical_number="1"} 0.19728414040481682
system_cpu_utilization{system_cpu_state="system",system_cpu_logical_number="1"} 0.13152276026987786
system_cpu_utilization{system_cpu_state="idle",system_cpu_logical_number="1"} 0.6597489110940302
system_cpu_utilization{system_cpu_state="interrupt",system_cpu_logical_number="1"} 0
system_cpu_utilization{system_cpu_state="nice",system_cpu_logical_number="1"} 0
system_cpu_utilization{system_cpu_state="user",system_cpu_logical_number="2"} 0.15159279186950209
system_cpu_utilization{system_cpu_state="system",system_cpu_logical_number="2"} 0.09992313604919292
system_cpu_utilization{system_cpu_state="idle",system_cpu_logical_number="2"} 0.7404560594414553
system_cpu_utilization{system_cpu_state="interrupt",system_cpu_logical_number="2"} 0
system_cpu_utilization{system_cpu_state="nice",system_cpu_logical_number="2"} 0
system_cpu_utilization{system_cpu_state="user",system_cpu_logical_number="3"} 0.11102570672132547
system_cpu_utilization{system_cpu_state="system",system_cpu_logical_number="3"} 0.06789648987957982
system_cpu_utilization{system_cpu_state="idle",system_cpu_logical_number="3"} 0.8156119224528141
system_cpu_utilization{system_cpu_state="interrupt",system_cpu_logical_number="3"} 0
system_cpu_utilization{system_cpu_state="nice",system_cpu_logical_number="3"} 0
system_cpu_utilization{system_cpu_state="user",system_cpu_logical_number="4"} 0.07985310444956871
system_cpu_utilization{system_cpu_state="system",system_cpu_logical_number="4"} 0.04697241438209924
system_cpu_utilization{system_cpu_state="idle",system_cpu_logical_number="4"} 0.868989666068836
system_cpu_utilization{system_cpu_state="interrupt",system_cpu_logical_number="4"} 0
system_cpu_utilization{system_cpu_state="nice",system_cpu_logical_number="4"} 0
system_cpu_utilization{system_cpu_state="user",system_cpu_logical_number="5"} 0.06063711674780084
system_cpu_utilization{system_cpu_state="system",system_cpu_logical_number="5"} 0.03629686565889487
system_cpu_utilization{system_cpu_state="idle",system_cpu_logical_number="5"} 0.9005892902895208
system_cpu_utilization{system_cpu_state="interrupt",system_cpu_logical_number="5"} 0
system_cpu_utilization{system_cpu_state="nice",system_cpu_logical_number="5"} 0
system_cpu_utilization{system_cpu_state="user",system_cpu_logical_number="6"} 0.04526432658638654
system_cpu_utilization{system_cpu_state="system",system_cpu_logical_number="6"} 0.018361943803911523
system_cpu_utilization{system_cpu_state="idle",system_cpu_logical_number="6"} 0.9347510462037749
system_cpu_utilization{system_cpu_state="interrupt",system_cpu_logical_number="6"} 0
system_cpu_utilization{system_cpu_state="nice",system_cpu_logical_number="6"} 0
system_cpu_utilization{system_cpu_state="user",system_cpu_logical_number="7"} 0.044410282688530194
system_cpu_utilization{system_cpu_state="system",system_cpu_logical_number="7"} 0.017507899906055172
system_cpu_utilization{system_cpu_state="idle",system_cpu_logical_number="7"} 0.9368861559484157
system_cpu_utilization{system_cpu_state="interrupt",system_cpu_logical_number="7"} 0
system_cpu_utilization{system_cpu_state="nice",system_cpu_logical_number="7"} 0
system_cpu_utilization{system_cpu_state="user",system_cpu_logical_number="8"} 0.05166965582030916
system_cpu_utilization{system_cpu_state="system",system_cpu_logical_number="8"} 0.020497053548552396
system_cpu_utilization{system_cpu_state="idle",system_cpu_logical_number="8"} 0.925356563327355
system_cpu_utilization{system_cpu_state="interrupt",system_cpu_logical_number="8"} 0
system_cpu_utilization{system_cpu_state="nice",system_cpu_logical_number="8"} 0
system_cpu_utilization{system_cpu_state="user",system_cpu_logical_number="9"} 0.04996156802459646
system_cpu_utilization{system_cpu_state="system",system_cpu_logical_number="9"} 0.023059185242121444
system_cpu_utilization{system_cpu_state="idle",system_cpu_logical_number="9"} 0.9249295413784269
system_cpu_utilization{system_cpu_state="interrupt",system_cpu_logical_number="9"} 0
system_cpu_utilization{system_cpu_state="nice",system_cpu_logical_number="9"} 0
# HELP system_memory_usage Memory usage in bytes
# TYPE system_memory_usage gauge
system_memory_usage{system_memory_state="used"} 17091756032
system_memory_usage{system_memory_state="free"} 88113152
# HELP system_memory_utilization Memory usage 0-1
# TYPE system_memory_utilization gauge
system_memory_utilization{system_memory_state="used"} 0.9948711395263672
system_memory_utilization{system_memory_state="free"} 0.0051288604736328125
# HELP system_network_dropped_total Network dropped packets
# TYPE system_network_dropped_total counter
system_network_dropped_total{system_device="en0",network_io_direction="receive"} 4447
system_network_dropped_total{system_device="en0",network_io_direction="transmit"} 4447
# HELP system_network_errors_total Network errors counter
# TYPE system_network_errors_total counter
system_network_errors_total{system_device="en0",network_io_direction="receive"} 0
system_network_errors_total{system_device="en0",network_io_direction="transmit"} 0
# HELP system_network_io_total Network transmit and received bytes
# TYPE system_network_io_total counter
system_network_io_total{system_device="en0",network_io_direction="receive"} 22450567238
system_network_io_total{system_device="en0",network_io_direction="transmit"} 1157012714
# HELP process_cpu_time_total Process Cpu time in seconds
# UNIT process_cpu_time_total s
# TYPE process_cpu_time_total counter
process_cpu_time_total{process_cpu_state="user"} 0.5931569999999999
process_cpu_time_total{process_cpu_state="system"} 0.14693
# HELP process_cpu_utilization Process Cpu usage time 0-1
# TYPE process_cpu_utilization gauge
process_cpu_utilization{process_cpu_state="user"} 0.0021388445279473933
process_cpu_utilization{process_cpu_state="system"} 0.0004782954011699902
# HELP process_memory_usage Process Memory usage in bytes
# TYPE process_memory_usage gauge
process_memory_usage 89014272
```
