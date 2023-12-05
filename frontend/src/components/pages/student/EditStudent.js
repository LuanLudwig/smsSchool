import api from '../../../utils/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './AddStudent.module.css';
import StudentForm from '../../form/StudentForm';
import useFlashMessage from '../../../hooks/useFlashMessage';

function EditStudent(){
    const [student, setStudent] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');
    const { id } = useParams();
    const {setFlashMessage} = useFlashMessage();

    useEffect(() => {
        api.get(`/student/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setStudent(response.data.student)
        })
    }, [token, id])

    async function updateStudent(student) {
        let msgType = 'success'


        const data = await api.patch(`student/edit/${student._id}`, student, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                "Content-Type": "multipart/form-data"
            }
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })
        setFlashMessage(data.message, msgType)
    }

    return (
        <section>
            <div className={styles.addstudent_header}>
                <h1>Editando Estudante: {student.name}</h1>
                <p>Depois da edição os dados serão atualizados no sistema</p>
            </div>
            {student.name && 
            <StudentForm
            handleSubmit={updateStudent}
            btnText="Atualizar"
            studentData={student}
            />
            }
        </section>
    )
}

export default EditStudent