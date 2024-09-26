import styles from './NotFound.module.scss';

const NotFoundInfo: React.FC = () => {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <h1>Ничего не найдено </h1>
      <p className={styles.desc}>К сожалению эта страница отсутствует в нашем магазине :(</p>
    </div>
  );
};

export default NotFoundInfo;
