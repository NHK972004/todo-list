import { UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

const UserForm = () => {

    return (
        <div className='user-form' style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Full name</span>
                    <Input placeholder="" />
                </div>
                <div>
                    <span>Email</span>
                    <Input placeholder="" />
                </div>
                <div>
                    <span>Password</span>
                    <Input.Password placeholder="" />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input placeholder="" />
                </div>
                <div>
                    <Button type='primary'>Create User</Button>
                </div>
            </div>
        </div>
    )
}

export default UserForm;