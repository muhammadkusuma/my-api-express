// app.js

const express = require('express');
const app = express();

// Middleware untuk memparsing request body sebagai JSON
app.use(express.json());

// Data dummy untuk contoh
let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
];

// Route GET untuk mendapatkan semua users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Route GET untuk mendapatkan user berdasarkan ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

// Route POST untuk menambah user baru
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Route PUT untuk memperbarui data user berdasarkan ID
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    user.name = req.body.name;
    res.json(user);
});

// Route DELETE untuk menghapus user berdasarkan ID
app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found');

    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser);
});

// Jalankan server pada port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
