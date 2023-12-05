import styles from './Textarea.module.css';

function Textarea({ type, text, name, placeholder, handleOnChange, value }) {
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <textarea
                type={name}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
            />
            <p>Limite de caracteres 160</p> 
        </div>
    )
}

export default Textarea;