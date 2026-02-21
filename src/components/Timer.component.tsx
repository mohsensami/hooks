import { useState } from "react";
import useTimer from "../hooks/useTimer";

export default function TimerComponent() {
  const [otp, setOtp] = useState("");

  const { formattedTime, isRunning, start, reset } = useTimer({
    initialTime: 30,
    mode: "countdown",
  });

  // ارسال اولیه کد
  const sendCode = () => {
    console.log("OTP Sent ✅");
    reset(30);
    start();
  };

  // ارسال مجدد
  const resendCode = () => {
    console.log("OTP Resent 🔁");
    reset(30);
    start();
  };

  return (
    <div style={{ width: 300, margin: "40px auto" }}>
      <h3>OTP Verification</h3>

      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter code"
        style={{ width: "100%", padding: 8 }}
      />

      <button onClick={sendCode} style={{ marginTop: 10, width: "100%" }}>
        Send Code
      </button>

      <div style={{ marginTop: 15, textAlign: "center" }}>
        {isRunning ? (
          <span>Resend available in {formattedTime}</span>
        ) : (
          <button onClick={resendCode}>Resend Code</button>
        )}
      </div>
    </div>
  );
}
