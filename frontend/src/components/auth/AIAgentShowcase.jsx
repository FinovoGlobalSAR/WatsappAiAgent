import {
  BookOpen,
  UserRound,
  Sparkles,
  MessageCircle,
  Brain,
  BarChart3,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function AIAgentShowcase() {
  return (
    <section className="relative hidden md:flex w-full h-full min-h-[700px] overflow-hidden rounded-[24px] lg:rounded-[28px] bg-[#032f32] text-white ai-grid ai-glow">
      <div className="absolute w-[420px] h-[420px] rounded-full bg-[#00a9a5]/10 blur-[100px] -top-32 -right-20" />

      <div className="absolute w-[360px] h-[360px] rounded-full bg-[#078a91]/10 blur-[100px] bottom-0 left-0" />

      <div className="relative z-10 w-full min-h-full p-7 lg:p-9 xl:p-11 flex flex-col">
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
              <ShieldCheck size={17} className="text-[#73e3dc]" />
            </div>

            <span className="text-[12px] font-medium text-[#b6d6d7]">
              Secure • Reliable • Trusted
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#6fe1d9]">
            <span className="w-2 h-2 rounded-full bg-[#35e0bb] animate-pulse" />
            AI Agent Online
          </div>
        </div>

        <div className="mt-7 shrink-0">
          <h2 className="text-[29px] lg:text-[33px] xl:text-[37px] leading-[1.12] font-bold tracking-tight">
            24/7 AI conversations
            <br />
            <span className="text-[#70e1db]">
              that scale with your business.
            </span>
          </h2>

          <p className="mt-3 text-[13px] lg:text-[13px] xl:text-[14px] leading-6 text-[#a7c4c6] max-w-[510px]">
            Turn every WhatsApp message into a helpful conversation. Automate
            replies, capture leads, and let your AI agent handle customer
            questions around the clock.
          </p>
        </div>

        <div className="flex-1 min-h-0 mt-7 lg:mt-8 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-4 lg:gap-5 max-w-[700px] mx-auto w-full">
            <CustomerCard />
            <AIAgentCard />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-5 max-w-[700px] mx-auto w-full mt-4 lg:mt-5">
            <KnowledgeBaseCard />
            <LeadCapturedCard />
          </div>
        </div>

        <div className="shrink-0 mt-6">
          <div className="rounded-2xl border border-[#216b6d] bg-[#07383a]/90 backdrop-blur-xl px-4 lg:px-5 py-4">
            <div className="grid grid-cols-4 divide-x divide-[#276568]">
              <Feature
                icon={MessageCircle}
                title="Auto Reply"
                subtitle="Instant AI answers"
              />

              <Feature
                icon={UserRound}
                title="Capture Leads"
                subtitle="Never miss a lead"
              />

              <Feature
                icon={Brain}
                title="Smart Handover"
                subtitle="Human when needed"
              />

              <Feature
                icon={BarChart3}
                title="Insights"
                subtitle="Track & improve"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-[105px] right-[8%] xl:right-[12%] hidden lg:block pointer-events-none">
        <div className="relative w-[110px] h-[110px] xl:w-[125px] xl:h-[125px] rounded-full border border-[#1a7779]/50 flex items-center justify-center ai-pulse">
          <div className="absolute inset-[15px] rounded-full border border-[#1b999a]/40" />

          <div className="absolute inset-[28px] xl:inset-[30px] rounded-full bg-[#0a6265]/40 border border-[#38cbc6]/30 flex items-center justify-center">
            <MessageCircle
              size={38}
              strokeWidth={1.6}
              className="text-[#c4fffb]"
            />
          </div>

          <span className="absolute -top-1 right-5 w-2 h-2 rounded-full bg-[#42d9c0]" />
          <span className="absolute bottom-2 left-4 w-2 h-2 rounded-full bg-[#42d9c0]" />
        </div>
      </div>
    </section>
  );
}

function CustomerCard() {
  return (
    <div className="rounded-2xl border border-[#2a7779] bg-[#083e40]/90 backdrop-blur-xl p-4 shadow-2xl float-slow min-h-[205px]">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-[#19b79e] flex items-center justify-center">
          <UserRound size={17} />
        </div>

        <div>
          <p className="text-[12px] font-semibold">Customer</p>
          <p className="text-[10px] text-[#45d5ba]">Online</p>
        </div>
      </div>

      <div className="rounded-xl rounded-tl-sm bg-white text-[#183c3f] p-3 max-w-[230px]">
        <p className="text-[11px] leading-5">
          Hi, do you offer same-day delivery in Karachi?
        </p>

        <p className="text-[9px] text-[#829396] text-right mt-1">10:45 AM</p>
      </div>

      <div className="flex justify-end mt-3">
        <div className="rounded-xl rounded-tr-sm bg-[#078f91] text-white p-3 max-w-[240px] message-glow">
          <p className="text-[11px] leading-5">
            Yes! We offer same-day delivery for orders placed before 5 PM.
          </p>

          <div className="flex justify-end items-center gap-1 mt-1">
            <span className="text-[9px] opacity-70">10:45 AM</span>
            <CheckCircle2 size={10} />
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-1">
        <span className="w-2 h-2 bg-[#7fb1b2] rounded-full" />
        <span className="w-2 h-2 bg-[#7fb1b2] rounded-full" />
        <span className="w-2 h-2 bg-[#7fb1b2] rounded-full" />
      </div>
    </div>
  );
}

function AIAgentCard() {
  return (
    <div className="rounded-2xl border border-[#317d7e] bg-[#073a3d]/95 backdrop-blur-xl p-4 shadow-2xl float-medium min-h-[205px]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#087d7f] flex items-center justify-center">
          <Sparkles size={15} className="text-[#7cf4df]" />
        </div>

        <div>
          <p className="text-[11px] font-semibold">AI Agent</p>
          <p className="text-[9px] text-[#4de0bf]">Answered instantly</p>
        </div>
      </div>

      <div className="rounded-xl border border-[#286a6c] bg-[#0a4547] p-3">
        <p className="text-[10px] leading-5 text-[#c6dddd]">
          Used knowledge base to answer delivery policy.
        </p>

        <div className="mt-4">
          <div className="flex justify-between text-[9px] mb-1.5">
            <span className="text-[#88adaf]">Confidence</span>
            <span className="text-[#63ddc3]">98%</span>
          </div>

          <div className="h-1.5 bg-[#1a5c5f] rounded-full overflow-hidden">
            <div className="h-full w-[98%] bg-[#35cfc0] rounded-full" />
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          <span className="px-2 py-1 rounded-md bg-[#0d5a5b] text-[8px] text-[#a8dcda]">
            Delivery Policy
          </span>

          <span className="px-2 py-1 rounded-md bg-[#0d5a5b] text-[8px] text-[#a8dcda]">
            FAQ Match
          </span>
        </div>
      </div>
    </div>
  );
}

function KnowledgeBaseCard() {
  return (
    <div className="rounded-2xl border border-[#2a7274] bg-[#073a3d]/95 backdrop-blur-xl p-4 float-fast min-h-[185px]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#0a6668] flex items-center justify-center">
          <BookOpen size={15} className="text-[#9ee9e4]" />
        </div>

        <div>
          <p className="text-[11px] font-semibold">Knowledge Base</p>
          <p className="text-[8px] text-[#789fa1]">AI business knowledge</p>
        </div>
      </div>

      {[
        "Delivery & Shipping",
        "Returns & Refunds",
        "Product Information",
        "Payment Methods",
      ].map((item) => (
        <div
          key={item}
          className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0"
        >
          <BookOpen size={11} className="text-[#77c8c4]" />

          <span className="text-[9px] text-[#c2d9da] flex-1">{item}</span>

          <span className="w-1.5 h-1.5 rounded-full bg-[#34d5ae]" />
        </div>
      ))}
    </div>
  );
}

function LeadCapturedCard() {
  return (
    <div className="rounded-2xl border border-[#2a7274] bg-[#073a3d]/95 backdrop-blur-xl p-4 float-slow min-h-[185px]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#0a6668] flex items-center justify-center">
          <UserRound size={15} className="text-[#9ee9e4]" />
        </div>

        <p className="text-[11px] font-semibold">Lead Captured</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#145c60] flex items-center justify-center">
          <UserRound size={16} />
        </div>

        <div>
          <p className="text-[10px] font-medium">Sarah Khan</p>
          <p className="text-[8px] text-[#88abad]">sarah.khan@email.com</p>
        </div>
      </div>

      <span className="inline-block mt-3 px-2 py-1 rounded-md bg-[#0c5c5d] text-[8px] text-[#71ded0]">
        High Intent
      </span>

      <button className="mt-3 w-full h-8 rounded-lg bg-[#075c5f] text-[9px] flex items-center justify-center gap-2 hover:bg-[#087174] transition">
        View in Leads
        <ArrowUpRight size={12} />
      </button>
    </div>
  );
}

function Feature({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 first:pl-0 last:pr-0 min-w-0">
      <div className="w-8 h-8 shrink-0 rounded-lg bg-[#0a5d60] flex items-center justify-center">
        <Icon size={15} className="text-[#82e8df]" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-white">{title}</p>

        <p className="text-[8px] text-[#82a8aa] mt-0.5 truncate">{subtitle}</p>
      </div>
    </div>
  );
}
