import prisma from "../configs/database";
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
            deletedAt: null,
        }
    });
};

export const getAccountByEmail = async (email: string) => {
    return await prisma.account.findUnique({
        where: {
            email,
            deletedAt: null,
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
                    birthDate: new Date(data.birthDate),
                    city: data.city,
                }
            }
        },
    });

    account.password = "*****";

    return account;
};

export const verifyAccount = async (id: number) => {
    return await prisma.account.update({
        where: {
            id,
            deletedAt: null,
        },
        data: {
            isVerified: true,
        },
    });
};

export const updatePassword = async (id: number, password: string) => {
    return await prisma.account.update({
        where: {
            id,
            deletedAt: null,
        },
        data: {
            password,
        },
    });
};