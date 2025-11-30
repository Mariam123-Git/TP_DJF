import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./Form/UserForm";
import UserList from "./UserList/UserList";
import "./App.css";

const App = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    // Charger les utilisateurs au démarrage
    useEffect(() => {
        loadUsers();
    }, []);

    // Fonction pour récupérer les utilisateurs depuis le backend
    const loadUsers = async () => {
        try {
            const result = await axios.get("/api/users");
            setUsers(result.data);
        } catch (error) {
            console.error("Erreur lors du chargement des utilisateurs :", error);
        }
    };

    // Ajouter ou modifier un utilisateur
    const addUser = async (user) => {
        try {
            if (editingUser) {
                // Modification d'un utilisateur existant
                const result = await axios.put(`/api/user/${editingUser.id}`, user);
                setUsers(users.map((u) => (u.id === editingUser.id ? result.data : u)));
                setEditingUser(null); // Réinitialiser le formulaire
            } else {
                // Ajout d'un nouvel utilisateur
                const result = await axios.post("/api/user", user);
                setUsers([...users, result.data]);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout/modification de l'utilisateur :", error);
        }
    };

    // Préparer l'édition d'un utilisateur
    const handleEdit = (user) => {
        setEditingUser(user);
    };

    // Supprimer un utilisateur
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`/api/user/${id}`);
                // Mettre à jour la liste localement
                setUsers(users.filter((u) => u.id !== id));
            } catch (error) {
                console.error("Erreur lors de la suppression :", error);
            }
        }
    };

    return (
        <div className="App">
            <h1>Fullstack Frontend</h1>
            <UserForm addUser={addUser} editingUser={editingUser} />
            <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default App;
