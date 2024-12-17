const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-photo/workplace-business-modern-male-accessories-laptop-black-background_155003-3944.jpg?t=st=1733851131~exp=1733854731~hmac=fdacaabda6a67b186f0fcdd1c539bdf69c17799b85ea107e4d34a7ee641fcc97&w=900)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-[#03DAC6]">
            WELCOME TO INNOVIX
          </h1>
          <p className="mb-5 text-[#E6E6E6] ">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button>Welcome</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
