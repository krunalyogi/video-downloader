import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Klipto',
    description: 'Privacy Policy and Data Handling details for Klipto',
};

export default function PrivacyPage() {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
            <div className="prose prose-purple dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                <p>Last updated: October 2026</p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100">1. Information We Collect</h2>
                <p>We collect minimal information to provide our services. When you contact us or interact with our site, we may record standard web server logs (such as IP address and browser type). We do not require accounts, logins, or payment information for our tools.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100">2. How We Use Information</h2>
                <p>Klipto uses the collected data for various purposes, including:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>To provide and maintain our Service</li>
                    <li>To notify you about changes to our Service</li>
                    <li>To provide customer support</li>
                    <li>To monitor the usage of our Service for performance improvements</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100">3. Advertising and Cookies</h2>
                <p>We use third-party advertising companies, such as Google AdSense, to serve ads when you visit our website. These companies may use aggregated information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you. We and our advertising partners use cookies to personalize content and ads.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100">4. Uploads and Processing (Data Ephemerality)</h2>
                <p>Files uploaded to Klipto (images, videos) for processing are held securely in temporary, ephemeral server memory (`/tmp` or Memory Buffers) purely for the duration of the conversion. <strong>We do not claim ownership of your content.</strong> All original and processed files are permanently and automatically destroyed the moment your browser session closes or the download link expires.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100">5. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us via the Contact page.</p>
            </div>
        </div>
    );
}
