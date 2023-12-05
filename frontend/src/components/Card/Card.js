import styles from "./card.module.css";

export function Card({ title, content }) {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <span>{content}</span>
    </div>
  );
}
