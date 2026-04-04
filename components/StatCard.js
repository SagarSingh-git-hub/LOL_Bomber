function StatCard({ icon, label, value, trend, trendUp, color, iconImage }) {
    const colorMap = {
        brand: 'bg-brand-500', textBrand: 'text-brand-400', borderBrand: 'border-brand-400/20', bgBrandLight: 'bg-brand-400/10',
        accent: 'bg-accent-500', textAccent: 'text-accent-400',
        green: 'bg-green-500', textGreen: 'text-green-400',
        purple: 'bg-purple-500', textPurple: 'text-purple-400',
    };
    
    return (
        <div className="glass-card glass-card-hover p-5 relative overflow-hidden group">
            <div className={`absolute -right-6 -top-6 w-24 h-24 ${colorMap[color]}/10 rounded-full blur-2xl group-hover:${colorMap[color]}/20 transition-colors`}></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-glass border border-white/10 flex items-center justify-center shadow-inner">
                    {iconImage ? <img src={iconImage} alt={label} className="w-7 h-7 object-contain" /> : <div className={`${icon} text-xl ${colorMap['text' + color.charAt(0).toUpperCase() + color.slice(1)]}`}></div>}
                </div>
                <span className={`flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md border ${trend === 'Stable' ? 'text-white/60 bg-white/5 border-white/10' : 'text-green-400 bg-green-400/10 border-green-400/20'}`}>
                    {trend !== 'Stable' && <div className="icon-trending-up w-3 h-3"></div>}
                    {trend}
                </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1 font-mono">{value}</div>
            <div className="text-xs sm:text-sm text-white/50 font-medium">{label}</div>
        </div>
    );
}