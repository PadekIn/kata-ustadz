import * as xlsx from "xlsx";

interface CategoryData {
    name: string,
    isActive: boolean,
}

export default async function category(prisma: any): Promise<void> {
    const workbook = xlsx.readFile("./prisma/seeder/data.xlsx");
    const sheetName = workbook.SheetNames[1];
    const sheet = workbook.Sheets[sheetName];

    const data: CategoryData[] = xlsx.utils.sheet_to_json(sheet);

    for (const item of data) {
        await createCategory(prisma, item);
    }

    console.log(`🎉 Seeder untuk ${sheetName} selesai!\n`);
}

async function createCategory(prisma: any, item: CategoryData): Promise<void> {
    try {
        await prisma.category.create({
            data: {
                name: item.name,
                isActive: item.isActive,
            },
        });
        console.log(`✅ Data ${item.name} berhasil ditambahkan.`);
    } catch (error) {
        console.error(`❌ Gagal menambahkan ${item.name}: ${(error as Error).message}`);
    }
}