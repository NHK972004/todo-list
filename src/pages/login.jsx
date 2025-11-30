import { ArrowRightOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUserApi } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        const res = await loginUserApi(values.email, values.password);
        if (res.data) {
            message.success("Đăng nhập thành công");
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            navigate("/");
        } else {
            notification.error({
                message: "Error Login",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false);
        console.log(">>> check res login", res)
    }
    return (
        <Row style={{ justifyContent: "center", marginTop: "30px" }}>
            <Col xs={24} md={12} lg={8}>
                <fieldset
                    style={{
                        padding: "15px",
                        margin: "10px",
                        border: "1px solid black",
                        borderRadius: "5px"
                    }}
                >
                    <legend style={{ padding: "0px 4px" }}>Đăng nhập</legend>
                    <Form
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Please input your email!" },
                                { type: "email", message: "Email không hợp lệ" },
                            ]}
                        >
                            <Input prefix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                        // rules={[
                        //     { required: true, message: "Please input your password!" },
                        //     {
                        //         min: 8,
                        //         message: "Password phải có ít nhất 8 ký tự",
                        //     },
                        //     {
                        //         pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                        //         message:
                        //             "Password phải có chữ và số (các ký tự đặc biệt như @ $ ! % * # ? & là tùy chọn)",
                        //     },
                        // ]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>
                        <Form.Item >
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button type="primary"
                                    // onClick={() => form.submit()},
                                    htmlType="submit"
                                    loading={loading}>
                                    Login
                                </Button>
                                <Link to="/">Go to homepage <ArrowRightOutlined /></Link>
                            </div>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{ textAlign: "center" }}>Chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link></div>
                </fieldset>
            </Col>
        </Row>
    );
}

export default LoginPage;