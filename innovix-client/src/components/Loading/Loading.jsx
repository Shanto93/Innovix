import { PacmanLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      {/* <progress className="progress w-56"></progress> */}
      <PacmanLoader color="#FF007F" margin={1} size={25} speedMultiplier={1} />
    </div>
  );
};

export default Loading;
