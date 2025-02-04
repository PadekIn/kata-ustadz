import * as xlsx from "xlsx";

interface AccountData {
    fullName: string;
    phoneNumber: string;
    gender: "male" | "female";
    email: string;
    password: string;
    role: "Admin" | "User";
    isActive: boolean;
    isVerified: boolean;
}

export default async function account(prisma: any): Promise<void> {
    const workbook = xlsx.readFile("./prisma/seeder/data.xlsx");
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data: AccountData[] = xlsx.utils.sheet_to_json(sheet);

    for (const item of data) {
        await createAccount(prisma, item);
    }

    console.log(`🎉 Seeder untuk ${sheetName} selesai!\n`);
}

async function createAccount(prisma: any, item: AccountData): Promise<void> {
    try {
        await prisma.account.create({
            data: {
                email: item.email,
                password: item.password,
                role: item.role,
                isActive: item.isActive,
                isVerified: item.isVerified,
                User: {
                    create: {
                        fullName: item.fullName,
                        phoneNumber: item.phoneNumber,
                        gender: item.gender
                    }
                },
            },
        });
        console.log(`✅ Data ${item.fullName} berhasil ditambahkan.`);
    } catch (error) {
        console.error(`❌ Gagal menambahkan ${item.email}: ${(error as Error).message}`);
    }
}