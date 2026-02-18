import { Clock, Star, Users } from "lucide-react";
import { Link } from "react-router";

const TrainersCard = ({ trainersData }) => {
    const imageUrl = "https://res.cloudinary.com/mdarafathossen/";

    return (
        <div>
            <div className="sticky top-24 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                <div className="relative h-80">
                <img src={ imageUrl + trainersData.image || "placeholder.svg"} alt={trainersData.name} className="object-cover w-full h-full" />
                </div>
                <div className="p-6">
                <h1 className="text-2xl font-bold text-white">{trainersData.name}</h1>
                <p className="mt-1 text-sm font-medium text-red-500">{trainersData.role}</p>

                <div className="mt-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-zinc-400"><Star className="h-4 w-4 fill-red-500 text-red-500" /> Rating</span>
                    <span className="text-zinc-200">{trainersData.rating}/5.0</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-zinc-400"><Clock className="h-4 w-4" /> Experience</span>
                    <span className="text-zinc-200">{trainersData.experience}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-zinc-400"><Users className="h-4 w-4" /> Clients</span>
                    <span className="text-zinc-200">{trainersData.clients}+</span>
                    </div>
                </div>

                <Link
                    to="/contact"
                    className="mt-6 block w-full rounded-md bg-red-600 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700"
                >
                    Book a Session
                </Link>
                </div>
            </div>
        </div>
    );
};

export default TrainersCard;