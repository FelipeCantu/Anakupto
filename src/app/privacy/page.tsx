import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <header className="p-8 border-b border-white/5">
                <Link href="/" className="text-xl font-bold tracking-tight hover:text-[#e59500] transition-colors">
                    Anakupto
                </Link>
            </header>

            <article className="max-w-3xl mx-auto px-8 py-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-zinc-500 mb-12">Last updated: January 2025</p>

                <div className="prose prose-invert prose-zinc max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            When you contact us through our website forms, we collect the information you provide, including your name, email address, company name, and project details. We use this information solely to respond to your inquiries and discuss potential projects.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            We use the information you provide to:
                        </p>
                        <ul className="list-disc list-inside text-zinc-400 mt-4 space-y-2">
                            <li>Respond to your inquiries and project requests</li>
                            <li>Communicate with you about our services</li>
                            <li>Send project proposals and updates</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            We do not sell, trade, or otherwise transfer your personal information to third parties. Your data is stored securely and only accessed when necessary to provide our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Our website may use essential cookies to ensure proper functionality. We do not use tracking cookies or third-party analytics that collect personal information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at{" "}
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
