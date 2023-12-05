const Student = require("../models/Student")

//helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require("mongoose").Types.ObjectId;


module.exports = class StudentController {
    static async create(req, res) {
        const { name, phone } = req.body;

        if(!name) {
            res.status(422).json({ message: 'O nome é obrigatório!'})
            return
        }
        if(!phone) {
            res.status(422).json({ message: 'O Telefone é obrigatório!'})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        // create a Student object
        const student = new Student({
            name,
            phone,
            user: {
                _id: user._id,
                name: user.name,
            },
        })

        try {
            const newStudent = await student.save()
            res.status(201).json({ message: 'Studante cadastrado com sucesso', newStudent})
        } catch (error) {
            res.status(500).json({ message: error})
        }
    }

    static async getAll(req, res) {
        const token = getToken(req)
        const user = await getUserByToken(token)

        const students = await Student.find({ 'user._id': user._id}).sort('-createAt')

        res.status(200).json({ students: students})
    }

    static async getStudentById(req, res) {
        const id = req.params.id

        // check is ID is valid
        if(!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'ID inválido!'})
            return
        }

        // check is Student exists
        const student = await Student.findOne({ _id: id})

        if(!student) {
            res.status(404).json({ message: 'Estudante não encontrado!'})
            return
        }

        res.status(200).json({ student: student})
    }

    static async editStudent(req, res) {
        const id = req.params.id;

        const token = getToken(req)
        const user = await getUserByToken(token)

        const { name, phone } = req.body


        //Validations
        if(!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }
        user.name = name

        if(!phone) {
            res.status(422).json({ message: 'O telefone é obrigatório!' })
            return
        }
        user.phone = phone

        try {
            const updateStudent = await Student.findOneAndUpdate(
                {_id: user.id},
                {$set: user},
                {new: true},
            )
            res.json({ message: 'Estudante atualizado com sucesso', data: updateStudent })
        } catch (error) {
            res.status(500).json( { message: error })
            return
        }
    }

    
    static async removeStudentbyId(req, res) {
        const id = req.params.id

        if(!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'Id inválido'})
            return
        }

        const student = await Student.findOne({_id: id})

        if(!student) {
            res.status(404).json({ message: 'Estudante não foi encontrado!'})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(student.user._id.toString() !== user._id.toString()) {
            res.status(422).json({ message: 'Houve um problema em processar a sua solicitação!'})
            return
        }

        await Student.findByIdAndRemove(id)
        res.status(200).json({ message: 'Estudante removido com sucesso!'})
    }
}