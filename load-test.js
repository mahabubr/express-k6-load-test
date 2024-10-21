import http from "k6/http";
import { check, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  stages: [
    { duration: "1m", target: 1000 }, // Ramp up to 1000 users
    { duration: "5m", target: 1000 }, // Stay at 1000 users for 5 minutes
    { duration: "30s", target: 0 }, // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
  },
};

export default function () {
  let getRes = http.get("http://localhost:3000/api/greet");
  check(getRes, {
    "GET: status is 200": (r) => r.status === 200,
    "GET: response is hello world": (r) =>
      JSON.parse(r.body).message === "Hello, World!",
  });

  let postRes = http.post(
    "http://localhost:3000/api/greet",
    JSON.stringify({ name: "k6 User" }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  check(postRes, {
    "POST: status is 200": (r) => r.status === 200,
    "POST: response is Hello, k6 User!": (r) =>
      JSON.parse(r.body).message === "Hello, k6 User!",
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
