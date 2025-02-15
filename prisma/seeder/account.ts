import * as xlsx from "xlsx";

interface AccountData {
    fullname: string,
    phone: string,
    gender: "Male" | "Female",
    birthdate: Date,
    city: string,
    email: string,
    password: string,
    role: "Admin" | "User",
    isVerified: boolean,
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
                isVerified: item.isVerified,
                User: {
                    create: {
                        fullname: item.fullname,
                        phone: item.phone,
                        gender: item.gender,
                        birthdate: new Date(item.birthdate),
                        city: item.city,
                    }
                },
            },
        });
        console.log(`✅ Data ${item.fullname} berhasil ditambahkan.`);
    } catch (error) {
        console.error(`❌ Gagal menambahkan ${item.fullname}: ${(error as Error).message}`);
    }
}