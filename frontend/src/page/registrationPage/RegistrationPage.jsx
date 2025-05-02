import React, { useCallback, useState } from 'react'
import { Button, Checkbox, ConfigProvider, Form, Input, Modal, notification, Space, Spin, Typography } from 'antd'
import ImageContainer from '../../components/imageContainer/ImageContainer'
import "../../globalStyles/colorStyle.css"
import "./registrationPage.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const axiosRequest = async(url, data) => {
    return await axios({
        method: "post",
        url: url,
        data: {...data}
    }).then((req) => {
        return req
    }).catch((req) => {
        return req.response
    })
}

// const axiosSendRequestCodeEmail = async (mail) => {
//     return await axios({
//         method: "post",
//         url: "http://localhost:8000/mail/sendMail",
//         data: {
//             mail: mail
//         }
//     }).then((req) => {
//         return req
//     }).catch((req) => {
//         return req.response
//     })
// }

// const axiosCheckRequestCodeEmail = async (mail, token) => {
//     return await axios({
//         method: "post",
//         url: ,
//         data: {
//             mail: mail,
//             token: token
//         }
//     }).then((req) => {
//         return req
//     }).catch((req) => {
//         return req.response
//     })
// }

const RegistrationPage = () => {
    const [loading, setLoading] = useState(false)
    const [isModalCodeOpen, setIsModalCodeOpen] = useState(false)
    const [dataFromRequest, setDataFromRequest] = useState([])
    const [dataFieldCode, setDataFieldCode] = useState("")
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()

    const registrarionRequest = useCallback((req) => {
        setLoading(true)
        axios({
            method: "post",
            url: "http://localhost:8000/user/createUser",
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
                navigate("/main", { replace: true })
            })
            .catch((err) => {
                api.error({
                    message: "Ошибка!",
                    description: err.response.data.message.errorMessage,
                    showProgress: true,
                });
            })
            .finally(() => {
                setLoading(false)
            })
    }, [api])

    const onFinish = async (values) => {
        const reqSendMail = await axiosRequest("http://localhost:8000/mail/sendMail", {mail: values.email})
        if (reqSendMail.status === 200) {
            setDataFromRequest({ mail: values.email, password: values.password, login: values.login })
        } else {
            api.error({
                message: "Ошибка!",
                description: reqSendMail.data.message.errorMessage,
                showProgress: true,
            });
        }
        setIsModalCodeOpen(true)

    }

    const handleCancel = () => {
        setIsModalCodeOpen(false)
    }

    const handleOk = async () => {
        const reqCheckMail = await axiosRequest("http://localhost:8000/mail/checkMail", {mail: dataFromRequest.mail, token: dataFieldCode})
        if (reqCheckMail.status === 200) {
            registrarionRequest(dataFromRequest)
        } else {
            api.error({
                message: "Ошибка!",
                description: reqCheckMail.data.message.errorMessage,
                showProgress: true,
            });
        }
        setIsModalCodeOpen(false)
    }

    return (
        <>
            {contextHolder}
            <Modal
                title="Подтверждение E-mail"
                open={isModalCodeOpen}
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
                                            label="Пароль"
                                            className="passwordField"
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