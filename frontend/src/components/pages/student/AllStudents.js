import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../utils/api';
import styles from './Dashboard.module.css';
import useFlashMessage from '../../../hooks/useFlashMessage';

function AllStudents () {
    const [ students, setStudents ] = useState([]);
    const [token] = useState(localStorage.getItem('token') || '');
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        api.get('/student/all', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setStudents(response.data.students)
        })
    }, [token])

    async function removeStudent(id) {
        let msgType = 'success'

        const data = await api.delete(`/student/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            const updatedStudents = students.filter((student) => student._id !== id)
            setStudents(updatedStudents)
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
        <div className={styles.student_header}>
            <h1>Estudantes cadastrados</h1>
            <Link to='/student/create'>Cadastrar estudantes</Link>
        </div>
        <div className={styles.student_container}>
            {students.length > 0 &&
                students.map((student) => (
                    <div className={styles.studentlist_row} key={student._id}>
                        <span className='bold'>{student.name}</span>
                        <div className={styles.actions}>
                            <Link to={`/student/edit/${student._id}`}>Editar</Link>
                            <button onClick={() => {
                                removeStudent(student._id)
                            }}
                            >Excluir</button>
                        </div>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default AllStudents

