import { Button, Modal, Typography } from 'antd'
import React from 'react'

const ModalNotNew = ({ openModal, isOpenModal }) => {

    const onCancel = () => {
        isOpenModal((v) => localStorage.setItem("NotNew", !v))
    }

    return (
        <Modal style={{ marginBottom: "0px !impoetant" }} className="modalNotNew" width={900} onCancel={onCancel} open={openModal} footer={null}>
            <div className="modalImageNotNew">
                <img className="modalImageNotNewLineModal" src="/lineModal.png" loading="lazy" alt="lineModal" />
                <img className="modalImageNotNewLineModalDown" src="/lineModalDown.png" loading="lazy" alt="lineModal" />
            </div>
            <div className="modalBodyNotNew" style={{ padding: "30px 10px 20px 10px" }}>
                <Typography.Title level={2}>Добро пожаловать в ваш личный дневник</Typography.Title>
                <Typography.Text>Здесь хранятся ваши мысли, мечты и моменты, которые стоит запомнить. Этот дневник — ваше безопасное пространство, где можно быть собой, не боясь оценок. Пишите, когда вдохновляетесь, размышляете или просто хотите сохранить кусочек дня.</Typography.Text>
                <br />
                <br />
                <Typography.Text>Начните свою историю сегодня. 💙</Typography.Text>
                <br />
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={onCancel}>Начать вести дневник</Button>
                </div>
            </div>
        </Modal>
    )
}

export default ModalNotNew