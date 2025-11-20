import { message, notification, Popconfirm } from 'antd';
import { deleteUserApi } from '../../services/api.service';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteUser = (props) => {
    const { id, loadUser } = props;
    const confirm = async () => {
        const res = await deleteUserApi(id);
        if (res.data) {
            notification.success({
                message: "Delete user",
                description: `Đã xóa user ${id}`
            })
            await loadUser();
        } else {
            notification.error({
                message: "Error delete user",
                description: JSON.stringify(res.message)
            })
        }
    };

    const cancel = () => {
        message.error('Click on No');
    };

    return (
        <Popconfirm
            title="Xác nhận xóa User?"
            description="Bạn có chắc muốn xóa User này không?"
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

export default DeleteUser;