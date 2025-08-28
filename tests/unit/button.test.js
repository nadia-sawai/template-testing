import { screen, fireEvent } from "@testing-library/dom";

test("保存ボタンが押せる", () => {
  const btn = document.createElement("button");
  btn.textContent = "保存";
  document.body.innerHTML = "";
  document.body.append(btn);

  fireEvent.click(screen.getByRole("button", { name: "保存" }));
  expect(screen.getByRole("button", { name: "保存" })).toBeInTheDocument();
});
