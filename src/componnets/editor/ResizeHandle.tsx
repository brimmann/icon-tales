import { forwardRef } from "react";

const MyHandle = forwardRef((props, ref) => {
  const { handleAxis, ...restProps } = props;
  return (
    <div ref={ref} className={`foo handle-${handleAxis}`} {...restProps} />
  );
});

export default MyHandle;
