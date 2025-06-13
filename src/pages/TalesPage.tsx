import NewTaleFloatingBtn from "../componnets/tales/NewTaleFloatingBtn";
import Sort from "../componnets/tales/Sort";
import TalesList from "../componnets/tales/TalesList";

function TalesPage() {
  return (
    <div className="px-1 max-w-[1024px] mx-auto">
      <Sort />
      <div className="divider my-0"></div>
      <TalesList />
      <NewTaleFloatingBtn />
    </div>
  );
}

export default TalesPage;
