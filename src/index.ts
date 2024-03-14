import express from 'express';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express();
const port = 3000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// USERS

app.get('/api/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.get('/api/users/:id', async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    });
    res.json(user);
});

app.put('/api/users', async (req, res) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password
        }
    });
    res.json(user);
});


