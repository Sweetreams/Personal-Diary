import React, { useEffect, useState } from 'react'
import { Button, Checkbox, ConfigProvider, Form, Input, Modal, notification, Spin, Typography } from 'antd'
import ImageContainer from '../../components/imageContainer/ImageContainer'
import "../../globalStyles/colorStyle.css"
import "./passwordRecoveryPage.css"
import userService from '../../api/service/userService'
import { mailService } from '../../api/service/mailService'

const PasswordRecoveryPage = () => {
    const [loading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const [isModalCodeOpen, setIsModalCodeOpen] = useState(false)
    const [dataFieldCode, setDataFieldCode] = useState("")
    const [dataFromRequest, setDataFromRequest] = useState([])

    useEffect(() => {
        document.title = "Восстановление доступа"
    }, [])

    const onFinish = async (values) => {
        setLoading(true)
        if (values.email == undefined || values.password.length < 8 || values.password.length > 16 || values.login == undefined) {
            api.error({
                message: "Ошибка!",
                description: "Заполните поля",
                showProgress: true,
            });
            return;
        }

        const resultMailUserCheck = await userService.mailUserCheckRequest({ mail: values.email })

        if (resultMailUserCheck.httpState == "success") {
            api.error({
                message: "Ошибка!",
                description: "Почта нигде не используется",
                showProgress: true,
            });
            return;
        }

        const resultSendMail = await mailService.sendMail({ mail: values.email })

        if (resultSendMail.httpState === "success") {
            setDataFromRequest({ mail: values.email, password: values.password, login: values.login })
        } else {
            api.error({
                message: "Ошибка!",
                description: resultSendMail.apiMessage,
                showProgress: true,
            });
            return;
        }
        setIsModalCodeOpen(true)

    }

    const handleCancel = () => {
        setIsModalCodeOpen(false)
    }

    const handleOk = async () => {
        const resultCheckMail = await mailService.checkMail({ mail: dataFromRequest.mail, token: dataFieldCode })

        if (resultCheckMail.httpState === "success") {
            const resultRequest = await userService.passwordRecoveryRequest({ login: dataFromRequest.login, password: dataFromRequest.password, email: dataFromRequest.mail })
            if (resultRequest.httpState == "success") {
                setLoading(false)
                api.success({
                    message: "Успешно!",
                    description: resultRequest.apiMessage,
                    showProgress: true,
                })
                setIsModalCodeOpen(false)
            } else {
                setLoading(false)
                api.error({
                    message: "Ошибка!",
                    description: resultRequest.apiMessage,
                    showProgress: true,
                });
                setIsModalCodeOpen(false)
            }

        } else {
            setLoading(false)
            api.error({
                message: "Ошибка!",
                description: resultCheckMail.apiMessage,
                showProgress: true,
            });
            setIsModalCodeOpen(false)
            return;
        }
    }


    return (
        <>
            {contextHolder}
            <Modal
                title="Подтверждение E-mail"
                open={isModalCodeOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Отправить"
                cancelText="Отмена"

            >
                <Form
                    onChange={(a) => {
                        setDataFieldCode(a.target.value)
                    }}>
                    <Form.Item
                        name="token"
                        label="Код"
                        layout="vertical"
                        className="modalFieldCode"
                        rules={[
                            { required: true, message: "Поле обязательно для заполения!" },
                            { type: "string", message: "Поле должно быть текстовым" },]}
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
            <ConfigProvider
                theme={{
                    token: {
                        fontFamily: "TT Commons",
                        fontSize: "16px",
                        colorText: "rgb(51,51,51)"
                    },
                    components: {
                        Checkbox: {
                            colorPrimary: "var(--color-fbee)",
                            colorPrimaryHover: "var(--color-eaee)",
                        },
                        Button: {
                            colorText: "var(--color-3333)",
                            colorPrimaryHover: "var(--color-3333)",
                            colorBorder: "var(--color-f8f8)",
                            defaultHoverBorderColor: "var(--color-c7c7)",
                            controlHeight: "36px"
                        },
                        Input: {
                            paddingBlock: "8px",
                            colorBorder: "var(--color-f8f8)",
                            hoverBorderColor: "var(--color-f8f8)",
                            activeBorderColor: "var(--color-f8f8)"
                        },
                    },
                }}
            >
                <div className="containerLeftRight">
                    <ImageContainer />
                    <div className="containerRight">
                        <div className="secondContainerRight">
                            <div className="formContainer" >
                                <Typography.Title className='titleSecondContainer' >Восстановление доступа</Typography.Title>
                                <Spin spinning={loading}>
                                    <Form
                                        variant='filled'
                                        layout="vertical"
                                        className="formAuth"
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name="email"
                                            label="Mail"
                                            className="emailField"
                                            validateFirst
                                            rules={
                                                [
                                                    { required: true, message: "Поле обязательно для заполения!" },
                                                    { type: "email", message: "Введите валидный E-mail" }
                                                ]
                                            }
                                        >
                                            <Input placeholder="Майл..." />
                                        </Form.Item>

                                        <Form.Item
                                            name="login"
                                            label="Логин"
                                            className="loginField"
                                            validateFirst
                                            rules={
                                                [
                                                    { required: true, message: "Поле обязательно для заполения!" },
                                                    { type: "string", message: "Поле должно быть текстовым" }
                                                ]
                                            }
                                        >
                                            <Input placeholder="Логин..." />
                                        </Form.Item>

                                        <Form.Item
                                            name="password"
                                            label="Новый пароль"
                                            className="passwordField"
                                            validateFirst
                                            rules={
                                                [
                                                    { required: true, message: "Поле обязательно для заполения!" },
                                                    { type: "string", message: "Поле должно быть текстовым" },
                                                    { min: 8, message: "Пароль слишком короткий" },
                                                    { max: 16, message: "Пароль слишком длинный" }
                                                ]
                                            }
                                        >
                                            <Input.Password placeholder="Пароль..." />
                                        </Form.Item>

                                        <p className="descAcc">У меня есть аккаунт, <a className="link_typeClass" href="/login">войти?</a></p>
                                        <Form.Item
                                            name="button"
                                            className="buttonField"
                                        >
                                            <Button className="buttonSend" htmlType="submit">Восстановить</Button>
                                        </Form.Item>
                                    </Form>
                                </Spin>
                            </div>
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        </>
    )
}

export default PasswordRecoveryPage