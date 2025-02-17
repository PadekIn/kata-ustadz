import * as xlsx from "xlsx";

interface UstadzData {
    fullname: string,
    phone: string,
    gender: "Laki-laki" | "Perempuan",
    birthDate: Date,
}

export default async function ustadz(prisma: any): Promise<void> {
    const workbook = xlsx.readFile("./prisma/seeder/data.xlsx");
    const sheetName = workbook.SheetNames[1];
    const sheet = workbook.Sheets[sheetName];

    const data: UstadzData[] = xlsx.utils.sheet_to_json(sheet);

    for (const item of data) {
        await createUstadz(prisma, item);
    }

    console.log(`🎉 Seeder untuk ${sheetName} selesai!\n`);
}

async function createUstadz(prisma: any, item: UstadzData): Promise<void> {
    try {
        await prisma.ustadz.create({
            data: {
                fullname: item.fullname,
                gender: item.gender,
                phone: item.phone,
                birthDate: new Date(item.birthDate),
            },
        });

        console.log(`✅ Data ${item.fullname} berhasil ditambahkan.`);
    } catch (error) {
        console.error(`❌ Gagal menambahkan ${item.fullname}: ${(error as Error).message}`);
    }
}