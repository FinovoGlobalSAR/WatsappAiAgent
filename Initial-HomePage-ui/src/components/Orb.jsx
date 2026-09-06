import React from "react";

export default function Orb({ small = false }) {
  return (
    <div
      className={`absolute left-1/2 top-[90px] -translate-x-1/2 animate-float ${
        small ? "h-[100px] w-[100px]" : "h-[145px] w-[145px]"
      }`}
    >
      <div className="absolute inset-[28px] grid place-items-center [clip-path:polygon(20%_15%,80%_15%,100%_38%,82%_90%,18%_90%,0_38%)] bg-gradient-to-br from-white to-[#DCE9E9] shadow-[inset_0_0_20px_rgba(11,61,63,.12)]">
        <span className="h-[27px] w-[52px] [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)] bg-gradient-to-br from-[#033232] to-[#18818D] shadow-[0_0_20px_#18818D]" />
      </div>
      <div className="absolute left-1/2 top-1/2 h-[90px] w-[220px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-[50%] border border-[#18818D]/25 [transform:translate(-50%,-50%)_rotateX(67deg)]" />
      <div className="absolute left-1/2 top-1/2 h-[130px] w-[330px] -translate-x-1/2 -translate-y-1/2 animate-spin-slower rounded-[50%] border border-[#18818D]/20 [transform:translate(-50%,-50%)_rotateX(67deg)]" />
      <div className="absolute left-1/2 top-1/2 h-[180px] w-[470px] -translate-x-1/2 -translate-y-1/2 animate-spin-slowest rounded-[50%] border border-[#18818D]/15 [transform:translate(-50%,-50%)_rotateX(67deg)]" />
    </div>
  );
}
