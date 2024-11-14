

import React, { useState } from 'react';

const BlogManager = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingPostId, setEditingPostId] = useState(null);

    // Handle adding a new blog post
    const handleAddPost = () => {
        if (title && content) {
            const newPost = {
                id: Date.now(),
                title,
                content,
            };
            setPosts([...posts, newPost]);
            setTitle('');
            setContent('');
        }
    };

    // Handle editing an existing blog post
    const handleEditPost = (id) => {
        const postToEdit = posts.find((post) => post.id === id);
        setEditingPostId(id);
        setTitle(postToEdit.title);
        setContent(postToEdit.content);
    };

    // Handle updating a blog post
    const handleUpdatePost = () => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === editingPostId ? { ...post, title, content } : post
            )
        );
        setEditingPostId(null);
        setTitle('');
        setContent('');
    };

    // Handle deleting a blog post
    const handleDeletePost = (id) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    };

    return (
        <div>
            <h2>Blog Manager</h2>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                {editingPostId ? (
                    <button onClick={handleUpdatePost}>Update Post</button>
                ) : (
                    <button onClick={handleAddPost}>Add Post</button>
                )}
            </div>

            <h3>Blog Posts</h3>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h4>{post.title}</h4>
                        <p>{post.content}</p>
                        <button onClick={() => handleEditPost(post.id)}>Edit</button>
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogManager;
