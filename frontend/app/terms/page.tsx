import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | Klipto',
    description: 'Terms of Service and usage agreements for Klipto',
};

export default function TermsPage() {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
            <div className="prose prose-purple dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                <p>Last updated: October 2026</p>
                <p>Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;) carefully before using the Klipto platform.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100">1. Acceptance of Terms</h2>
                <p>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100">2. Prohibited Uses</h2>
                <p>You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>In any way that violates any applicable national or international law or regulation.</li>
                    <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
                    <li>To transmit, or procure the sending of, any advertising or promotional material, including any &quot;junk mail&quot;, &quot;chain letter,&quot; &quot;spam,&quot; or any other similar solicitation.</li>
                    <li>To impersonate or attempt to impersonate Klipto.</li>
                    <li>To infringe upon the intellectual property of third parties. You must own the rights to the videos, images, and tools you manipulate through our processor.</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100">3. Limitation of Liability</h2>
                <p>In no event shall Klipto, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service.</p>
            </div>
        </div>
    );
}
