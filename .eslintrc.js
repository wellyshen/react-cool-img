module.exports = {
  extends: ["welly"],
  rules: {
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"],
      },
    ],
    "react/require-default-props": "off",
    "testing-library/render-result-naming-convention": "off",
  },
};
