import { PrismaClient } from "@prisma/client";
import account from "./account";
import content from "./content";

const prisma = new PrismaClient();

async function main(): Promise<void> {
    try {
        await account(prisma);
        await content(prisma);

        console.log("🎉 Semua seeder berhasil dijalankan!");
    } catch (error) {
        console.error("❌ Terjadi kesalahan saat menjalankan seeder:", (error as Error).message);
    }
}

// Jalankan seeder
main()
    .catch((err) => {
        console.error("❌ Kesalahan tidak terduga:", err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
