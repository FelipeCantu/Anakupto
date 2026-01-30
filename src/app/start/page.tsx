"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Send, Loader2 } from "lucide-react";
import Link from "next/link";

export default function StartProject() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        projectType: [] as string[],
        budget: "",
        description: "",
        deadline: ""
    });

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    formType: 'project'
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setStep(5); // Go to success step
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateFormData = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const toggleProjectType = (type: string) => {
        setFormData(prev => {
            const current = prev.projectType;
            if (current.includes(type)) {
                return { ...prev, projectType: current.filter(t => t !== type) };
            } else {
                return { ...prev, projectType: [...current, type] };
            }
        });
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <main className="min-h-screen w-full bg-zinc-950 text-white flex flex-col">
            {/* Simple Header */}
            <header className="p-8 flex justify-between items-center bg-black/50 backdrop-blur-sm border-b border-white/5 sticky top-0 z-50">
                <Link href="/" className="text-xl font-bold tracking-tight">Anakupto</Link>
                <div className="text-sm text-zinc-500">
                    Step {step} of 4
                </div>
            </header>

            <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-2xl">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <StepWrapper key="step1">
                                <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's get introduced.</h1>
                                <p className="text-xl text-zinc-400 mb-10">Tell us a bit about yourself.</p>
                                <div className="space-y-6">
                                    <InputGroup label="Your Name" value={formData.name} onChange={(e) => updateFormData('name', e.target.value)} placeholder="John Doe" autoFocus />
                                    <InputGroup label="Email Address" type="email" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} placeholder="john@example.com" />
                                    <InputGroup label="Company (Optional)" value={formData.company} onChange={(e) => updateFormData('company', e.target.value)} placeholder="Acme Inc." />
                                </div>
                                <div className="mt-12 flex justify-end">
                                    <NextButton onClick={nextStep} disabled={!formData.name || !formData.email} />
                                </div>
                            </StepWrapper>
                        )}

                        {step === 2 && (
                            <StepWrapper key="step2">
                                <h1 className="text-4xl md:text-5xl font-bold mb-6">What are we building?</h1>
                                <p className="text-xl text-zinc-400 mb-10">Select all that apply.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['E-Commerce', 'Portfolio / Personal', 'Corporate Site', 'WebApp / SaaS', '3D Experience', 'Landing Page'].map(type => (
                                        <SelectableCard
                                            key={type}
                                            label={type}
                                            selected={formData.projectType.includes(type)}
                                            onClick={() => toggleProjectType(type)}
                                        />
                                    ))}
                                </div>
                                <div className="mt-12 flex justify-between items-center">
                                    <BackButton onClick={prevStep} />
                                    <NextButton onClick={nextStep} disabled={formData.projectType.length === 0} />
                                </div>
                            </StepWrapper>
                        )}

                        {step === 3 && (
                            <StepWrapper key="step3">
                                <h1 className="text-4xl md:text-5xl font-bold mb-6">Project Details</h1>
                                <p className="text-xl text-zinc-400 mb-10">Help us understand the scope.</p>
                                <div className="space-y-8">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-3">Estimated Budget (USD)</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {['< $5k', '$5k - $10k', '$10k - $25k', '$25k+'].map(b => (
                                                <SelectableCard
                                                    key={b}
                                                    label={b}
                                                    selected={formData.budget === b}
                                                    onClick={() => updateFormData('budget', b)}
                                                    compact
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-3">Tell us more about the vision</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => updateFormData('description', e.target.value)}
                                            rows={4}
                                            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                            placeholder="What are the main goals? Do you have design inspiration?"
                                        />
                                    </div>
                                </div>
                                <div className="mt-12 flex justify-between items-center">
                                    <BackButton onClick={prevStep} />
                                    <NextButton onClick={nextStep} disabled={!formData.budget} />
                                </div>
                            </StepWrapper>
                        )}

                        {step === 4 && (
                            <StepWrapper key="step4">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500">
                                        <Send size={40} />
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Ready to Send?</h1>
                                    <p className="text-xl text-zinc-400 mb-10 max-w-md mx-auto">
                                        We'll review your project details and get back to you within 24 hours to schedule a discovery call.
                                    </p>

                                    {submitStatus === 'error' && (
                                        <p className="text-red-400 mb-6">Something went wrong. Please try again.</p>
                                    )}

                                    <div className="flex flex-col gap-4 max-w-xs mx-auto">
                                        <button
                                            className="w-full bg-white text-black font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                'Submit Proposal'
                                            )}
                                        </button>
                                        <button
                                            onClick={prevStep}
                                            disabled={isSubmitting}
                                            className="text-zinc-500 hover:text-white transition-colors text-sm disabled:opacity-50"
                                        >
                                            Go Back
                                        </button>
                                    </div>
                                </div>
                            </StepWrapper>
                        )}

                        {step === 5 && (
                            <StepWrapper key="step5">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500">
                                        <Check size={40} />
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Message Sent!</h1>
                                    <p className="text-xl text-zinc-400 mb-10 max-w-md mx-auto">
                                        Thanks for reaching out, {formData.name.split(' ')[0]}! We'll be in touch within 24 hours.
                                    </p>
                                    <Link
                                        href="/"
                                        className="inline-block bg-white text-black font-bold py-4 px-8 rounded-full hover:bg-zinc-200 transition-all hover:scale-105"
                                    >
                                        Back to Home
                                    </Link>
                                </div>
                            </StepWrapper>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}

// Helper Components

function StepWrapper({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
}

interface InputGroupProps {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    autoFocus?: boolean;
}

function InputGroup({ label, type = "text", value, onChange, placeholder, autoFocus }: InputGroupProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 ml-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoFocus={autoFocus}
                className="w-full bg-transparent border-b border-zinc-700 py-3 px-1 text-2xl md:text-3xl font-light text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors"
            />
        </div>
    );
}

interface SelectableCardProps {
    label: string;
    selected: boolean;
    onClick: () => void;
    compact?: boolean;
}

function SelectableCard({ label, selected, onClick, compact }: SelectableCardProps) {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer border rounded-xl flex items-center transition-all duration-300 ${selected
                ? "bg-white text-black border-white"
                : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/50"
                } ${compact ? 'p-4 justify-center text-center text-sm font-medium' : 'p-6 justify-between'}`}
        >
            <span className={compact ? "" : "text-lg font-medium"}>{label}</span>
            {!compact && selected && <Check size={20} />}
        </div>
    );
}

interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

function NextButton({ onClick, disabled }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all ${disabled
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500 hover:pr-10"
                }`}
        >
            Next <ArrowRight size={18} />
        </button>
    );
}

function BackButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-6 py-3 text-zinc-500 hover:text-white transition-colors"
        >
            <ArrowLeft size={18} /> Back
        </button>
    );
}
