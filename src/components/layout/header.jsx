import { Link } from "react-router-dom";
import { Menu } from "antd";
import { BookTwoTone, HomeOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useState } from "react";
const Header = () => {

    const [current, setCurrent] = useState('');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const items = [
        {
            label: <Link to={"/"} >Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"} >Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <Link to={"/books"} >Books</Link>,
            key: 'books',
            icon: <BookTwoTone />,
        },
        {
            label: "Setting",
            key: 'setting',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to={"/login"} >Login</Link>,
                    key: 'login'
                },
                {
                    label: <Link to={"/register"} >register</Link>,
                    key: 'register'
                },
            ]
        },
    ];

    return (
        <Menu onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
}

export default Header;