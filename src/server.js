import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      console.log(`
==========================================
🚀 Mercury Academy API Started
🌐 Environment : ${env.NODE_ENV}
📦 Port        : ${env.PORT}
==========================================
`);
    });
  } catch (error) {
    console.error("Server failed to start");
    console.error(error);
    process.exit(1);
  }
};

startServer();
