import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ContactUs = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ name, email, subject, message }) => {
    const userData = { name, email, subject, message };

    try {
      const res = await axiosPublic.post("/contact-us-info", userData);
      if (res.data.insertedId) {
        toast.success(
          "Your information has been saved. Thank you for your response."
        );
        reset();
      }
    } catch (error) {
      toast.error("Failed to send your information. Please try again.");
      console.error("Error:", error);
    }
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-2 label">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name"
              className={`w-full input ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Enter your email"
              className={`w-full input ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block mb-2 label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              {...register("subject", { required: "Subject is required" })}
              placeholder="Enter subject"
              className={`w-full input ${
                errors.subject ? "border-red-500" : ""
              }`}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block mb-2 label">
              Message
            </label>
            <textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              placeholder="Write your message here"
              className={`w-full h-32 textarea ${
                errors.message ? "border-red-500" : ""
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
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
