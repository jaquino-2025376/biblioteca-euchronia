import * as http from "http";

export function sendJSON(res: http.ServerResponse, statusCode: number, data: any): void {
    const body = data !== undefined ? JSON.stringify(data, null, 2) : '';
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(body);
}