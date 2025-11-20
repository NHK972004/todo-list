import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';

const UserTable = (props) => {
    const { dataUsers, loadUser } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null)

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <div>
                        <a href="#" onClick={() => { console.log(record), setIsDetailOpen(true), setDataDetail(record) }} >{record._id}</a>
                    </div>

                )
            },
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',

            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined onClick={() => { console.log(record), setIsModalUpdateOpen(true), setDataUpdate(record); }} style={{ cursor: "pointer", color: "orange" }} />
                    <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                </div>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />
        </>
    );
}

export default UserTable;