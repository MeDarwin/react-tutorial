import { useAsyncError } from "react-router-dom";

const RootBoundary = () => {
  const asyncError = useAsyncError();
  console.log(asyncError);
  return <div>Something went wrong!</div>;
};

export default RootBoundary;
