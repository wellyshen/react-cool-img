import { set, get } from "../storage";

describe("storage", () => {
  const key = "REACT_COOL_IMG";
  const src = "https://test-image-url";

  it("should set session storage", () => {
    set(src);

    expect(
      Object.keys(JSON.parse(window.sessionStorage.getItem(key) || "{}"))
    ).toMatchSnapshot();
  });

  it("should get session storage", () => {
    window.sessionStorage.removeItem(key);

    expect(get(src)).toBeFalsy();

    set(src);

    expect(get(src)).toBeTruthy();
  });
});
