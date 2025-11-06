import React, { useState } from "react";
import "./Posts.css"; // import the CSS file
const PostEditModal = ({ post, onClose, onSave }) => {
  const [form, setForm] = useState({ title: post.title, body: post.body });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(post._id, form); // call parent save function
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="body"
            placeholder="Body"
            value={form.body}
            onChange={handleChange}
            required
          />
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditModal;
