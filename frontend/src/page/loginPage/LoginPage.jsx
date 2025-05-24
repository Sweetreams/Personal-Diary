import { useEffect, useState } from 'react'
import { Button, Checkbox, ConfigProvider, Form, Input, notification, Spin, Typography } from 'antd'
import ImageContainer from '../../components/imageContainer/ImageContainer'
import { useNavigate } from "react-router-dom"
import "../../globalStyles/colorStyle.css"
import "./loginStyle.css"
import userService from '../../api/service/userService.js'

const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Авторизация"
    }, [])

    const onFinish = async (values) => {
        setLoading(true)
        const resultRequest = await userService.loginRequest({ login: values.login, password: values.password })
        if (resultRequest.httpState == "success") {
            setLoading(false)
            api.success({
                message: "Успешно!",
                description: resultRequest.apiMessage,
                showProgress: true,
            });
            navigate("/main", { replace: true })
        } else {
            setLoading(false)
            api.error({
                message: "Ошибка!",
                description: resultRequest.apiMessage,
                showProgress: true,
            });
        }
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
                            controlHeight: "36px",
                            colorPrimaryActive: "var(--color-fbee)"
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
                                            rules={[
                                                { required: true, message: "Поле обязательно для заполения!" },
                                                { type: "string", message: "Поле должно быть текстовым" },]}
                                        >
                                            <Input placeholder="Логин..." />
                                        </Form.Item>

                                        <Form.Item
                                            name="password"
                                            label="Пароль"
                                            className="passwordField"
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