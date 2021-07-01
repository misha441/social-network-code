import preloader from '../../../assets/photos/preloader.svg';
import styles from './preloader.module.css';

const Preloader = (props) => {
    return <div className={styles.preloader}>
        <img src={preloader} alt=''/>
    </div>
}

export default Preloader;