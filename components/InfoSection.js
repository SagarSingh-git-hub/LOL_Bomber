function FAQItem({ question, answer, iconClass, isOpen, onClick, index, iconImage }) {
    return (
        <div className="glass-card overflow-hidden transition-all duration-300 bg-white/[0.02] border-white/5 hover:bg-white/[0.04]">
            <button 
                onClick={() => onClick(index)} 
                className="w-full px-5 py-4 flex items-center justify-between text-left"
            >
                <div className="flex items-center gap-3">
                    {iconImage ? (
                        <img src={iconImage} alt="FAQ Icon" className="w-7 h-7 object-contain" />
                    ) : (
                        <i className={`${iconClass} text-lg w-6 text-center`}></i>
                    )}
                    <span className="font-bold text-white text-sm">{question}</span>
                </div>
                <i className={`fas fa-chevron-down text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>
            <div 
                className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-5 pb-4 ml-9">
                    <p className="text-xs text-white/50 leading-relaxed">{answer}</p>
                </div>
            </div>
        </div>
    );
}

function InfoSection() {
    const [openIndex, setOpenIndex] = React.useState(null);
    
    const handleFAQClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up mt-8">
                <div className="glass-card p-6 sm:p-8">
                    <div className="w-12 h-12 rounded-xl bg-glass border border-white/10 flex items-center justify-center mb-5">
                        <img src="i.png" alt="Info" className="w-8 h-8 object-contain" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">What Is Call Bomber?</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                        LOLBomber is the most powerful call and SMS stress testing tool. Designed for security professionals and developers, it allows you to simulate high-traffic scenarios to test the resilience of your phone lines and message inboxes.
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed">
                        It is fast, reliable, and completely anonymous, ensuring your identity remains protected during legitimate testing scenarios.
                    </p>
                </div>

                <div className="glass-card p-6 sm:p-8">
                    <div className="w-12 h-12 rounded-xl bg-glass border border-white/10 flex items-center justify-center mb-5">
                        <img src="QuestionMark.png" alt="Question" className="w-8 h-8 object-contain" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-5">How To Use Call Bomber?</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                            <span className="text-sm text-white/70">Enter the target 10-digit mobile number in the input field.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                            <span className="text-sm text-white/70">Agree to our terms of service by checking the box.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                            <span className="text-sm text-white/70">Click "Launch Attack" to begin the simulation.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</div>
                            <span className="text-sm text-white/70">Monitor the live logs and click "Stop" when finished.</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="animate-slide-up mt-8 pb-4">
                <h3 className="text-xl font-bold text-white mb-6 pl-2">Frequently Asked Questions</h3>
                <div className="space-y-3">
                    <FAQItem 
                        index={0}
                        iconImage="Money.png"
                        question="Is Call Bomber free to use?"
                        answer="Yes, the basic version of our service is completely free to use with certain rate limits applied to prevent server overload. Pro users have unlimited access."
                        isOpen={openIndex === 0}
                        onClick={handleFAQClick}
                    />
                    <FAQItem 
                        index={1}
                        iconClass="fas fa-tachometer-alt text-blue-500"
                        iconImage="Hour.png"
                        question="How many calls can I send at once?"
                        answer="Free users can send up to 1,000 requests per hour. Pro users have unlimited access and faster delivery speeds, allowing multiple concurrent sessions."
                        isOpen={openIndex === 1}
                        onClick={handleFAQClick}
                    />
                    <FAQItem 
                        index={2}
                        iconClass="fas fa-balance-scale text-yellow-500"
                        iconImage="balance.png"
                        question="Is this service legal?"
                        answer="This tool is intended for personal stress testing and educational purposes only. You must have explicit permission to test the target number."
                        isOpen={openIndex === 2}
                        onClick={handleFAQClick}
                    />
                    <FAQItem 
                        index={3}
                        iconClass="fas fa-stop-circle text-red-500"
                        iconImage="stop.png"
                        question="Can I stop a bombing once it's started?"
                        answer="Yes, you can click the Stop button at any time during an active attack to immediately halt all outbound requests to the target number."
                        isOpen={openIndex === 3}
                        onClick={handleFAQClick}
                    />
                </div>
            </div>
        </>
    );
}