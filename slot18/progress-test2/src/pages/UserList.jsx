import React from "react";
import UserTable from "../components/UserTable";
import UserFilter from "../components/UserFilter";
import NavigationHeader from "../components/NavigationHeader";

const UserList = () => {
    return (
        <>
        <NavigationHeader />
        <div className="container">
            <h1 className="text-center mb-4">User Management</h1>
            <UserFilter />
            <UserTable />
        </div>
        </>
    );
};

export default UserList;