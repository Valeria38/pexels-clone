import { screen, render } from "@testing-library/react";
import Tag from "@/components/Tag";
import { StaticImageData } from "next/image";

const mockStaticImage: StaticImageData = {
  src: "/_next/static/media/wallpaper.avif",
  height: 100,
  width: 100,
  blurDataURL: "data:image/png;base64,imafakeblurdata",
  blurWidth: 10,
  blurHeight: 10,
};

const props = {
  value: "wallpaper",
  imgSrc: mockStaticImage,
};
const setup = () => {
  render(<Tag {...props} />);
};

describe("Tag", () => {
  it("renders tag text", () => {
    setup();

    const p = screen.getByText("wallpaper");

    expect(p).toBeInTheDocument();
    expect(p.tagName).toBe("P");
    expect(p).toHaveClass("text-gray-500");
  });

  it("renders link", () => {
    setup();

    const link = screen.getByRole("link", {
      name: new RegExp(props.value, "i"),
    });

    expect(link).toBeInTheDocument();
  });

  it("renders image", () => {
    setup();

    const img = screen.getByRole("img", { name: new RegExp(props.value, "i") });

    expect(img).toBeInTheDocument();
  });
});
