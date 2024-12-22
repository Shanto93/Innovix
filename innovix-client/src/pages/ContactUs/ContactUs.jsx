import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

const ContactUs = () => {
  const handleContact = () => {
    toast.success(
      "Your information has been submited. Thank you for your response."
    );
  };

  return (
    <div className="min-h-screen text-white py-16 px-6">
      <Helmet>
        <title>Innovix | Contact Us</title>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 title">
          Contact Us
        </h1>
        <p className="text-center text-lg mb-12 subtitle">
          We’d love to hear from you! Whether you have a question about our
          products, pricing, or anything else, our team is ready to answer all
          your inquiries.
        </p>
        <form onClick={handleContact} className="space-y-8">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-2 label">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full input"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full input"
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block mb-2 label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Enter subject"
              className="w-full input"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block mb-2 label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here"
              className="w-full h-32 textarea"
            ></textarea>
          </div>

          <button type="submit" className="w-full py-3 button">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
