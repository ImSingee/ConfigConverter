import styles from './index.css';

export default function() {
  return (
    <div className={styles.normal}>
        <div>404 Not Found</div>
        <div>
          You may want to <a href="/">
            Move to Homepage
          </a> or <a href="https://github.com/ImSingee/ConfigConverter">
            Move to Github
          </a>
        </div>
    </div>
  );
}
