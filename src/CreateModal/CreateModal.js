import ReactDom from 'react-dom';
import { useState } from 'react';
import './CreateModal.css';

const CreateModal = ({ open, onClose, onCreate }) => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [tags, setTags] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({
            title: title,
            body: description,
            tags: tags.split(",")
        });
    }

    if (open) {
        return ReactDom.createPortal(
            <div className="create-modal" data-testid="modal">
                <div className="overlay"></div>
                <div className="modal-wrapper">
                    <div className="header">
                        <h3 data-testid="modal-header">Create Challange</h3>
                    </div>
                    <form onSubmit={handleSubmit} autoComplete="false" id="create-form">
                        <div className="section">
                            <label>Title</label>
                            <textarea name="title" title="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} required></textarea>
                        </div>
                        <div className="section">
                            <label>Description</label>
                            <textarea rows="5" title="Enter Description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                        </div>
                        <div className="section">
                            <label>Tags</label>
                            <textarea rows="1" title="Enter Tags" name="tags" value={tags} onChange={(e) => setTags(e.target.value)}
                                placeholder="Add comma separated tags..." required></textarea>
                        </div>
                        <div className="footer">
                            <button className="close-btn" onClick={onClose}>Close</button>
                            <button title="Save Challenge" className="save-btn">Save</button>
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