import React, { useState } from "react";
import { User } from "../../../domain/User";
import './UserModal.css';

interface Props {
  user: User | null;
  onSave: (user: User) => void;
  onClose: () => void;
}

const UserModal: React.FC<Props> = ({ user, onSave, onClose }) => {
    const [formData, setFormData] = useState<User>(user || {
      id: Math.random().toString(),
      name: "",
      email: "",
      country: "",
      picture: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    return (
      <div className="modal">
      <div className="modal-content">
        <h2>{user ? "Editar Usuario" : "Añadir Usuario"}</h2>
        {/* Mostrar la imagen */}
        <div className="image-preview">
          <img src={formData.picture} alt="Imagen del usuario" className="rounded-full w-16 h-16" />
        </div>
        
        {/* Campo para agregar la URL de la imagen */}
        <input
          name="picture"
          value={formData.picture}
          onChange={handleChange}
          placeholder="URL de la imagen"
          className="input-field"
        />
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre Completo"
          className="input-field"
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="input-field"
        />
        <input
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="País"
          className="input-field"
        />
        <div className="button-container">
          <button
            onClick={() => onSave(formData)}
            className="button button-save"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="button button-cancel"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
    );
  };
  
  export default UserModal;