
const MembershipFAQ = () => {
    return (
        <div className="mt-24">
            <h2 className="mb-8 text-center text-3xl font-bold uppercase tracking-tight text-white">
            Frequently Asked Questions
            </h2>
            <div className="mx-auto max-w-3xl flex flex-col gap-4">
            {[
                { q: "Can I cancel anytime?", a: "Yes! All our memberships are month-to-month with no long-term contracts. You can cancel at any time without penalty." },
                { q: "Is there a joining fee?", a: "No joining fees! The price you see is the price you pay. We believe in transparent, straightforward pricing." },
                { q: "Can I upgrade or downgrade my plan?", a: "Absolutely. You can change your membership plan at any time. Changes take effect at the start of your next billing cycle." },
                { q: "Do you offer family plans?", a: "Yes! Contact us for special family and corporate membership rates tailored to your needs." },
            ].map((faq) => (
                <div key={faq.q} className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="text-base font-bold text-white">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{faq.a}</p>
                </div>
            ))}
            </div>
        </div>
    );
};

export default MembershipFAQ;