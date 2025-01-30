import "dotenv/config";
import http from "http";
import { app } from "./configs/app";
import listEndpoints from "express-list-endpoints";

const port = process.env.PORT || 8000;
const host = process.env.HOST || "localhost";
const domain = host === "localhost" ? `${host}:${port}` : host;

const server = http.createServer(app);

try {
    if (process.env.NODE_ENV == "development") {
        console.log("================== API - LIST =======================");
        listEndpoints(app).forEach((route) => {
            route.methods.forEach((method) => {
                console.log(`Route => ${method} ${route.path}`);
            });
        });
        console.log("================== API - LIST =======================\n");
    };

    server.listen(port, () => {
        console.log(`🚀 Server is on ${domain}`);
    });
} catch (error) {
    if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
    } else {
        console.log(`Error: ${error}`);
    }
}