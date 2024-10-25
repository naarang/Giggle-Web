const HomeGuestBanner = () => {
  return (
    <section className="w-full px-[1.5rem] pb-[2.75rem] bg-[#FEF387]">
      <div className="flex flex-col justify-center items-center gap-[0.25rem] relative px-[2.5rem] pt-[1rem] pb-[2rem] rounded-t-[1.5rem] bg-cover bg-center bg-[url('/src/assets/images/yellowGradient.png')]">
        <h3 className="head-3 text-[#1E1926] text-center">
          Sign In to Unlock Your <br />
          Gig Opportunities!
        </h3>
        <p className="caption-1 text-[#656565] text-center">
          Get personalized job recommendations, track your applications, and
          access exclusive opportunities. Sign in now to get started!
        </p>
        <button className="absolute bottom-[-1.25rem] left-0 w-full py-[0.75rem] rounded-[1.25rem] text-center text-white button-2 bg-[#1E1926]">
          Sign In
        </button>
      </div>
    </section>
  );
};

export default HomeGuestBanner;
