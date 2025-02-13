import * as bcrypt from "bcrypt";
import * as Account from "../../../../repositories/account";
import { RegisterData } from "./auth.interface";
import { hashid } from "../../../../utils/hashid";
import sendMail from "../../../../utils/sendMail";

export const register = async (data: RegisterData) => {
    const account = await Account.getAccountByEmail(data.email);

    if (account) throw new Error("Email already exists");

    data.password = await bcrypt.hash(data.password, 10);

    // const newAccount = await Account.createAccount(data);
    const newAccount = {
        id: 1
    };

    const hashId = hashid(newAccount.id);
    const url = process.env.BASE_URL + "/api/v1/auth/verify/" + hashId;
    const mailData = {
        fullname: data.fullname,
        url
    };

    await sendMail(data.email, "Verifikasi Pendaftaran", "success-register", mailData);
    
};