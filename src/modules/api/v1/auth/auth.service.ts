import bcrypt from "bcrypt";
import * as Account from "../../../../repositories/account.repo";
import { LoginData, RegisterData, ResetPasswordData } from "./auth.interface";
import sendMail from "../../../../utils/sendMail";
import { hashid, unhashid } from "../../../../utils/hashid";
import appError from "../../../../utils/appError";
import { FastifyInstance } from "fastify";

export const register = async (data: RegisterData) => {
  const account = await Account.getAccountByEmail(data.email);

  if (account) throw appError(400, "Email already registered");

  data.password = await bcrypt.hash(data.password, 10);

  const newAccount = await Account.createAccount(data);

  const hashId = hashid(newAccount.id);
  const url = process.env.BASE_URL + "/api/v1/auth/verify/" + hashId;
  const mailData = {
    fullname: data.fullname,
    url
  };

  await sendMail(data.email, "Verifikasi Pendaftaran", "success-register", mailData);

};

export const verify = async (hashId: string) => {
  const id = Number(unhashid(hashId)[0]);
  
  if (!id) throw new Error("Invalid hashId");

  const account = await Account.getAccountById(id);

  if (!account) throw appError(404, "Account not found");

  if (account.isVerified) throw appError(400, "Account already verified");

  await Account.verifyAccount(id);

};

export const login = async (data: LoginData, app: FastifyInstance) => {
  const account = await Account.getAccountByEmail(data.email);

  if (!account) throw appError(400, "Invalid email");
  const isPasswordMatch = await bcrypt.compare(data.password, account.password);
  if (!isPasswordMatch) throw appError(400, "Invalid password");

  const payload = {
    id: account.id
  };
  const jwtOptions = {
    expiresIn: Number(3600 * 24), // 1 day 3600s * 24
  };
  const token = app.jwt.sign(payload, jwtOptions);

  const accountData = {
    email: account.email,
    role: account.role,
  };

  return { account: accountData, token };
};

export const forgotPassword = async (data: { email: string }) => {
  const account = await Account.getAccountByEmail(data.email);

  if (!account) throw appError(400, "Invalid email");

  const hashId = hashid(account.id);
  const url = process.env.FE_URL + "/reset-password/" + hashId;
  const mailData = {
      url
  };

  await sendMail(data.email, "Reset Password", "forgot-password", mailData);
};

export const resetPassword = async (hashId: string, data: ResetPasswordData) => {
  const id = Number(unhashid(hashId)[0]);

  if (!id) throw appError(400, "Invalid hashId");

  const account = await Account.getAccountById(id);

  if (!account) throw appError(404, "Account not found");

  data.password = await bcrypt.hash(data.password, 10);

  await Account.updatePassword(id, data.password);
};