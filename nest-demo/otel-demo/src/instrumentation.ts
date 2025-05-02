import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
} from '@opentelemetry/sdk-trace-base';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import * as process from 'process';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import {
  CompositePropagator,
  W3CTraceContextPropagator,
  W3CBaggagePropagator,
} from '@opentelemetry/core';
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { TraceIdRatioBasedSampler } from '@opentelemetry/sdk-trace-node';
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from '@opentelemetry/sdk-metrics';

// 디버깅 목적이 아니면 주석 처리 하세요.
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const otlpTraceEndpoint = process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT;
const otlpMeticEndpoint = process.env.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT;

const metricsExporter = () => {
  // Prometheus
  if (process.env.OTEL_METRICS_EXPORTER == 'prometheus') {
    return new PrometheusExporter({ port: 3002 });
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
      process.env.OTEL_METRIC_EXPORT_TIMEOUT || '5000',
      10,
    ),
    exportIntervalMillis: parseInt(
      process.env.OTEL_METRIC_EXPORT_INTERVAL || '5000',
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
const samplingRatio = process.env.OTEL_SAMPLING_RATIO
  ? parseFloat(process.env.OTEL_SAMPLING_RATIO)
  : 1.0;

const otelSDK = new NodeSDK({
  metricReader: metricsExporter(),
  spanProcessors: spanProcessors(),
  contextManager: new AsyncLocalStorageContextManager(),
  resource: mergedResource,
  sampler: new TraceIdRatioBasedSampler(samplingRatio),
  instrumentations: [getNodeAutoInstrumentations(), new NestInstrumentation()],
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
