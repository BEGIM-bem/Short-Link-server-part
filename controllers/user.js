const bc = require('bcryptjs')
const { UserModel } = require("../models/user")
const SALT_ROUND = 10
exports.registerUser = async (req, res) => {
    try {
        const { email, passworld, username } = req.body
        if (!email || !passworld) {
            return res.status(400).json({ message: "Нужно указать необходимые поля для регистрайии" })
        }

        if (passworld.length < 8) {
            return res.status(400).json({ message: "Длина пароля должна быть больше 8 символов" })
        }

        const userExists = await UserModel.findOne({ email: email })
        if (userExists) {
            return res.status(400).json({
                message: "Пользователь с такой почтой уже зарегистрирован",
            })
        }

        const hasHedPassworld = await bc.hash(passworld, SALT_ROUND)
        // const compared = await bc.compare("123", hasHedPassworld)
        // console.log(hasHedPassworld)
        // console.log(compared)


        await UserModel.create({
            email: email,
            passworld: hasHedPassworld,
            username: username
        })
        res.status(201).json("Пользователь успешно создан")
    } catch (e) {
        res.status(500).json(e.message)
    }
}
exports.loginUser = async (req, res) => {
    try {
        const { email, passworld } = req.body
        const existingUser = await UserModel.findOne({ email: email })
        if (!existingUser) {
            return re.status(400).json({
                message: "Пользователь с такой почтой нет"
            })
        }

        const passworldCompared = await bc.compare(password, existingUser.password)
        if (!passworldCompared) {
            return res.status(400).json({
                message: "Введен не верный пароль!"
            })
        }
        res.status(201).json({
            message: "Выxод выполнен успешно!",
            user: existingUser
        })
    } catch (e) {
        res.status(500).json(e.message)
    }
}

