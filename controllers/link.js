const { LinkModel } = require("../models/link")

const shortid = require("shortid")

exports.createShortLink = async (req, res) => {
    try {
        const { link, ownerId } = req.body
        const idForShortedLink = shortid.generate()
        const shortedLink = `http://${req.hostname}:5050/sl/${idForShortedLink}`
        await LinkModel.create({
            ownerId: ownerId,
            redirectId: idForShortedLink,
            from: shortedLink,
            to: link
        })

        res.status(201).json({
            link: shortedLink,
            message: "Ссылка создана!"
        })

    } catch (e) {
        console.log("Controllers Error: ", e)
        res.status(500).json({ message: e.message })
    }
}
exports.redirectToLink = async (req, res) => {
    try {
        const { shortId } = req.params
        const existingLink = await LinkModel.findOne({ redirectId: shortId })
        existingLink.clickcount += 1
        await existingLink.save((err, existingLink) => {
            if (err) {
                console.log('err', err)
            }
            console.log('saved clickcount: ', existingLink)
        })
        if (!existingLink) {
            return res.status(404).json({
                message: "Ссылка не найдена!"
            })
        }

        return res.redirect(existingLink.to)

    } catch (e) {
        console.log("Controller Error: ", e)
        res.status(500).json({
            message: e.message
        })
    }
}
/*1) Реализовать API метод [Получение всех ссылок]
-  HTTP GET /my-links/:userId
-  Эндпоинт должен отдавать все ссылки
-  Если ссылок нет, то отдавать пустой массив с кодом 200
- Если пользователя с таким айди нет, то отдавать 400 с сообщением (пользователь не существует)*/
exports.myLinks = async (req, res) => {
    try {

        const { userId } = req.params
        const findUserId = await LinkModel.find({ ownerId: userId })
        res.status(200).json({
            message: `Все ссылки которые есть по этому ID адресу, ${userId}`,
            silki: findUserId
        })


    } catch (error) {
        console.log("Пользователь не существует ", error)
        res.status(400).json({
            message: "Пользователь не существует"
        })

    }

}
/* 2) Реализовать API метод [Удаление ссылки по ее _id] */
exports.DeleteId = async (req, res) => {
    try {
        const { id } = req.body
        const DeleteUser = await LinkModel.findByIdAndDelete(id)
        res.status(200).json({
            message: "Ссылка удалена",
            user: DeleteUser
        })
    } catch (e) {
        console.log("Error!! ", e)
    }
}


