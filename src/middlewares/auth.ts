import { FastifyReply, FastifyRequest } from "fastify";

export const authenticate = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    await request.jwtVerify();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    reply.status(401).send({ message: "Unauthorized" });
  }
};
