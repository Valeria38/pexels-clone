import Loader from "@/components/Loader";
import { screen, render } from "@testing-library/react";

describe("Loader", () => {
  it("renders loader", async () => {
    render(<Loader />);

    const loader = screen.getByRole("status", { name: "loading" });

    expect(loader).toBeInTheDocument();
  });
});
