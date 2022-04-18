import styles from './Container.module.scss';

const Container = ({ children }) => <div className={styles.container}>{children}</div>;

export default Container;