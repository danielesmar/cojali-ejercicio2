import React, { useEffect, useState } from "react";
import { fetchUsers } from "./application/FetchUsers";
import { User } from "./domain/User";
import UserTable from "./infrastructure/ui/reactComponents/UserTable";
import ConfirmModal from './infrastructure/ui/reactComponents/ConfirmModal';

import "./App.css";
import UserModal from "./infrastructure/ui/reactComponents/UserModal";

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [originalUsers, setOriginalUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    useEffect(() => {
        fetchUsers().then((fetchedUsers) => {
            setUsers(fetchedUsers);
            setOriginalUsers(fetchedUsers);
        });        
    }, []);

    const handleDeleteClick = (user: User): void => {
        setUserToDelete(user);
        setIsConfirmOpen(true);
    };

    const handleRestore = () => {
        setUsers(originalUsers);
    };
    
    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleSave = (user: User) => {
        setUsers(prevUsers => {
          const exists = prevUsers.some(u => u.id === user.id);
          return exists ? prevUsers.map(u => (u.id === user.id ? user : u)) : [...prevUsers, user];
        });
        setIsModalOpen(false);
    };
    
    const handleConfirmDelete = (): void => {
        if (userToDelete) {
            setUsers(users.filter(user => user.id !== userToDelete.id));
            setIsConfirmOpen(false);
        }
    };

    const handleCancelDelete = (): void => {
        setIsConfirmOpen(false);
    };

    return (
        <div className="app-container">
            <h1 className="title">Lista de Usuarios </h1>
            <div className={"contador"}>Cantidad: {users.length}</div>
            <div className={"action-button"}>
                <button onClick={handleAdd}>Añadir</button>
                <button className={"btn-restore"} onClick={handleRestore}>Restaurar</button>
            </div>            
            <UserTable users={users} onDelete={handleDeleteClick} onEdit={handleEdit} />
            {isConfirmOpen && (
                <ConfirmModal
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    user={userToDelete}
                />
            )}
            {isModalOpen && <UserModal user={selectedUser} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default App;