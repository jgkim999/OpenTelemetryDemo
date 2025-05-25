# Spring Boot + OpenTelemetry

This project demonstrates the integration of Spring Boot with OpenTelemetry for observability.

## TODO
- [ ] Trace ratio 동작 확인
- [ ] Http metric 자동 출력
- [ ] Http Get 매개변수가 달라도 같은 metric으로
- [ ] 구조적 로깅 제대로 되는지

## OpenTelemetry Configuration

The application is configured to use OpenTelemetry for tracing, metrics, and logging. The configuration is defined in `application.properties`.

### Trace Sampling Configuration

OpenTelemetry allows you to control how many traces are sampled and exported. This can be useful to reduce the volume of telemetry data in high-traffic applications.

To adjust the trace sampling ratio, modify the following properties in `application.properties`:

```properties
# OpenTelemetry Trace Sampling Configuration
# Possible values:
# - always_on: Samples all traces (1.0 or 100%)
# - always_off: Samples no traces (0.0 or 0%)
# - traceidratio: Samples a configurable percentage of traces
otel.traces.sampler=traceidratio
# Set the sampling ratio (0.0 to 1.0, where 1.0 = 100% of traces)
otel.traces.sampler.arg=0.3
```

The `otel.traces.sampler` property defines the sampling strategy:
- `always_on`: Samples all traces (100%)
- `always_off`: Samples no traces (0%)
- `traceidratio`: Samples a configurable percentage of traces

When using `traceidratio`, the `otel.traces.sampler.arg` property defines the sampling ratio:
- `0.0`: No traces are sampled (0%)
- `0.3`: 30% of traces are sampled
- `0.5`: 50% of traces are sampled
- `1.0`: All traces are sampled (100%)

### Other OpenTelemetry Configuration

```properties
# Exporter configuration
otel.exporter.otlp.endpoint=http://localhost:4318
otel.exporter.otlp.protocol=http/protobuf

# Exporters for different signal types
otel.metrics.exporter=otlp
otel.traces.exporter=otlp
otel.logs.exporter=otlp

# Service name for identification
otel.service.name=movie-service
```
