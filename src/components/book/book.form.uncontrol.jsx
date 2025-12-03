import { Button, Input, InputNumber, Modal, notification, Select, Form } from "antd";
import { useState } from "react";
import { createBookApi, handleUploadFile } from "../../services/api.service";

const BookFormUncontrol = (props) => {
    const { loadBook, isCreateOpen, setIsCreateOpen } = props;

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const resetAndCloseModal = () => {
        form.resetFields();
        setSelectedFile(null);
        setPreview(null);
        setIsCreateOpen(false);
        setLoading(false);
    };

    const handleFinish = async (values) => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Please upload a thumbnail image",
            });
            return;
        }
        setLoading(true);
        // step 1 : upload file
        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            // success
            const newThumbnail = resUpload.data.fileUploaded;
            // step 2: create book
            const resBook = await createBookApi(
                values.title,
                values.author,
                values.price ?? 0,
                values.quantity ?? 0,
                values.category,
                newThumbnail
            );

            if (resBook?.data) {
                resetAndCloseModal();
                await loadBook();
                notification.success({
                    message: "Create Book",
                    description: "Book created successfully",
                });
            } else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(resBook?.message),
                });
                setLoading(false);
            }
        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message),
            });
            setSelectedFile(null);
            setPreview(null);
            setLoading(false);
        }
    };

    return (
        <div style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Table Book</h2>
                <Button type="primary" onClick={() => setIsCreateOpen(true)}>
                    Create Book
                </Button>
            </div>

            <Modal
                title="Create Book"
                open={isCreateOpen}
                onOk={() => form.submit()}
                onCancel={resetAndCloseModal}
                maskClosable={false}
                okText="CREATE"
                cancelText="CANCEL"
                confirmLoading={loading}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: "Please input title" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Author"
                        name="author"
                        rules={[{ required: true, message: "Please input author" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Please input price" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            step={1000}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value) => value.replace(/,/g, "")}
                            addonAfter={"đ"}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[{ required: true, message: "Please input quantity" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            step={1}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value) => value.replace(/,/g, "")}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: "Please select category" }]}
                    >
                        <Select
                            allowClear
                            placeholder="Select it"
                            options={[
                                { value: "Arts", label: "Arts" },
                                { value: "Business", label: "Business" },
                                { value: "Comics", label: "Comics" },
                                { value: "Cooking", label: "Cooking" },
                                { value: "Entertainment", label: "Entertainment" },
                                { value: "History", label: "History" },
                                { value: "Music", label: "Music" },
                                { value: "Sports", label: "Sports" },
                                { value: "Teen", label: "Teen" },
                                { value: "Travel", label: "Travel" },
                            ]}
                        />
                    </Form.Item>

                    <div style={{ marginBottom: 16 }}>
                        <label
                            htmlFor="btnUpLoad"
                            style={{
                                display: "block",
                                width: "fit-content",
                                margin: "0 auto",
                                padding: "5px 10px",
                                background: "orange",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Upload Avatar
                        </label>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            hidden
                            id="btnUpLoad"
                            onChange={handleOnChangeFile}
                            onClick={(e) => (e.target.value = null)}
                        />

                        {preview && (
                            <div
                                style={{
                                    border: "1px solid black",
                                    margin: "10px auto",
                                    width: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    boxSizing: "border-box",
                                }}
                            >
                                <img
                                    src={preview}
                                    alt=""
                                    style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
                                />
                            </div>
                        )}
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default BookFormUncontrol;
