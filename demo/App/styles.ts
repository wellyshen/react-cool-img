import { css } from "@emotion/core";

import mq from "../utils/mq";

const { sm, md, lg, xl } = mq;

export const root = css`
  body {
    font-family: "Open Sans", sans-serif;
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
  margin: 0 0 0.75rem;
`;

export const subtitle = css`
  margin: 0 0 2.5rem;
`;

export const image = css`
  box-sizing: border-box;
  padding: 0.5px;
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

export const cp = css`
  display: block;
  margin-top: 2.5rem;
`;
