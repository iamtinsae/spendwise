import styles from './page.module.css';

export default function Loading() {
  return (
    <div className="absolute inset-0 flex h-screen flex-col items-center justify-center">
      <h1 data-text="Spend Wise" className={styles.loader}>
        Spend Wise
      </h1>
    </div>
  );
}
