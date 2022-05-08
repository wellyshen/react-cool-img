import type { FC } from "react";
import Img from "react-cool-img";

import GitHubCorner from "../GitHubCorner";
import loadingImg from "../assets/loading.gif";
import errorImg from "../assets/error.png";
import styles from "./styles.module.scss";

const App: FC = () => {
  const renderImages = (num: number): JSX.Element[] => {
    const images = [];

    while (images.length < num) {
      const id = Math.floor(Math.random() * 1000) + 1;

      images.push(
        <Img
          key={images.length}
          className={styles.image}
          placeholder={loadingImg}
          src={`https://picsum.photos/id/${id}/480`}
          error={errorImg}
          alt="Demo Image"
        />
      );
    }

    return images;
  };

  return (
    <div className={styles.container}>
      <GitHubCorner url="https://github.com/wellyshen/react-cool-img" />
      <h1 className={styles.title}>REACT COOL IMG</h1>
      <p className={styles.subtitle}>
        {`A React <Img /> component let you handle image UX and performance as a
          Pro!`}
      </p>
      <div>{renderImages(300)}</div>
    </div>
  );
};

export default App;
