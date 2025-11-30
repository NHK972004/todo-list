import { useEffect, useState } from "react";
import UserForm from "../components/users/user.form";
import UserTable from "../components/users/user.table";
import { fetchAllUserAPI } from "../services/api.service";

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadUser();
    }, [current])

    const loadUser = async (page = current, size = pageSize) => {
        const res = await fetchAllUserAPI(page, size);
        if (res.data) {
            setDataUsers(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <div >
            <UserForm loadUser={loadUser} />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setPageSize={setPageSize}
                setCurrent={setCurrent}
            />
        </div>
    );
}

export default UserPage;