import { Link } from "react-router";
import image from "./../../assets/about_us.png";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <section className=" text-white py-12 px-6 md:px-16">
      <Helmet>
        <title>Innovix | About</title>
      </Helmet>
      <div className="max-w-5xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#FF007F] mb-4">
          About <span className="text-[#00FFFF]">INNOVIX</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          Your One-Stop Shop for the Latest and Greatest Mobile Devices
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={image}
            alt="Innovix Mobile Shop"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Text Section */}
        <div>
          <h2 className="text-3xl font-semibold text-[#FF007F] mb-4">
            Who We Are
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            At <span className="text-[#00FFFF]">INNOVIX</span>, we pride
            ourselves on delivering cutting-edge mobile devices and exceptional
            customer service. Founded with a vision to connect people through
            technology, we’ve become a trusted destination for mobile
            enthusiasts and professionals alike.
          </p>

          <h2 className="text-3xl font-semibold text-[#FF007F] mb-4">
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed">
            To empower people with technology that enhances their lives. Whether
            you&apos;re looking for the latest flagship device or
            budget-friendly options, we’re here to make it happen.
          </p>

          {/* Button */}
          <div className="mt-6">
            <Link to="/products">
              <button className="bg-[#FF007F] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-[#00FFFF] hover:shadow-[0_0_15px_#00FFFF] transition duration-300">
                Explore Our Products
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold text-center text-[#00FFFF] mb-8">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-[0_0_15px_#00FFFF] transition duration-300">
            <h3 className="text-2xl font-bold text-[#FF007F] mb-4">
              Latest Technology
            </h3>
            <p className="text-gray-300">
              Stay ahead with our selection of the newest and most innovative
              mobile devices on the market.
            </p>
          </div>

          {/* Value Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-[0_0_15px_#00FFFF] transition duration-300">
            <h3 className="text-2xl font-bold text-[#FF007F] mb-4">
              Affordable Prices
            </h3>
            <p className="text-gray-300">
              Get top-notch devices at prices that won’t break the bank.
              Innovation for everyone.
            </p>
          </div>

          {/* Value Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-[0_0_15px_#00FFFF] transition duration-300">
            <h3 className="text-2xl font-bold text-[#FF007F] mb-4">
              Trusted Support
            </h3>
            <p className="text-gray-300">
              Our dedicated team is here to help you find the perfect mobile
              device for your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
