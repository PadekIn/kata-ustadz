import { FastifyInstance } from "fastify";
import authRoutes from "./auth/auth.route";
import publicRoutes from "./public/public.route";
// import { authenticate } from "../../../utils/authMiddleware";
// import { userRoutes } from './modules/user/user.route';

export default async (app: FastifyInstance): Promise<void> => {
  app.register(publicRoutes, { prefix: "/" });
  app.register(authRoutes, { prefix: "/auth" });
  // server.register(userRoutes, { prefix: '/users', preHandler: [authenticate] });
};