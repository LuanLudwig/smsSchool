import { useState, useContext } from "react";

import Input from "../../form/Input";
import { Link } from 'react-router-dom';

import styles from '../../form/Form.module.css';

/*context*/
import { Context } from "../../../context/UserContext";


function Register() {
    const [user, setUser] = useState({})
    const { register } = useContext(Context);

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        register(user)
    }

    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome: "
                    handleOnChange={handleChange}
                />
                <Input 
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail: "
                    handleOnChange={handleChange}
                />
                <Input 
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu telefone: "
                    handleOnChange={handleChange}
                />
                <Input 
                    text="Rua"
                    type="text"
                    name="street"
                    placeholder="Digite o nome da rua: "
                    handleOnChange={handleChange}
                />
                <Input 
                    text="Cidade"
                    type="text"
                    name="city"
                    placeholder="Digite o nome da cidade: "
                    handleOnChange={handleChange}
                />
                <Input 
                    text="Estado"
                    type="text"
                    name="state"
                    placeholder="Digite o nome do Estado: "
                    handleOnChange={handleChange}
                />
                <Input 
                    text="País"
                    type="text"
                    name="cuntry"
                    placeholder="Digite o nome do país: "
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua Senha:"
                    handleOnChange={handleChange}
               />
               <Input
                    text="Senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme a sua Senha:"
                    handleOnChange={handleChange}
               />
               <input type="submit" value="Cadastrar"/>
            </form>
            <p>
                Já tem conta? <Link to="/login">Clique aqui.</Link>
            </p>
        </section>
    )
}

export default Register