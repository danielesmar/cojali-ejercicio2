import React from 'react';
import "./ConfirmModal.css";
import {User} from "../../../domain/User.ts";

interface ConfirmModalProps {
    onConfirm: () => void;
    onCancel: () => void;
    user: User | null;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ onConfirm, onCancel, user }) => {
    return (
        <div className="modal-confirm">
            <div className="modal-content-confirm">
                <p>¿Estás seguro de que deseas eliminar a: {user!.name}?</p>
                <button className={"delete-btn-confirm"} onClick={onConfirm}>
                    Si, Eliminar
                </button>
                <button onClick={onCancel}>Cancelar</button>
            </div>
        </div>
    );
};

export default ConfirmModal;