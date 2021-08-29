import ReactDom from 'react-dom';
import { useRef } from 'react';
import './CreateModal.css';

const CreateModal = ({ open, onClose, onCreate }) => {
    const formRef = useRef();
    // const [disableSave, setDisableSave]
    const handleSubmit = (e) => {
        const {title, description, tags} = formRef.current;
        e.preventDefault();
        onCreate({
            title: title.value,
            body: description.value,
            tags: tags.value.split(",")
        });
    }

    if (open) {
        return ReactDom.createPortal(
            <div className="create-modal">
                <div className="overlay"></div>
                <div className="modal-wrapper">
                    <div className="header">
                        <h3>Create Challange</h3>
                    </div>
                    <form onSubmit={handleSubmit} autoComplete="false" ref={formRef} id="create-form">
                        <div className="section">
                            <label>Title</label>
                            <textarea name="title" required></textarea>
                        </div>
                        <div className="section">
                            <label>Description</label>
                            <textarea rows="5" name="description" required></textarea>
                        </div>
                        <div className="section">
                            <label>Tags</label>
                            <textarea rows="1" name="tags" placeholder="Add comma separated tags..." required></textarea>
                        </div>
                        <div className="footer">
                            <button className="close-btn" onClick={onClose}>Close</button>
                            <button className="save-btn">Save</button>
                        </div>
                    </form>
                </div>
            </div>, 
            document.body
        );
    } else {
        return null;
    }
};

export default CreateModal;