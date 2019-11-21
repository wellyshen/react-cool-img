import { css } from '@emotion/core';

export const root = css`
  body {
    background: black;
  }
`;

export const app = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0;
  height: 1500px;
`;

export const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333;
  width: 400px;
  height: 400px;
`;
