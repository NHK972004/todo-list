import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateUserAvatarApi } from '../../services/api.service';
const ViewUserDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, loadUser } = props;

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

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

    const handleUploadUserAvatar = async () => {
        // step 1 : upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar")
        if (resUpload.data) {
            // success
            const newAvatar = resUpload.data.fileUploaded;
            // step 2: upload user
            const resUpdateAvatar = await updateUserAvatarApi(
                newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone
            );
            if (resUpdateAvatar) {

                setIsDetailOpen(false)
                setSelectedFile(null)
                setPreview(null)
                await loadUser()

                notification.success({
                    message: "Update user avatar",
                    description: "Cập nhật avatar thành công"
                })
            } else {
                notification.error({
                    message: "Error upload avatar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }
        } else {
            // failed
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
            setIsDetailOpen(false)
            setSelectedFile(null)
            setPreview(null)
        }
    }

    return (
        <Drawer
            title="Chi tiết User"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={() => {
                setDataDetail(null)
                setIsDetailOpen(false)
            }
            }
            open={isDetailOpen}
            width={'30vw'}
        >
            {
                dataDetail ?
                    <>
                        < p > <span>Id: </span>{dataDetail._id}</p >
                        <br />
                        <p><span>Full name: </span>{dataDetail.fullName}</p>
                        <br />
                        <p><span>Email :</span>{dataDetail.email}</p>
                        <br />
                        <p><span>Phone number:</span>{dataDetail.phone}</p>
                        <br />
                        <p>Avatar :</p>
                        <div style={{
                            border: "1px solid black",
                            margin: "10px auto",
                            width: '50%',
                            display: "flex",
                            justifyContent: "center",
                            boxSizing: "border-box"
                        }}>
                            <img
                                style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} alt=""
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
                            <input type="file" hidden id='btnUpLoad' onChange={(event) => handleOnChangeFile(event)} />

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
                                    {/* SAVE button */}
                                    <div style={{ display: "flex", justifyContent: "center", }}>
                                        <Button type="primary" onClick={() => handleUploadUserAvatar()}>SAVE</Button>
                                    </div>
                                </>
                            }
                        </div>
                    </>
                    :
                    <p>Không có dữ liệu</p>
            }
        </Drawer >
    );
};
export default ViewUserDetail;