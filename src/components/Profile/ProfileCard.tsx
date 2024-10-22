const ProfileCard = () => {
  return (
    <div
      className="px-[1.125rem] pt-5 pb-4 flex items-center gap-4 rounded-[1.125rem]"
      style={{ background: 'rgba(255, 255, 255, 0.50)' }}
    >
      <div className="w-20 h-20 rounded-full overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1458926/pexels-photo-1458926.jpeg?cs=srgb&dl=pexels-poodles2doodles-1458926.jpg&fm=jpg"
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="head-3 text-[#1E1926]">First name Last name</div>
        <div className="body-3 text-[#656565]">0000.00.00</div>
        <div>
          <span className="body-2 text-[#1E1926]">Dongguk University</span>
          <span className="body-2 text-[#1E1926]">Grade 3</span>
        </div>
        <div>
          <span className="body-3 text-[#464646]">Grade Point Average</span>
          <span className="body-3 text-[#464646]">3.5</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
