import { Award } from "lucide-react";


const TrainersInfo = ({ trainersData }) => {
    return (
        <div className="lg:col-span-2">
            {/* Bio */}
            <div>
                <h2 className="text-2xl font-bold uppercase tracking-tight text-white">About</h2>
                <p className="mt-4 leading-relaxed text-zinc-300">{trainersData.bio}</p>
            </div>

            {/* Philosophy */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-white">Training Philosophy</h2>
                <blockquote className="mt-4 border-l-4 border-red-600 bg-zinc-900 p-6 italic text-zinc-300">
                {`"${trainersData.philosophy}"`}
                </blockquote>
            </div>

            {/* Specialties */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-white">Specialties</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                {trainersData.specialties.map((s) => (
                    <span key={s} className="rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200">{s}</span>
                ))}
                </div>
            </div>

            {/* Certifications */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-white">Certifications</h2>
                <div className="mt-4 flex flex-col gap-3">
                {trainersData.certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
                    <Award className="h-5 w-5 text-red-500" />
                    <span className="text-sm font-medium text-zinc-200">{cert}</span>
                    </div>
                ))}
                </div>
            </div>

            {/* Schedule */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-white">Schedule</h2>
                <div className="mt-4 overflow-hidden rounded-lg border border-zinc-800">
                {trainersData.schedule.map((slot, idx) => (
                    <div key={slot.day} className={`flex items-center justify-between px-5 py-4 ${idx !== trainersData.schedule.length - 1 ? "border-b border-zinc-800" : ""}`}>
                    <span className="text-sm font-medium text-zinc-200">{slot.day}</span>
                    <span className="text-sm text-zinc-400">{slot.time}</span>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default TrainersInfo;