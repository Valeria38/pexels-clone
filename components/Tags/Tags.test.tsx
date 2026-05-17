import { screen, render } from "@testing-library/react";
import Tags, { popularTags } from "@/components/Tags";

describe("Tags", () => {
  it("renders popular tags", () => {
    render(<Tags />);

    const regexp = new RegExp(popularTags[1].value, "i");
    const link1 = screen.getByRole("link", { name: regexp });

    expect(link1).toBeInTheDocument();
    expect(link1).toHaveAttribute("href", `?query=${popularTags[1].value}`);
  });
});
