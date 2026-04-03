class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error(error, errorInfo); }
  render() {
    if (this.state.hasError) return <div className="p-8 text-white">Something went wrong. Refresh the page.</div>;
    return this.props.children;
  }
}

function App() {
    const [activeTab, setActiveTab] = React.useState('dashboard');
    const [isBombing, setIsBombing] = React.useState(false);
    const [attackInfo, setAttackInfo] = React.useState(null);
    const [activeUsers, setActiveUsers] = React.useState(1204);
    const scrollContainerRef = React.useRef(null);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveUsers(prev => Math.max(800, prev + Math.floor(Math.random() * 7) - 3));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Scroll to top when tab changes
    React.useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [activeTab]);

    const handleStatusChange = (active, info) => {
        setIsBombing(active);
        setAttackInfo(info);
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'dashboard':
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            <StatCard icon="icon-bomb" iconImage="icons/bomb.png" label="Total Sent" value="2.4M+" trend="+15%" trendUp={true} color="brand" />
                            <StatCard icon="icon-users" iconImage="icons/Group.png" label="Active Users" value={activeUsers.toLocaleString()} trend="+5%" trendUp={true} color="accent" />
                            <StatCard icon="icon-server" iconImage="icons/Server.png" label="Uptime" value="99.9%" trend="Stable" trendUp={true} color="green" />
                            <StatCard icon="icon-shield-check" iconImage="icons/Shield1.png" label="Protected" value="84k" trend="+8%" trendUp={true} color="purple" />
                        </div>
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            <div className="xl:col-span-2"><AttackPanel type="SMS" onStatusChange={handleStatusChange} /></div>
                            <div><LiveConsole isActive={isBombing} attackInfo={attackInfo} /></div>
                        </div>
                        <InfoSection />
                    </div>
                );
            case 'sms-bomber':
                return (
                    <div className="space-y-8 animate-fade-in pb-12">
                         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            <div className="xl:col-span-2"><AttackPanel type="SMS" onStatusChange={handleStatusChange} /></div>
                            <div><LiveConsole isActive={isBombing} attackInfo={attackInfo} /></div>
                        </div>
                    </div>
                );
            case 'call-bomber':
                return (
                    <div className="space-y-8 animate-fade-in pb-12">
                         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            <div className="xl:col-span-2"><AttackPanel type="Call" onStatusChange={handleStatusChange} /></div>
                            <div><LiveConsole isActive={isBombing} attackInfo={attackInfo} /></div>
                        </div>
                    </div>
                );
            case 'email-bomber':
                return (
                    <div className="space-y-8 animate-fade-in pb-12">
                         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            <div className="xl:col-span-2"><AttackPanel type="Email" onStatusChange={handleStatusChange} /></div>
                            <div><LiveConsole isActive={isBombing} attackInfo={attackInfo} /></div>
                        </div>
                    </div>
                );
            case 'whatsapp-bomber':
                return (
                    <div className="space-y-8 animate-fade-in pb-12">
                         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            <div className="xl:col-span-2"><AttackPanel type="WhatsApp" onStatusChange={handleStatusChange} /></div>
                            <div><LiveConsole isActive={isBombing} attackInfo={attackInfo} /></div>
                        </div>
                    </div>
                );
            case 'protection':
                return <div className="animate-fade-in pb-12"><ProtectionPanel /></div>;
            case 'terms':
                return <LegalPages type="terms" setActiveTab={setActiveTab} />;
            case 'privacy':
                return <LegalPages type="privacy" setActiveTab={setActiveTab} />;
            case 'disclaimer':
                return <LegalPages type="disclaimer" setActiveTab={setActiveTab} />;
            case 'about':
                return <LegalPages type="about" setActiveTab={setActiveTab} />;
            case 'contact':
                return <LegalPages type="contact" setActiveTab={setActiveTab} />;
            case 'faq':
                return <LegalPages type="faq" setActiveTab={setActiveTab} />;
            case 'admin':
                return <AdminDashboard />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#050505] to-black"></div>
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-600/10 blur-[150px] animate-glow"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent-500/10 blur-[150px] animate-glow" style={{animationDelay: '-4s'}}></div>
                <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-[120px] animate-glow" style={{animationDelay: '-2s'}}></div>
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>
            
            <NewSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
                <Header activeTab={activeTab} />
                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 scrollbar-hide">
                    {renderContent()}
                    <Footer setActiveTab={setActiveTab} />
                </div>
            </main>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ErrorBoundary><App /></ErrorBoundary>);