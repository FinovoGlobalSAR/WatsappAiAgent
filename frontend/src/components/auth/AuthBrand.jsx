import { Bot } from "lucide-react";

export default function AuthBrand() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-2xl bg-[#e7f7f6] border border-[#ccebea] flex items-center justify-center">
        <Bot
          size={25}
          strokeWidth={2}
          className="text-[#0b9297]"
        />
      </div>

      <div>
        <h1 className="text-[20px] font-bold tracking-tight text-[#07363a]">
          FinovoChat AI
        </h1>

        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#779093]">
          WhatsApp AI Agent
        </p>
      </div>
    </div>
  );
}