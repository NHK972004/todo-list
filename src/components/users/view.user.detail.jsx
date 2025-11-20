import { Drawer } from 'antd';
const ViewUserDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;
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
        >
            {dataDetail ?
                <>
                    <p><span>Id: </span>{dataDetail._id}</p>
                    <br />
                    <p><span>Full name: </span>{dataDetail.fullName}</p>
                    <br />
                    <p><span>Email :</span>{dataDetail.email}</p>
                    <br />
                    <p><span>Phone number:</span>{dataDetail.phone}</p>
                </>
                :
                <p>Không có dữ liệu</p>
            }
        </Drawer>
    );
};
export default ViewUserDetail;