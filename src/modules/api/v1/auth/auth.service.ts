import bcrypt from "bcrypt";
import * as Account from "../../../../repositories/account.repo";
import { getUserByIdAccount } from "../../../../repositories/user.repo";
import { LoginData, RegisterData, ResetPasswordData, PayloadToken } from "./auth.interface";
import sendMail from "../../../../utils/sendMail";
import { hashid, unhashid } from "../../../../utils/hashid";
import appError from "../../../../utils/appError";
import { FastifyInstance } from "fastify";

export const register = async (data: RegisterData) => {
  const account = await Account.getAccountByEmail(data.email);

  if (account) throw appError(400, "Bad Request", [{ message: "Email sudah terdaftar" }]);

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

  if (!account) throw appError(404, "Not Found", [{ message: "Akun tidak ditemukan" }]);

  if (account.isVerified) throw appError(400, "Bad Request", [{ message: "Akun sudah diverifikasi" }]);

  await Account.verifyAccount(id);

};

export const login = async (data: LoginData, app: FastifyInstance) => {
  const account = await Account.getAccountByEmail(data.email);

  if (!account) throw appError(400, "Bad Request", [{ message: "Email tidak terdaftar" }]);
  if (!account.isVerified) throw appError(400, "Bad Request", [{ message: "Akun belum diverifikasi" }]);

  const isPasswordMatch = await bcrypt.compare(data.password, account.password);
  if (!isPasswordMatch) throw appError(400, "Bad Request", [{ message: "Password salah" }]);

  let payload: PayloadToken;
  let accountData;

  if (account.role === "User") {
    const user = await getUserByIdAccount(account.id);
    if (!user) throw appError(404, "Not Found", [{ message: "Data user tidak ditemukan" }]);
    payload = {
      id: account.id,
      role: account.role,
      subscribeUntil: user.subscriptionUntil,
    };

    accountData = {
      email: account.email,
      role: account.role,
      subscribeUntil: payload.subscribeUntil,
    };
  } else {
    payload = {
      id: account.id,
      role: account.role,
    };

    accountData = {
      email: account.email,
      role: account.role,
    };
  }

  const jwtOptions = {
    expiresIn: Number(3600 * 24), // 1 day (3600s * 24)
  };

  const token = app.jwt.sign(payload, jwtOptions);

  return { account: accountData, token };
};

export const forgotPassword = async (data: { email: string }) => {
  const account = await Account.getAccountByEmail(data.email);

  if (!account) throw appError(400, "Bad Request", [{ message: "Email tidak terdaftar" }]);

  const hashId = hashid(account.id);
  const url = process.env.FE_URL + "/reset-password/" + hashId;
  const mailData = {
    url
  };

  await sendMail(data.email, "Reset Password", "forgot-password", mailData);
};

export const resetPassword = async (hashId: string, data: ResetPasswordData) => {
  const id = Number(unhashid(hashId)[0]);

  if (!id) throw appError(400, "Bad Request", [{ message: "Id Akun Tidak Valid" }]);

  const account = await Account.getAccountById(id);

  if (!account) throw appError(404, "Not Found", [{ message: "Akun tidak ditemukan" }]);
  data.password = await bcrypt.hash(data.password, 10);

  await Account.updatePassword(id, data.password);
};