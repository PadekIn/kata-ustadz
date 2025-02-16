import { Prisma } from "@prisma/client";

/**
 * Mapping error Prisma berdasarkan kode error.
 */
const prismaErrorMap: Record<
  string,
  { code: number, message: string, errors?: { field?: string; message: string }[] }
> = {
  P2000: { code: 400, message: "Bad Request", errors: [{ message: "Data terlalu panjang untuk kolom yang ditentukan" }] },
  P2001: { code: 404, message: "Not Found", errors: [{ message: "Data tidak ditemukan" }] },
  P2002: { code: 409, message: "Conflict", errors: [{ message: "Data sudah ada" }] }, // ✅ Diperbaiki agar menangkap field
  P2003: { code: 400, message: "Bad Request", errors: [{ message: "Foreign key constraint failed" }] }, // ✅ Diperbaiki agar menangkap field
  P2005: { code: 400, message: "Bad Request", errors: [{ message: "Format data tidak sesuai dengan tipe kolom" }] },
  P2011: { code: 400, message: "Bad Request", errors: [{ message: "Data tidak boleh kosong" }] },
  P2025: { code: 404, message: "Not Found", errors: [{ message: "Data tidak ditemukan" }] },
};

/**
 * Fungsi utama untuk menangani error Prisma.
 */
export const handlePrismaError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handleKnownRequestError(error);
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return handleValidationError(error.message);
  }

  return handleUnknownError();
};

/**
 * Menangani error PrismaClientKnownRequestError.
 */
const handleKnownRequestError = (error: Prisma.PrismaClientKnownRequestError) => {
  const baseError = prismaErrorMap[error.code] || { code: 500, message: "Internal Server Error" };

  let errors: { field?: string; message: string }[] = [];

  switch (error.code) {
    case "P2002": // Unique constraint error
    case "P2003": // Foreign key constraint error
      const field = extractFieldFromMessage(error.message);
      errors.push({
        field,
        message: error.code === "P2002"
          ? `Field "${field}" harus unik. Data sudah ada.`
          : `Field "${field}" memiliki referensi yang tidak valid.`,
      });
      break;
    default:
      errors.push({ message: baseError.message });
  }

  return { code: baseError.code, message: baseError.message, errors };
};

/**
 * Menangani error validasi dari PrismaClientValidationError.
 */
const handleValidationError = (errorMessage: string) => {
  const errors = extractValidationErrors(errorMessage);
  return { code: 400, message: "Validation Error", errors };
};

/**
 * Menangani error tidak dikenal.
 */
const handleUnknownError = () => ({
  code: 500,
  message: "Internal Server Error",
  errors: [{ message: "Terjadi kesalahan pada server." }],
});

/**
 * Ekstrak nama field dari pesan error (P2002 & P2003).
 */
const extractFieldFromMessage = (message: string): string => {
  const match = message.match(/fields: \(`(.+?)`\)/);
  return match ? match[1] : "unknown_field";
};

/**
 * Ekstrak error validasi yang lebih detail.
 */
const extractValidationErrors = (errorMessage: string) => {
  const errors: { field?: string; message: string }[] = [];

  const regexPatterns = [
    {
      regex: /Invalid value for argument `(\w+)`. Expected (\w+)./g,
      formatMessage: (field: string, expected: string) =>
        `Field "${field}" memiliki nilai tidak valid. Harus berupa ${expected}.`,
    },
    {
      regex: /Argument `(\w+)`: (Expected type .*?, found .+?)/g,
      formatMessage: (field: string, detail: string) =>
        `Field "${field}" memiliki tipe data tidak sesuai. ${detail}.`,
    },
    {
      regex: /Argument `(\w+)` is missing./g,
      formatMessage: (field: string) => `Field "${field}" wajib diisi.`,
    },
  ];

  regexPatterns.forEach(({ regex, formatMessage }) => {
    let match;
    while ((match = regex.exec(errorMessage)) !== null) {
      errors.push({
        field: match[1],
        message: formatMessage(match[1], match[2] || ""),
      });
    }
  });

  if (errors.length === 0) {
    errors.push({ message: "Validasi data gagal. Periksa kembali input yang dikirim." });
  }

  return errors;
};
