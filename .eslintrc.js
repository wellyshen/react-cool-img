module.exports = {
  extends: ["welly"],
  rules: {
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"],
      },
    ],
    "react/react-in-jsx-scope": "off",
    "testing-library/render-result-naming-convention": "off",
  },
};
