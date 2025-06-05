import { useEffect, useState } from 'react'
import { Button, Checkbox, ConfigProvider, Form, Input, Modal, notification, Spin, Typography } from 'antd'
import ImageContainer from '../../components/imageContainer/ImageContainer'
import "../../globalStyles/colorStyle.css"
import "./registrationPage.css"
import { useNavigate } from "react-router-dom"
import userService from '../../api/service/userService'
import { mailService } from '../../api/service/mailService'

const RegistrationPage = () => {
    const [loading, setLoading] = useState(false)
    const [isModalCodeOpen, setIsModalCodeOpen] = useState(false)
    const [dataFromRequest, setDataFromRequest] = useState([])
    const [dataFieldCode, setDataFieldCode] = useState("")
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Регистрация"
    }, [])

    const onFinish = async (values) => {
        setLoading(true)
        const resultMailUserCheck = await userService.mailUserCheckRequest({ mail: values.email })

        if (resultMailUserCheck.httpState == "error") {
            api.error({
                message: "Ошибка!",
                description: resultMailUserCheck.apiMessage,
                showProgress: true,
            });
            return;
        }

        const resultSendMail = await mailService.sendMail({ mail: values.email })
        if (resultSendMail.httpState === "success") {
            setDataFromRequest({ mail: values.email, password: values.password, login: values.login})
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
            const resultRequest = await userService.registrationRequest(dataFromRequest)
            if (resultRequest.httpState == "success") {
                setLoading(false)
                api.success({
                    message: "Успешно!",
                    description: resultRequest.apiMessage,
                    showProgress: true,
                });
                navigate("/main", { replace: true })
                setIsModalCodeOpen(false)
                return;
            } else {
                setLoading(false)
                api.error({
                    message: "Ошибка!",
                    description: resultRequest.apiMessage,
                    showProgress: true,
                });
                return;
            }
        } else {
            setLoading(false)
            api.error({
                message: "Ошибка!",
                description: resultCheckMail.apiMessage,
                showProgress: true,
            });
            return;
        }
    }

    return (
        <>
            {contextHolder}
            <Modal
                title="Подтверждение E-mail"
                open={isModalCodeOpen}
                okText="Отправить"
                cancelText="Отмена"
                onOk={handleOk}
                onCancel={handleCancel}
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
                                <Typography.Title className='titleSecondContainer' >Регистрация</Typography.Title>
                                <Spin spinning={loading}>
                                    <Form
                                        variant='filled'
                                        layout="vertical"
                                        className="formAuth"
                                        onFinish={onFinish}
                                        validateMessages={{
                                            required: "Заполните поле, пожалуйста",
                                            types: {
                                                email: "Пожалуйста, введите ваш E-mail"
                                            }
                                        }}
                                    >
                                        <Form.Item
                                            name="email"
                                            label="Mail"
                                            className="emailField"
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

                                        <p className="descAcc">У меня есть аккаунт, <a className="link_typeClass" href="/login">войти?</a></p>

                                        <a className="link_typeClass" href="/recoveryPassword">Забыл пароль?</a>

                                        <Form.Item
                                            name="button"
                                            className="buttonField"
                                        >
                                            <Button className="buttonSend" htmlType="submit">Зарегистрироваться</Button>
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

export default RegistrationPage