import React, { useCallback, useState } from 'react'
import { Button, Checkbox, ConfigProvider, Form, Input, notification, Spin, Typography } from 'antd'
import ImageContainer from '../../components/imageContainer/ImageContainer'
import "../../globalStyles/colorStyle.css"
import "./passwordRecoveryPage.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PasswordRecoveryPage = () => {
    const [loading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()

    const passwordRecoveryRequest = useCallback((req) => {
        setLoading(true)
        axios({
            method: "put",
            url: "http://localhost:8000/user/changePasswordUser",
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
            data: req,
        })
            .then((data) => {
                let message = data.data.message
                api.success({
                    message: "Успешно!",
                    description: message,
                    showProgress: true,
                });
                navigate("/main", {replace: true})
            })
            .catch((err) => {
                api.error({
                    message: "Ошибка!",
                    description: err.response?.data?.message?.errorMessage || "Произошла непредвиденная ошибка!",
                    showProgress: true,
                });
            }).finally(() => {
                setLoading(false)
            })
    }, [api])

    const onFinish = (values) => {
        passwordRecoveryRequest({ login: values.login, password: values.password, email: values.email })
    }


    return (
        <>
            {contextHolder}
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
                                        >
                                            <Input placeholder="Майл..." />
                                        </Form.Item>

                                        <Form.Item
                                            name="login"
                                            label="Логин"
                                            className="loginField"
                                        >
                                            <Input placeholder="Логин..." />
                                        </Form.Item>

                                        <Form.Item
                                            name="password"
                                            label="Новый пароль"
                                            className="passwordField"
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