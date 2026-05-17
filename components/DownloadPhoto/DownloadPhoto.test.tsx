import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DownloadPhoto from ".";
import { handleDownload } from "@/lib/utils";

jest.mock("@/lib/utils", () => ({
  handleDownload: jest.fn(),
}));
const mockProps = {
  imageUrl:
    "https://images.pexels.com/photos/35771810/pexels-photo-35771810.jpeg",
  filename:
    "Sunlight_filtering_through_leaves_illuminates_a_tranquil_forest_scene_with_lush_greenery.",
};
describe("DownloadPhoto", () => {
  it("renders download button", () => {
    render(<DownloadPhoto {...mockProps} />);

    const downloadBtn = screen.getByRole("button", { name: /download-photo/i });
    const icon = within(downloadBtn).getByRole("img", { hidden: true });

    expect(downloadBtn).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it("calls onClick handler", async () => {
    render(<DownloadPhoto {...mockProps} />);
    const user = userEvent.setup();

    const downloadBtn = screen.getByRole("button", { name: /download-photo/i });

    await user.click(downloadBtn);

    expect(handleDownload).toHaveBeenCalledTimes(1);
    expect(handleDownload).toHaveBeenCalledWith(
      mockProps.imageUrl,
      mockProps.filename
    );
  });
});
