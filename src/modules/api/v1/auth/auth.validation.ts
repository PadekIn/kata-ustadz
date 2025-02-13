import { z } from "zod";

const emailSchema = z.string()
    .email({ message: "Email harus berupa alamat email yang valid." })
    .nonempty({ message: "Email tidak boleh kosong." });

const fullnameSchema = z.string()
    .min(3, { message: "Nama lengkap minimal 3 karakter." })
    .max(30, { message: "Nama lengkap maksimal 30 karakter." })
    .nonempty({ message: "Nama lengkap tidak boleh kosong." });

const genderSchema = z.enum(["Male", "Female"], { message: "Jenis kelamin harus berupa \"Male\" atau \"Female\"." });

const birthDateSchema = z.string()
    .refine(date => {
        const birthDate = new Date(date);
        const sixYearsAgo = new Date();
        sixYearsAgo.setFullYear(sixYearsAgo.getFullYear() - 6);
        return birthDate < sixYearsAgo;
    }, { message: "Tanggal lahir harus kurang dari 6 tahun yang lalu." });

const citySchema = z.string().nonempty({ message: "Kota tidak boleh kosong." });

const phoneSchema = z.string()
    .regex(/^[0-9]{10,15}$/, { message: "Nomor telepon harus berupa angka dengan panjang antara 10 hingga 15 digit." })
    .nonempty({ message: "Nomor telepon tidak boleh kosong." });

const passwordSchema = z.string().min(6, { message: "Password minimal 6 karakter." });

export const register = z.object({
    email: emailSchema,
    fullname: fullnameSchema,
    gender: genderSchema,
    birthDate: birthDateSchema,
    city: citySchema,
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

export const login = z.object({
    email: emailSchema,
    password: passwordSchema
});

export const forgotPassword = z.object({
    email: emailSchema
});

export const resetPassword = z.object({
    password: passwordSchema,
    confirmPassword: passwordSchema
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});