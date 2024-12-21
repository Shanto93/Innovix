import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ContactInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex justify-center items-center p-12 h-full rounded-lg border border-[#00BFFF] shadow-md max-w-3xl mx-auto mt-8 text-center bg-[#1a1a1a] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_#00FFFF]"
    >
      <div className="flex justify-center space-x-10">
        <motion.a
          whileHover={{ scale: 1.3 }}
          href="https://www.facebook.com/shanto.islam.98478672/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-5xl"
        >
          <FaFacebook />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.3 }}
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 text-5xl"
        >
          <FaWhatsapp />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.3 }}
          href="https://www.instagram.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 text-5xl"
        >
          <FaInstagram />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.3 }}
          href="shantoislam7363@gmail.com"
          className="text-blue-600 text-5xl"
        >
          <FaEnvelope />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.3 }}
          href="tel:+8801997266467"
          className="text-blue-800 text-5xl"
        >
          <FaPhone />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ContactInfo;
