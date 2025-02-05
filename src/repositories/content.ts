import prisma from "../configs/prisma";

export type Content = {
    id: number;
    type: string;
    ustadzName: string,
    bunnyId: string;
    url: string;
    price: number;
    createBy: number;
    isActive: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
};

export const getAll = async (skip: number, take: number): Promise<Content[]> => {
    return await prisma.content.findMany({
        skip,
        take
    });
};

export const count = async (): Promise<number> => {
    return await prisma.content.count();
};