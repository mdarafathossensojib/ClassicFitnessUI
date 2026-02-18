import { MapPin } from "lucide-react";

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

            {/* Map Placeholder */}
            <div className="mt-6 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                <div className="flex h-64 items-center justify-center bg-zinc-800">
                <div className="text-center">
                    <MapPin className="mx-auto h-8 w-8 text-zinc-600" />
                    <p className="mt-2 text-sm text-zinc-500">123 Fitness Blvd, New York</p>
                    <p className="text-xs text-zinc-600">Map integration area</p>
                </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;