import { Input, InputNumber, Modal, notification, Select, Form } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookApi } from "../../services/api.service";

const UpdateBookUnControl = (props) => {
    const { loadBook, setIsModalUpdateOpen, isModalUpdateOpen, dataUpdate, setDataUpdate } = props;

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category
            })
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate]);

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
        setLoading(false);
        setIsModalUpdateOpen(false)
        setDataUpdate(null)
    };

    const updateBook = async (newThumbnail, values) => {
        console.log("value >>", values)
        const { id, mainText, author, price, quantity, category } = values;
        const resBook = await updateBookApi(id, mainText, author, price, quantity, category, newThumbnail)
        if (resBook.data) {
            resetAndCloseModal()
            await loadBook()
            notification.success({
                message: "Book updated successfully",
            });
            return resBook.data;
        } else {
            notification.error({
                message: "Failed to update book",
                description: JSON.stringify(resBook.message),
            });
            return null;
        }
    }

    const handleFinish = async (values) => {
        setLoading(true);
        if (!selectedFile && !preview) {
            notification.error({
                message: "Error update book",
                description: "Please upload a thumbnail image",
            });
            setLoading(false);
            return;
        }
        let newThumbnail = "";
        if (!selectedFile && preview) {
            newThumbnail = dataUpdate.thumbnail
        } else {
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                //success
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                //failed
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload?.message),
                });
                setLoading(false);
                return;
            }
        }
        //step 2 update book
        await updateBook(newThumbnail, values)
        setLoading(false);
    };

    return (
        <Modal
            title="Create Book"
            open={isModalUpdateOpen}
            onOk={() => form.submit()}
            onCancel={resetAndCloseModal}
            maskClosable={false}
            okText="CREATE"
            cancelText="CANCEL"
            confirmLoading={loading}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                    label="ID"
                    name="id"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="Title"
                    name="mainText"
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
        </Modal >
    );
};

export default UpdateBookUnControl;
