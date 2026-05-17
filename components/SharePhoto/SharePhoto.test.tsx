import SharePhoto from "@/components/SharePhoto";
import { render, within, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import "jest-location-mock";

const mockWriteText = jest.fn();
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: mockWriteText,
  },
  configurable: true,
});

const mockParams = {
  id: "65",
  query: "nature",
};
jest.doMock("next/navigation", () => ({
  usePathname: () => mockParams.id,
  useSearchParams: jest
    .fn()
    .mockReturnValue(new URLSearchParams(`query=${mockParams.query}`)),
  useParams: jest.fn().mockReturnValue({}),
}));
const mockProps = {
  url: "https://www.pexels.com/photo/a-green-trees-in-the-forest-12377231/",
  photographer: "Danil Lysov",
};

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const setup = () => {
  const user = userEvent.setup();
  render(<SharePhoto {...mockProps} />);

  const shareButton = screen.getByRole("button", { name: /share-photo/i });

  return { user, shareButton };
};
describe("SharePhoto", () => {
  it("renders share button only be default", () => {
    const { shareButton } = setup();

    const modal = screen.queryByRole("dialog");

    expect(shareButton).toBeInTheDocument();
    expect(modal).not.toBeInTheDocument();
  });

  it("renders modal after button was clicked", async () => {
    const { user, shareButton } = setup();

    await user.click(shareButton);

    const modal = screen.getByRole("dialog");
    const heading = within(modal).getByRole("heading", {
      level: 3,
      name: /share this with your community/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("copies url to clipboard on button click", async () => {
    const origin = "https://test-origin.com";
    window.location.assign(origin);
    const { user, shareButton } = setup();

    await user.click(shareButton);
    const copyButton = screen.getByRole("button", { name: /copy-url-button/i });
    await user.click(copyButton);

    waitFor(() =>
      expect(mockWriteText).toHaveBeenCalledWith(`${origin}/${mockParams.id}`)
    );
  });

  it("shows success toast after copying url", async () => {
    const { user, shareButton } = setup();

    await user.click(shareButton);
    const copyButton = screen.getByRole("button", { name: /copy-url-button/i });
    await user.click(copyButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Copied!");
    });
  });

  it("shows error toast after copying url failed", async () => {
    const errorMessage = "clipboard error";
    const { user, shareButton } = setup();
    const spy = jest
      .spyOn(navigator.clipboard, "writeText")
      .mockRejectedValue(new Error(errorMessage));

    await user.click(shareButton);
    const copyButton = screen.getByRole("button", { name: /copy-url-button/i });
    await user.click(copyButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining(errorMessage)
      );
    });
    spy.mockRestore();
  });
});
