import { FastifyReply, FastifyRequest } from "fastify";
import * as AuthService from "./auth.service";
import { ForgotPasswordData, LoginData, ParamsIdRequest, RegisterData, ResetPasswordData } from "./auth.interface";
import response from "../../../../utils/response";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  await AuthService.register(request.body as RegisterData);
  return response(reply, 201, "User registered successfully");
};

export const verify = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> => {
  await AuthService.verify(request.params.id);
  return response(reply, 200, "User verified successfully");
};

export const login = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const data = await AuthService.login(request.body as LoginData, request.server);
  return response(reply, 200, "Login success", data);
};

export const forgotPassword = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  await AuthService.forgotPassword(request.body as ForgotPasswordData);
  return response(reply, 200, "Forgot password success");
};

export const resetPassword = async (
  request: FastifyRequest<ParamsIdRequest>,
  reply: FastifyReply,
): Promise<void> => {
  await AuthService.resetPassword(request.params.id, request.body as ResetPasswordData);
  return response(reply, 200, "Reset password success");
};