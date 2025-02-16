import { FastifyRequest, FastifyReply } from "fastify";
import response from "../../../../utils/response";

export const root = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    return response(reply, 200, "API V1 Kata Ustadz Ready To Use 🚀");
};