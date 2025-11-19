import UserForm from "../components/users/user.form";
import UserTable from "../components/users/user.table";

const UserPage = () => {
    return (
        <div style={{ padding: "20px" }}>
            <UserTable />
            <UserForm />
        </div>
    );
}

export default UserPage;