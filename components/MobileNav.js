function MobileNav({ activeTab, setActiveTab }) {
    const menuItems = [
        { id: 'dashboard', icon: 'icon-layout-dashboard', iconImage: 'icons/Overview.png', label: 'Home' },
        { id: 'sms-bomber', icon: 'icon-message-square', iconImage: 'icons/SMS.png', label: 'SMS' },
        { id: 'call-bomber', icon: 'icon-phone-call', iconImage: 'icons/phone.png', label: 'Call' },
        { id: 'email-bomber', icon: 'icon-mail', iconImage: 'icons/mailbox.png', label: 'Email' },
        { id: 'whatsapp-bomber', icon: 'icon-message-circle', iconImage: 'icons/WhatsApp.png', label: 'WA' },
        { id: 'protection', icon: 'icon-shield-check', iconImage: 'icons/Shield.png', label: 'Protect' }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 lg:hidden glass-card !rounded-none !border-x-0 !border-b-0 border-t-glass-border z-50 bg-black/60 pb-safe backdrop-blur-xl">
            <div className="flex items-center justify-around p-2">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all flex-1 ${activeTab === item.id ? 'text-brand-400 font-bold' : 'text-white/40 hover:text-white/80'}`}
                    >
                        <div className={`text-xl ${activeTab === item.id ? 'drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]' : ''}`}>
                            {item.isBrandIcon ? <i className={item.brandClass}></i> : item.iconImage ? <img src={item.iconImage} alt={item.label} className={`${item.id === 'sms-bomber' || item.id === 'dashboard' ? 'w-7 h-7' : item.id === 'email-bomber' ? 'w-9 h-9' : 'w-8 h-8'} object-contain`} /> : <div className={item.icon}></div>}
                        </div>
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}