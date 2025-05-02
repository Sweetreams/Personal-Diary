import { Router } from "express";
import { Mail } from "./mail.service.js";
import nodemailer from "nodemailer";
import { HTTPState } from "../utils/HTTPState.js";

const router = Router();
const mailService = new Mail();

router.post("/sendMail", async (req, res) => {
    try {
        const mail = req.body.mail;
        const tokenForConfirm = Math.trunc(Math.random() * 1000000);

        try {
            const mailIsExists = await mailService.searchMail(mail, tokenForConfirm);
            if (mailIsExists === 1) {
                await mailService.sendMail(mail, tokenForConfirm);
            }

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "pashasurov12345@gmail.com",
                    pass: "ekqo pfex faen xglv"
                }
            });

            const sender = {
                address: "pashasurov12345@gmail.com",
                name: "PublicDiaryApp",
            };
            await new Promise((resolve, reject) => {
                transporter
                    .sendMail({
                        from: sender,
                        to: mail,
                        subject: "Подтверждение Mail",
                        text: "Ваш токен подверждения: " + String(tokenForConfirm),
                        category: "Integration Test",
                        sandbox: true
                    }, (err, info) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(info);
                        }
                    });
            });

            return res.status(200).json({
                httpState: HTTPState.SUCCESS,
                message: "Код отправлен на ваш mail"
            });

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                httpState: HTTPState.ERROR,
                message: {
                    errorName: err.name,
                    errorMessage: "Произошла ошибка при отправки кода",
                }
            });
        }
    } catch (err) {
        return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: err.name,
                errorMessage: "Произошла ошибка!",
            }
        });
    }

});

router.post("/checkMail", async (req, res) => {
    try {
        const mail = req.body.mail;
        const token = req.body.token;
        const result = await mailService.checkMail(mail, token);
        if (result != null) {
            return res.status(200).json({
                httpState: HTTPState.SUCCESS,
                message: "Успешно"
            });
        } else {
            throw new Error("Ошибка получения данных");
            
        }
    } catch (err) {
        return res.status(400).json({
            httpState: HTTPState.ERROR,
            message: {
                errorName: err.name,
                errorMessage: "Произошла ошибка!",
            }
        });
    }
});

export const mailRouter = router;