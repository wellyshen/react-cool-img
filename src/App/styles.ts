import { css } from '@emotion/core';

const mq = {
  sm: '@media (min-width: 576px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 992px)',
  xl: '@media (min-width: 1200px)'
};

export const root = css`
  body {
    font-family: 'Open Sans', sans-serif;
  }
`;

export const container = css`
  padding: 5rem 5%;
  text-align: center;
  ${mq.sm} {
    padding-left: 10%;
    padding-right: 10%;
  }
  ${mq.md} {
    padding-left: 12.5%;
    padding-right: 12.5%;
  }
  ${mq.lg} {
    padding-left: 15%;
    padding-right: 15%;
  }
`;

export const title = css`
  margin: 0 0 0.75rem;
`;

export const subtitle = css`
  margin: 0;
`;

export const cta = css`
  display: inline-flex;
  align-items: center;
  margin: 2.5rem 0;
  padding: 0.5rem 2rem;
  border: 1px solid black;
  border-radius: 4px;
  color: black;
  text-decoration: none;
  &:hover {
    border-color: gray;
    color: gray;
  }
`;

export const icon = css`
  margin-right: 0.5rem;
  width: 1.3rem;
  height: 1.3rem;
`;

export const image = css`
  box-sizing: border-box;
  padding: 0.5px;
  width: 50%;
  vertical-align: bottom;
  ${mq.md} {
    width: 33.333333333333333%;
  }
  ${mq.lg} {
    width: 25%;
  }
  ${mq.xl} {
    width: 20%;
  }
`;

export const cp = css`
  display: block;
  margin-top: 2.5rem;
`;
