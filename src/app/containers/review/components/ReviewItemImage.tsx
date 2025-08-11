import "@/app/styles/imageShadowStyle.css";

type Props = {
  imageUrl: string;
  className?: string;
};

const ReviewItemImage = ({ imageUrl, className = "h-40 w-40" }: Props) => {
  return (
    <div className={`rounded-lg ${className} image-shadow`}>
      <img src={imageUrl} className="h-full w-full object-cover" />
    </div>
  );
};

export default ReviewItemImage;
