import "@/app/styles/animatedBackgroundStyle.css";

type Props = {
  children: React.ReactNode;
}

const AnimatedBackground = ({ children }: Props) => {
  return (
    <div className="area bg-black">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      {children}
    </div>
  );
};

export default AnimatedBackground;
