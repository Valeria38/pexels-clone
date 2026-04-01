export interface ImageResponse {
  photos: Photo[];
  page: number;
  per_page: number;
  total_results: number;
  next_page?: string;
  prev_page?: string;
}

export interface Photo {
  alt: string;
  url: string;
  id: number;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    small: string;
    medium: string;
    large: string;
    large2x: string;
  };
  width: number;
  height: number;
  avg_color?: string;
}
