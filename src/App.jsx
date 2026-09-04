function App() {
  return (
    <main className="min-h-screen bg-[#f3f8f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px]">

        {/* Main About Us Card */}
        <section className="overflow-hidden rounded-[24px] bg-white shadow-[0_10px_60px_rgba(5,48,50,0.08)] lg:rounded-[28px]">

          {/* Navbar */}
          <header className="border-b border-[#edf2f2]">
            <nav className="flex items-center justify-between px-6 py-5 sm:px-10 lg:px-14">

              {/* Brand */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#07363a] text-[#8ee8e8]">
                  <span className="text-xl">✦</span>
                </div>

                <div className="leading-tight">
                  <div className="text-[18px] font-bold tracking-[-0.03em] text-[#07363a]">
                    FinovoChat{" "}
                    <span className="text-[#118d91]">AI</span>
                  </div>

                  <div className="mt-0.5 text-[8px] font-bold tracking-[0.18em] text-[#789092]">
                    WHATSAPP AI AGENT
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="hidden items-center gap-8 text-[13px] font-medium text-[#60777a] md:flex">
                <a
                  href="#"
                  className="transition hover:text-[#07888c]"
                >
                  Home
                </a>

                <a
                  href="#about"
                  className="font-semibold text-[#07888c]"
                >
                  About Us
                </a>

                <a
                  href="#features"
                  className="transition hover:text-[#07888c]"
                >
                  Features
                </a>

                <a
                  href="#contact"
                  className="transition hover:text-[#07888c]"
                >
                  Contact
                </a>
              </div>

              {/* CTA */}
              <button className="rounded-xl bg-[#0c9297] px-5 py-3 text-[12px] font-semibold text-white transition hover:bg-[#087e83]">
                Get Started
              </button>

            </nav>
          </header>


          {/* Hero */}
          <section
            id="about"
            className="grid items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:px-14 lg:py-24"
          >

            {/* Hero Content */}
            <div>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8e6e6] bg-[#f7fbfb] px-4 py-2 text-[11px] font-semibold text-[#07888c]">
                <span className="h-2 w-2 rounded-full bg-[#0c9297]" />
                About FinovoChat AI
              </div>

              <h1 className="max-w-[700px] text-[42px] font-bold leading-[1.08] tracking-[-0.045em] text-[#07363a] sm:text-[52px] lg:text-[62px]">
                Smarter WhatsApp
                <br />
                <span className="text-[#118d91]">
                  conversations with AI.
                </span>
              </h1>

              <p className="mt-6 max-w-[570px] text-[14px] leading-7 text-[#6f8588] sm:text-[15px]">
                FinovoChat AI helps businesses automate repetitive WhatsApp
                customer conversations through intelligent, controlled and
                reliable AI automation.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <button className="flex items-center gap-2 rounded-xl bg-[#0c9297] px-6 py-3.5 text-[12px] font-semibold text-white transition hover:bg-[#087e83]">
                  Explore FinovoChat AI
                  <span>→</span>
                </button>

                <button className="rounded-xl border border-[#d4e1e1] bg-white px-6 py-3.5 text-[12px] font-semibold text-[#07363a] transition hover:border-[#0c9297] hover:text-[#07888c]">
                  Learn More
                </button>

              </div>

              {/* Small Stats */}
              <div className="mt-10 flex flex-wrap gap-8">

                <div>
                  <p className="text-2xl font-bold text-[#07363a]">
                    24/7
                  </p>
                  <p className="mt-1 text-[10px] text-[#7b9092]">
                    Customer Support
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-[#07363a]">
                    AI
                  </p>
                  <p className="mt-1 text-[10px] text-[#7b9092]">
                    Powered Automation
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-[#07363a]">
                    Human
                  </p>
                  <p className="mt-1 text-[10px] text-[#7b9092]">
                    Handoff Control
                  </p>
                </div>

              </div>

            </div>


            {/* Hero Visual */}
            <div className="relative mx-auto w-full max-w-[560px]">

              <div className="relative overflow-hidden rounded-[30px] bg-[#07363a] p-5 shadow-[0_20px_70px_rgba(5,48,50,0.18)] sm:p-7">

                {/* Decorative Elements */}
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#76dfe0] opacity-80" />

                <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full border-[28px] border-[#118d91] opacity-70" />

                {/* Header */}
                <div className="relative mb-5 flex items-center justify-between">

                  <div>
                    <p className="text-[11px] font-semibold text-white/50">
                      FINOVOCHAT AI
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-white">
                      AI Assistant
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-[#76dfe0]" />
                    <span className="text-[10px] text-white/70">
                      Online
                    </span>
                  </div>

                </div>


                {/* Chat Window */}
                <div className="relative rounded-[24px] bg-white p-5 shadow-xl sm:p-6">

                  {/* Chat Header */}
                  <div className="flex items-center gap-3 border-b border-[#edf1f1] pb-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e3f5f5] text-[#0c9297]">
                      ✦
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#07363a]">
                        WhatsApp AI Agent
                      </p>

                      <p className="text-[10px] text-[#829497]">
                        Intelligent customer support
                      </p>
                    </div>

                  </div>


                  {/* Messages */}
                  <div className="mt-5 space-y-4">

                    <div className="ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-[#e8f6f6] p-4 text-[11px] leading-5 text-[#36575a]">
                      What are your business hours?
                    </div>

                    <div className="max-w-[84%] rounded-2xl rounded-bl-md bg-[#f4f7f7] p-4 text-[11px] leading-5 text-[#536d70]">
                      I can help with that. Let me check the approved
                      business information.
                    </div>

                    <div className="max-w-[84%] rounded-2xl rounded-bl-md bg-[#e8f6f6] p-4 text-[11px] leading-5 text-[#36575a]">
                      Our business hours are available from the connected
                      business knowledge base.
                    </div>

                  </div>


                  {/* Status */}
                  <div className="mt-5 flex items-center gap-2 border-t border-[#edf1f1] pt-4">

                    <span className="h-2 w-2 rounded-full bg-[#0c9297]" />

                    <span className="text-[9px] font-medium text-[#7b9092]">
                      Powered by controlled AI
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* What We Do */}
          <section
            id="features"
            className="border-t border-[#edf2f2] bg-[#f8fbfb] px-6 py-16 sm:px-10 lg:px-14 lg:py-24"
          >

            <div className="max-w-[680px]">

              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#07888c]">
                What We Do
              </p>

              <h2 className="mt-4 text-[34px] font-bold leading-tight tracking-[-0.04em] text-[#07363a] sm:text-[44px]">
                We make WhatsApp
                <span className="text-[#118d91]">
                  {" "}support smarter.
                </span>
              </h2>

              <p className="mt-5 text-[14px] leading-7 text-[#6f8588] sm:text-[15px]">
                FinovoChat AI receives customer messages, understands
                conversation context, retrieves approved business information,
                and generates appropriate responses through controlled AI
                automation.
              </p>

            </div>


            {/* Feature Cards */}
            <div className="mt-12 grid gap-5 md:grid-cols-3">

              {/* Understand */}
              <div className="rounded-[24px] border border-[#e0eaea] bg-white p-7 shadow-[0_8px_35px_rgba(5,48,50,0.04)]">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e4f5f5] text-[12px] font-bold text-[#0c9297]">
                  01
                </div>

                <h3 className="mt-8 text-xl font-bold text-[#07363a]">
                  Understand
                </h3>

                <p className="mt-3 text-[13px] leading-6 text-[#718588]">
                  Customer messages are processed together with conversation
                  context so the agent can understand what the customer needs.
                </p>

              </div>


              {/* Respond */}
              <div className="rounded-[24px] bg-[#07363a] p-7 shadow-[0_12px_40px_rgba(5,48,50,0.12)]">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#76dfe0] text-[12px] font-bold text-[#07363a]">
                  02
                </div>

                <h3 className="mt-8 text-xl font-bold text-white">
                  Respond
                </h3>

                <p className="mt-3 text-[13px] leading-6 text-white/60">
                  AI generates responses using approved business knowledge
                  instead of relying blindly on model memory.
                </p>

              </div>


              {/* Automate */}
              <div className="rounded-[24px] border border-[#d6e8e8] bg-[#e9f7f7] p-7">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0c9297] text-[12px] font-bold text-white">
                  03
                </div>

                <h3 className="mt-8 text-xl font-bold text-[#07363a]">
                  Automate
                </h3>

                <p className="mt-3 text-[13px] leading-6 text-[#627a7d]">
                  Controlled backend tools provide live business information
                  whenever dynamic data is required.
                </p>

              </div>

            </div>

          </section>


          {/* Human Control */}
          <section className="grid gap-12 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:px-14 lg:py-24">

            <div>

              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#07888c]">
                Human Control
              </p>

              <h2 className="mt-4 max-w-[600px] text-[34px] font-bold leading-tight tracking-[-0.04em] text-[#07363a] sm:text-[44px]">
                Automation without
                <span className="text-[#118d91]">
                  {" "}losing control.
                </span>
              </h2>

            </div>


            <div>

              <p className="text-[14px] leading-7 text-[#6f8588] sm:text-[15px]">
                AI should assist businesses, not remove human control. When a
                customer needs human assistance, information is unavailable,
                or a request becomes complex, the conversation can move into
                human handoff.
              </p>


              {/* Human Handoff Card */}
              <div className="mt-7 rounded-[24px] border border-[#dce7e7] bg-[#f8fbfb] p-6">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e2f4f4] text-[#0c9297]">
                    ✓
                  </div>

                  <div>
                    <h3 className="text-[15px] font-bold text-[#07363a]">
                      AI + Human Handoff
                    </h3>

                    <p className="mt-2 text-[12px] leading-6 text-[#74898b]">
                      Automation pauses when human assistance is required,
                      keeping the business in control of the conversation.
                    </p>
                  </div>

                </div>

              </div>


              {/* Knowledge Card */}
              <div className="mt-4 rounded-[24px] border border-[#dce7e7] bg-white p-6">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e2f4f4] text-[#0c9297]">
                    ✦
                  </div>

                  <div>
                    <h3 className="text-[15px] font-bold text-[#07363a]">
                      Approved Business Knowledge
                    </h3>

                    <p className="mt-2 text-[12px] leading-6 text-[#74898b]">
                      The agent uses approved information such as FAQs,
                      products, services, prices, policies and business hours.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* CTA */}
          <section className="px-6 pb-16 sm:px-10 lg:px-14 lg:pb-24">

            <div className="overflow-hidden rounded-[30px] bg-[#07363a] px-7 py-14 text-center sm:px-12 lg:py-20">

              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#76dfe0]">
                AI-Powered WhatsApp Automation
              </p>

              <h2 className="mx-auto mt-4 max-w-[750px] text-[34px] font-bold leading-tight tracking-[-0.04em] text-white sm:text-[46px]">
                Make every customer conversation
                <span className="text-[#76dfe0]">
                  {" "}smarter.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-[560px] text-[13px] leading-7 text-white/55 sm:text-[14px]">
                FinovoChat AI helps businesses automate repetitive WhatsApp
                support while keeping people in control.
              </p>

              <button className="mt-8 rounded-xl bg-[#0c9297] px-7 py-3.5 text-[12px] font-semibold text-white transition hover:bg-[#087e83]">
                Get Started →
              </button>

            </div>

          </section>

        </section>


        {/* Footer */}
        <footer className="px-2 pt-6 sm:px-4">

          <div className="flex flex-col items-center justify-between gap-5 rounded-[24px] px-4 py-5 sm:flex-row">

            {/* Footer Brand */}
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#07363a] text-[#76dfe0]">
                ✦
              </div>

              <div className="leading-tight">

                <div className="text-[14px] font-bold text-[#07363a]">
                  FinovoChat{" "}
                  <span className="text-[#118d91]">
                    AI
                  </span>
                </div>

                <div className="text-[7px] font-bold tracking-[0.17em] text-[#849698]">
                  WHATSAPP AI AGENT
                </div>

              </div>

            </div>


            <p className="text-[10px] text-[#849698]">
              Intelligent WhatsApp automation.
            </p>

            <p className="text-[10px] text-[#9aa9aa]">
              © {new Date().getFullYear()} FinovoChat AI. All rights reserved.
            </p>

          </div>

        </footer>

      </div>
    </main>
  );
}

export default App;