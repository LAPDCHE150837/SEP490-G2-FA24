import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const UserList = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "xuanduong", active: true, role: "Admin", joinDate: "2024-01-01" },
        { id: 2, name: "duong123", active: true, role: "User", joinDate: "2024-01-15" },
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ padding: 4 }}>
            <h2>Danh sách người dùng</h2>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <TextField
                    label="Tìm kiếm"
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: "300px" }}
                />
                <Button variant="contained" color="primary" onClick={() => navigate("/addUser")}>
                    Thêm người dùng mới
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên</TableCell>
                            <TableCell>Trạng thái hoạt động</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Ngày tham gia</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.active ? "Đang hoạt động" : "Không hoạt động"}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.joinDate}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="secondary" sx={{ marginRight: 1 }}>
                                        Chỉnh sửa
                                    </Button>
                                    <Button variant="outlined" color="error">
                                        Xóa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredUsers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    Không có dữ liệu
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserList;
