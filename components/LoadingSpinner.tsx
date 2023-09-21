import styles from '../styles/LoadingSpinner.module.scss';

const LoadingSpinner = ({isLoading} : {isLoading : boolean}) => {

    return (
        <div className={styles.main} style={{display: isLoading ? "flex" : "none"}}>
            <div className={styles.spinner}></div>
        </div>
    )
}

export default LoadingSpinner;