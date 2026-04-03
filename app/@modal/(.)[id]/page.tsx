import DetailsModal from "@/components/DetailsModal";
import { getPhoto } from "@/lib/pexels";

interface IDefaultModalPageProps {
  params: Promise<{ id: string }>;
}
const DefaultModalPage = async ({ params }: IDefaultModalPageProps) => {
  const { id } = await params;
  const { src, alt, width, height, photographer } = await getPhoto(id);
  const ratio = width / height;
  return (
    <DetailsModal
      src={src.original}
      alt={alt}
      ratio={ratio}
      photographer={photographer}
    />
  );
};

export default DefaultModalPage;
