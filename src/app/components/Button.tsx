type Props = {
  text: string;
  textStyle: string;
  className: string;
  onClick: () => void;
};

const Button = ({ text, className = "", textStyle = "", onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`p-2 hover:scale-105 transition duration-200 cursor-pointer flex items-center justify-center rounded-lg hover:bg-opacity-80 ${className}`}
    >
      <p className={textStyle}>{text}</p>
    </div>
  );
};

export default Button;
