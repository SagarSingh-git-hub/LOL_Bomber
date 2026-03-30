function LiveConsole({ isActive, attackInfo }) {
    const [logs, setLogs] = React.useState([
        { id: 1, text: 'System initialized. Waiting for command...', status: 'info' },
        { id: 2, text: 'Node connection established: EU-West, US-East, AP-South', status: 'info' },
        { id: 3, text: 'Ready state: ACTIVE', status: 'info' }
    ]);
    const scrollRef = React.useRef(null);
    const attackInfoRef = React.useRef(null);
    const hasStartedAttack = React.useRef(false);

    React.useEffect(() => {
        attackInfoRef.current = attackInfo;
    }, [attackInfo]);

    React.useEffect(() => {
        if (!isActive || !attackInfoRef.current) return;
        
        // Only add initial log once per attack
        if (!hasStartedAttack.current) {
            const services = ['Amazon', 'Flipkart', 'Uber', 'Zomato', 'Swiggy', 'Snapchat', 'Tinder', 'Instagram', 'OTP-Service', 'WhatsApp', 'Telegram', 'PayTM', 'PhonePe', 'Google'];
            
            const time = new Date().toLocaleTimeString([], { hour12: false });
            const targetType = attackInfoRef.current.type === 'Email' ? 'Email' : 'Phone';
            const initialLog = {
                id: Date.now(),
                text: `[${time}] Attack initiated on ${targetType}: ${attackInfoRef.current.target}`,
                status: 'info'
            };
            setLogs(prev => [...prev, initialLog]);
            hasStartedAttack.current = true;
        }
        
        const interval = setInterval(() => {
            if (!attackInfoRef.current) return;
            
            const services = ['Amazon', 'Flipkart', 'Uber', 'Zomato', 'Swiggy', 'Snapchat', 'Tinder', 'Instagram', 'OTP-Service', 'WhatsApp', 'Telegram', 'PayTM', 'PhonePe', 'Google'];
            const service = services[Math.floor(Math.random() * services.length)];
            const isSuccess = Math.random() > 0.15;
            const time = new Date().toLocaleTimeString([], { hour12: false });
            
            const newLog = {
                id: Date.now(),
                text: `[${time}] ${attackInfoRef.current.type} sent via ${service} to ${attackInfoRef.current.target}... ${isSuccess ? 'DELIVERED' : 'FAILED (Timeout)'}`,
                status: isSuccess ? 'success' : 'error'
            };

            setLogs(prev => [...prev.slice(-40), newLog]);
        }, 800);

        return () => {
            clearInterval(interval);
            if (!isActive) {
                hasStartedAttack.current = false;
            }
        };
    }, [isActive]);

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="glass-card flex flex-col h-[450px] xl:h-full overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between backdrop-blur-md z-10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-brand-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'bg-accent-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]'} animate-pulse`}></div>
                    Live Attack Log
                </h3>
                <div className="px-2.5 py-1 rounded bg-black/40 border border-white/5 text-[10px] font-mono text-white/60">
                    {isActive ? 'BOMBING' : 'CONNECTED'}
                </div>
            </div>
            
            <div className="flex-1 bg-black/60 p-4 font-mono text-xs overflow-y-auto scrollbar-hide relative shadow-inner" ref={scrollRef}>
                <div className={`space-y-2.5 ${!isActive ? 'opacity-80' : ''}`}>
                    {logs.map(log => (
                        <div key={log.id} className={log.status === 'success' ? 'text-green-400' : log.status === 'error' ? 'text-red-400' : 'text-white/40'}>
                            <span className="text-brand-500 mr-2">{'>'}</span>{log.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}