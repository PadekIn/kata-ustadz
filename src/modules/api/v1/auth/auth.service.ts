import * as bcrypt from "bcrypt";
import * as Account from "../../../../repositories/account";
import { RegisterData } from "./auth.interface";

export const register = async (data: RegisterData) => {
    const account = await Account.getAccountByEmail(data.email);

    if (account) {
        throw new Error("Email already exists");
    }

    data.password = await bcrypt.hash(data.password, 10);

    return await Account.createAccount(data);
};