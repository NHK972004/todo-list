import { message, notification, Popconfirm } from 'antd';
import { deleteBookApi } from '../../services/api.service';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteBook = (props) => {
    const { id, loadBook, dataBook, current } = props;
    const confirm = async () => {
        const res = await deleteBookApi(id);
        if (res.data) {
            notification.success({
                message: "Delete Book",
                description: `Book deleted ${id}`
            })
            if (dataBook.length === 1 && current > 1) {
                await loadBook(current - 1);
            } else {
                await loadBook(current);
            }
        } else {
            notification.error({
                message: "Error delete book",
                description: JSON.stringify(res.message)
            })
        }
    };

    const cancel = () => {
        message.error('Click on No');
    };

    return (
        <Popconfirm
            title="Confirm deletion of book?"
            description="Are you sure you want to delete this book?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            placement='left'
        >
            <DeleteOutlined style={{ cursor: 'pointer', color: 'red', fontSize: '18px' }} />
        </Popconfirm>
    );
};

export default DeleteBook;