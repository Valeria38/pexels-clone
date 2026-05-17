import Modal, { IModalProps } from "@/components/Modal";
import { render, screen, waitFor } from "@testing-library/react";
import { getPhoto } from "@/lib/pexels";
import { mockGuestId } from "@/jest-setup";

jest.mock("@/lib/pexels", () => ({
  getPhoto: jest.fn().mockImplementation(async () => {
    const { mockPhotoDetails } = await import("@/__mocks__/pexelsData");
    return mockPhotoDetails;
  }),
}));

jest.mock("next/navigation", () => ({
  useParams: jest.fn().mockReturnValue({ id: 5 }),
  useRouter: () => ({
    push: global.mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => "/",
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    get: jest.fn((name) => {
      if (name === "guest_id") return { value: mockGuestId };
      return undefined;
    }),
  })),
}));

const mockParamId = "5";
const mockProps: IModalProps = {
  params: Promise.resolve({ id: mockParamId }),
};

const setup = async () => {
  const ui = await Modal(mockProps);
  render(ui);
};

describe("Modal", () => {
  it("renders Modal", async () => {
    await setup();

    const modal = await screen.findByRole("dialog");

    expect(modal).toBeInTheDocument();
  });
  it("calls getPhoto function with correct params", async () => {
    await setup();

    await waitFor(() => {
      expect(getPhoto).toHaveBeenCalled();
      expect(getPhoto).toHaveBeenCalledWith(mockParamId);
      expect(getPhoto).toHaveBeenCalledTimes(1);
    });
  });
});
