import ReactDom from 'react-dom';
import { useRef } from 'react';
import './CreateModal.css';

const CreateModal = ({ open, onClose, onCreate }) => {
    const formRef = useRef();

    if (open) {
        return ReactDom.createPortal(
            <div className="create-modal">
                <div className="overlay"></div>
                <div className="modal-wrapper">
                    <div className="header">
                        <h3>Create Challange</h3>
                    </div>
                    <form autoComplete="false" ref={formRef} id="create-form">
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
                    </form>
                    <div className="footer">
                        <button className="close-btn" onClick={onClose}>Close</button>
                        <button className="save-btn" onClick={() => onCreate({ 
                            title: formRef.current.title.value, 
                            body: formRef.current.description.value, 
                            tags: formRef.current.tags.value.split(",")
                        })}>Save</button>
                    </div>
                </div>
            </div>, 
            document.body
        );
    } else {
        return null;
    }
};

export default CreateModal;