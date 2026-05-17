import { fireEvent, render, screen, within } from "@testing-library/react";
import Page, { HomePageProps } from "@/app/page";
import { popularTags } from "@/components/Tags";
import { useRouter } from "next/navigation";

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

jest.mock("@/lib/pexels", () => ({
  searchPhotos: jest.fn().mockImplementation(async () => {
    const { mockPhotoList } = await import("@/__mocks__/pexelsData");
    return mockPhotoList;
  }),
}));

const mockProps: HomePageProps = {
  searchParams: Promise.resolve({ query: "nature" }),
};
const setup = async () => {
  const ui = await Page(mockProps);
  const { container } = render(ui);
  return { container };
};

describe("Home page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders the search bar", async () => {
    await setup();

    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/search photos\.\.\./i)
    ).toBeInTheDocument();
  });
  it("renders tags", async () => {
    await setup();

    popularTags.forEach((tag) => {
      expect(
        screen.getByText(new RegExp(`^${tag.value}$`, "i"))
      ).toBeInTheDocument();
    });
    popularTags.forEach((tag) => {
      expect(
        screen.getByRole("img", { name: new RegExp(`^${tag.value}$`, "i") })
      ).toBeInTheDocument();
    });
  });

  it("renders correct Link href", async () => {
    await setup();
    popularTags.forEach(({ value }) => {
      const link = document.querySelector(`a[href="?query=${value}"]`);
      expect(link).toBeInTheDocument();
    });
  });

  it("calls router.push() with correct params", async () => {
    const { container } = await setup();

    const form = within(container).getByRole("form", {
      name: /search-form/i,
    });
    fireEvent.submit(form);
    const { push } = useRouter();
    expect(push).toHaveBeenCalledWith("/?query=nature");
  });
  it("calls router.push() with correct params", async () => {
    const ui = await Page(mockProps);
    const { container } = render(ui);

    const form = within(container).getByRole("form", {
      name: /search-form/i,
    });
    fireEvent.submit(form);

    const { push } = useRouter();
    expect(push).toHaveBeenCalledWith("/?query=nature");
  });
  it("calls router.push() with correct params after search form submit with the new query value", async () => {
    const newQuery = "cat";
    const ui = await Page(mockProps);
    const { container } = render(ui);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: newQuery } });
    const form = within(container).getByRole("form", {
      name: /search-form/i,
    });
    fireEvent.submit(form);

    const { push } = useRouter();
    expect(push).toHaveBeenCalledWith(`/?query=${newQuery}`);
  });
});
