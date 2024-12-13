import { PacmanLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      {/* <progress className="progress w-56"></progress> */}
      <PacmanLoader color="#680ff7" margin={1} size={17} speedMultiplier={1} />
    </div>
  );
};

export default Loading;
