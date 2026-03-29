function Header({ activeTab }) {
    const [timeString, setTimeString] = React.useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' GMT');
    const [showNotifs, setShowNotifs] = React.useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTimeString(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' GMT');
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Close notifications when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (showNotifs && !e.target.closest('.notification-container')) {
                setShowNotifs(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showNotifs]);

    const getTitle = () => {
        switch(activeTab) {
            case 'sms-bomber': return 'SMS Bomber';
            case 'call-bomber': return 'Call Bomber';
            case 'email-bomber': return 'Email Bomber';
            case 'whatsapp-bomber': return 'WhatsApp Bomber';
            case 'protection': return 'Protection';
            case 'terms': return 'Terms of Use';
            case 'privacy': return 'Privacy Policy';
            case 'disclaimer': return 'Disclaimer';
            case 'about': return 'About Us';
            case 'contact': return 'Contact';
            case 'faq': return 'FAQ';
            default: return 'Overview';
        }
    };

    return (
        <header className="h-20 px-6 lg:px-10 flex items-center justify-between glass-card !rounded-none !border-x-0 !border-t-0 border-b-glass-border sticky top-0 z-30 bg-black/20 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight hidden sm:block">Welcome back, Mitar</h2>
                    <h2 className="text-xl font-bold text-white tracking-tight sm:hidden">{getTitle()}</h2>
                    <p className="text-xs text-white/50 hidden sm:block">Here's what's happening on the network today.</p>
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 shadow-inner">
                    <img src="icons/Time.png" alt="Clock Icon" className="w-6 h-6 object-contain opacity-50" />
                    <span className="text-xs font-mono text-white/70">{timeString}</span>
                    <div className="w-px h-3 bg-white/20 mx-1"></div>
                    <span className="text-[10px] font-bold text-brand-400 tracking-wider uppercase">Live</span>
                </div>

                <div className="relative notification-container">
                    <button 
                        onClick={() => setShowNotifs(!showNotifs)} 
                        className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/70 hover:text-white transition-all hover:bg-white/10 border-white/10 shadow-none relative"
                    >
                        <img src="icons/bell.png" alt="Bell Icon" className="w-6 h-6 object-contain" />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-brand-500 rounded-full shadow-[0_0_5px_rgba(249,115,22,0.8)]"></span>
                    </button>
                    
                    {showNotifs && (
                        <div className="absolute right-0 top-full mt-3 w-72 sm:w-80 bg-[#111111] p-4 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.9)] rounded-2xl z-50 animate-fade-in origin-top-right">
                            <h4 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
                                Notifications
                                <span className="text-[10px] bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded-full">2 New</span>
                            </h4>
                            <div className="space-y-3">
                                <div className="flex gap-3 items-start border-b border-white/5 pb-3">
                                    <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 shrink-0 animate-pulse"></div>
                                    <div>
                                        <p className="text-xs text-white/90 font-medium">WhatsApp Bomber Live</p>
                                        <p className="text-[10px] text-white/50 mt-0.5 leading-relaxed">The new WhatsApp bomber module is now fully functional and available.</p>
                                        <span className="text-[9px] text-brand-400/50 mt-1 block">Just now</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="w-2 h-2 rounded-full bg-accent-500 mt-1.5 shrink-0"></div>
                                    <div>
                                        <p className="text-xs text-white/90 font-medium">System Update</p>
                                        <p className="text-[10px] text-white/50 mt-0.5 leading-relaxed">Added 3 new high-speed nodes to the EU-West region.</p>
                                        <span className="text-[9px] text-white/30 mt-1 block">2 hours ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
            
        </header>
    );
}