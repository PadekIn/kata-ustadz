export interface RegisterData {
    fullname: string;
    phone: string;
    gender: "Male" | "Female",
    birthDate: Date;
    city: string;
    email: string;
    password: string;
    confirmPassword: string;
};