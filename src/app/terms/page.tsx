import Link from "next/link";

export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <header className="p-8 border-b border-white/5">
                <Link href="/" className="text-xl font-bold tracking-tight hover:text-[#e59500] transition-colors">
                    Anakupto
                </Link>
            </header>

            <article className="max-w-3xl mx-auto px-8 py-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
                <p className="text-zinc-500 mb-12">Last updated: January 2025</p>

                <div className="prose prose-invert prose-zinc max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Services</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Anakupto provides 3D web development, design, and related digital services. The specific scope, deliverables, timeline, and pricing for each project will be outlined in a separate project agreement or proposal.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Project Agreements</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            All projects are governed by individual agreements that specify the scope of work, payment terms, timeline, and other project-specific details. These agreements take precedence over these general terms where applicable.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Upon full payment, clients receive ownership of the final deliverables as specified in the project agreement. Anakupto retains the right to showcase completed work in our portfolio unless otherwise agreed upon in writing.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Payment</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Payment terms are specified in individual project agreements. Typically, projects require a deposit before work begins, with the remaining balance due upon completion or according to agreed milestones.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Anakupto's liability is limited to the amount paid for services. We are not liable for indirect, incidental, or consequential damages arising from the use of our services or deliverables.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the updated terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            For questions about these Terms of Service, please contact us at{" "}
                            <a href="mailto:hello@anakupto.com" className="text-white hover:text-[#e59500] transition-colors">
                                hello@anakupto.com
                            </a>
                        </p>
                    </section>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10">
                    <Link href="/" className="text-zinc-500 hover:text-white transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </article>
        </main>
    );
}
