import * as xlsx from "xlsx";
import bcrypt from "bcrypt";
interface AccountData {
    fullname: string,
    phone: string,
    gender: "Male" | "Female",
    birthDate: Date,
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
        item.password = await bcrypt.hash(item.password, 10);
        if(item.role === "Admin") {
            await prisma.account.create({
                data: {
                    email: item.email,
                    password: item.password,
                    role: item.role,
                    isVerified: item.isVerified,
                    Admin: {
                        create: {
                            fullname: item.fullname,
                            gender: item.gender,
                            phone: item.phone,
                            birthDate: new Date(item.birthDate),
                        }
                    },
                },
            });
        } else {
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
                            birthDate: new Date(item.birthDate),
                            city: item.city,
                        }
                    },
                },
            });
        }
        console.log(`✅ Data ${item.fullname} berhasil ditambahkan.`);
    } catch (error) {
        console.error(`❌ Gagal menambahkan ${item.fullname}: ${(error as Error).message}`);
    }
}