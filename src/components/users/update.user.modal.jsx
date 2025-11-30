import { Input, notification, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { updateUserApi } from '../../services/api.service';
const UpdateUserModal = (props) => {
    const { setIsModalUpdateOpen, isModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
            setEmail(dataUpdate.email)
        }

    }, [dataUpdate]);

    const handleSubmitButton = async () => {
        const res = await updateUserApi(id, fullName, phone);
        if (res.data) {
            notification.success({
                message: "Update user",
                description: "Cập nhật thành công"
            });
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)
            })
        }
    }
    const resetAndCloseModal = () => {
        setFullName("");
        setEmail("");
        setPhone("");
        setIsModalUpdateOpen(false);
        setDataUpdate(null)
    }

    return (
        <Modal
            title="Update a User"
            open={isModalUpdateOpen}
            onOk={handleSubmitButton}
            onCancel={resetAndCloseModal}
            maskClosable={false}
            okText="SAVE"
            cancelText="CANCEL"
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>ID</span>
                    <Input placeholder=""
                        disabled
                        value={id}
                    />
                </div>
                <div>
                    <span>Full name</span>
                    <Input placeholder=""
                        onChange={(event) => setFullName(event.target.value)}
                        value={fullName}
                    />
                </div>
                <div>
                    <span>Email</span>
                    <Input placeholder=""
                        disabled
                        value={email}
                    />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input placeholder=""
                        onChange={(event) => setPhone(event.target.value)}
                        value={phone}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default UpdateUserModal;