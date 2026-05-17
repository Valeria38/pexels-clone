import { mockPhotoList } from "@/__mocks__/pexelsData";
import MasonryGrid, {
  IPhotoImageProps,
  PhotoImage,
} from "@/components/MasonryGrid";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";

const gridProps = {
  photos: mockPhotoList,
};

describe("MasonryGrid", () => {
  it("renders masonry grid", async () => {
    render(<MasonryGrid {...gridProps} />);

    const grid = screen.getByRole("list", { name: /photo gallery/i });

    expect(grid).toBeInTheDocument();
  });
});

const photoImageProps = {
  alt: "A serene stream flowing through lush greenery in Manzanares el Real, Spain",
  src: "https://images.pexels.com/photos/32162196/pexels-photo-32162196.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  height: 4016,
  width: 2259,
  priority: false,
};

const setup = (props: Partial<IPhotoImageProps> = {}) => {
  const allProps = {
    ...photoImageProps,
    ...props,
  };
  render(<PhotoImage {...allProps} />);
  return allProps;
};

describe("PhotoImage", () => {
  it("renders image with correct props", () => {
    const { alt, src } = setup();

    const img = screen.getByRole("img", { name: alt });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(src))
    );
  });

  test("should show pulse animation when image is not loaded", async () => {
    setup();

    const listItem = screen.getByRole("listitem");
    expect(listItem).toHaveClass("animate-pulse");

    const img = await screen.findByRole("img");

    fireEvent.load(img);

    waitFor(() => {
      expect(listItem).not.toHaveClass("animate-pulse");
    });
  });

  it("has correct aspect ratio style on container", () => {
    const { width, height } = setup({
      width: 2000,
      height: 4000,
    });

    const listItem = screen.getByRole("listitem");

    expect(listItem).toHaveStyle(`aspectRatio: ${width / height}`);
  });
});
