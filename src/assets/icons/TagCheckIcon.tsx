type TagCheckIconProps = {
  color: string;
};

const TagCheckIcon = ({ color }: TagCheckIconProps) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Iconography / Metaphor / Check">
        <path
          id="Path 5"
          d="M11.1788 4.17878L6.12897 10.7917L2.17295 6.57705"
          stroke={color}
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default TagCheckIcon;
