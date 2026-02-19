import { ExternalLink } from "lucide-react";

const ContactInfo = ({ contactInfo }) => {
    return (
        <div className="lg:col-span-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8">
                <h2 className="text-xl font-bold uppercase tracking-wide text-white">Contact Info</h2>
                <div className="mt-6 flex flex-col gap-6">
                {contactInfo.map((item) => {
                    const Icon = item.icon
                    return (
                    <div key={item.label} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-red-600/10">
                        <Icon className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                        <p className="text-sm font-medium text-zinc-300">{item.label}</p>
                        <p className="mt-1 text-sm text-zinc-400">{item.value}</p>
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>

            {/* Google Map Section */}
            <div className="mt-6 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                <div className="relative">
                {/* Map */}
                <iframe
                    title="Dhaka Location"
                    src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
                    className="h-64 w-full"
                    loading="lazy"
                ></iframe>

                {/* Overlay Button */}
                <a
                    href="https://www.google.com/maps/place/Dhaka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-red-700"
                >
                    <ExternalLink className="h-4 w-4" />
                    Open in Google Maps
                </a>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;