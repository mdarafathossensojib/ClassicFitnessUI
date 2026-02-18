import { Link } from "react-router";

const ProgramSlide = ({ title, description, iconComponent: IconComponent, image, programId }) => {
    console.log("Rendering ProgramSlide for programId:", programId);
    return (
       <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition-all hover:border-red-600/50">
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={image || "/placeholder.svg"}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                <div className="absolute inset-0 bg-zinc-950/40" />
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-md bg-red-600">
                <IconComponent className="h-5 w-5 text-white" />
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold uppercase tracking-wide text-white">
                {title}
                </h3>
                <p className="mt-6 text-sm leading-relaxed text-zinc-400 line-clamp-2">
                {description}
                </p>
                <Link
                to={`/programs/${programId}`}
                className="mt-4 text-sm font-semibold uppercase tracking-wide text-red-500 transition-colors hover:text-red-400"
                >
                {"Learn More →"}
                </Link>
            </div>
        </div>
    );       
};

export default ProgramSlide;