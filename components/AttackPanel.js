function AttackPanel({ type = 'SMS', onStatusChange }) {
    const [status, setStatus] = React.useState('idle');
    const [target, setTarget] = React.useState('');
    const [message, setMessage] = React.useState('Hello from LOLBomber!');
    const [agreed, setAgreed] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const [mode, setMode] = React.useState('free');
    const [premiumKey, setPremiumKey] = React.useState('');
    const [isPaying, setIsPaying] = React.useState(false);
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

    const handleBuyPremium = async () => {
        setIsPaying(true);
        try {
            const res = await fetch('http://127.0.0.1:5000/api/create_order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if (!data.success) {
                alert("Failed to initiate payment. Check backend config.");
                setIsPaying(false);
                return;
            }

            if (data.is_demo) {
                alert("DEMO MODE DETECTED: Simulating secure payment for testing...");
                setTimeout(async () => {
                    try {
                        const verificationRes = await fetch('http://127.0.0.1:5000/api/verify_payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_payment_id: "demo_payment_" + Math.random().toString(36).substring(7),
                                razorpay_order_id: data.order.id,
                                razorpay_signature: "demo_signature"
                            })
                        });
                        const verifyData = await verificationRes.json();
                        if (verifyData.success) {
                            alert("✨ TEST SUCCESS! Your Premium Key is: " + verifyData.premium_key);
                            setPremiumKey(verifyData.premium_key);
                            setMode('premium');
                        } else {
                            alert("Demo Verification Failed!");
                        }
                    } catch (err) {
                        alert("Demo Verification Error! Backend running?");
                    } finally {
                        setIsPaying(false);
                    }
                }, 1500);
                return;
            }

            const options = {
                "key": data.key_id,
                "amount": data.order.amount,
                "currency": "INR",
                "name": "LOLBomber Premium",
                "description": "Unlock Custom SMS Mode",
                "image": "https://cdn-icons-png.flaticon.com/512/3241/3241031.png",
                "order_id": data.order.id,
                "handler": async function (response) {
                    try {
                        const verificationRes = await fetch('http://127.0.0.1:5000/api/verify_payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });
                        const verifyData = await verificationRes.json();
                        if (verifyData.success) {
                            alert("Payment Successful! Your Premium Key is: " + verifyData.premium_key);
                            setPremiumKey(verifyData.premium_key);
                            setMode('premium');
                        } else {
                            alert("Payment Verification Failed: " + (verifyData.error || "Unknown error"));
                        }
                    } catch (err) {
                        alert("Payment Verification Error! Backend running?");
                    } finally {
                        setIsPaying(false);
                    }
                },
                "modal": {
                    "ondismiss": function () {
                        setIsPaying(false);
                    }
                },
                "theme": {
                    "color": "#f97316"
                }
            };
            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                alert(response.error.description);
                setIsPaying(false);
            });
            rzp.open();

        } catch (e) {
            console.error(e);
            alert("Connection error! Backend running?");
            setIsPaying(false);
        }
    };

    const triggerAttack = async () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, mode, target, message, premium_key: premiumKey })
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/api/attack', options);
            const result = await response.json();

            if (result.success) {
                console.log('Attack Packet Sent!');
                setCount(prev => prev + 1);
            } else {
                console.error('Backend Error:', result.error);
                stopAttack();
                alert("Server execution error: " + result.error);
            }
        } catch (error) {
            console.error('Error triggering attack:', error);
            stopAttack();
            alert("Connection error! Backend running?");
        }
    };

    const handleStart = (e) => {
        e.preventDefault();
        if (!agreed) return;
        if (type !== 'Email' && target.length < 10) return;
        if (type === 'Email' && !target.includes('@')) return;
        if (type === 'SMS' && mode === 'premium' && !premiumKey) {
            alert("Please enter a valid Premium License Key!");
            return;
        }
        setStatus('active');
        setCount(0);

        triggerAttack();
        intervalRef.current = setInterval(triggerAttack, 2000);
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
                <div className="mb-8 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Quick {type} Attack</h2>
                        <p className="text-sm text-white/50 font-light">Fast, anonymous, and reliable {type.toLowerCase()} flooding service.</p>
                    </div>
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
                                    className="flex-1 bg-transparent px-4 py-3 text-lg text-white placeholder-white/20 focus:outline-none font-mono h-14"
                                    placeholder="Enter 10-digit number"
                                    maxLength="10"
                                    disabled={status === 'active'}
                                    required
                                />
                            </div>
                        )}
                    </div>

                    {type === 'SMS' && (
                        <div className="space-y-4 mb-6 bg-white/5 border border-white/10 p-4 rounded-xl">
                            <label className="text-sm font-bold text-white flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <i className="fa-solid fa-sliders text-brand-400"></i> Bomber Mode
                                </span>
                            </label>

                            <div className="flex gap-2 p-1 bg-black/40 rounded-xl relative">
                                <div
                                    className={`absolute top-1 bottom-1 left-1 w-[calc(50%_-_0.5rem)] bg-brand-500 rounded-lg shadow-lg shadow-brand-500/20 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${mode === 'premium' ? 'translate-x-[calc(100%_+_0.5rem)]' : 'translate-x-0'}`}
                                ></div>
                                <button type="button" onClick={() => setMode('free')} className={`relative z-10 flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${mode === 'free' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}>
                                    <i className="fa-solid fa-bolt mr-2 text-xs"></i> Free OTP
                                </button>
                                <button type="button" onClick={() => setMode('premium')} className={`relative z-10 flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${mode === 'premium' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}>
                                    <i className="fa-solid fa-gem mr-2 text-xs text-yellow-400"></i> Premium
                                </button>
                            </div>

                            {mode === 'premium' && (
                                <div className="pt-2 animate-fade-in space-y-3">
                                    <div className="text-xs text-white/50 text-center mb-1">Enter your Premium Key to unlock Custom Messaging, or generate a new one.</div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={premiumKey}
                                            onChange={(e) => setPremiumKey(e.target.value)}
                                            className="flex-1 bg-black/40 border border-brand-500/40 rounded-lg px-3 text-sm text-brand-300 placeholder-white/20 focus:outline-none focus:border-brand-500 font-mono"
                                            placeholder="LOL-XX00-XXX0000"
                                            disabled={status === 'active'}
                                        />
                                        <button type="button" onClick={handleBuyPremium} disabled={isPaying || status === 'active'} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:brightness-110 text-white font-bold py-2 px-4 rounded-lg text-sm shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2 disabled:opacity-50">
                                            {isPaying ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-cart-shopping"></i>} Buy ₹49
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className={`space-y-3 transition-opacity ${(type === 'SMS' || type === 'WhatsApp') && mode === 'free' ? 'opacity-50' : ''}`}>
                        <label className="text-sm font-bold text-white flex items-center justify-between mb-2">
                            <span className="flex gap-2"><img src="icons/message.png" alt="Message Icon" className="w-6 h-6 object-contain" /> Custom Message</span>
                        </label>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="glass-input px-4 py-3 text-white placeholder-white/20 focus:outline-none w-full disabled:cursor-not-allowed"
                            placeholder={(type === 'SMS' || type === 'WhatsApp') && mode === 'free' ? "Feature locked in Free Mode" : "Type your message here..."}
                            disabled={status === 'active' || ((type === 'SMS' || type === 'WhatsApp') && mode === 'free')}
                        />
                    </div>

                    <div className="p-4 rounded-xl border mt-6 border-transparent">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center w-5 h-5 shrink-0 mt-0.5">
                                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 peer" disabled={status === 'active'} required />
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
                            <button type="submit" disabled={!agreed} className="glass-btn-primary flex-1 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed group">
                                <img src="icons/rocket.png" alt="Rocket" className="w-7 h-7 object-contain group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" /> Launch Attack
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}