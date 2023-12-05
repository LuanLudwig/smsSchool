import { useState } from 'react';

import formStyles from './Form.module.css';
import Input from './Input';

function StudentForm({ handleSubmit, studentData, btnText}) {
    const [student, setStudent] = useState(studentData || {});
    

    function handleChange(e) {
        setStudent({...student, [e.target.name]: e.target.value})
    }

    function submit(e) {
        e.preventDefault()
        console.log(student)
        handleSubmit(student)
    }

    return (
        <form onSubmit={submit} className={formStyles.form_container}>
            <Input 
                text="Nome do Estudante"
                type="text"
                name="name"
                handleOnChange={handleChange}
                placeholder="Digite o nome do estudante"
                value={student.name || ''}
            />
            <Input 
                text="Telefone do Estudante"
                type="text"
                name="phone"
                handleOnChange={handleChange}
                placeholder="Digite o telefone do estudante"
                value={student.phone || ''}
            />
            <input type='submit' value={btnText} />
        </form>
    )
}

export default StudentForm