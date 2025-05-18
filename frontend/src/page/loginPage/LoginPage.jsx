import React, { useCallback, useState } from 'react'
import { Button, Checkbox, ConfigProvider, Form, Input, notification, Spin, Typography } from 'antd'
import ImageContainer from '../../components/imageContainer/ImageContainer'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../../globalStyles/colorStyle.css"
import "./loginStyle.css"

const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()

    const loginRequest = useCallback((req) => {
        setLoading(true)
        axios({
            method: "post",
            url: "https://personal-diary-qd4j.onrender.com/user/loginUser",
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
                    description: err.response.data.message.errorMessage,
                    showProgress: true,
                });
            }).finally(() => {
                setLoading(false)
            })
    }, [api, navigate])

    const onFinish = (values) => {
        loginRequest({ login: values.login, password: values.password })
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
                                <Typography.Title className='titleSecondContainer' >Авторизация</Typography.Title>
                                <Spin spinning={loading}>
                                    <Form
                                        variant='filled'
                                        layout="vertical"
                                        className="formAuth"

                                        onFinish={(values) => onFinish(values)}
                                    >
                                        <Form.Item
                                            name="login"
                                            label="Логин"
                                            className="loginField"
                                        >
                                            <Input placeholder="Логин..." />
                                        </Form.Item>

                                        <Form.Item
                                            name="password"
                                            label="Пароль"
                                            className="passwordField"
                                        >
                                            <Input.Password placeholder="Пароль..." />
                                        </Form.Item>

                                        <Form.Item
                                            valuePropName="checkbox"
                                            className="checkboxField"
                                        >
                                            <Checkbox>Запомнить меня?</Checkbox>
                                        </Form.Item>
                                        <p className="descAcc">У меня нет аккаунта, <a className="link_typeClass" href="/registration">зарегистрироваться?</a></p>

                                        <a className="link_typeClass" href="/recoveryPassword">Забыл пароль?</a>

                                        <Form.Item
                                            name="button"
                                            className="buttonField"
                                        >
                                            <Button className="buttonSend" htmlType="submit">Войти</Button>
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

export default LoginPage