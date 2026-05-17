import Button, { IButtonProps } from "@/components/Button";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const setup = (props: IButtonProps) => {
  render(<Button {...props} />);
  const btn = screen.getByRole("button", { name: "Search" });
  return { btn, ...props };
};

describe("Button", () => {
  it("renders children", () => {
    const { btn } = setup({ children: "Search" });

    expect(btn).toBeInTheDocument();
  });

  it("has correct styles", () => {
    const { btn, color } = setup({ children: "Search", color: "emerald" });

    expect(btn).toHaveClass(`bg-${color}-50`);
  });

  it("renders default blue button by default", () => {
    const { btn } = setup({ children: "Search" });

    expect(btn).toHaveClass("bg-blue-50");
  });

  it("pass the className", () => {
    const { btn, className } = setup({
      children: "Search",
      className: "custom",
    });

    expect(btn).toHaveClass(className!);
  });

  it("fires onClick handler if present", async () => {
    const handler = jest.fn();
    const { btn } = setup({ children: "Search", onClick: handler });

    const user = userEvent.setup();

    await user.click(btn);

    expect(handler).toHaveBeenCalled();
  });

  it("does not attach onClick handler if it's not present", async () => {
    const user = userEvent.setup();
    const handler = jest.fn();
    const { btn } = setup({ children: "Search" });

    await user.click(btn);

    expect(handler).not.toHaveBeenCalled();
  });

  it("passes props", () => {
    const { btn, title, type } = setup({
      children: "Search",
      title: "Button title",
      type: "submit",
    });

    expect(btn).toHaveAttribute("title", title);
    expect(btn).toHaveAttribute("type", type);
  });
});
