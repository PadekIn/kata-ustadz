import * as xlsx from "xlsx";

export default async function account(prisma: any): Promise<void> {
    // Membaca data dari file Excel
    const workbook = xlsx.readFile("./prisma/seeder/data.xlsx");
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    type Role = "Admin" | "User";

    // Konversi sheet ke format JSON
    const data: Array<{ email: string, password: string, role: string, isActive: boolean, isVerified: boolean }> = xlsx.utils.sheet_to_json(sheet);

    for (const item of data) {
        try {
            await prisma.account.create({
                data: {
                    email: item.email,
                    password: item.password,
                    role: item.role as Role,
                    isActive: item.isActive,
                    isVerified: item.isVerified

                },
            });
            console.log(`✅ Data ${item.email} berhasil ditambahkan.`);
        } catch (error) {
            console.error(`❌ Gagal menambahkan ${item.email}: ${(error as Error).message}`);
        }
    }

    console.log(`🎉 Seeder untuk ${sheetName} selesai!\n`);
}