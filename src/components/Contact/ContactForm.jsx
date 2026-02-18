

const ContactForm = ({ formData, handleChange, handleSubmit }) => {
    return (
        <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="rounded-lg border border-zinc-800 bg-zinc-900 p-8">
                <h2 className="text-xl font-bold uppercase tracking-wide text-white">Send a Message</h2>
                <div className="mt-6 flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                        Full Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                    </div>
                    <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                    </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                        Phone
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                    </div>
                    <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                        Subject
                    </label>
                    <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    >
                        <option value="">Select a subject</option>
                        <option value="membership">Membership Inquiry</option>
                        <option value="training">Personal Training</option>
                        <option value="classes">Group Classes</option>
                        <option value="facility">Facility Tour</option>
                        <option value="other">Other</option>
                    </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                    Message
                    </label>
                    <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    required
                    className="w-full resize-none rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-md bg-red-600 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700"
                >
                    Send Message
                </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;