import { useTaleStore } from "../../store/talesStore";

const NewTaleFloatingBtn = () => {
  const createTale = useTaleStore((state) => state.createTale);
  const handleCreateTale = () => {
    // Handle creating a new tale here
    console.log("Creating a new tale...");
    createTale({ title: "some title 2" });
  };

  return (
    <button
      onClick={handleCreateTale}
      className="btn btn-primary btn-circle btn-lg fixed bottom-6 right-6 lg: z-50"
      aria-label="Create new tale"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );
};

export default NewTaleFloatingBtn;
