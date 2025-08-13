import Button from "@/app/components/Button";
import { Periods } from "@/app/global";

const ReviewPeriod = () => {
  const { ONE_MONTH, SIX_MONTHS, ONE_YEAR } = Periods;
  const periods: string[] = [ONE_MONTH, SIX_MONTHS, ONE_YEAR];

  const handlePeriodChange = (period: string) => {};

  return (
    <div className="my-4 flex gap-2 items-center">
      {periods.map((period: string, index: number) => (
        <Button
          key={index}
          className="bg-black rounded-lg text-xs"
          textStyle="text-green-600"
          text={period}
          onClick={() => handlePeriodChange(period)}
        />
      ))}
    </div>
  );
};
export default ReviewPeriod;
