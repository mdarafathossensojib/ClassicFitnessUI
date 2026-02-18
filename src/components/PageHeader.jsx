

const PageHeader = ({ label, title, description }) => {
  return (
    <section className="bg-zinc-950 pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {label && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
            {label}
          </p>
        )}
        <h1 className="text-4xl font-bold uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-zinc-400">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHeader
