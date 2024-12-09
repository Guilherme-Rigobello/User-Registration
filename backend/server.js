import { PrismaClient } from '@prisma/client';
import cors from 'cors'
const prisma = new PrismaClient();

import express from 'express';

const app = express();
app.use(express.json());
app.use(cors())

app.post('/users', async (req, res) => {
  
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);

});

app.put('/users/:id', async (req, res) => {
  
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);

});

app.delete('/users/:id', async (req, res) => {
  
    await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: 'Usuario deletado com sucesso' });

});

app.get('/users', async (req, res) => {
  
  let users = [];

  if (!req.query) {
    users = await prisma.user.findMany();
  } else {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        age: req.query.age,
        email: req.query.email
      },
    });
  }

  res.status(200).json(users);
  
});

app.listen(3005);
