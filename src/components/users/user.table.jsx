import { EditOutlined } from '@ant-design/icons';
import { Table, } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import DeleteUser from './delete.user';

const UserTable = (props) => {
    const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize } = props

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null)

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const columns = [
        {
            title: "Ordinal number",
            render: (_, record, index) => {
                return (
                    <>
                        {(current - 1) * pageSize + index + 1}
                    </>
                )
            }
        },
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
                    <DeleteUser id={record._id} loadUser={loadUser} dataUsers={dataUsers} current={current} />
                </div>
            ),
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log(">>>Check onchange", { pagination, filters, sorter, extra })
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current) // "10" => 10
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize) // "5" => 5
            }
        }
    };

    return (
        <>
            <Table columns={columns} dataSource={dataUsers} rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} of {total} users</div>) }
                    }}
                onChange={onChange}

            />
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
                loadUser={loadUser}
            />
        </>
    );
}

export default UserTable;