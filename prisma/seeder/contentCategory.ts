import * as xlsx from "xlsx";

interface ContentCategoryData {
    contentId: number,
    categoryId: number,
    createBy: number,
}

export default async function contentCategory(prisma: any): Promise<void> {
    const workbook = xlsx.readFile("./prisma/seeder/data.xlsx");
    const sheetName = workbook.SheetNames[3];
    const sheet = workbook.Sheets[sheetName];

    const data: ContentCategoryData[] = xlsx.utils.sheet_to_json(sheet);

    for (const item of data) {
        await createContentCategory(prisma, item);
    }

    console.log(`🎉 Seeder untuk ${sheetName} selesai!\n`);
}

async function createContentCategory(prisma: any, item: ContentCategoryData): Promise<void> {
    try {
        await prisma.contentCategory.create({
            data: {
                contentId: item.contentId,
                categoryId: item.categoryId,
                createBy: item.createBy,
            },
        });
        console.log("✅ Data contentcategory berhasil ditambahkan.");
    } catch (error) {
        console.error(`❌ Gagal menambahkan contentcategory: ${(error as Error).message}`);
    }
}