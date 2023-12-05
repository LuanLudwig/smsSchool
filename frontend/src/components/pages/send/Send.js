import { useState } from "react";
import api from "../../../utils/api";
import formStyles from "../../form/Form.module.css";
import useFlashMessage from "../../../hooks/useFlashMessage";
import Input from "../../form/Input";
import Textarea from "../../form/Textarea";

function Send() {
    const [send, setSend] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');
    const { setFlashMessage } = useFlashMessage();

    function handleChange(e) {
        setSend({...send, [e.target.name]: e.target.value })
     }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(send)
        let msgType = 'success'

       
        const data = await api.post('/send/simple', send, {
            Authorization: `Bearer ${JSON.parse(token)}`
        })
        .then((response) => {
            return response.data
        })
        .catch ((err) => {
            msgType = 'error'
            return err.response.data
        })
        setFlashMessage(data.message, msgType)
    }
    

     return (
        <section>
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o telefone:"
                    handleOnChange={handleChange}
                />
                <Textarea
                    text="Mensagem"
                    type="textarea"
                    name="mensagem"
                    placeholder="Digite a sua mensagem:"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Enviar" />
            </form>
        </section>
     );
};

export default Send