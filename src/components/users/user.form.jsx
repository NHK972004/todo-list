import { Button, Input, notification, Modal } from 'antd';
import { useState } from 'react';
import { createUserApi, } from '../../services/api.service';

const UserForm = (props) => {
    const { loadUser } = props

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitButton = async () => {
        const res = await createUserApi(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                message: "Create user",
                description: "Tạo use thành công"
            })
            resetAndCloseModal();
            await loadUser();

        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setIsModalOpen(false);
    }

    return (
        <div style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Table User</h2>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    type="primary">Create User</Button>
            </div>
            <Modal
                title="Create User"
                open={isModalOpen}
                onOk={handleSubmitButton}
                onCancel={resetAndCloseModal}
                maskClosable={false}
                okText="CREATE"
                cancelText="CANCEL"
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Full name</span>
                        <Input placeholder=""
                            onChange={(event) => setFullName(event.target.value)}
                            value={fullName}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input placeholder=""
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password placeholder=""
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                        />
                    </div>
                    <div>
                        <span>Phone number</span>
                        <Input placeholder=""
                            onChange={(event) => setPhone(event.target.value)}
                            value={phone}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UserForm;