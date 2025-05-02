import { array, number, object, string } from "yup";

//User Validator

export const userCreateSchema = object({
    login: string().required("Поле логина не заполнено"),
    mail: string().required("Поле почты не заполнено").email("mail не действителен"),
    password:
        string().required("Поле пароля не заполнено").min(8, "Минимальная длина пароля 8 символов").max(16, "Максимальная длина пароля 16 символов")
});

export const userLoginSchema = object({
    login: string().required("Поле логина не заполнено"),
    password: string().required("Поле пароля не заполнено").min(8, "Минимальная длина пароля 8 символов").max(16, "Максимальная длина пароля 16 символов")
});

export const changeUserSchema = object({
    login: string(),
    bcryptpassword: string().min(8, "Минимальная длина пароля 8 символов").max(16, "Максимальная длина пароля 16 символов"),
    email: string().email("mail не действителен"),
    name: string()
});

export const changePasswordSchema = object({
    login: string(),
    password: string().min(8, "Минимальная длина пароля 8 символов").max(16, "Максимальная длина пароля 16 символов"),
    email: string().email("mail не действителен")
});

//Post Validator

export const createPostSchema = object({
    title: string().required("Поле названия не заполнено"),
    desc: string().required("Поле описания не заполнено"),
    tags: array(number())
});

export const changePostSchema = object({
    id_post: number().required(),
    title: string(),
    desc: string(),
    tags: array(number())
});

export const deletePostSchema = object({
    id: number().required()
});