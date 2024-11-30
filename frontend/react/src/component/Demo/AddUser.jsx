import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Grid, Typography, Paper, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const AddUser = () => {
    const navigate = useNavigate();
    const [userForm, setUserForm] = useState({
        name: "Trần Xuân Dương",
        username: "duong123",
        password: "1234",
        email: "tranduongw@gmail.com",
        role: "USER",
        dob: "27/02/2002",
        address: "Hà Nội",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (e) => {
        setUserForm((prev) => ({ ...prev, role: e.target.value }));
    };

    const handleSubmit = () => {
        console.log("User added:", userForm);
        navigate("/listUser");
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Paper sx={{ padding: 3, maxWidth: "600px", margin: "0 auto" }}>
                <Typography variant="h5" gutterBottom>
                    Thêm tài khoản người dùng
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Tên"
                            name="name"
                            value={userForm.name}
                            onChange={handleInputChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            value={userForm.username}
                            onChange={handleInputChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Mật khẩu"
                            name="password"
                            type="password"
                            value={userForm.password}
                            onChange={handleInputChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={userForm.email}
                            onChange={handleInputChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                value={userForm.role}
                                onChange={handleRoleChange}
                                name="role"
                                label="Role"
                            >
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value="teacher">Teacher</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Ngày sinh"
                            name="dob"
                            type="date"
                            value={userForm.dob}
                            onChange={handleInputChange}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Địa chỉ"
                            name="address"
                            value={userForm.address}
                            onChange={handleInputChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{ marginRight: 2 }}
                        >
                            Tạo tài khoản
                        </Button>
                        <Button variant="outlined" onClick={() => navigate("/listUser")}>
                            Quay lại
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default AddUser;
