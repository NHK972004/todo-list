import { Drawer } from "antd";

const ViewBookDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props

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
                        <p><span>Tittle: </span>{dataDetail.mainText}</p>
                        <br />
                        <p><span>Author: </span>{dataDetail.author}</p>
                        <br />
                        <p><span>Category: </span>{dataDetail.category}</p>
                        <br />
                        <p><span>Price: </span>
                            {
                                new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(dataDetail.price)
                            }
                        </p>
                        <br />
                        <p><span>Quantity: </span>{dataDetail.quantity}</p>
                        <br />
                        <p><span>Sold: </span>{dataDetail.sold}</p>
                        <br />
                        <p>Avatar: </p>
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
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`} alt=""
                            />
                        </div>
                    </>
                    :
                    <p>Không có dữ liệu</p>
            }
        </Drawer >
    )
}

export default ViewBookDetail;