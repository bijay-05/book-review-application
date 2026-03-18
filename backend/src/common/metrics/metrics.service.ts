import { Injectable } from "@nestjs/common";
import { Counter, register, Histogram, Gauge } from "prom-client";

@Injectable()
export class MetricsService {
  private totalRequestCounter: Counter<string>; // request after nest routing
  private requestLatencyHist: Histogram; // observe distribution of request latency
  private activeSessions: Gauge; // observe active login sessions at any point of time

  constructor() {
    this.totalRequestCounter = new Counter({
      name: "nestjs_handled_requests_total",
      help: "Total number of requests to the NestJS app",
      labelNames: ["method", "route"],
    });

    this.requestLatencyHist = new Histogram({
      name: "request_latency_histogram",
      help: "Distribution of request latency values",
      labelNames: ["method", "route"],
      buckets: [0.025, 0.05, 0.075, 0.1],
    });

    this.activeSessions = new Gauge({
      name: "logged_in_active_sessions",
      help: "Number of logged in users",
    });

    register.clear();

    register.setDefaultLabels({
      app: "nestjs-prometheus-demo",
    });
    register.registerMetric(this.totalRequestCounter);
    register.registerMetric(this.requestLatencyHist);
    register.registerMetric(this.activeSessions);
  }

  incrementHandledRequestCounter(requestCounterArgs: {
    method: string;
    route: string;
  }): void {
    /**
     * All requests after nest resolved controller and routes
     */
    this.totalRequestCounter
      .labels(requestCounterArgs.method, requestCounterArgs.route)
      .inc(1);
    return;
  }

  addToRequestLatencyHist(requestLatencyArgs: {
    latency: number;
    method: string;
    route: string;
  }): void {
    this.requestLatencyHist
      .labels(requestLatencyArgs.method, requestLatencyArgs.route)
      .observe(requestLatencyArgs.latency);
    return;
  }

  addLoggedInActiveUsers(): void {
    this.activeSessions.inc();
    return;
  }

  removeLoggedInActiveUsers(): void {
    this.activeSessions.dec();
    return;
  }
}
