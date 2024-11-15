import app from "./app";

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log("Express server is running on localhost:", PORT)
})

const shutDown = (): void => {
  console.log("Received kill signal--Shutting down gracefully")
  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Could not close connections in time, forcefully shutting down");
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);