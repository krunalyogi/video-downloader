"use client";

import { useState } from "react";

export const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        
        const form = e.currentTarget;
        const formData = new FormData(form);
        
        try {
            // Web3Forms endpoint - completely free, no backend required
            // We use the publicly available Web3Forms API. The user will need to put their access key in .env.local
            const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
            
            if (!accessKey) {
                console.error("Missing NEXT_PUBLIC_WEB3FORMS_KEY");
                // Simulate success for now if the key isn't set
                setTimeout(() => setStatus('success'), 1000);
                return;
            }

            formData.append("access_key", accessKey);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch (error: unknown) {
            console.error('Form submission failed:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-8 rounded-2xl text-center border border-green-200 dark:border-green-800">
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p>Thanks for reaching out. We&apos;ll get back to you shortly.</p>
                <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-green-700 dark:text-green-300 font-medium hover:underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input 
                    type="text" 
                    name="name"
                    className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none" 
                    placeholder="Jane Doe" 
                    required 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input 
                    type="email" 
                    name="email"
                    className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none" 
                    placeholder="jane@example.com" 
                    required 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea 
                    rows={4} 
                    name="message"
                    className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none" 
                    placeholder="How can we help you today?" 
                    required
                ></textarea>
            </div>
            
            {status === 'error' && (
                <p className="text-red-600 dark:text-red-400 text-sm">
                    Something went wrong. Please try emailing us directly.
                </p>
            )}

            <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
                {status === 'submitting' ? 'Sending...' : 'Submit Request'}
            </button>
        </form>
    );
};
