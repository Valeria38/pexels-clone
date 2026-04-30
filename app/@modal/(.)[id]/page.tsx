import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import { Suspense } from "react";

interface IDefaultModalPageProps {
  params: Promise<{ id: string }>;
}
const DefaultModalPage = async ({ params }: IDefaultModalPageProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <Modal params={params} />
    </Suspense>
  );
};

export default DefaultModalPage;
