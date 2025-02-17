import { FastifyReply, FastifyRequest } from "fastify";
import * as AuthService from "./auth.service";
import { ForgotPasswordData, LoginData, ParamsIdRequest, RegisterData, ResetPasswordData } from "./auth.interface";
import response from "../../../../utils/response";

export const register = async (
  request: FastifyRequest<{ Body: RegisterData }>,
  reply: FastifyReply,
): Promise<void> => {
  await AuthService.register(request.body);
  return response(reply, 201, "Registrasi berhasil, silahkan cek email untuk verifikasi");
};

export const verify = async (
  request: FastifyRequest<ParamsIdRequest>,
  reply: FastifyReply,
): Promise<void> => {
  await AuthService.verify(request.params.id);
  return response(reply, 200, "Verifikasi berhasil");
};

export const login = async (
  request: FastifyRequest<{ Body: LoginData }>,
  reply: FastifyReply,
): Promise<void> => {
  const data = await AuthService.login(request.body, request.server);
  return response(reply, 200, "Login berhasil", data);
};

export const forgotPassword = async (
  request: FastifyRequest<{ Body: ForgotPasswordData }>,
  reply: FastifyReply,
): Promise<void> => {
  await AuthService.forgotPassword(request.body);
  return response(reply, 200, "Berhasil mengirim email reset password, silahkan cek email");
};

export const resetPassword = async (
  request: FastifyRequest<ParamsIdRequest>,
  reply: FastifyReply,
): Promise<void> => {
  await AuthService.resetPassword(request.params.id, request.body as ResetPasswordData);
  return response(reply, 200, "Berhasil memperbarui password");
};