import LikeButton from "@/components/LikeButton";
import {
  screen,
  render,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as actions from "@/lib/actions";
import { mockGuestId } from "@/jest-setup";

const buttonProps = {
  photoId: 1,
  isLiked: false,
  guestId: mockGuestId
};

describe("LikeButton", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders LikeButton", () => {
    render(<LikeButton {...buttonProps} />);

    const btn = screen.getByRole("button", { name: /like-photo/i });
    const svgIcon = within(btn).getByRole("img", { hidden: true });

    expect(btn).toBeInTheDocument();
    expect(svgIcon).toBeInTheDocument();
  });

  it("should revert liked state if server action fails", async () => {
    render(<LikeButton {...buttonProps} />);
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => { });
    (actions.toggleLikeAction as jest.Mock).mockRejectedValue(
      () =>
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Server Error")), 500);
        })
    );

    const btn = screen.getByRole("button");
    const icon = within(btn).getByRole("img", { hidden: true });

    expect(icon).toHaveClass("text-white");

    fireEvent.click(btn);

    await waitFor(() => {
      expect(icon).toHaveClass("text-red-500");
    });

    await waitFor(
      () => {
        expect(icon).toHaveClass("text-white");
        expect(icon).not.toHaveClass("text-red-500");
      },
      { timeout: 2000 }
    );

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
