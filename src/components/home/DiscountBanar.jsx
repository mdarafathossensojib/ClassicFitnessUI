import { TicketPercent, ArrowRight } from "lucide-react";

export default function DiscountBanner() {
  return (
    <section className="py-12 px-6 bg-linear-to-r from-zinc-900 to-zinc-800">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-red-600 shadow-2xl shadow-red-900/20">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-10 md:p-16 gap-8">
            <div className="text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6">
                <TicketPercent size={16} /> Limited Time Offer
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white italic leading-tight mb-4 uppercase">
                GET <span className="text-black">30% OFF</span> <br /> 
                ON YEARLY PASS
              </h2>
              <p className="text-red-100 text-lg font-medium max-w-md">
                Transform your body today with our expert trainers and world-class equipment. Offer valid until Sunday!
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <button className="bg-white text-red-600 px-10 py-5 rounded-2xl font-black text-lg uppercase shadow-xl hover:bg-zinc-100 hover:scale-105 transition-all flex items-center gap-3">
                Claim Discount <ArrowRight size={22} />
              </button>
              <p className="text-red-100 text-xs font-bold uppercase tracking-tighter opacity-80">
                * Terms and conditions apply
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}