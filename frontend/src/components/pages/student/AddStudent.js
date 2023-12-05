import styles from './AddStudent.module.css';

import api from '../../../utils/api';
import { useState } from 'react';
import useFlashMessage from '../../../hooks/useFlashMessage';
import StudentForm from '../../form/StudentForm';
import { useNavigate } from 'react-router-dom';

function AddStudent(){
    //const [student, setStudent] = useState({})
    const [token] = useState(localStorage.getItem('token') || '');
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate()

    async function registerStudent(student){
        let msgType = 'success'

        const data = await api.post('/student/create', student, {
            Authorization: `Bearer ${JSON.parse(token)}`,
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })
        setFlashMessage(data.message, msgType)

        if (msgType !== 'error'){
            navigate('/student/all')
        }
    }

    return (
        <section className={styles.addstudent_header}>
            <div>
                <h1>Cadastre Estudantes</h1>
            </div>
            <StudentForm handleSubmit={registerStudent} btnText="Cadastrar Estudante" />
        </section>
    )
}

export default AddStudent