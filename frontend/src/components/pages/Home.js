import api from '../../utils/api';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './Home.module.css';
import useFlashMessage from '../../hooks/useFlashMessage';
import { Card } from '../Card/Card';


function Home() {
    const [totalSend, setTotalSend] = useState(0);
    const [user, setUser] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        api.get('users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setUser(response.data)
        })
    }, [token])
    
    return (
        <section>
            <div className={styles.container}>
      <section className={styles.banner}>
        <h1>Seja bem-vindo! {user.name}</h1>
      </section>

      <section className={styles.cards}>
        <Card title="Total de envios" content={totalSend} />
        <Card title="Última mensagem enviada" content="IFC informa: nao havera aulas no periodo noturno..." />
      </section>
    </div>
        </section>
    )
}

export default Home