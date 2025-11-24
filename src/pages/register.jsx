import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { registerUserApi } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const res = await registerUserApi(values.fullName, values.email, values.password, values.phone)
        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Đăng ký người dùng thành công"
            })
            navigate("/login");
        } else {
            notification.error({
                message: "Register user error",
                description: JSON.stringify(res.message)
            })
        }
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ margin: "40px" }}
        >
            <h2 style={{ textAlign: "center" }}>Đăng ký tài khoản</h2>
            <Row style={{ justifyContent: "center" }}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Username"
                        name="fullName"
                        rules={[
                            { required: true, message: "Please input your username!" },
                            { min: 3, message: "Username phải có ít nhất 3 ký tự" },
                            { max: 30, message: "Username tối đa 30 ký tự" },
                            {
                                pattern: /^[a-zA-Z0-9_]+$/,
                                message: "Chỉ được dùng chữ, số và dấu gạch dưới (_)",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row style={{ justifyContent: "center" }}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please input your email!" },
                            { type: "email", message: "Email không hợp lệ" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row style={{ justifyContent: "center" }}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: "Please input your password!" },
                            {
                                min: 8,
                                message: "Password phải có ít nhất 8 ký tự",
                            },
                            {
                                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                                message:
                                    "Password phải có chữ và số (các ký tự đặc biệt như @ $ ! % * # ? & là tùy chọn)",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row style={{ justifyContent: "center" }}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[
                            { required: true, message: "Please input your phone number!" },
                            {
                                // validator dùng regex kiểm tra format VN: bắt đầu 0 hoặc +84, tiếp theo 9 chữ số (tổng 10) hoặc 10 chữ số (tùy nhà mạng)
                                pattern: /^(?:\+84|0)\d{9,10}$/,
                                message:
                                    "Số điện thoại không hợp lệ. Ví dụ: 0912345678 hoặc +84912345678",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row style={{ justifyContent: "center" }}>
                <Col xs={24} md={8}>
                    <Form.Item>
                        <Button type="primary" onClick={() => form.submit()}>
                            Register
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

            <Row style={{ justifyContent: "center", textAlign: "center" }}>
                <Col xs={24} md={8}>
                    <Divider dashed style={{ borderColor: "black" }} />
                    <Form.Item>
                        <span>Đã có tài khoản? <Link to="/login">Đăng nhập tại đây</Link></span>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

export default RegisterPage;