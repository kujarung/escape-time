export const CommonButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) => {
  return (
    <button className="common-button" onClick={onClick}>
      <span>{text}</span>
    </button>
  );
};
