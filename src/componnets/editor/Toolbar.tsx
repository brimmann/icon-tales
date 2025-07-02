import TextBoxFormatingTools from "./TextBoxFormatingTools";
import ZoomTools from "./ZoomTools";

const Toolbar: React.FC = () => {
  return (
    <div className="tool-bar bg-white top-0.5 lg:top-4 absolute left-0 right-0 max-w-fit mx-auto z-50 flex flex-nowrapb overflow-x-auto">
      <TextBoxFormatingTools />
      <div className="divider divider-horizontal p-1"></div>
      <ZoomTools />
    </div>
  );
};

export default Toolbar;
