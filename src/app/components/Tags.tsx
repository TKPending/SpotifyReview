import { capitaliseSpaceTags } from "@/app/util/capitaliseSpaceTags";

type Props = {
  tags: string[];
};

const Tags = ({ tags = [] }: Props) => {
  return (
    <div className="flex gap-2">
      {tags.map((item, index) => (
        <div
          key={index}
          className="p-2 bg-green-600 text-white rounded-lg text-xs"
        >
          <p className="font-semibold text-[11px]">
            {capitaliseSpaceTags(item)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Tags;
