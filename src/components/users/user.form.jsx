import { UserOutlined } from '@ant-design/icons';
import { Button, Input, notification } from 'antd';
import { useState } from 'react';
import { createUserApi, } from '../../services/api.service';

const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")

    const handleClinkButton = async () => {
        const res = await createUserApi(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                message: "Create user",
                description: "Tạo use thành công"
            })
        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)
            })
        }

        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    }

    return (
        <div className='user-form' style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Full name</span>
                    <Input placeholder=""
                        value={fullName} onChange={(event) => setFullName(event.target.value)} />
                </div>
                <div>
                    <span>Email</span>
                    <Input placeholder="" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <span>Password</span>
                    <Input.Password placeholder="" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input placeholder="" value={phone} onChange={(event) => setPhone(event.target.value)} />
                </div>
                <div>
                    <Button type='primary' onClick={handleClinkButton} htmlType="button">Create User</Button>
                </div>
            </div>
        </div>
    )
}

export default UserForm;