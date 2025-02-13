import { Prisma } from "@prisma/client";

export const prismaErrorMap: Record<string, { code: number; message: string }> = {
  P2000: { code: 400, message: "Data terlalu panjang untuk kolom yang ditentukan" },
  P2001: { code: 404, message: "Data yang diminta tidak ditemukan" },
  P2002: { code: 409, message: "Data duplikat, sudah ada di database" },
  P2003: { code: 400, message: "Foreign key constraint failed" },
  P2005: { code: 400, message: "Format data tidak sesuai dengan tipe kolom" },
  P2011: { code: 400, message: "Null constraint failed (data tidak boleh kosong)" },
  P2025: { code: 404, message: "Data tidak ditemukan untuk update atau delete" },
};

export const handlePrismaError = (error: Prisma.PrismaClientKnownRequestError) => {
  const mappedError = prismaErrorMap[error.code] || { code: 500, message: "Kesalahan pada database" };
  return mappedError;
};
