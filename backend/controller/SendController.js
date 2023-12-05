const Send = require('../models/Send')

// helpers
const sendSmsApi = require('../helpers/send-sms-api');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class SendController {
    static async sendSimple(req, res) {
        let { phone, mensagem } = req.body


        //validations
        if(!phone){
            res.status(422).json({ message: 'Digite o numero de celular!'})
            return
        }
        if(!mensagem){
            res.status(422).json({ message: 'Digite a mensagem que deseja enviar!'})
            return
        }

        const token = getToken(req);
        const user = await getUserByToken(token)
        
        sendSmsApi(phone, mensagem)

        const send = new Send({
            phone,
            mensagem,
            user: {
                _id: user._id,
                name: user.name,
            },
        })

        try {
            const newSend = await send.save()

            res.status(200).json({ message: 'Mensagem enviada com sucesso', newSend})
        } catch (error) {

            console.error('Erro ao salvar no MongoDB:', error);
            res.status(500).json({ message: 'Erro ao salvar a mensagem no MongoDB' });
        }

    }

     static async  getAllUserSends(req, res) {
        //get user from token
        const token = getToken(req)
        const user = await getUserByToken(token)

        const sends = await Send.find({ 'user._id': user._id }).sort('-createdAt')

        res.status(200).json({sends})

     }
}