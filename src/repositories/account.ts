import prisma from "../configs/prisma";
import { RegisterData } from "../modules/api/v1/auth/auth.interface";

export type Account = {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

export const getAccountById = async (id: number) => {
    return await prisma.account.findUnique({
        where: {
            id,
        },
    });
};

export const getAccountByEmail = async (email: string) => {
    return await prisma.account.findUnique({
        where: {
            email,
        },
    });
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
                    birthdate: data.birthDate,
                    city: data.city,
                }
            }
        },
    });

    account.password = "*****";

    return account;
};