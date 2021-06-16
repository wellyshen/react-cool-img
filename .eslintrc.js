module.exports = {
  extends: ["welly"],
  rules: {
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"],
      },
    ],
    "testing-library/render-result-naming-convention": "off",
  },
};
