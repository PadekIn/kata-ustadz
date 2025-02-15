import env from "./configs/env";
import app from "./configs/app";

// Start Server
const start = async (): Promise<void> => {
  try {
    await app.listen({ port: Number(env.PORT), host: "0.0.0.0" });
    console.log(`🚀 Server running at http://localhost:${env.PORT}`);
    if (env.NODE_ENV === "development") {
      console.log("\n📌 Registered Routes:");
      console.log(app.printRoutes());
    }
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();