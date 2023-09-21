import styles from '../styles/TextInput.module.scss';
const TextInput = ({className, type = "text", placeholder, onChangeCallback, value = undefined} : {className: string, type?: string, placeholder: string, value?: string, onChangeCallback : (text : string) => void}) => {

    return(
        <input className= {`${className} ${styles.input}`}
               size={1}
               type={type}
               value={value}
               placeholder={placeholder}
               onChange={e => onChangeCallback(e.target.value)}
        />
    );
}

export default TextInput;