import { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
    title: 'Contact Us | Kliptify',
    description: 'Get in touch with the Kliptify support team',
};

export default function ContactPage() {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 text-center">Contact Us</h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
                Have questions or need support with Kliptify? We&apos;re here to help.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h2>
                    <ContactForm />
                </div>

                <div className="flex flex-col gap-6 p-8 bg-gray-50 dark:bg-zinc-900/50 rounded-2xl border border-gray-100 dark:border-zinc-800 h-fit">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Direct Contact Info</h2>

                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900 dark:text-gray-200">Email Updates & Support</p>
                            <a href="mailto:krunalyogi9@gmail.com" className="hover:text-purple-500 font-medium">krunalyogi9@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
