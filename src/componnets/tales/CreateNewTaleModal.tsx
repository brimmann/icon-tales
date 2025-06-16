import { forwardRef, useState } from "react";
import { useTaleStore } from "../../store/talesStore";
import type { TaleCreateData } from "../../types";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CreateNewTaleModalProps {}

const CreateNewTaleModal = forwardRef<
  HTMLDialogElement,
  CreateNewTaleModalProps
>((_props, ref) => {
  const [title, setTitle] = useState<string>("");
  const createTale = useTaleStore((state) => state.createTale);

  const handleCreate = () => {
    const data: TaleCreateData = {
      title: title,
    };
    createTale(data);
  };

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Enter title of the new tale</h3>
        <p className="py-4">
          Use the following input field to enter title for your new tale.
        </p>
        <input
          type="text"
          className="input w-full"
          placeholder="type here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="modal-action ">
          <form method="dialog">
            <button className="btn btn-primary" onClick={handleCreate}>
              Create Now
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
});

export default CreateNewTaleModal;
