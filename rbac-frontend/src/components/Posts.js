import React, { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../components/AuthContext";
import { getPosts, createPost, deletePost,updatePost } from "../api/api";
import "./Posts.css"; // import the CSS file
import PostEditModal from "./PostEditModal";
export default function Posts() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });
const [editingPost, setEditingPost] = useState(null); // track post being edited
  const token = user?.token;
  const role = user?.role;

  const fetchPosts = useCallback(async () => {
    try {
      const { data } = await getPosts(token);
      setPosts(data);
    } catch (err) {
      console.error("Failed to load posts:", err);
    }
  }, [token]); // token as dependency since it's used inside fetchPosts

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]); // Now fetchPosts is a dependency

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createPost(form, token);
      setForm({ title: "", body: "" });
      fetchPosts();
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };
  const handleEdit = (post) => {
    setEditingPost(post); // open modal
  };

  const handleSave = async (id, updatedData) => {
    try {
      await updatePost(id, updatedData);
      fetchPosts();
    } catch (err) {
      console.error("Failed to update post:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id, token);
      fetchPosts();
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  return (
    <div className="posts-container">
      <h2>POSTS DASHBOARD ({role})</h2>

      {(role === "admin" || role === "editor") && (
        <>
         
          <form onSubmit={handleCreate} className="posts-form">
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              name="body"
              placeholder="Body"
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
            />
            <button type="submit">Create Post</button>
          </form>
        </>
      )}

      <ul className="posts-list">
       {posts.map((p) => (
          <li key={p._id}>
            <strong>{p.title}</strong>
            <div className="post-author">
              by {p.authorId?.username} ({p.authorId?.role})
            </div>
            <p>{p.body}</p>
            <div className="post-actions">
              {(role === "admin" || (role === "editor" && p.authorId?.username === user.username)) && (
                <button className="edit-button" onClick={() => handleEdit(p)}>Edit</button>
              )}
              {role === "admin" && (
                <button className="delete-button" onClick={() => handleDelete(p._id)}>Delete</button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {editingPost && (
        <PostEditModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
