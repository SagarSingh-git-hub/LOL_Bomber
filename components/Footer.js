function Footer({ setActiveTab }) {
    return (
        <footer className="mt-12 pt-8 border-t border-white/10 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-6">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                        <img src="icons/LOLBomberr.png" alt="LOLBomber Logo" className="w-10 h-10 object-contain" />
                        <span className="text-lg font-bold tracking-tight text-white">LOL<span className="text-brand-400">Bomber</span></span>
                    </div>
                    <p className="text-white/40 text-xs max-w-xs leading-relaxed">
                        The most powerful and reliable bombing service available in 2026. Join thousands of satisfied users who trust our free bombing solutions.                    </p>
                </div>
                
                <div>
                    <h4 className="font-bold mb-3 text-brand-400 uppercase tracking-wider text-[10px]">Services</h4>
                    <ul className="space-y-2 text-xs text-white/50">
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('sms-bomber'); }} className="hover:text-brand-400 transition-colors">SMS Bomber</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('call-bomber'); }} className="hover:text-brand-400 transition-colors">Call Bomber</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('email-bomber'); }} className="hover:text-brand-400 transition-colors">Email Bomber</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('whatsapp-bomber'); }} className="hover:text-brand-400 transition-colors">WhatsApp Bomber</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('protection'); }} className="hover:text-brand-400 transition-colors">Number Protection</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-3 text-brand-400 uppercase tracking-wider text-[10px]">Company</h4>
                    <ul className="space-y-2 text-xs text-white/50">
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('about'); }} className="hover:text-brand-400 transition-colors">About Us</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('contact'); }} className="hover:text-brand-400 transition-colors">Contact</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('faq'); }} className="hover:text-brand-400 transition-colors">FAQ</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="font-bold mb-3 text-brand-400 uppercase tracking-wider text-[10px]">Legal</h4>
                    <ul className="space-y-2 text-xs text-white/50">
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('terms'); }} className="hover:text-brand-400 transition-colors">Terms of Use</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('privacy'); }} className="hover:text-brand-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('disclaimer'); }} className="hover:text-brand-400 transition-colors">Disclaimer</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="text-center text-[10px] text-white/30 pt-4 border-t border-white/5 flex items-center justify-center gap-2">
                &copy; 2026 LOLBomber. All rights reserved.
                <span className="opacity-20 hover:opacity-100 transition-opacity cursor-pointer text-[8px]" onClick={() => setActiveTab('admin')}>&bull; Admin</span>
            </div>
        </footer>
    );
}