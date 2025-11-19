import { Table } from 'antd';
import { fetchAllUserAPI } from '../../services/api.service';
import { useState, useEffect } from 'react';

const UserTable = () => {
    const [dataUsers, setDataUsers] = useState([]);

    // empty array => run once
    useEffect(() => {
        loadUser();
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
    ];

    const loadUser = async () => {
        const res = await fetchAllUserAPI();
        setDataUsers(res.data)
    }

    return (
        <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
    );
}

export default UserTable;