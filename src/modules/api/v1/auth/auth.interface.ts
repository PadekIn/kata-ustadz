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

export interface LoginData {
  email: string;
  password: string;
};

export interface ForgotPasswordData {
  email: string;
};

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
};

export interface ParamsIdRequest {
  Params: {
    id: string;
  }
}