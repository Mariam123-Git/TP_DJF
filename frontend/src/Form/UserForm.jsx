import React, {useEffect, useState} from "react";
import axios from "axios";

const UserForm = ({ addUser, editingUser  }) => {
    const [user, setUser] = useState({ nom: "", prenom: "",email: "" });

    useEffect(() => {
        if (editingUser) {
            setUser(editingUser);
        }
    }, [editingUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.nom && user.prenom && user.email) {
            addUser(user);
            setUser({ nom: "", prenom:"",email: "" });
            await axios.post("http://localhost:8080/user", user);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nom:</label>
                <input
                    type="text"
                    name="nom"
                    value={user.nom}
                    onChange={handleChange}
                    placeholder="Enter your firstname"
                />
            </div>
            <div>
                <label>Prenom:</label>
                <input
                    type="text"
                    name="prenom"
                    value={user.prenom}
                    onChange={handleChange}
                    placeholder="Enter your lastname"
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />
            </div>
            <button type="submit" disabled={!(user.nom && user.prenom && user.email)}>
                {editingUser ? "Update" : "Add"}  User
            </button>
        </form>
    );
};

export default UserForm;
