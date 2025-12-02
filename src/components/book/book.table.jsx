import { Table } from "antd";
import { useEffect, useState } from "react";
import { fetchAllBookApi } from "../../services/api.service";
import BookForm from "./book.form";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ViewBookDetail from "./view.book.detail";

const BookTable = () => {

    const [dataBook, setDataBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    useEffect(() => {
        loadBook();
    }, [current, pageSize])

    const loadBook = async (page = current, size = pageSize) => {
        const res = await fetchAllBookApi(page, size);
        if (res.data) {
            setDataBook(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    const columns = [
        {
            title: "Ordinal Number",
            render: (_, record, index) => (
                <>
                    {(current - 1) * pageSize + index + 1}
                </>
            )
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => (
                <div>
                    <a href="#" onClick={() => { console.log(record), setIsDetailOpen(true), setDataDetail(record) }}>{record._id}</a>
                </div >
            )
        },
        {
            title: 'Tittle',
            dataIndex: 'mainText',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (text) => {
                return new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(text);
            },
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Action',
            render: () => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined style={{ cursor: "pointer", color: "orange" }} />
                    <DeleteOutlined style={{ cursor: 'pointer', color: 'red', fontSize: '18px' }} />
                </div>
            )
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
            <BookForm />
            <Table dataSource={dataBook} columns={columns} rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} of {total} users</div>) }
                    }}
                onChange={onChange} />
            <ViewBookDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />
        </>
    )
}

export default BookTable;
