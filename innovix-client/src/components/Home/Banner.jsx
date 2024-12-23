import { motion } from "framer-motion";
import bannerImage from "./../../assets/tablet.jpeg";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative bg-black text-white py-20 overflow-hidden">
      {/* Background Elements */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-0 w-36 h-36 bg-pink-500 opacity-30 rounded-full blur-xl"
      ></motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-500 opacity-30 rounded-full blur-2xl"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Section */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center lg:text-left lg:w-1/2 space-y-6 md:pr-10"
          >
            <h1 className="title">
              Welcome to <br />
              <span className="text-cyan-500">Innovix</span>
            </h1>
            <p className="subtitle">
              Your gateway to cutting-edge technology and unparalleled
              connectivity. Discover the latest devices and exclusive deals now.
            </p>
            <Link to="/products">
              <motion.button
                whileHover={{
                  backgroundColor: "#00FFFF",
                  boxShadow: "0 0 15px #00FFFF",
                  scale: 1.1,
                }}
                className="bg-pink-500 text-black font-semibold py-3 px-8 rounded-md shadow-md mt-5"
              >
                Shop Now
              </motion.button>
            </Link>
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center"
          >
            <div className="cardd p-6 bg-black border-2 border-pink-500 rounded-lg">
              <img
                src={bannerImage}
                alt="Latest Devices"
                className="w-full rounded-md"
              />
              <Link to="/products"><button className="cardd-btn mt-4 w-full">Explore Devices</button></Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
