import React from "react";
import { FaFolderOpen, FaBook, FaImage } from "react-icons/fa";

const blogs = [
    {
        title: "Bí quyết học Kanji hiệu quả",
        content:
            "Học Kanji không khó nếu bạn biết cách. Hãy sử dụng flashcards, học theo bộ thủ, và luyện tập viết hàng ngày.",
        category: "Kanji",
        image: null,
    },
    {
        title: "Cách mở rộng vốn từ vựng tiếng Nhật",
        content:
            "Đọc sách, xem phim tiếng Nhật và sử dụng ứng dụng học từ vựng là cách tốt nhất để ghi nhớ từ mới.",
        category: "Từ vựng",
        image: null,
    },
    {
        title: "Làm thế nào để nắm chắc ngữ pháp tiếng Nhật?",
        content:
            "Luyện tập qua các bài tập ngữ pháp, viết câu và tham gia các lớp học trực tuyến giúp bạn cải thiện nhanh chóng.",
        category: "Ngữ pháp",
        image: null,
    },
];

const BlogView = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Danh sách Blog</h1>
            <div style={styles.blogList}>
                {blogs.map((blog, index) => (
                    <div key={index} style={styles.blogCard}>
                        <div style={styles.blogHeader}>
                            <FaBook style={styles.icon} />
                            <h2 style={styles.blogTitle}>{blog.title}</h2>
                        </div>
                        <p style={styles.blogContent}>{blog.content}</p>
                        <div style={styles.blogFooter}>
                            <div style={styles.category}>
                                <FaFolderOpen style={styles.iconSmall} />
                                <span>{blog.category}</span>
                            </div>
                            <div style={styles.imagePlaceholder}>
                                {blog.image ? (
                                    <img src={blog.image} alt="Blog" style={styles.image} />
                                ) : (
                                    <FaImage style={styles.iconPlaceholder} />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f9f9f9",
    },
    header: {
        textAlign: "center",
        color: "#2c3e50",
        marginBottom: "20px",
    },
    blogList: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "20px",
    },
    blogCard: {
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s",
    },
    blogHeader: {
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
    },
    blogTitle: {
        fontSize: "18px",
        color: "#2980b9",
        marginLeft: "10px",
        fontWeight: "600",
    },
    blogContent: {
        fontSize: "15px",
        color: "#555",
        marginBottom: "15px",
        lineHeight: "1.6",
    },
    blogFooter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    category: {
        display: "flex",
        alignItems: "center",
        color: "#7f8c8d",
        fontSize: "14px",
    },
    icon: {
        color: "#16a085",
        fontSize: "20px",
    },
    iconSmall: {
        color: "#f39c12",
        marginRight: "5px",
    },
    imagePlaceholder: {
        height: "80px",
        width: "80px",
        backgroundColor: "#ecf0f1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
    },
    iconPlaceholder: {
        color: "#bdc3c7",
        fontSize: "24px",
    },
    image: {
        maxHeight: "100%",
        maxWidth: "100%",
        borderRadius: "4px",
    },
};

export default BlogView;