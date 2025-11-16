import { UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useState } from 'react';

const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")

    const handelOnClick = (event) => {
        console.log(">>> check state ", { fullName, email, password, phone })
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
                    <Button type='primary' onClick={handelOnClick}>Create User</Button>
                </div>
            </div>
        </div>
    )
}

export default UserForm;