import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import SearchBar from "@/components/SearchBar";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: jest
    .fn()
    .mockReturnValue(new URLSearchParams("query=nature")),
}));

const initialQuery = "nature";
const setup = () => {
  render(<SearchBar initialQuery={initialQuery} />);
  const input = screen.getByRole("textbox");
  return { input };
};

describe("SearchBar", () => {
  it("has the correct initial query", () => {
    const { input } = setup();
    expect(input).toHaveValue("nature");
  });

  it("updates the value on change", () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: "cat" } });

    expect(input).toHaveValue("cat");
  });

  it("calls router.push with correct query on submit", async () => {
    const { input } = setup();
    const user = userEvent.setup();
    const newQuery = "texture";

    const form = screen.getByRole("form", { name: /search-form/i });

    await user.clear(input);
    await user.type(input, newQuery);
    fireEvent.submit(form);

    expect(mockPush).toHaveBeenCalledWith(`/?query=${newQuery}`);
  });
});
