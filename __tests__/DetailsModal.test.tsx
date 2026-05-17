import { screen, render } from "@testing-library/react";
import DetailsModal from "@/components/DetailsModal";
import { mockPhotoDetails } from "@/__mocks__/pexelsData";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => "/",
}));

const imgId = "12377231";
const imgWidth = 4000;
const imgHeight = 6000;
const modalProps = {
  src: `https://images.pexels.com/photos/${imgId}/pexels-photo-${imgId}.jpeg`,
  previewSrc: `https://images.pexels.com/photos/${imgId}/pexels-photo-${imgId}.jpeg?auto=compress`,
  alt: "Image alt",
  photographer: "Alex Ravvas",
  photoId: 20717537,
  isLiked: false,
  width: imgWidth,
  height: imgHeight,
};

const setup = () => {
  render(<DetailsModal {...modalProps} />);
};

describe("DetailsModal", () => {
  it("renders opened dialog", async () => {
    setup();

    const dialog = await screen.findByRole("dialog");
    const closeIcon = await screen.findByLabelText("close");
    const images = await screen.findAllByRole("img", { name: "Image alt" });

    expect(dialog).toHaveAttribute("data-open");
    expect(closeIcon).toBeInTheDocument();
    expect(images.length).toBe(2);
    expect(images[0]).toHaveAttribute(
      "src",
      expect.stringContaining("auto%3Dcompress")
    );
    expect(images[1]).toHaveAttribute("src", expect.stringContaining(imgId));
  });

  it("has correct image ratio", async () => {
    setup();

    const imgContainer = await screen.findByTestId(
      "details-modal-image-container"
    );

    expect(imgContainer).toHaveStyle(`aspect-ratio: ${imgWidth / imgHeight}`);
    expect(imgContainer).toHaveStyle("width: 380px");
  });

  it("renders like button", async () => {
    setup();

    const likeBtn = await screen.findByRole("button", { name: /like-photo/i });

    expect(likeBtn).toBeInTheDocument();
  });

  it("renders share button", async () => {
    setup();

    const shareBtn = await screen.findByRole("button", {
      name: /share-photo/i,
    });

    expect(shareBtn).toBeInTheDocument();
  });

  it("renders download button", async () => {
    setup();

    const downloadBtn = await screen.findByRole("button", {
      name: /download-photo/i,
    });

    expect(downloadBtn).toBeInTheDocument();
  });
});
