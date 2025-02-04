import * as xlsx from "xlsx";

interface ContentData {
    type: "Video" | "Audio"
    image: string,
    title: string,
    description: string,
    link: string,
    price: number,
    createBy: number,
    isActive: boolean,
}

export default async function content(prisma: any): Promise<void> {
    const workbook = xlsx.readFile("./prisma/seeder/data.xlsx");
    const sheetName = workbook.SheetNames[2];
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
                image: item.image,
                title: item.title,
                description: item.description,
                link: item.link,
                price: item.price,
                createBy: item.createBy,
                isActive: item.isActive,
            },
        });
        console.log(`✅ Data ${item.title} berhasil ditambahkan.`);
    } catch (error) {
        console.error(`❌ Gagal menambahkan ${item.title}: ${(error as Error).message}`);
    }
}