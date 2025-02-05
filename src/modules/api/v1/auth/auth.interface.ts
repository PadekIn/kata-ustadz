export interface RegisterData {
    fullname: string;
    phone: string;
    gender: "Male" | "Female",
    email: string;
    password: string;
    confirmPassword: string;
};