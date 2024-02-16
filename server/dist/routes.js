"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, password_hash } = req.body;
    const user = yield prisma.users.findUnique({
        where: { userid }
    });
    if (user !== null) {
        if (user.password_hash == password_hash) {
            if (user.role == 'admin') {
                const users = yield prisma.users.findMany({});
                res.status(200).json({ users });
            }
            else {
                res.status(200).json({ users: [user] });
            }
        }
        else {
            res.status(400).json({ message: 'Incorrect username or password' });
        }
    }
    else {
        res.status(400).json({ message: 'User does not exist.' });
    }
}));
router.get("/check", (req, res) => {
    res.send("Server is running succesfully");
});
// router.post('/signup', async (req, res)=>{
//     const { userid, password_hash, role } = req.body;
//     try {
//         await prisma.users.create({
//             data: {
//                 userid,
//                 password_hash,
//                 role
//             }
//         });
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (err) {
//         res.status(400).json({ message: 'User already exists with the provided userid' });
//     }
// })
// router.put('/upd', async (req, res)=>{
//     const { userid, password_hash, role } = req.body;
//     try {
//         await prisma.users.update({
//             where: {
//                 userid
//             },
//             data: {
//                 userid,
//                 password_hash,
//                 role
//             }
//         });
//         res.status(201).json({ message: 'User updated successfully' });
//     } catch (err) {
//         res.status(400).json({ message: 'User does not exist' });
//     }
// })
exports.default = router;
