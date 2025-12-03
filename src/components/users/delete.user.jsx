import { message, notification, Popconfirm } from 'antd';
import { deleteUserApi } from '../../services/api.service';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteUser = (props) => {
    const { id, loadUser, dataUsers, current } = props;
    const confirm = async () => {
        const res = await deleteUserApi(id);
        if (res.data) {
            notification.success({
                message: "Delete user",
                description: `User deleted ${id}`
            })
            if (dataUsers.length === 1 && current > 1) {
                await loadUser(current - 1);
            } else {
                await loadUser(current);
            }
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
            title="Confirm deletion of user?"
            description="Are you sure you want to delete this user?"
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