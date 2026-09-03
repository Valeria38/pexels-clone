import { Suspense } from "react";

import Loader from "@/components/Loader";
import Modal from "@/components/Modal";

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
