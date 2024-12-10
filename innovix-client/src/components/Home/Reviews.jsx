import UserReview from "./Cards/UserReview";

const Reviews = () => {
  return (
    <div className="gap-5 md:flex justify-center items-center">
      <UserReview></UserReview>
      <UserReview></UserReview>
      <UserReview></UserReview>
      <UserReview></UserReview>
    </div>
  );
};

export default Reviews;
