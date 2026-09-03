import { render, screen } from "@testing-library/react";

import Loader from "@/components/Loader";

describe("Loader", () => {
  it("renders loader", async () => {
    render(<Loader />);

    const loader = screen.getByRole("status", { name: "loading" });

    expect(loader).toBeInTheDocument();
  });
});
