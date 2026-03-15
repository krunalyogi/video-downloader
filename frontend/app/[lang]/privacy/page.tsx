import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Kliptify',
    description: 'Read how Kliptify handles your data and protects your privacy.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-16 px-4">
            <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-zinc-800">
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
                
                <div className="space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
                        <p>At Kliptify, your privacy is our top priority. We designed our tools to be anonymous and secure. This Privacy Policy outlines the types of information we collect and how we use it to provide our services.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Data We Do NOT Collect</h2>
                        <p>To ensure maximum user privacy, Kliptify operates with a strict data-minimization philosophy:</p>
                        <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                            <li>We <strong>do not</strong> store logs of the URLs or videos you download.</li>
                            <li>We <strong>do not</strong> keep copies of the files you convert or download (files are instantly deleted from our temporary servers).</li>
                            <li>We <strong>do not</strong> require account registration for our core public tools.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Data We Collect</h2>
                        <p>We only collect data that is strictly necessary to operate and improve the platform:</p>
                        <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                            <li><strong>Email Addresses:</strong> Only if you explicitly subscribe to our newsletter or opt-in to use advanced AI tools.</li>
                            <li><strong>Analytics:</strong> Anonymous usage statistics (e.g., page views, tool popularity) via standard analytics providers to help us improve performance.</li>
                            <li><strong>Cookies:</strong> Essential cookies are used to maintain site functionality, language preferences, and advertising delivery.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Third-Party Advertising</h2>
                        <p>We use third-party advertising companies to serve ads when you visit our website. These companies may use aggregated information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. Security Measures</h2>
                        <p>We implement industry-standard security measures including SSL/TLS encryption for all data transmissions to protect against unauthorized access or alteration of information.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">6. Changes to this Policy</h2>
                        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
