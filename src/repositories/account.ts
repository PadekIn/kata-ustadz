import prisma from "../configs/prisma";
import { RegisterData } from "../modules/api/v1/auth/auth.interface";

export type Account = {
    id: number;
    email: string;
    password: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
};

const excludePassword = (account: Account) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...accountWithoutPassword } = account;
    return accountWithoutPassword;
};

export const getAccountById = async (id: number) => {
    const account = await prisma.account.findUnique({
        where: {
            id,
        }
    });
    return account ? excludePassword(account) : null;
};

export const getAccountByEmail = async (email: string) => {
    const account = await prisma.account.findUnique({
        where: {
            email,
        },
    });
    return account ? excludePassword(account) : null;
};

export const createAccount = async (data: RegisterData) => {
    const account = await prisma.account.create({
        data: {
            email: data.email,
            password: data.password,
            User: {
                create: {
                    fullname: data.fullname,
                    phone: data.phone,
                    gender: data.gender,
                    birthdate: new Date(data.birthDate),
                    city: data.city,
                }
            }
        },
    });

    return excludePassword(account);
};

export const verifyAccount = async (id: number) => {
    const account = await prisma.account.update({
        where: {
            id,
        },
        data: {
            isVerified: true,
        },
    });
    return excludePassword(account);
};