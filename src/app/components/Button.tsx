type Props = {
  text: string;
  className: string;
  onClick: () => void;
};

const Button = ({ text, className = "", onClick }: Props) => {
  return (
    <div onClick={onClick} className={`${className}`}>
      <p>{text}</p>
    </div>
  );
};

export default Button;
