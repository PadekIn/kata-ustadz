import prisma from "../configs/database";

export const getUserByIdAccount = async (id: number) => {
    return await prisma.user.findUnique({
        where: {
            accountId: id,
        },
    });
};