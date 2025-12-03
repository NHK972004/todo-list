import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, message } from "antd";
import { BookTwoTone, HomeOutlined, UsergroupAddOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { logoutApi } from "../../services/api.service";
const Header = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location && location.pathname) {
            const allRoutes = ["users", "books"];
            const currentRoute = allRoutes.find(item => `/${item}` === location.pathname)
            if (currentRoute) {
                setCurrent(currentRoute)
            } else {
                setCurrent("home")
            }
        }
    })

    const [current, setCurrent] = useState('');
    const onClick = (e) => {
        setCurrent(e.key);
    };

    const handelLogout = async () => {
        const res = await logoutApi()
        if (res.data) {
            // clear data
            localStorage.removeItem("access_token")
            setUser({
                "email": "",
                "phone": "",
                "fullName": "",
                "role": "",
                "avatar": "",
                "id": ""
            })
            message.success("Logout success.");
            navigate("/");
        }
    }

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
        ... (!user.id ?
            [{
                label: <Link to={"/login"} >Login</Link>,
                key: 'login',
                icon: <LoginOutlined />,
            }] : [])
        ,
        ... (user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: <span onClick={() => handelLogout()}>Logout</span>,
                    key: 'logout'
                },
            ]
        }] : [])
        ,
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