function AdminDashboard() {
    const [stats, setStats] = React.useState(null);
    const [analytics, setAnalytics] = React.useState(null);
    const [keys, setKeys] = React.useState([]);
    const [password, setPassword] = React.useState(localStorage.getItem('admin_pwd') || '');
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('overview');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [newKeyInput, setNewKeyInput] = React.useState('');

    const chartRef = React.useRef(null);
    const chartInstance = React.useRef(null);

    const apiFetch = async (endpoint, method = 'GET', body = null) => {
        const options = {
            method,
            headers: { 
                'X-Admin-Password': password,
                'Content-Type': 'application/json'
            }
        };
        if (body) options.body = JSON.stringify(body);
        
        try {
            const res = await fetch(`http://127.0.0.1:5001${endpoint}`, options);
            return await res.json();
        } catch (e) {
            return { success: false, error: "API Connection Failed" };
        }
    };

    const loadDashboard = async (pwd) => {
        setLoading(true);
        const authData = await apiFetch('/api/admin/stats');
        if (authData.success) {
            setStats(authData.stats);
            setIsAuthenticated(true);
            localStorage.setItem('admin_pwd', password);
            
            // Load Tab Data
            if (activeTab === 'overview') loadAnalytics();
            if (activeTab === 'keys') loadKeys();
        } else {
            setError(authData.error);
            setIsAuthenticated(false);
        }
        setLoading(false);
    };

    const loadAnalytics = async () => {
        const data = await apiFetch('/api/admin/analytics');
        if (data.success) setAnalytics(data.data);
    };

    const loadKeys = async () => {
        const data = await apiFetch('/api/admin/keys');
        if (data.success) setKeys(data.keys);
    };

    const toggleKey = async (keyStr) => {
        const res = await apiFetch('/api/admin/keys/toggle', 'POST', { key_string: keyStr });
        if (res.success) loadKeys();
    };

    const generateKey = async () => {
        const res = await apiFetch('/api/admin/keys/generate', 'POST', { custom_key: newKeyInput });
        if (res.success) {
            setNewKeyInput('');
            loadKeys();
            alert("Key Generated: " + res.key);
        } else {
            alert(res.error);
        }
    };

    React.useEffect(() => {
        if (password && !isAuthenticated) loadDashboard();
    }, []);

    React.useEffect(() => {
        if (isAuthenticated) {
            if (activeTab === 'overview') loadAnalytics();
            if (activeTab === 'keys') loadKeys();
        }
    }, [activeTab, isAuthenticated]);

    // Render Charts
    React.useEffect(() => {
        if (analytics && chartRef.current && activeTab === 'overview') {
            if (chartInstance.current) chartInstance.current.destroy();
            
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: analytics.labels,
                    datasets: [
                        {
                            label: 'Revenue (₹)',
                            data: analytics.revenue,
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Attacks',
                            data: analytics.attacks,
                            borderColor: '#6366f1',
                            backgroundColor: 'rgba(99, 102, 241, 0.1)',
                            fill: true,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { labels: { color: 'rgba(255,255,255,0.7)' } }
                    },
                    scales: {
                        y: { 
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            ticks: { color: 'rgba(255,255,255,0.5)' }
                        },
                        x: { 
                            grid: { display: false },
                            ticks: { color: 'rgba(255,255,255,0.5)' }
                        }
                    }
                }
            });
        }
    }, [analytics, activeTab]);

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="glass-card p-8 max-w-md w-full space-y-6 text-center animate-fade-in border border-brand-500/20 shadow-[0_0_50px_rgba(255,107,0,0.1)]">
                    <div className="w-20 h-20 bg-brand-500/10 rounded-3xl rotate-12 flex items-center justify-center mx-auto border border-brand-500/30 group hover:rotate-0 transition-transform">
                        <i className="fa-solid fa-shield-halved text-3xl text-brand-500 -rotate-12 group-hover:rotate-0 transition-transform"></i>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Central Command</h2>
                        <p className="text-white/40 text-sm">Authentication required for SaaS management.</p>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); loadDashboard(); }} className="space-y-4">
                        <div className="relative">
                            <i className="fa-solid fa-key absolute left-4 top-1/2 -translate-y-1/2 text-white/20"></i>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="glass-input pl-12 text-center tracking-widest font-mono text-brand-400 placeholder-white/10"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        {error && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest bg-red-400/5 py-2 rounded border border-red-400/10">{error}</p>}
                        <button type="submit" disabled={loading} className="glass-btn-primary w-full py-4 uppercase font-black tracking-[0.2em] flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,107,0,0.2)]">
                            {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <><i className="fa-solid fa-fingerprint"></i> Establish Link</>}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 animate-fade-in pb-12">
            {/* SaaS Admin Sidebar */}
            <div className="lg:w-72 space-y-2 shrink-0">
                <div className="glass-card p-2 space-y-1 border-white/5 bg-white/[0.01]">
                    <div className="px-4 py-3 text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Navigator</div>
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`admin-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
                    >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-500/10 border border-brand-500/20 mr-3">
                            <i className="fa-solid fa-chart-line text-brand-500 text-xs"></i>
                        </div>
                        Command Center
                    </button>
                    <button 
                        onClick={() => setActiveTab('keys')}
                        className={`admin-nav-btn ${activeTab === 'keys' ? 'active' : ''}`}
                    >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-500/10 border border-purple-500/20 mr-3">
                            <i className="fa-solid fa-id-card text-purple-500 text-xs"></i>
                        </div>
                        License Manager
                    </button>
                    <button 
                        onClick={() => setActiveTab('logs')}
                        className={`admin-nav-btn ${activeTab === 'logs' ? 'active' : ''}`}
                    >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-500/10 border border-blue-500/20 mr-3">
                            <i className="fa-solid fa-terminal text-blue-500 text-xs"></i>
                        </div>
                        Global Logs
                    </button>
                    <div className="pt-4 mt-4 border-t border-white/5 px-2">
                        <button onClick={() => { localStorage.removeItem('admin_pwd'); window.location.reload(); }} className="flex items-center w-full px-4 py-3 text-xs font-bold text-red-400/60 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all group">
                            <i className="fa-solid fa-power-off mr-3 group-hover:rotate-180 transition-transform"></i> Terminate Admin Link
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 space-y-8 min-w-0">
                
                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-slide-up">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="glass-card p-6 border-l-4 border-l-green-500 bg-gradient-to-br from-green-500/10 via-transparent to-transparent">
                                <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Lifetime Revenue</div>
                                <div className="text-4xl font-black text-white tracking-tighter">₹{stats?.total_revenue}</div>
                                <div className="mt-3 flex items-center gap-2 text-green-400 text-[10px] font-black bg-green-400/10 px-2 py-1 rounded-md w-fit uppercase tracking-widest border border-green-400/20">
                                    <i className="fa-solid fa-vault"></i> Secured
                                </div>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-l-brand-500 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent">
                                <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Licenses</div>
                                <div className="text-4xl font-black text-white tracking-tighter">{stats?.total_keys}</div>
                                <div className="mt-3 flex items-center gap-2 text-brand-400 text-[10px] font-black bg-brand-400/10 px-2 py-1 rounded-md w-fit tracking-widest border border-brand-400/20">
                                    <i className="fa-solid fa-users"></i> ACTIVE FLEET
                                </div>
                            </div>
                            <div className="glass-card p-6 border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent">
                                <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">24h Traffice</div>
                                <div className="text-4xl font-black text-white tracking-tighter">{stats?.attacks_24h}</div>
                                <div className="mt-3 flex items-center gap-2 text-purple-400 text-[10px] font-black bg-purple-400/10 px-2 py-1 rounded-md w-fit uppercase tracking-widest border border-purple-400/20">
                                    <i className="fa-solid fa-bolt"></i> Live Packets
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-brand-500 animate-ping"></div>
                                    Network Performance & Revenue Trend
                                </h3>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5 text-[10px] text-white/50 font-bold uppercase"><span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Revenue</div>
                                    <div className="flex items-center gap-1.5 text-[10px] text-white/50 font-bold uppercase"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full"></span> Load</div>
                                </div>
                            </div>
                            <div className="h-[350px] relative">
                                <canvas ref={chartRef}></canvas>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'keys' && (
                    <div className="space-y-6 animate-slide-up">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-card p-6 border-brand-500/10">
                            <div>
                                <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tighter">
                                    <i className="fa-solid fa-key text-brand-500"></i> License Management
                                </h2>
                                <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">Control all PREMIUM fleet access strings</p>
                            </div>
                            <div className="flex gap-2 p-1 bg-white/[0.03] rounded-xl border border-white/5 ring-1 ring-white/5">
                                <input 
                                    type="text" 
                                    value={newKeyInput}
                                    onChange={(e) => setNewKeyInput(e.target.value)}
                                    placeholder="CUSTOM_CODE_OPTIONAL"
                                    className="bg-transparent border-none text-brand-400 text-xs px-4 w-48 font-mono outline-none placeholder:text-white/10 uppercase"
                                />
                                <button onClick={generateKey} className="glass-btn-primary px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                                    Generate New
                                </button>
                            </div>
                        </div>
                        
                        <div className="glass-card overflow-hidden border-white/5">
                            <div className="overflow-x-auto text-[13px]">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 text-[10px] text-white/30 uppercase font-black tracking-widest">
                                        <tr>
                                            <th className="px-6 py-5">Issue Date</th>
                                            <th className="px-6 py-5">Licensed ID</th>
                                            <th className="px-6 py-5">Reference</th>
                                            <th className="px-6 py-5">Access Status</th>
                                            <th className="px-6 py-5">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {keys.map((k, i) => (
                                            <tr key={i} className="hover:bg-brand-500/[0.03] transition-all group">
                                                <td className="px-6 py-4">
                                                    <div className="text-white/40 text-[10px] font-mono leading-tight">
                                                        {new Date(k.created_at).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-brand-400 font-black font-mono tracking-tighter bg-brand-500/5 px-2 py-1 rounded border border-brand-500/10">
                                                        {k.key_string}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-[10px] text-white/20 font-mono tracking-widest leading-tight uppercase">
                                                        {k.razorpay_order_id === 'ADMIN_MANUAL' ? 'CMD_AUTH_OVERRIDE' : k.razorpay_order_id}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`flex items-center gap-2 group-hover:scale-105 transition-transform origin-left`}>
                                                        <div className={`w-2 h-2 rounded-full ${k.is_active ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`}></div>
                                                        <span className={`text-[10px] font-black uppercase tracking-widest ${k.is_active ? 'text-green-500/80' : 'text-red-500/80'}`}>
                                                            {k.is_active ? 'ENABLED' : 'REVOKED'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button 
                                                        onClick={() => toggleKey(k.key_string)}
                                                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${k.is_active ? 'text-red-400 hover:bg-red-400/10' : 'text-green-400 hover:bg-green-400/10'}`}
                                                        title={k.is_active ? "Kill License" : "Restore License"}
                                                    >
                                                        <i className={`fa-solid ${k.is_active ? 'fa-user-slash' : 'fa-user-check'} text-xs`}></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'logs' && (
                    <div className="space-y-6 animate-slide-up">
                        <div className="flex items-center justify-between glass-card p-6 border-blue-500/10">
                            <div>
                                <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tighter">
                                    <i className="fa-solid fa-terminal text-blue-500"></i> Global Operations Log
                                </h2>
                                <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">Real-time packet dispatch monitoring</p>
                            </div>
                            <button onClick={loadDashboard} className="glass-btn text-[10px] px-5 py-3 uppercase font-black bg-blue-500/10 text-blue-400 border border-blue-500/20 tracking-[0.2em] hover:bg-blue-500/20 transition-all">
                                <i className="fa-solid fa-sync-alt mr-2 animate-spin-slow"></i> Force Refresh
                            </button>
                        </div>

                        <div className="glass-card overflow-hidden border-white/5">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-[10px] text-white/30 uppercase font-black tracking-widest">
                                    <tr>
                                        <th className="px-6 py-5">Packet Timestamp</th>
                                        <th className="px-6 py-5">Attack Protocol</th>
                                        <th className="px-6 py-5">Target ID</th>
                                        <th className="px-6 py-5">Access Level</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {stats?.recent_attacks?.map((attack, i) => (
                                        <tr key={i} className="hover:bg-blue-500/5 transition-all group">
                                            <td className="px-6 py-4 text-[10px] text-white/30 font-mono italic">
                                                {new Date(attack.timestamp).toLocaleTimeString()} [{new Date(attack.timestamp).toLocaleDateString()}]
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-brand-500 group-hover:scale-150 transition-all duration-300"></div>
                                                    <span className="text-xs font-black text-white uppercase tracking-tighter">{attack.type} OVERRIDE</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-mono text-brand-400/80 tracking-tighter">
                                                {attack.target.substring(0, 6)}XXXXXX
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-md text-[9px] font-black tracking-[0.2em] border ${attack.mode === 'premium' ? 'bg-brand-500/10 text-brand-400 border-brand-500/20' : 'bg-white/5 text-white/20 border-white/10'}`}>
                                                    {attack.mode.toUpperCase()}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .admin-nav-btn {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    padding: 12px 16px;
                    font-size: 13px;
                    font-weight: 700;
                    color: rgba(255, 255, 255, 0.4);
                    border-radius: 16px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    text-align: left;
                    border: 1px solid transparent;
                }
                .admin-nav-btn:hover {
                    color: white;
                    background: rgba(255, 255, 255, 0.05);
                    transform: translateX(4px);
                }
                .admin-nav-btn.active {
                    color: white;
                    background: rgba(255, 107, 0, 0.1);
                    border-color: rgba(255, 107, 0, 0.2);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                }
                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
