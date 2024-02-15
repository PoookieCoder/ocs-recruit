import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res)=>{
    const { userid, password_hash } = req.body;
    const user = await prisma.users.findUnique({
        where : {userid}
    })
    if (user !== null){
        if(user.password_hash == password_hash){
            if(user.role == 'admin'){
                const users = await prisma.users.findMany({})
                res.status(200).json({users})
            }
            else{
                res.status(200).json({users: [user]})
            }
        }
        else{
            res.status(400).json({message: 'Incorrect username or password' })
        }
    }
    else{
        res.status(400).json({message: 'User does not exist.'})
    }   
})

router.post('/signup', async (req, res)=>{
    const { userid, password_hash, role } = req.body;
    try {
        await prisma.users.create({
            data: {
                userid,
                password_hash,
                role
            }
        });
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ message: 'User already exists with the provided userid' });
    }
})

router.put('/upd', async (req, res)=>{
    const { userid, password_hash, role } = req.body;
    try {
        await prisma.users.update({
            where: {
                userid
            },
            data: {
                userid,
                password_hash,
                role
            }
        });
        res.status(201).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(400).json({ message: 'User does not exist' });
    }
})

export default router;
