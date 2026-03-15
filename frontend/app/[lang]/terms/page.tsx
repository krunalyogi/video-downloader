import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | Kliptify',
    description: 'Read the Terms of Service for using Kliptify.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-16 px-4">
            <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-zinc-800">
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-8">Terms of Service</h1>
                
                <div className="space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing and using Kliptify, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
                        <p>Kliptify provides a suite of online tools for downloading, converting, and editing media files from universally accessible public platforms. The service is provided &quot;as is&quot; and &quot;as available&quot; without any warranties.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. User Conduct and Restrictions</h2>
                        <p>When using Kliptify, you agree not to:</p>
                        <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                            <li>Download copyrighted material without explicit permission from the copyright owner.</li>
                            <li>Use our services for any illegal or unauthorized purpose.</li>
                            <li>Attempt to bypass or exploit our rate limits, APIs, or infrastructure.</li>
                            <li>Redistribute or sell downloaded content.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Intellectual Property Rights</h2>
                        <p>Kliptify respects the intellectual property rights of others. Our tools are designed for personal, fair use and offline viewing of content you have the right to access. Users are solely responsible for ensuring they possess the necessary rights or permissions to download and use the media.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. Limitation of Liability</h2>
                        <p>Under no circumstances shall Kliptify, its developers, or its affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising from the use or inability to use our services.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">6. Contact Information</h2>
                        <p>If you have any questions or concerns regarding these terms, please use our contact page to reach out to our administration team.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
