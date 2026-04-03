function NewSidebar({ activeTab, setActiveTab }) {
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const audioRef = React.useRef(null);
    const hasInteracted = React.useRef(false);
    
    // Start audio on first user interaction
    React.useEffect(() => {
        const handleUserInteraction = () => {
            if (!hasInteracted.current && audioRef.current && !isPlaying) {
                hasInteracted.current = true;
                audioRef.current.play().catch(error => {
                    console.log('Audio play failed:', error);
                });
            }
        };

        // Add event listeners for various user interactions
        document.addEventListener('click', handleUserInteraction, { once: true });
        document.addEventListener('keydown', handleUserInteraction, { once: true });
        document.addEventListener('touchstart', handleUserInteraction, { once: true });

        return () => {
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
        };
    }, [isPlaying]);
    
    const menuItems = [
        { id: 'dashboard', icon: 'icon-layout-dashboard', iconImage: "icons/Overview.png", label: 'Dashboard' },
        { id: 'sms-bomber', icon: 'icon-message-square', iconImage: "icons/SMS.png", label: 'SMS Bomber' },
        { id: 'call-bomber', icon: 'icon-phone-call', iconImage: 'icons/phone.png', label: 'Call Bomber' },
        { id: 'email-bomber', icon: 'icon-mail', iconImage: 'icons/mailbox.png', label: 'Email Bomber' },
        { id: 'whatsapp-bomber', icon: 'icon-message-circle', iconImage: "icons/WhatsApp.png", label: 'WhatsApp Bomber' },
        { id: 'protection', icon: 'icon-shield-check', iconImage: 'icons/Shield.png', label: 'Protection' }
    ];

    const toggleMusic = () => {
        console.log('Music toggle clicked, isPlaying:', isPlaying);
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                console.log('Pausing audio');
            } else {
                audioRef.current.play().catch(error => {
                    console.log('Audio play failed:', error);
                });
                console.log('Playing audio');
            }
            setIsPlaying(!isPlaying);
        } else {
            console.log('Audio ref is null');
        }
    };

    return (
        <aside className={`hidden lg:flex flex-col h-full glass-card !rounded-none !border-y-0 !border-l-0 border-r-glass-border z-20 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}>
            {/* Hidden Audio Element - Always Rendered */}
            <audio 
                ref={audioRef} 
                loop 
                className="hidden"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source src="Audio/Bomb-Dropping.wav" type="audio/wav" />
            </audio>
            {/* Header */}
            <div className={`h-20 px-6 flex items-center gap-3 border-b border-white/5 shrink-0 ${isCollapsed ? 'justify-center' : ''}`}>
                {!isCollapsed && (
                    <div 
                        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => window.location.reload()}
                    >
                        <img src="icons/LOLBomberr.png" alt="LOLBomber Logo" className="w-10 h-10 object-contain" />
                        <h1 className="text-xl font-bold text-white tracking-tight">LOL<span className="text-brand-400">Bomber</span></h1>
                    </div>
                )}
                {isCollapsed && (
                    <img 
                        src="icons/LOLBomberr.png" 
                        alt="LOLBomber Logo" 
                        className="w-10 h-10 object-contain cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => window.location.reload()}
                    />
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
                
                {menuItems.map(item => (
                    <a 
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => { e.preventDefault(); setActiveTab(item.id); }}
                        className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-3 rounded-xl transition-all group relative overflow-hidden ${activeTab === item.id ? 'bg-brand-500/10 border border-brand-500/20 text-brand-400 shadow-[inset_0_0_20px_rgba(249,115,22,0.05)]' : 'hover:bg-white/5 text-white/60 hover:text-white border border-transparent'}`}
                    >
                        {activeTab === item.id && <div className="absolute inset-y-0 left-0 w-1 bg-brand-500 rounded-r-full shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>}
                        <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} w-10 h-10 shrink-0 ${activeTab === item.id ? 'text-brand-400' : 'text-white/60 group-hover:text-white transition-colors'}`}>
                            {item.isBrandIcon ? <i className={item.brandClass}></i> : item.iconImage ? <img src={item.iconImage} alt={item.label} className="w-8 h-8 object-contain" /> : <div className={item.icon}></div>}
                        </div>
                        {!isCollapsed && <span className="font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out">{item.label}</span>}
                    </a>
                ))}
            </nav>

            {/* Music Player Section */}
            <div className="p-4 mt-auto">
                {!isCollapsed ? (
                    <div className="glass-card bg-black/20 p-3 border-white/5">
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={toggleMusic}
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                            >
                                <img src={`icons/${isPlaying ? 'Music.png' : 'Musicoff.png'}`} alt="Music" className="w-8 h-8 object-contain" />
                            </button>
                            <div className="flex-1">
                                <div className="text-sm font-medium text-white">Background Music</div>
                                <div className="text-xs text-white/50">{isPlaying ? 'Now Playing' : 'Paused'}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button 
                        onClick={toggleMusic}
                        className="w-full h-16 flex items-center justify-center text-white hover:scale-105 transition-transform relative z-30 bg-black/20"
                    >
                        <img src={`icons/${isPlaying ? 'Music.png' : 'Musicoff.png'}`} alt="Music" className="w-8 h-8 object-contain" />
                    </button>
                )}
            </div>

            {/* Collapse Toggle Button */}
            <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-24 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-brand-600 transition-colors"
            >
                <i className={`fas fa-chevron-${isCollapsed ? 'right' : 'left'} text-xs`}></i>
            </button>
        </aside>
    );
}
