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

  it("should generate and save new guest_id if localStorage is empty", async () => {
    const user = userEvent.setup();
    render(<LikeButton {...buttonProps} />);

    const likeBtn = screen.getByRole("button", { name: /like-photo/i });
    const guestIdBefore = localStorage.getItem("guest_id");
    expect(guestIdBefore).toBe(null);

    await user.click(likeBtn);
    const guestIdAfter = localStorage.getItem("guest_id");

    expect(guestIdAfter).toBeDefined();
    expect(guestIdAfter).toBe(mockGuestId);
    expect(actions.toggleLikeAction).toHaveBeenCalledWith(
      1,
      guestIdAfter,
      !buttonProps.isLiked
    );
    expect(actions.toggleLikeAction).toHaveBeenCalledTimes(1);
  });

  it("should use existing guest_id from localStorage", async () => {
    const user = userEvent.setup();
    const existingId = "existing-id";
    localStorage.setItem("guest_id", existingId);

    render(<LikeButton {...buttonProps} />);
    const likeBtn = screen.getByRole("button", { name: /like-photo/i });

    await user.click(likeBtn);

    expect(actions.toggleLikeAction).toHaveBeenCalledWith(
      1,
      existingId,
      !buttonProps.isLiked
    );

    expect(localStorage.getItem("guest_id")).toBe(existingId);
  });

  it("should revert liked state if server action fails", async () => {
    render(<LikeButton {...buttonProps} />);
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
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
