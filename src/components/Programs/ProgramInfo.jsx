import { Calendar, Clock, Star, Users } from "lucide-react";
import { Link } from "react-router";


const ProgramInfo = ({ programsData }) => {
    return (
        <div>
            <div className="sticky top-24 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="text-lg font-bold uppercase tracking-wide text-white">Program Info</h3>
                <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Clock className="h-4 w-4" />
                    Duration
                    </div>
                    <span className="text-sm font-medium text-zinc-200">60 min</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Users className="h-4 w-4" />
                    Members
                    </div>
                    <span className="text-sm font-medium text-zinc-200">{programsData.booked_count}+ active</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Calendar className="h-4 w-4" />
                    Schedule
                    </div>
                    <span className="text-sm font-medium text-zinc-200">Daily</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Star className="h-4 w-4" />
                    Rating
                    </div>
                    <span className="text-sm font-medium text-zinc-200">{programsData.rating}5.0</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Level</span>
                    <span className="rounded-full bg-red-600/10 px-3 py-1 text-xs font-medium text-red-500">{programsData.level}</span>
                </div>
                </div>
                <Link
                to="/free-trial"
                className="mt-6 block w-full rounded-md bg-red-600 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700"
                >
                Start Free Trial
                </Link>
                <Link
                to="/membership"
                className="mt-3 block w-full rounded-md border border-zinc-700 py-3 text-center text-sm font-medium uppercase tracking-wide text-zinc-200 transition-colors hover:bg-zinc-800"
                >
                View Membership Plans
                </Link>
            </div>
        </div>
    );
};

export default ProgramInfo;