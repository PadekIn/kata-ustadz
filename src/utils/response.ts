import { FastifyReply } from "fastify";

export default (reply: FastifyReply, statusCode: number, message: string, data: unknown | null = null) => {
    reply.status(statusCode).send({
        status: statusCode < 400,
        message,
        data,
    });
};