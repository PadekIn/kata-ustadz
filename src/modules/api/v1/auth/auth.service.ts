import * as bcrypt from "bcrypt";
import * as Account from "../../../../repositories/account";
import { RegisterData } from "./auth.interface";
import { hashid, unhashid } from "../../../../utils/hashid";
import sendMail from "../../../../utils/sendMail";
import customError from "../../../../utils/customError";

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