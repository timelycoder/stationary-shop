import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setTimeout(() => navigate("/"), 0);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="text-center p-10">
      <h2 className="text-2xl font-bold text-red-500">Unauthorized User</h2>
      <p className="text-lg">You do not have the necessary permissions to view this page.</p>
      <p>
        Redirecting to homepage in <span className="text-lg font-bold">{secondsLeft}</span> second
        {secondsLeft !== 1 ? "s" : ""}...
      </p>
    </div>
  );
};

export default Unauthorized;
