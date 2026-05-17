import { render, screen } from "@testing-library/react";
import DetailsPage, { PhotoDetailsProps } from "@/app/[id]/page";
import { mockPhotoDetails, photographerUrl } from "@/__mocks__/pexelsData";

jest.mock("@/lib/pexels", () => ({
  getPhoto: jest.fn().mockImplementation(async () => {
    const { mockPhotoDetails } = await import("@/__mocks__/pexelsData");
    return mockPhotoDetails;
  }),
}));

const mockGuestId = "test_guest_id";
jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    get: jest.fn((name) => {
      if (name === "guest_id") return { value: mockGuestId };
      return undefined;
    }),
  })),
}));

const mockProps: PhotoDetailsProps = {
  params: Promise.resolve({ id: "105" }),
};

describe("Details Page", () => {
  let originalScrollRestoration: ScrollRestoration;
  const scrollToSpy = jest.fn();
  const requestAnimationFrameSpy = jest.spyOn(window, "requestAnimationFrame");

  beforeEach(() => {
    window.scrollTo = scrollToSpy;

    originalScrollRestoration = window.history.scrollRestoration;
    Object.defineProperty(window.history, "scrollRestoration", {
      value: "auto",
      writable: true,
      configurable: true,
    });

    requestAnimationFrameSpy.mockImplementation((cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    if (originalScrollRestoration) {
      window.history.scrollRestoration = originalScrollRestoration;
    }
  });

  it("should render Like, Share & Download buttons", async () => {
    const ui = await DetailsPage(mockProps);
    render(ui);

    const likeBtn = screen.getByRole("button", { name: /like-photo/i });
    const shareBtn = screen.getByRole("button", { name: /share-photo/i });
    const downloadBtn = screen.getByRole("button", { name: /download-photo/i });

    expect(likeBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(downloadBtn).toBeInTheDocument();
  });

  it("should render ScrollReset component", async () => {
    const ui = await DetailsPage(mockProps);
    render(ui);

    expect(window.history.scrollRestoration).toBe("manual");

    expect(scrollToSpy).toHaveBeenCalledTimes(2);
    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    expect(requestAnimationFrameSpy).toHaveBeenCalled();
  });

  it("should render View Profile link", async () => {
    const ui = await DetailsPage(mockProps);
    render(ui);

    const link = screen.getByRole("link", { name: /view profile/i });

    expect(link).toHaveAttribute("href", photographerUrl);
  });

  it("should render image", async () => {
    const ui = await DetailsPage(mockProps);
    render(ui);

    const image = screen.getByRole("img", {
      name: new RegExp(mockPhotoDetails.alt, "i"),
    });

    expect(image).toBeInTheDocument();
  });

  it("should render ratio, dimensions and main color info", async () => {
    const ui = await DetailsPage(mockProps);
    render(ui);
    const { width, height, avg_color } = mockPhotoDetails;
    const expectedDimensions = `${width} x ${height}`;
    const expectedRatio = (width / height).toFixed(2);

    const ratio = screen.getByText(expectedRatio);
    const dimensions = screen.getByText(expectedDimensions);
    const color = screen.getByText(avg_color);

    expect(ratio).toBeInTheDocument();
    expect(dimensions).toBeInTheDocument();
    expect(color).toBeInTheDocument();
  });

  it("should render popular tags", async () => {
    const ui = await DetailsPage(mockProps);
    render(ui);

    const tagsText = screen.getByText(/popular tags/i);

    expect(tagsText).toBeInTheDocument();
  });
});
