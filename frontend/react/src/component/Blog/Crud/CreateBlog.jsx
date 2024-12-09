import React, { useState } from 'react';

const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'vocabulary',
        image: null,
    });

    const mockData = {
        title: "Sample Blog Title",
        content: "This is a sample content for the blog.",
        category: "grammar",
        image: null, // Hình ảnh mẫu để trống
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Blog data submitted:', formData);
        // Add form submission logic here
    };

    const handleEdit = () => {
        // Tải dữ liệu mẫu vào form
        setFormData(mockData);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Create or Edit Blog</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Title */}
                <label style={styles.label} htmlFor="title">
                    Title
                </label>
                <input
                    style={styles.input}
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter blog title"
                    required
                />

                {/* Content */}
                <label style={styles.label} htmlFor="content">
                    Content
                </label>
                <textarea
                    style={styles.textarea}
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write your blog content here..."
                    rows="8"
                    required
                ></textarea>

                {/* Category */}
                <label style={styles.label} htmlFor="category">
                    Category
                </label>
                <select
                    style={styles.select}
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                >
                    <option value="vocabulary">Vocabulary</option>
                    <option value="grammar">Grammar</option>
                    <option value="kanji">Kanji</option>
                </select>

                {/* Image */}
                <label style={styles.label} htmlFor="image">
                    Image
                </label>
                <input
                    style={styles.fileInput}
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                {/* Submit Button */}
                <button type="submit" style={styles.button}>
                    Submit Blog
                </button>
            </form>

            {/* Edit Button */}
            <button onClick={handleEdit} style={{ ...styles.button, marginTop: '15px' }}>
                Load Sample for Edit
            </button>
        </div>
    );
};

// Inline CSS for simplicity
const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    label: {
        fontSize: '16px',
        fontWeight: '500',
        color: '#555',
    },
    input: {
        padding: '10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    textarea: {
        padding: '10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        resize: 'none',
    },
    select: {
        padding: '10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    fileInput: {
        fontSize: '14px',
    },
    button: {
        padding: '10px 15px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default CreateBlog;
