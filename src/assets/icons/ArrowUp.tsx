type Props = {
  isMarked: boolean;
};

const ArrowIcon = ({ isMarked }: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Iconography / Metaphor / ArrowUp">
        <path
          id="Path 5"
          d="M2.91667 12.9167L10 5.83333L17.0833 12.9167"
          stroke={isMarked ? '#1E1926' : '#BDBDBD'}
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};

export default ArrowIcon;