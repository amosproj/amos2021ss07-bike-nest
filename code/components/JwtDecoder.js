import { Buffer } from "buffer";

export default class JwtDecoder {

    static decode(jwt) {
        const parts = jwt.split('.')
            .map((part) => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());

        const payload = JSON.parse(parts[1]);

        return payload;
    }
}