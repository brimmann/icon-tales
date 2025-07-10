import { useDataStore } from "../../store/dataStore";
import TaleItem from "./TaleItem";

function TalesList() {
  const talesMetaData = useDataStore((state) => state.talesMetaData);
  return (
    <div>
      {talesMetaData.map((taleMetaData) => (
        <TaleItem
          key={taleMetaData.id}
          taleTitle={taleMetaData.title}
          taleId={taleMetaData.id}
        />
      ))}
    </div>
  );
}

export default TalesList;
