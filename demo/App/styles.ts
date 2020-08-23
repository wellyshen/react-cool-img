import { css } from "@emotion/core";

import mq from "../utils/mq";

const { sm, md, lg, xl } = mq;

export const root = css`
  body {
    font-family: "Roboto", sans-serif;

    h1 {
      font-family: "Bungee Shade", cursive;
    }
  }
`;

export const container = css`
  padding: 5rem 5%;
  text-align: center;
  ${sm} {
    padding-left: 10%;
    padding-right: 10%;
  }
  ${md} {
    padding-left: 12.5%;
    padding-right: 12.5%;
  }
  ${lg} {
    padding-left: 15%;
    padding-right: 15%;
  }
`;

export const title = css`
  margin: 0 0 1rem;
  font-size: 8vw;

  ${md} {
    font-size: 4vw;
  }
`;

export const subtitle = css`
  margin: 0 0 5rem;
  font-size: 3vw;

  ${md} {
    font-size: 1.5vw;
  }
`;

export const image = css`
  box-sizing: border-box;
  width: 50%;
  vertical-align: bottom;
  ${md} {
    width: 33.333333333333333%;
  }
  ${lg} {
    width: 25%;
  }
  ${xl} {
    width: 20%;
  }
`;
