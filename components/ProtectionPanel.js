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
                <div className="px-5 pb-4 ml-9 text-left">
                    <p className="text-xs text-white/50 leading-relaxed">{answer}</p>
                </div>
            </div>
        </div>
    );
}

function ProtectionPanel() {
    const [target, setTarget] = React.useState('');
    const [name, setName] = React.useState('');
    const [openIndex, setOpenIndex] = React.useState(null);
    
    const handleFAQClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full pt-6 pb-12">
            {/* Main Protection Form */}
            <div className="glass-card w-full text-center py-8 px-8 mb-10 max-w-8xl mx-auto">
                <div className="w-20 h-20 mx-auto rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(249,115,22,0.2)]">
                    <img src="icons/Shield.png" alt="Shield Icon" className="w-16 h-16 object-contain" />
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-white">Protect Your Number</h2>
                <p className="text-sm text-white/60 mb-8 max-w-md mx-auto">
                    Enter your details to activate permanent protection against bombing attacks
                </p>

                <form className="max-w-md mx-auto space-y-6 text-left">
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                            <img src="icons/phone.png" alt="Phone Icon" className="w-7 h-7 object-contain" />
                            Phone Number
                        </label>
                        <div className="relative w-full group/input border border-white/20 hover:border-brand-400 focus-within:border-brand-500 transition-colors rounded-xl overflow-hidden flex bg-white/5">
                            <div className="w-16 flex items-center justify-center border-r border-white/10 bg-white/5 text-white font-bold h-14">
                                +91
                            </div>
                            <input 
                                type="text" 
                                inputMode="numeric"
                                value={target}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    if (val.length <= 10) setTarget(val);
                                }}
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                className="flex-1 bg-transparent px-4 py-3 text-lg text-white placeholder-white/20 focus:outline-none font-mono h-14"
                                placeholder="Enter 10-digit number"
                                maxLength="10"
                                pattern="[0-9]{10}"
                                required
                            />
                        </div>
                        <div className="flex justify-between text-xs text-white/50 px-1">
                            <div className="flex items-center gap-1">
                                <div className="icon-info w-3 h-3"></div>
                                Indian numbers only
                            </div>
                            <div className={`${target.length === 10 ? 'text-green-400' : 'text-white/30'}`}>
                                {target.length}/10
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                            <img src="icons/3D_Portrait_Avatar_1.png" alt="User Avatar" className="w-7 h-7 rounded-full object-cover" />
                            Your Name
                        </label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="glass-input px-4 py-3 text-white placeholder-white/20 focus:outline-none w-full h-14 rounded-xl border border-white/20 hover:border-brand-400 focus:border-brand-500 transition-colors"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className="flex justify-center pt-4">
                        <button type="submit" disabled={target.length < 10 || name.trim() === ''} className="w-full glass-btn-primary flex items-center justify-center gap-2 h-14 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                            <img src="icons/Shield.png" alt="Shield Icon" className="w-7 h-7 object-contain" />
                            Activate Protection
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs text-white/40 font-medium">
                    * Protection is active for 30 days. Renew after expiration.
                </p>
            </div>

            {/* How Our Protection Works & Tips */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10 animate-slide-up" style={{animationDelay: '0.1s'}}>
                <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-brand-500/10 rounded-full blur-2xl"></div>
                    <div className="w-10 h-10 rounded-xl bg-glass border border-white/10 flex items-center justify-center mb-4">
                        <img src="icons/Shield1.png" alt="Protection" className="w-7 h-7 object-contain" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">How Our Protection Works</h3>
                    <ul className="space-y-3 text-xs sm:text-sm text-white/60 leading-relaxed">
                        <li className="flex items-start gap-2">
                            <i className="fas fa-check text-green-500 mt-1"></i>
                            <span>Your number is instantly added to our global blacklist database across all operational nodes.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <i className="fas fa-check text-green-500 mt-1"></i>
                            <span>All outgoing API requests targeting your number are automatically dropped before leaving our servers.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <i className="fas fa-check text-green-500 mt-1"></i>
                            <span>Cross-platform protection covers SMS, Call, WhatsApp, and Email bombing attempts.</span>
                        </li>
                    </ul>
                </div>

                <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl"></div>
                    <div className="w-10 h-10 rounded-xl bg-glass border border-white/10 flex items-center justify-center mb-4">
                        <img src="icons/Blub.png" alt="Protection" className="w-7 h-7 object-contain" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">Additional Protection Tips</h3>
                    <ul className="space-y-3 text-xs sm:text-sm text-white/60 leading-relaxed">
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5 shrink-0"></div>
                            <span>Register your number with your local telecom provider's DND (Do Not Disturb) registry.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5 shrink-0"></div>
                            <span>Use built-in OS features (iOS/Android) to silence unknown callers.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5 shrink-0"></div>
                            <span>Avoid sharing your primary phone number on public forums or social media platforms.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Quick FAQs */}
            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <h3 className="text-xl font-bold text-white mb-6 pl-2">Quick FAQs</h3>
                <div className="space-y-3">
                    <FAQItem
                        index={0} 
                        iconClass="fas fa-shield-alt text-green-500"
                        iconImage="icons/Swords.png"
                        question="How long does protection take to activate?"
                        answer="Protection is activated instantly across all our global nodes moment you submit form successfully."
                        isOpen={openIndex === 0}
                        onClick={handleFAQClick}
                    />
                    <FAQItem
                        index={1} 
                        iconClass="fas fa-clock text-blue-500"
                        iconImage="icons/SandHour.png"
                        question="How long does protection last?"
                        answer="By default, a single protection request lasts for 30 days. You can return and re-submit your number to renew the protection for free."
                        isOpen={openIndex === 1}
                        onClick={handleFAQClick}
                    />
                    <FAQItem
                        index={2}  
                        iconClass="fas fa-lock text-yellow-500"
                        iconImage="icons/Lock.png"
                        question="Is my data secure?"
                        answer="Yes. We only store a one-way cryptographic hash of your phone number. We do not store the actual number in plain text, ensuring your privacy."
                        isOpen={openIndex === 2}
                        onClick={handleFAQClick}
                    />
                </div>
            </div>
        </div>
    );
}