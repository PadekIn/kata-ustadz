import * as bcrypt from "bcrypt";
import * as Account from "../../../../repositories/account";
import { RegisterData } from "./auth.interface";
import { hashid, unhashid } from "../../../../utils/hashid";
import sendMail from "../../../../utils/sendMail";
import customError from "../../../../utils/customError";
import jwt from "jsonwebtoken";

export const register = async (data: RegisterData) => {
    const account = await Account.getAccountByEmail(data.email);

    if (account) throw new Error("Email already exists");

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

    if (!account) throw customError(404, "Account not found");

    if (account.isVerified) throw customError(400, "Account already verified");

    await Account.verifyAccount(id);

};

export const login = async (data: { email: string, password: string }) => {
    const account = await Account.getAccountByEmail(data.email);

    if (!account) throw customError(404, "Account not found");

    const isPasswordMatch = await bcrypt.compare(data.password, account.password);

    if (!isPasswordMatch) throw customError(400, "Invalid password");

    const secret = process.env.JWT_SECRET || "secretkey";
    const payload = {
        id: account.id
    };
    const jwtOptions = {
        expiresIn: 3600 * 24, // 1 day 3600s * 24
    };
    const token = jwt.sign(payload, secret, jwtOptions);

    return { account: account.email, token };
};