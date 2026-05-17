import { render, screen } from "@testing-library/react";
import Header from ".";

describe("Header", () => {
  it("renders header", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    const link = screen.getByRole("link");
    const img = screen.getByRole("img", { name: /pexels clone logo/i });

    expect(header).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
    expect(img).toBeInTheDocument();
  });
});
