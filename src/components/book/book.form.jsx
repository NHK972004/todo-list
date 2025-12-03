import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookApi, handleUploadFile } from "../../services/api.service";

const BookForm = (props) => {
    const { loadBook, isCreateOpen, setIsCreateOpen } = props

    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [category, setCatagory] = useState(undefined);
    const [loading, setLoading] = useState(false)

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()


    const handleSubmitButton = async () => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Please upload a thumbnail image"
            })
            return;
        }
        setLoading(true)
        // step 1 : upload file
        const resUpload = await handleUploadFile(selectedFile, "book")
        if (resUpload.data) {
            // success
            const newThumbnail = resUpload.data.fileUploaded;
            // step 2: create book
            const resBook = await createBookApi(
                mainText, author, price, quantity, category, newThumbnail
            );
            if (resBook.data) {
                resetAndCloseModal()
                await loadBook()
                notification.success({
                    message: "Create Book",
                    description: "Book created successfully"
                })
            } else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(resBook.message)
                })
            }
        } else {
            // failed
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
            setSelectedFile(null)
            setPreview(null)
            setLoading(false)
        }
    }

    const resetAndCloseModal = () => {
        setMainText("");
        setAuthor("");
        setPrice(0);
        setQuantity(0);
        setCatagory(undefined);
        setSelectedFile(null);
        setPreview(null);
        setIsCreateOpen(false);
        setLoading(false);
    }

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    return (
        <div style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Table Book</h2>
                <Button type="primary" onClick={() => setIsCreateOpen(true)}>Create Book</Button>
            </div>
            <Modal
                title="Create Book"
                open={isCreateOpen}
                onOk={handleSubmitButton}
                onCancel={resetAndCloseModal}
                maskClosable={false}
                okText="CREATE"
                cancelText="CANCEL"
                confirmLoading={loading}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Title</span>
                        <Input placeholder=""
                            onChange={(event) => setMainText(event.target.value)}
                            value={mainText}
                        />
                    </div>
                    <div>
                        <span>Author</span>
                        <Input placeholder=""
                            onChange={(event) => setAuthor(event.target.value)}
                            value={author}
                        />
                    </div>
                    <div>
                        <span>Price</span>
                        <InputNumber
                            style={{ width: "100%" }}
                            value={price}
                            onChange={(value) => setPrice(value)}
                            min={0}
                            step={1000}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value) => value.replace(/,/g, "")}
                            addonAfter={"đ"}
                        />
                    </div>
                    <div>
                        <span>Quantity</span>
                        <InputNumber
                            style={{ width: "100%" }}
                            value={quantity}
                            onChange={(value) => setQuantity(value)}
                            min={0}
                            step={1}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value) => value.replace(/,/g, "")}
                        />
                    </div>
                    <div>
                        <span>Catagory</span>
                        <Select
                            value={category}
                            allowClear
                            placeholder="Select it"
                            style={{ width: "100%" }}
                            onChange={(value) => setCatagory(value)}
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },

                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },

                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                        />
                    </div>
                    <div>
                        {/* input image */}
                        <label htmlFor="btnUpLoad" style={{
                            display: "block",
                            width: "fit-content",
                            margin: "0 auto",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>Upload Avatar</label>
                        <input type="file" hidden id='btnUpLoad'
                            onChange={(event) => handleOnChangeFile(event)}
                            onClick={(event) => event.target.value = null}
                        />

                        {/* preview image */}
                        {preview &&
                            <>
                                <div style={{
                                    border: "1px solid black",
                                    margin: "10px auto",
                                    width: '50%',
                                    display: "flex",
                                    justifyContent: "center",
                                    boxSizing: "border-box"
                                }}>
                                    <img src={`${preview}`} alt="" style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }} />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default BookForm;