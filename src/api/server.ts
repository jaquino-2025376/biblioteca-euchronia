import http from "node:http";
import { router } from "../routers/router.js";

export const server = http.createServer(router);