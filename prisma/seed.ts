import { PrismaClient, Role, Gender, TypeContent} from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password", 10);
  
  await prisma.listContent.deleteMany();
  await prisma.content.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  
  // Seed data Account
  await prisma.account.createMany({
    data: [
      {
        email: "admin@example.com",
        password: password,
        role: Role.Admin,
        otpCode: "123456",
        otpExpiration: new Date(),
        isActive: true,
        isVerified: true,
      },
      {
        email: "user@example.com",
        password: password,
        role: Role.User,
        otpCode: "123456",
        otpExpiration: new Date(),
        isActive: true,
        isVerified: true,
      },
    ]
  });

  const adminAccount = await prisma.account.findUnique({
    where: { email: "admin@example.com" },
  });

  const userAccount = await prisma.account.findUnique({
    where: { email: "user@example.com" },
  });
  
  if(adminAccount) {
    await prisma.user.create({
      data: {
        accountId: adminAccount.id,
        fullName: "admin user",
        phoneNumber: "08123443289",
        gender: Gender.male,
      },
    });
  }

  if(userAccount) {
    await prisma.user.create({
      data: {
        accountId: userAccount.id,
        fullName: "User 1 FullName",
        phoneNumber: "08123456789",
        gender: Gender.female
      },
    });
  }

  // Seed data Category
  await prisma.category.createMany({
    data: [
      {
        name: "Category 1",
        isActive: true,
        isDelete: false,
        deletedAt: null,
      },
      {
        name: "Category 2",
        isActive: true,
        isDelete: false,
        deletedAt: null,
      },
    ]
  });

  const adminDetail = await prisma.account.findUnique({
    where: { email: "admin@example.com" },
    include : {
      user: true,
    }
  });
  
  // Seed data Content
  if (adminDetail) {
    await prisma.content.createMany({
      data: [
        {
          type: TypeContent.Video,
          image: "https://via.placeholder.com/150",
          title: "Content 1",
          description: "Description Content 1",
          link: "https://www.youtube.com/watch?v=123456",
          price: 10000,
          createBy: adminDetail.user ? adminDetail.user.id : 1,
          isActive: true,
          isDelete: false,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: TypeContent.Audio,
          image: "https://via.placeholder.com/150",
          title: "Content 2",
          description: "Description Content 2 PDF",
          link: "https://www.youtube.com/watch?v=123456",
          price: 10000,
          createBy: adminDetail.user ? adminDetail.user.id : 1,
          isActive: true,
          isDelete: false,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    });
  }

  // Seed data ListContent
  if (adminDetail){
    await prisma.listContent.createMany({
      data: [
        {
          contentId: 1,
          categoryId: 1,
          createBy: adminDetail.user ? adminDetail.user.id : 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          contentId: 1,
          categoryId: 2,
          createBy: adminDetail.user ? adminDetail.user.id : 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          contentId: 2,
          categoryId: 1,
          createBy: adminDetail.user ? adminDetail.user.id : 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    });
  }
}

main()
  .then(() => {
    console.log("Seeding complete successfully!");
  })
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });