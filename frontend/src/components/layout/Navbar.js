import { Link } from "react-router-dom";
import { useContext } from "react";

import styles from './Navbar.module.css';

/* context */
import { Context } from "../../context/UserContext";

function Navbar(){
    const { authenticated, logout } = useContext(Context);
    return(
        <nav className={styles.navbar}>
           <ul>
                <li>
                   
                </li>
                {authenticated ? (
                    <>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/student/all">Estudantes</Link>
                        </li>
                        <li>
                            <Link to="/user/profile">Perfil</Link>
                        </li>
                        <li>
                            <Link to="/send/simple">Envio Simples</Link>
                        </li>
                        
                        <li onClick={logout}>Sair</li>
                    </>
                ) : (
                    <>
                    <li>
                        <Link to="/login">Entrar</Link>
                    </li>
                    <li>
                        <Link to="/register">Cadastrar</Link>
                    </li>
                    </>
                )}
            </ul> 
        </nav>
    )
}

export default Navbar