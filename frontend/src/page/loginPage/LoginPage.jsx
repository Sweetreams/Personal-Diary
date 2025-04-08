import React from 'react'
import { Button, Checkbox, ConfigProvider, Form, Input, Spin, Typography } from 'antd'
import ImageContainer from '../../components/ImageContainer'
import "../../globalStyles/colorStyle.css"
import "./loginStyle.css"
import FormComponent from '../../components/Form/FormComponent'
const LoginPage = () => {
    return (
        <>
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
                            paddingInline: "8px",
                            paddingBlock: "8px",
                            colorBorder: "var(--color-f8f8)",
                            hoverBorderColor: "var(--color-f8f8)",
                            activeBorderColor: "var(--color-f8f8)"
                        },
                    },
                }}
            >
                <div className="conteinerLeftRight" style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <ImageContainer />
                    <div className="containerRight" style={{ width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className="secondContainerRight" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography.Title className='titleSecondContainer' style={{ fontWeight: 400, fontSize: 38, marginBottom: "20px" }}>Авторизация</Typography.Title>
                            <div className="formContainer" >
                                <FormComponent/>
                            </div>
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        </>
    )
}

export default LoginPage