import { IncomingMessage } from "node:http";

export function leerBody(req: IncomingMessage): Promise<any> {

    return new Promise((resolve, reject) => {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            try {
                const datos = JSON.parse(body);
                resolve(datos);

            } catch (error) {
                reject(error);
            }

        });

        req.on("error", (error) => {
            reject(error);
        });

    });
}