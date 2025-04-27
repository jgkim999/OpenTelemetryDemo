import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
} from '@opentelemetry/sdk-trace-base';
//import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import * as process from 'process';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
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

const metricReader = new PrometheusExporter({
  port: 3002,
});

// http://otel-collector:4317/v1/traces
const otlpEndpoint =
  process.env.OTLP_ENDPOINT || 'http://localhost:4318/v1/traces';

const traceExporter = new OTLPTraceExporter({
  url: otlpEndpoint,
});

const spanProcessors = [new BatchSpanProcessor(traceExporter)];
//const spanProcessors = [new BatchSpanProcessor(new ConsoleSpanExporter())];

// Configure resource attributes
const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: 'api-service',
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
  metricReader,
  spanProcessors: spanProcessors,
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
