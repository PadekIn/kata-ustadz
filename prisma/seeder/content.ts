import * as xlsx from "xlsx";

interface ContentData {
    type: "Video" | "Audio"
    ustadzId: number,
    bunnyId: number,
    url: string,
    price: number,
    createBy: number,
    isActive: boolean,
}

export default async function content(prisma: any): Promise<void> {
    const workbook = xlsx.readFile("./prisma/seeder/data.xlsx");
    const sheetName = workbook.SheetNames[3];
    const sheet = workbook.Sheets[sheetName];

    const data: ContentData[] = xlsx.utils.sheet_to_json(sheet);

    for (const item of data) {
        await createContent(prisma, item);
    }

    console.log(`🎉 Seeder untuk ${sheetName} selesai!\n`);
}

async function createContent(prisma: any, item: ContentData): Promise<void> {
    try {
        await prisma.content.create({
            data: {
                type: item.type,
                ustadzId: item.ustadzId,
                bunnyId: item.bunnyId,
                url: item.url,
                price: item.price,
                createBy: item.createBy,
                isActive: item.isActive,
            },
        });
        console.log(`✅ Data content ${item.type} berhasil ditambahkan.`);
    } catch (error) {
        console.error(`❌ Gagal menambahkan content ${item.type}: ${(error as Error).message}`);
    }
}