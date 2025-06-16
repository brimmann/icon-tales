import { useEffect } from "react";
import { useTaleStore } from "../../store/talesStore";
import TaleItem from "./TaleItem";

function TalesList() {
  const getTales = useTaleStore((state) => state.getTales);

  useEffect(() => {
    const loadData = async () => {
      await getTales();
    };
    loadData();
  }, [getTales]);

  const tales = useTaleStore((state) => state.tales);
  return (
    <div>
      {tales.map((tale) => (
        <TaleItem key={tale.id} tale={tale.title} />
      ))}
    </div>
  );
}

export default TalesList;
