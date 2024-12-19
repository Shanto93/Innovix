import { ClockLoader } from "react-spinners";

const Pending = () => {
  return (
    <div className=" items-center h-screen w-full">
      <h2 className="title text-2xl text-white font-bold">
        Your seller request is currently under review
      </h2>
      <p className="subtitle mt-5">
        Please wait for the Admin&apos;s approval. Thank you for your patience!
      </p>
      <div className="flex justify-center items-center mt-10">
        <div className="mt-5">
          <ClockLoader color="#ff007f" size={200} />
        </div>
      </div>
    </div>
  );
};

export default Pending;
