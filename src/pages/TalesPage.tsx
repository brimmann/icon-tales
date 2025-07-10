import { useRef } from "react";
import NewTaleFloatingBtn from "../componnets/tales/NewTaleFloatingBtn";
import Sort from "../componnets/tales/Sort";
import TalesList from "../componnets/tales/TalesList";
import CreateNewTaleModal from "../componnets/tales/CreateNewTaleModal";
import { taleStorageService } from "../services/talesService";

function TalesPage() {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
  return (
    <div className="px-1 max-w-[1024px] mx-auto">
      <div className="flex gap-3 items-center mt-5">
        <Sort />
        <button
          className="btn btn-accent"
          onClick={() => {
            taleStorageService.resetAndSeedTestData();
          }}
        >
          Seed Test Data
        </button>
      </div>
      <div className="divider my-0"></div>
      <TalesList />
      <NewTaleFloatingBtn onOpen={handleOpenModal} />

      <CreateNewTaleModal ref={modalRef} />
    </div>
  );
}

export default TalesPage;
