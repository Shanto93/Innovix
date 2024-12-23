import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState, useEffect } from "react";

const Reviews = () => {
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from the server
  useEffect(() => {
    axiosPublic.get("/all-reviews").then((res) => {
      setReviews(res.data);
    });
  }, [axiosPublic]);

  return (
    <div className="py-10 text-white">
      <div className="max-w-4xl mx-auto">
        <Carousel
          className="rounded-lg shadow-lg overflow-hidden"
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={5000}
          showStatus={false}
        >
          {reviews.map((review) => (
            <div key={review.id} className="p-6">
              <div className="flex flex-col items-center">
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                    <img src={review.photoURL} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mt-4">{review.name}</h3>
                <p className="text-sm text-gray-300 italic mt-2">
                  {review.title}
                </p>
              </div>
              <p className="text-center mt-4 text-lg text-gray-200 mb-8 px-8">
                {review.description}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Reviews;
