import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

const useConfirmPasswordVisibility = () => {
  const [visibleconfirm, setVisibleconfirm] = useState(false);

  const iconconfirm = visibleconfirm ? <FaEyeSlash /> : <IoEyeSharp />;

  const inputTypeconfirm = visibleconfirm ? "text" : "password";

  return [iconconfirm, inputTypeconfirm, visibleconfirm, setVisibleconfirm];
};

export default useConfirmPasswordVisibility;
