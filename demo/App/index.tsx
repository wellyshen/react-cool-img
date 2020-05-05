import React, { FC } from "react";
import { Global, css } from "@emotion/core";
import normalize from "normalize.css";

import GitHubCorner from "../GitHubCorner";
import Img from "../../src";
import loadingImg from "../static/loading.gif";
import errorImg from "../static/error.png";
import { root, container, title, subtitle, image, cp } from "./styles";

const App: FC<{}> = () => {
  const renderImages = (num: number): JSX.Element[] => {
    const images = [];

    while (images.length < num) {
      const id = Math.floor(Math.random() * 1000) + 1;

      images.push(
        <Img
          key={images.length}
          css={image}
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
    <>
      <Global
        styles={css`
          ${normalize}
          ${root}
        `}
      />
      <div css={container}>
        <GitHubCorner url="https://github.com/wellyshen/react-cool-img" />
        <h1 css={title}>React Cool Img</h1>
        <p css={subtitle}>
          {`A React <Img /> component let you handle image UX and performance as a
          Pro!`}
        </p>
        <div>{renderImages(300)}</div>
        <small css={cp}>Welly Shen ©</small>
      </div>
    </>
  );
};

export default App;
