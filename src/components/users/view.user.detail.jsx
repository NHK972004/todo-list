import { Drawer } from 'antd';
import { useEffect, useState } from 'react';
const ViewUserDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }
        const file = event.target.files[0];
        if (file.type.startsWith("image/")) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
            // console.log(file)

        }
    }
    useEffect(() => {
        console.log(selectedFile)
        console.log(preview)
    })

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