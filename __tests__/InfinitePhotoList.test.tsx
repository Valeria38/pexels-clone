import { render, screen, waitFor } from "@testing-library/react";
import InfinitePhotoList from "@/components/InfinitePhotoList";
import { searchPhotos } from "@/lib/pexels";
import { mockPhotoList } from "@/__mocks__/pexelsData";

jest.mock("next/navigation", () => ({
  useSearchParams: jest
    .fn()
    .mockReturnValue(new URLSearchParams("query=nature")),
  useParams: jest.fn().mockReturnValue({}),
}));

jest.mock("@/lib/pexels", () => ({
  searchPhotos: jest.fn().mockImplementation(async () => {
    const { mockPhotoList } = await import("@/__mocks__/pexelsData");
    return mockPhotoList;
  }),
}));

describe("InfinitePhotoList Integration", () => {
  it("should load more photos when observer intersects the target", async () => {
    const initial = mockPhotoList;
    const nextBatch = {
      photos: [
        {
          alt: "A peaceful wildflower meadow with purple blooms in Toronto, Ontario during summer.",
          avg_color: "#7E7A6E",
          height: 6240,
          id: 17347599,
          liked: false,
          photographer: "Yasemin Gunes",
          photographer_id: 327517046,
          photographer_url: "https://www.pexels.com/@yasemin-gunes-327517046",
          src: {
            original:
              "https://images.pexels.com/photos/17347599/pexels-photo-17347599.jpeg",
            large:
              "https://images.pexels.com/photos/17347599/pexels-p…347599.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          },
          url: "https://www.pexels.com/photo/wild-flowers-17347599/",
          width: 4160,
        },
      ],
    };

    (searchPhotos as jest.Mock).mockImplementation(
      () => new Promise((res) => setTimeout(() => res(nextBatch), 200))
    );

    render(<InfinitePhotoList initialPhotos={initial} />);

    Object.defineProperty(window, "scrollY", { value: 100, writable: true });

    waitFor(() => {
      (global as any).simulateIntersection(true);
    });

    const loader = await screen.findByTestId("infinite-photo-list-loader");

    expect(loader).toBeInTheDocument();
    expect(
      await screen.findByRole("img", { name: /peaceful wildflower/i })
    ).toBeInTheDocument();
  });
});
