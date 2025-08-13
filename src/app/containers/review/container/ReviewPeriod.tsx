import Button from "@/app/components/Button";
import { Periods } from "@/app/global";

type Props = {
  selectedPeriod: "short" | "medium" | "long";
  onPeriodChange: (period: "short" | "medium" | "long") => void;
};

const ReviewPeriod = ({ selectedPeriod, onPeriodChange }: Props) => {
  const { ONE_MONTH, SIX_MONTHS, ONE_YEAR } = Periods;
  const periodMap: Record<string, "short" | "medium" | "long"> = {
    [ONE_MONTH]: "short",
    [SIX_MONTHS]: "medium",
    [ONE_YEAR]: "long",
  };
  const periods = [ONE_MONTH, SIX_MONTHS, ONE_YEAR];

  return (
    <div className="my-2 md:my-4 flex gap-4 md:gap-2 items-center">
      {periods.map((label, i) => {
        const key = periodMap[label];
        const active = selectedPeriod === key;

        return (
          <Button
            key={i}
            className={`rounded-lg text-xs ${
              active
                ? "bg-black bg-opacity-50 text-white"
                : "bg-black text-green-600"
            }`}
            textStyle=""
            text={label}
            onClick={() => onPeriodChange(key)}
          />
        );
      })}
    </div>
  );
};
export default ReviewPeriod;
