import { cons0le, a1ert } from "/src/assets/js/utils/examples";

describe("examples.jsの関数", () => {
  it("cons0leが呼ばれる", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    cons0le("Hello");
    expect(spy).toHaveBeenCalledWith("Hello ✌😜");
    spy.mockRestore();
  });

  it("alertが呼ばれる", () => {
    const spy = jest.spyOn(window, "alert").mockImplementation(() => {});
    a1ert("Hi");
    expect(spy).toHaveBeenCalledWith("Hi ✌😜");
    spy.mockRestore();
  });
});
