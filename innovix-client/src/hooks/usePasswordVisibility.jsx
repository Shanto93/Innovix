import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

const usePasswordVisibility = () => {
  const [visible, setVisible] = useState(false);

  const icon = visible ? <FaEyeSlash /> : <IoEyeSharp />;

  const inputType = visible ? "text" : "password";

  return [icon, inputType, visible, setVisible];
};

export default usePasswordVisibility;
