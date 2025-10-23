import * as Sentry from "@sentry/node"


Sentry.init({
  dsn: "https://6b4fcbbe40b2accbf4e342fed6132f60@o4510239331516416.ingest.us.sentry.io/4510239338266624",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [Sentry.mongoIntegration()],
  
});

