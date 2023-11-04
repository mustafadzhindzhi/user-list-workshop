import Search from "./Search.jsx";
import UserListTable from "./UserListTable.jsx";

const UserList = () => {
    return (
        // <!-- Section component  -->
        <section className="card users-container">
            <Search />
            <UserListTable />
        </section>
    )
}

export default UserList;