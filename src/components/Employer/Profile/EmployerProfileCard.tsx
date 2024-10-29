const EmployerProfileCard = () => {
  return (
    <div className="px-[1.125rem] pt-5 pb-4 flex items-center gap-4">
      <div className="w-20 h-20 rounded-full overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1458926/pexels-photo-1458926.jpeg?cs=srgb&dl=pexels-poodles2doodles-1458926.jpg&fm=jpg"
          alt="profile image"
        />
      </div>
      <h1>회사 이름</h1>
    </div>
  );
};

export default EmployerProfileCard;
