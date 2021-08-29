import { useState } from 'react';
import CreateModal from '../CreateModal/CreateModal';
import './Header.css';

const Header = ({ user, handleCreate, handleLogout }) => {
    const docBody = document.body;
    const [openModal, setOpenModal] = useState(false);

    const updateBodyScroll = (hide) => {
        docBody.style.overflow = (hide) ? 'hidden': 'auto';
    };

    const closeModal = () => {
        setOpenModal(false); 
        updateBodyScroll(false);
    };

    return (
        <div className="main-header">
            <div className="welcome-text">Hello, {user}</div>
            <div className="action-btns">
                <span>
                    <button title="Create Challenge" className="create-btn" onClick={() => {setOpenModal(true); updateBodyScroll(true);}}>Create</button>
                    <CreateModal open={openModal} onClose={closeModal} onCreate={(data) =>{handleCreate(data); closeModal();}}></CreateModal>
                </span>
                <span>
                    <button title="Logout" className="logout-btn" onClick={handleLogout}>Logout</button>
                </span>
            </div>
        </div>
    );
};

export default Header;