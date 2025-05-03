import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import * as process from 'process';
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
} from '@opentelemetry/sdk-trace-base';
import {
  CompositePropagator,
  W3CTraceContextPropagator,
  W3CBaggagePropagator,
} from '@opentelemetry/core';
import { NodeSDK, logs } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { TraceIdRatioBasedSampler } from '@opentelemetry/sdk-trace-node';
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from '@opentelemetry/sdk-metrics';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';

// 디버깅 목적이 아니면 주석 처리 하세요.
if (process.env.OTEL_DEBUG_LOGGING === 'true') {
  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);
}

const otlpTraceEndpoint =
  process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ||
  'http://localhost:4318/v1/traces';
const otlpMeticEndpoint =
  process.env.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT || 'http://localhost:4318';
// Validate endpoints
if (!otlpTraceEndpoint || !otlpMeticEndpoint) {
  console.warn(
    'Warning: One or more OTLP endpoints are not configured properly. Using default values.',
  );
}

const metricsExporter = () => {
  // Prometheus
  if (process.env.OTEL_METRICS_EXPORTER == 'prometheus') {
    return new PrometheusExporter({
      port: parseInt(process.env.PROMETHEUS_PORT || '3002', 10),
    });
  }
  // Console
  if (process.env.OTEL_METRICS_EXPORTER == 'console') {
    return new PeriodicExportingMetricReader({
      exporter: new ConsoleMetricExporter(),
      exportTimeoutMillis: parseInt(
        process.env.OTEL_METRIC_EXPORT_TIMEOUT || '30000',
        10,
      ),
      exportIntervalMillis: parseInt(
        process.env.OTEL_METRIC_EXPORT_INTERVAL || '60000',
        10,
      ),
    });
  }
  // OTEL
  return new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({ url: otlpMeticEndpoint }),
    exportTimeoutMillis: parseInt(
      process.env.OTEL_METRIC_EXPORT_TIMEOUT || '15000',
      10,
    ),
    exportIntervalMillis: parseInt(
      process.env.OTEL_METRIC_EXPORT_INTERVAL || '15000',
      10,
    ),
  });
};

const spanProcessors = () => {
  if (process.env.OTEL_TRACE_EXPORTER == 'console') {
    return [new BatchSpanProcessor(new ConsoleSpanExporter())];
  } else {
    return [
      new BatchSpanProcessor(new OTLPTraceExporter({ url: otlpTraceEndpoint })),
    ];
  }
};

const logExporter = new OTLPLogExporter({
  url:
    process.env.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT ||
    'http://localhost:4318/v1/logs',
});
const logRecordProcessor = new logs.BatchLogRecordProcessor(logExporter);

// Configure resource attributes
const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: 'otel-demo-service',
});

const anotherResource = resourceFromAttributes({
  'service.version': '2.0.0',
  'service.group': 'instrumentation-group',
  'service.instance.id': process.env.HOSTNAME || 'localhost',
  'service.environment': process.env.NODE_ENV || 'development',
});
const mergedResource = resource.merge(anotherResource);

// Configure sampling rate
const defaultRatio = process.env.NODE_ENV === 'production' ? 0.1 : 1.0;
const samplingRatio = process.env.OTEL_SAMPLING_RATIO
  ? parseFloat(process.env.OTEL_SAMPLING_RATIO)
  : defaultRatio;

const otelSDK = new NodeSDK({
  logRecordProcessors: [logRecordProcessor],
  metricReader: metricsExporter(),
  spanProcessors: spanProcessors(),
  contextManager: new AsyncLocalStorageContextManager(),
  resource: mergedResource,
  sampler: new TraceIdRatioBasedSampler(samplingRatio),
  instrumentations: [
    getNodeAutoInstrumentations(),
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new NestInstrumentation(),
    new WinstonInstrumentation({
      // 계측 활성화 시 로그 본문에 trace context 자동 주입 가능
      logHook: (span, record) => {
        record['trace_id'] = span.spanContext().traceId;
        record['span_id'] = span.spanContext().spanId;
        record['trace_flags'] = span.spanContext().traceFlags;
      },
    }),
  ],
  textMapPropagator: new CompositePropagator({
    propagators: [
      new W3CTraceContextPropagator(),
      new W3CBaggagePropagator(),
      new B3Propagator(),
      new B3Propagator({
        injectEncoding: B3InjectEncoding.MULTI_HEADER,
      }),
    ],
  }),
});

export default otelSDK;
// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err),
    )
    .finally(() => process.exit(0));
});
