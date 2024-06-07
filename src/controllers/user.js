import jwt from "jsonwebtoken"
import user from "../models/user.js"

export const register = async (req, res) => {
    const existUser = await user.findOne({ user: req.body.userName });
    if (existUser == undefined) {
        try {
            await user.create({
                user: req.body.userName,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            })
            res.status(200).json({ message: 'Đăng ký thành công!' })
        } catch (error) {
            res.status(400).json(error)
        }
    } else res.status(400).json({ message: 'Tài khoản đã tồn tại!' })
}

export const logIn = async (req, res) => {
    const existUser = await user.findOne({ user: req.body.userName, password: req.body.password });
    if (existUser != undefined) {
        const token = jwt.sign({
            user: existUser.user,
            name: existUser.name,
            email: existUser.email,
            role: existUser.role
        }, 'angular-asm');
        res.status(200).json({
            token,
            message: "Đăng nhập thành công!"
        })
    } else res.status(400).json({ message: 'Tài khoản hoặc mật khẩu không tồn tại!' })
}

export const getAllDev = async (req, res) => {
    const list = await user.find({ role: 'dev' })
    res.status(200).json(list)
}