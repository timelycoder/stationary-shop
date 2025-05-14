type Props = {
  amount: number;
  className?: string;
};

const FormatTaka = ({ amount, className = "" }: Props) => {
  const formatted = amount.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <span className={`inline-flex items-baseline gap-1 ${className}`}>
      <span className="text-[15px] font-bold">৳</span>
      <span>{formatted}</span>
    </span>
  );
};

export default FormatTaka;
