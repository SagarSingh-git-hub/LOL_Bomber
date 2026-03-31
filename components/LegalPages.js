function LegalPages({ type, setActiveTab }) {
    const content = {
        terms: {
            title: 'Terms of Service',
            text: []
        },
        privacy: {
            title: 'Your Privacy Matters',
            text: []
        },
        disclaimer: {
            title: 'Important Notice',
            text: []
        },
        about: {
            title: 'About Us',
            text: [
                'CallBomberz was created in 2020 with a simple mission - to provide free online tools for fun and entertainment. Since our inception, we\'ve been dedicated to developing innovative and effective prank tools that anyone can use.',
                'What started as a small project has now grown into the most trusted and powerful bombing service on the internet. Our team consists of passionate developers who continuously improve our algorithms to ensure maximum efficiency and reliability.',
                'Throughout our journey, we\'ve maintained our commitment to responsible usage. We believe that pranks should be harmless and fun, which is why we\'ve implemented various safeguards and offer protection options for those who wish to shield their numbers from bombing.',
                'Our bombing service utilizes advanced algorithms and multiple API integrations to deliver messages and calls at unprecedented rates. We\'ve built a robust infrastructure that can handle thousands of requests simultaneously without compromising on speed or reliability.',
                'For 2026, we\'ve completely revamped our core technology to bypass common detection systems and ensure higher delivery success rates. Our service now leverages multiple carriers and sources, making it nearly impossible for recipients to block all incoming messages and calls.',
                'We regularly update our systems to adapt to changing security measures and ensure consistent performance. Our team monitors delivery rates and user feedback to continuously improve the service.',
                'Entertainment - We believe in creating moments of fun and laughter. Our services are designed purely for entertainment purposes.',
                'Responsibility - We promote responsible use of our tools and have measures in place to prevent misuse.',
                'Innovation - We continuously improve our technology to provide the best experience possible.',
                'Community - We value our user community and listen to feedback to enhance our services.'
            ]
        },
        contact: {
            title: 'Get in Touch',
            text: [
                'Need help or want to report an issue? Our support team is here for you.',
                'Email us at: support@lolbomber.example.com',
                'Please allow up to 24-48 hours for a response from our technical team.'
            ]
        },
        faq: {
            title: 'Frequently Asked Questions',
            isFAQ: true
        }
    };

    const [openIndex, setOpenIndex] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState('');
    
    const handleFAQClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filterQuestions = (questions) => {
        if (!searchTerm.trim()) return questions;
        
        const searchLower = searchTerm.toLowerCase();
        return questions.filter(item => 
            item.question.toLowerCase().includes(searchLower) ||
            item.answer.toLowerCase().includes(searchLower)
        );
    };

    const faqSections = [
        {
            title: "General Questions",
            icon: "fas fa-question-circle",
            questions: [
                {
                    index: 0, 
                    iconClass: "fas fa-info-circle text-blue-500",
                    iconImage: "icons/info.png",
                    question: "What is Call Bomber?",
                    answer: "Call Bomber is a prank service that allows you to send multiple calls to a target phone number in a short period of time. It's designed for harmless fun between friends and should only be used with consent."
                },
                {
                    index: 1, 
                    iconClass: "fas fa-gavel text-yellow-500",
                    iconImage: "icons/balance.png",
                    question: "Is using Call Bomber legal?",
                    answer: "Call Bomber is legal when used responsibly for pranking friends with their knowledge and consent. However, using the service for harassment, intimidation, or to cause distress is illegal in most jurisdictions and violates their terms of service."
                },
                {
                    index: 2,  
                    iconClass: "fas fa-dollar-sign text-green-500",
                    iconImage: "icons/Money.png",
                    question: "Is Call Bomber free to use?",
                    answer: "Yes, the bombing services are completely free to use. Additional features for dedicated users are available by joining their Telegram channel."
                },
                {
                    index: 3, 
                    iconClass: "fas fa-comment text-purple-500",
                    iconImage: "icons/message.png",
                    question: "How can I give feedback about the service?",
                    answer: "You can visit their Contact Us page to share thoughts, suggestions, or concerns, or join their Telegram channel for direct communication with their team."
                }
            ]
        },
        {
            title: "Services Questions",
            questions: [
                {
                    index: 4, 
                    iconClass: "fas fa-exchange-alt text-blue-500",
                    iconImage: "icons/stop.png",
                    question: "What's the difference between SMS Bomber and Call Bomber?",
                    answer: "SMS Bomber sends only text messages to the target number, while Call Bomber sends phone calls. SMS floods the message inbox; Call Bomber repeatedly rings the phone."
                },
                {
                    index: 5, 
                    iconClass: "fas fa-chart-line text-orange-500",
                    iconImage: "icons/stopwatch.png",
                    question: "How many calls or messages can I send?",
                    answer: "The service allows up to 1000 SMS or calls per hour to a single target. Advanced users can access higher limits and faster delivery speeds."
                },
                {
                    index: 6, 
                    iconClass: "fas fa-calendar text-indigo-500",
                    iconImage: "icons/Hour.png",
                    question: "Can I schedule a bombing for later?",
                    answer: "Scheduled bombing is currently under development and not yet available. Updates will be shared on their Telegram channel."
                },
                {
                    index: 7, 
                    iconClass: "fas fa-edit text-pink-500",
                    iconImage: "icons/sms.png",
                    question: "Can I customize the messages sent?",
                    answer: "Message customization is not available in the free version currently, but it's being developed for premium users."
                }
            ]
        },
        {
            title: "Technical Questions",
            questions: [
                {
                    index: 8, 
                    iconClass: "fas fa-shield-alt text-cyan-500",
                    iconImage: "icons/Shield1.png",
                    question: "Why am I seeing a CAPTCHA verification?",
                    answer: "CAPTCHA verification helps prevent automated abuse of the services and ensures only humans can use the bombing tools."
                },
                {
                    index: 9, 
                    iconClass: "fas fa-exclamation-triangle text-red-500",
                    iconImage: "icons/QuestionMark.png",
                    question: "Why aren't all the calls or messages being delivered?",
                    answer: "Delivery rates can be affected by the recipient's carrier, phone settings, spam filters, or anti-spam measures that block repeated messages from the same source."
                },
                {
                    index: 10, 
                    iconClass: "fas fa-stop-circle text-red-600",
                    iconImage: "icons/stop.png",
                    question: "Can I stop a bombing once it's started?",
                    answer: "Yes, you can stop it by closing the browser tab, clicking the stop button if available, or adding the target number to the Protection List."
                },
                {
                    index: 11, 
                    iconClass: "fas fa-globe text-green-600",
                    iconImage: "icons/WhatsApp.png",
                    question: "Does Call Bomber work with international numbers?",
                    answer: "Currently, the service only supports Indian phone numbers. Advanced users have access to international bombing for select countries."
                }
            ]
        },
        {
            title: "Account Questions",
            questions: [
                {
                    index: 12, 
                    iconClass: "fas fa-user text-blue-600",
                    iconImage: "icons/3D_Portrait_Avatar_1.png",
                    question: "Do I need to create an account to use Call Bomber?",
                    answer: "No, the bombing services can be used without creating an account. However, advanced features require registration through their Telegram channel."
                },
                {
                    index: 13, 
                    iconClass: "fas fa-crown text-yellow-600",
                    iconImage: "icons/LOLBomberr.png",
                    question: "Is there a paid or premium version?",
                    answer: "No, there are no paid plans. All services are completely free. Joining the Telegram channel gives access to updates, tips, and support."
                },
                {
                    index: 14, 
                    iconClass: "fas fa-tachometer-alt text-orange-600",
                    iconImage: "icons/stopwatch.png",
                    question: "Why am I being rate limited?",
                    answer: "Rate limiting is implemented to prevent abuse and ensure service reliability. Standard accounts have daily and hourly usage limits."
                },
                {
                    index: 15, 
                    iconClass: "fas fa-lock text-green-600",
                    iconImage: "icons/Lock.png",
                    question: "How can I protect my number from bombing?",
                    answer: "You can add your number to their Protection List to prevent it from being targeted. Note that this protection only works for their website."
                }
            ]
        },
        {
            title: "Legal Questions",
            questions: [
                {
                    index: 16, 
                    iconClass: "fas fa-file-contract text-purple-600",
                    iconImage: "icons/Swords.png",
                    question: "What are your terms of service?",
                    answer: "Complete terms of service are available on their Terms of Use page. By using the service, you agree to use bombing tools responsibly and only for entertainment with consent."
                },
                {
                    index: 17, 
                    iconClass: "fas fa-database text-indigo-600",
                    iconImage: "icons/Server.png",
                    question: "What data do you collect about me?",
                    answer: "They collect limited data including IP addresses and usage information to improve the service and prevent abuse. Full details are in their Privacy Policy."
                },
                {
                    index: 18, 
                    iconClass: "fas fa-ban text-red-700",
                    iconImage: "icons/stop.png",
                    question: "What happens if I misuse the service?",
                    answer: "Misuse may result in immediate account termination, IP blocking, and possibly being reported to relevant authorities. They maintain logs of all activities and cooperate with law enforcement."
                },
                {
                    index: 19, 
                    iconClass: "fas fa-headset text-blue-700",
                    iconImage: "icons/phone.png",
                    question: "How do I contact your support team?",
                    answer: "You can contact support through their Contact Us page or by joining their Telegram channel where the team is more active and responsive."
                }
            ]
        }
    ];

    const page = content[type] || content.terms;

    return (
        <div className="animate-fade-in pb-20 max-w-8xl mx-auto mt-8">
            {page.isFAQ ? (
                <>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                        <p className="text-white/60 text-center mb-8 text-sm sm:text-base">
                            Find answers to commonly asked questions about our bombing services.
                        </p>
                        <div className="relative mb-8 w-full max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder="Search frequently asked questions..."
                                className="w-full py-3 pl-5 pr-12 rounded-full bg-glass-strong backdrop-blur-md border border-glass-border text-white placeholder-white/50 focus:outline-none focus:border-brand-500 transition-all duration-300"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-white/50"></i>
                        </div>
                    </div>
                    
                    <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                        {faqSections.map((section, sectionIndex) => {
                            const filteredQuestions = filterQuestions(section.questions);
                            
                            // Skip section if no questions match and there's a search term
                            if (searchTerm.trim() && filteredQuestions.length === 0) return null;
                            
                            return (
                                <div key={sectionIndex} className="mb-8">
                                    {/* Show section header only if no search or if there are matching questions */}
                                    {!searchTerm.trim() && sectionIndex === 0 && (
                                        <div className="flex items-center justify-center gap-4 my-8">
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-glass-strong backdrop-blur-md border border-glass-border">
                                                <i className={`${section.icon} text-brand-500 text-xl`}></i>
                                                <h3 className="text-xl font-bold text-white whitespace-nowrap">
                                                    {section.title}
                                                </h3>
                                            </div>
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                        </div>
                                    )}
                                    {!searchTerm.trim() && sectionIndex > 0 && (
                                        <div className="flex items-center gap-4 my-8">
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                            <h3 className="text-xl font-bold text-white px-4 py-2 rounded-xl bg-glass-strong backdrop-blur-md border border-glass-border whitespace-nowrap">
                                                {section.title}
                                            </h3>
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                        </div>
                                    )}
                                    <div className="space-y-3">
                                        {filteredQuestions.map(item => (
                                            <FAQItem
                                                key={item.index}
                                                index={item.index} 
                                                iconClass={item.iconClass}
                                                iconImage={item.iconImage}
                                                question={item.question}
                                                answer={item.answer}
                                                isOpen={openIndex === item.index}
                                                onClick={handleFAQClick}
                                            />
                                        ))}
                                    </div>
                                    {searchTerm.trim() && filteredQuestions.length > 0 && (
                                        <div className="mt-4 text-center">
                                            <p className="text-white/40 text-sm">
                                                Found {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''} in {section.title}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        
                        {/* Show no results message if search has no matches */}
                        {searchTerm.trim() && faqSections.every(section => filterQuestions(section.questions).length === 0) && (
                            <div className="text-center py-12">
                                <i className="fas fa-search text-white/20 text-4xl mb-4"></i>
                                <p className="text-white/40 text-lg">No results found for "{searchTerm}"</p>
                                <p className="text-white/30 text-sm mt-2">Try different keywords or browse all questions above</p>
                            </div>
                        )}
                    </div>
                </>
            ) : type === 'about' ? (
                <>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">About LOLBomber</h2>
                        <p className="text-white/60 text-lg max-w-3xl mx-auto whitespace-nowrap">
                            Learn more about the team and technology behind the internet's most powerful bombing service.
                        </p>
                    </div>
                    
                    {/* Our Story Section */}
                    <div className="glass-card p-0 relative overflow-hidden mb-6">
                        <div className="flex items-center gap-3 px-6 py-4 bg-brand-500 rounded-t-xl">
                            <i className="fas fa-book text-white text-xl"></i>
                            <h3 className="text-xl font-bold text-white">Our Story</h3>
                        </div>
                        <div className="p-8 sm:p-12">
                            <div className="text-white/70 space-y-4 leading-relaxed text-sm sm:text-base">
                                <p>LOLBomber was created in 2026 with a simple mission - to provide free online tools for fun and entertainment. Since our inception, we've been dedicated to developing innovative and effective prank tools that anyone can use.</p>
                                <p>What started as a small project has now grown into the most trusted and powerful bombing service on the internet. Our team consists of passionate developers who continuously improve our algorithms to ensure maximum efficiency and reliability.</p>
                                <p>Throughout our journey, we've maintained our commitment to responsible usage. We believe that pranks should be harmless and fun, which is why we've implemented various safeguards and offer protection options for those who wish to shield their numbers from bombing.</p>
                            </div>
                        </div>
                    </div>

                    {/* Our Technology Section */}
                    <div className="glass-card p-0 relative overflow-hidden mb-6">
                        <div className="flex items-center gap-3 px-6 py-4 bg-brand-500 rounded-t-xl">
                            <i className="fas fa-microchip text-white text-xl"></i>
                            <h3 className="text-xl font-bold text-white">Our Technology</h3>
                        </div>
                        <div className="p-8 sm:p-12">
                            <div className="text-white/70 space-y-4 leading-relaxed text-sm sm:text-base">
                                <p>Our bombing service utilizes advanced algorithms and multiple API integrations to deliver messages and calls at unprecedented rates. We've built a robust infrastructure that can handle thousands of requests simultaneously without compromising on speed or reliability.</p>
                                <p>For 2026, we've completely revamped our core technology to bypass common detection systems and ensure higher delivery success rates. Our service now leverages multiple carriers and sources, making it nearly impossible for recipients to block all incoming messages and calls.</p>
                                <p>We regularly update our systems to adapt to changing security measures and ensure consistent performance. Our team monitors delivery rates and user feedback to continuously improve the service.</p>
                            </div>
                        </div>
                    </div>

                    {/* Our Values Section */}
                    <div className="glass-card p-0 relative overflow-hidden mb-6">
                        <div className="flex items-center gap-3 px-6 py-4 bg-brand-500 rounded-t-xl">
                            <i className="fas fa-heart text-white text-xl"></i>
                            <h3 className="text-xl font-bold text-white">Our Values</h3>
                        </div>
                        <div className="p-8 sm:p-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="glass-card rounded-lg p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] cursor-pointer">
                                    <h4 className="text-xl font-bold text-white mb-2">Entertainment</h4>
                                    <p className="text-white/70 leading-relaxed text-sm sm:text-base">We believe in creating moments of fun and laughter. Our services are designed purely for entertainment purposes.</p>
                                    <i className="fas fa-laugh-squint text-white/5 absolute right-4 bottom-4 text-6xl transition-all duration-300 hover:text-white/10"></i>
                                </div>
                                <div className="glass-card rounded-lg p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] cursor-pointer">
                                    <h4 className="text-xl font-bold text-white mb-2">Responsibility</h4>
                                    <p className="text-white/70 leading-relaxed text-sm sm:text-base">We promote responsible use of our tools and have measures in place to prevent misuse.</p>
                                    <i className="fas fa-shield-alt text-white/5 absolute right-4 bottom-4 text-6xl transition-all duration-300 hover:text-white/10"></i>
                                </div>
                                <div className="glass-card rounded-lg p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] cursor-pointer">
                                    <h4 className="text-xl font-bold text-white mb-2">Innovation</h4>
                                    <p className="text-white/70 leading-relaxed text-sm sm:text-base">We continuously improve our technology to provide the best experience possible.</p>
                                    <i className="fas fa-code text-white/5 absolute right-4 bottom-4 text-6xl transition-all duration-300 hover:text-white/10"></i>
                                </div>
                                <div className="glass-card rounded-lg p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] cursor-pointer">
                                    <h4 className="text-xl font-bold text-white mb-2">Community</h4>
                                    <p className="text-white/70 leading-relaxed text-sm sm:text-base">We value our user community and listen to feedback to enhance our services.</p>
                                    <i className="fas fa-users text-white/5 absolute right-4 bottom-4 text-6xl transition-all duration-300 hover:text-white/10"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="glass-card p-8 sm:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl -z-10"></div>
                    
                    <h2 className="text-3xl font-bold text-white mb-2 border-b border-white/10 pb-6 text-center">{page.title}</h2>
                    
                    {type === 'privacy' && (
                        <p className="text-white/60 text-center mb-6">Simple privacy policy</p>
                    )}
                    
                    {type === 'terms' && (
                        <p className="text-white/60 text-center mb-6">Please read our terms and conditions carefully before using our services.</p>
                    )}

                    {type === 'terms' && (
                        <div className="bg-brand-500/10 border border-brand-500 rounded-xl p-4 mb-6 flex items-start gap-3">
                            <i className="fas fa-exclamation-triangle text-brand-400 text-xl mt-1"></i>
                            <div>
                                <h3 className="text-lg font-bold text-brand-400 mb-1">Please Read Carefully</h3>
                                <p className="text-brand-300 text-sm leading-relaxed">These terms affect your legal rights and obligations. By using our service, you agree to be bound by these terms.</p>
                            </div>
                        </div>
                    )}

                    {type === 'terms' && (
                        <div className="mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="fas fa-file-contract text-blue-400 text-2xl"></i>
                                <h3 className="text-2xl font-bold text-white">📋 Acceptable Use Policy</h3>
                            </div>
                            <ul className="space-y-3 text-white/70 leading-relaxed text-sm sm:text-base">
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">✅</span>
                                    <span>Our Call/SMS bomber is a tool for entertainment purposes only</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">✅</span>
                                    <span>You can use our tool only on friends and family with their consent</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">❌</span>
                                    <span>You cannot use this tool for revenge, harassment, or to irritate others</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-yellow-500 mt-1">⚠️</span>
                                    <span>You are solely responsible for any prohibited use of our services</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-500 mt-1">🛡️</span>
                                    <span>Report any bombing issues to us for strict action</span>
                                </li>
                            </ul>
                        </div>
                    )}

                    {type === 'terms' && (
                        <div className="mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="fas fa-balance-scale text-purple-400 text-2xl"></i>
                                <h3 className="text-2xl font-bold text-white">⚖️ Service Limitations</h3>
                            </div>
                            <ul className="space-y-3 text-white/70 leading-relaxed text-sm sm:text-base">
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">🚫</span>
                                    <span>We reserve the right to limit or terminate service at any time</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">📊</span>
                                    <span>Excessive use may result in temporary or permanent suspension</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-500 mt-1">🔍</span>
                                    <span>We monitor usage patterns to prevent abuse</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-pink-500 mt-1">⏱️</span>
                                    <span>Rate limiting may be applied to ensure fair usage</span>
                                </li>
                            </ul>
                        </div>
                    )}

                    {type === 'terms' && (
                        <div className="mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="fas fa-lock text-yellow-400 text-2xl"></i>
                                <h3 className="text-2xl font-bold text-white">🔒 Legal Disclaimer</h3>
                            </div>
                            <ul className="space-y-3 text-white/70 leading-relaxed text-sm sm:text-base">
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-500 mt-1">📝</span>
                                    <span>Services are provided "as is" without warranty</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-yellow-500 mt-1">⚠️</span>
                                    <span>No guarantee of merchantability or fitness for purpose</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">🚫</span>
                                    <span>No liability for direct, indirect, or consequential damages</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-500 mt-1">📋</span>
                                    <span>You agree to use services lawfully and responsibly</span>
                                </li>
                            </ul>
                        </div>
                    )}

                    {type === 'terms' && (
                        <div className="mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="fas fa-user text-green-400 text-2xl"></i>
                                <h3 className="text-2xl font-bold text-white">👤 User Responsibility</h3>
                            </div>
                            <ul className="space-y-3 text-white/70 leading-relaxed text-sm sm:text-base">
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-500 mt-1">📖</span>
                                    <span>You must comply with all applicable laws and regulations</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">🤝</span>
                                    <span>Obtain proper consent before using our services on others</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-purple-500 mt-1">⚖️</span>
                                    <span>Understand that misuse may constitute unlawful behavior</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-500 mt-1">💼</span>
                                    <span>You indemnify us against claims arising from your use</span>
                                </li>
                            </ul>
                        </div>
                    )}

                    {type === 'terms' && (
                        <div className="mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="fas fa-sync text-cyan-400 text-2xl"></i>
                                <h3 className="text-2xl font-bold text-white">🔄 Service Changes</h3>
                            </div>
                            <ul className="space-y-3 text-white/70 leading-relaxed text-sm sm:text-base">
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-500 mt-1">✏️</span>
                                    <span>We may modify, suspend, or discontinue services anytime</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">📢</span>
                                    <span>Terms may be updated without prior notice</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">✅</span>
                                    <span>Continued use constitutes acceptance of changes</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-500 mt-1">📱</span>
                                    <span>Check this page regularly for updates</span>
                                </li>
                            </ul>
                        </div>
                    )}

                    {type === 'terms' && (
                        <div className="bg-blue-600/20 rounded-xl p-6 mb-6 flex items-center gap-4">
                            <div className="bg-blue-600 rounded-full p-3">
                                <i className="fas fa-shield-alt text-white text-2xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-blue-400 mb-2">Protection Available</h3>
                                <p className="text-white/80 leading-relaxed">
                                    If you wish to protect your number from being targeted by our bombing services, you can add it
                                    to our <button onClick={() => setActiveTab('protection')} className="text-blue-300 underline bg-transparent border-none cursor-pointer hover:text-blue-200 transition-colors">Protection</button>.
                                </p>
                            </div>
                        </div>
                    )}
                    
                    {type === 'privacy' && (
                        <>
                            <div className="bg-purple-600 rounded-xl p-6 mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <i className="fas fa-lightbulb text-white text-xl"></i>
                                    <h3 className="text-xl font-bold text-white">In Simple Terms</h3>
                                </div>
                                <p className="text-white/90 leading-relaxed text-sm sm:text-base">
                                    We collect minimal data, don't require registration, and protect your privacy. Phone numbers are processed temporarily and not stored permanently.
                                </p>
                            </div>

                            <div className="bg-white/5 rounded-lg p-6 mb-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <i className="fas fa-chart-bar text-brand-500 text-xl"></i>
                                    <h3 className="text-xl font-bold text-white">What We Collect</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-globe text-white/60 w-5"></i>
                                        <p className="text-white/70">IP address and browser information</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-file-alt text-white/60 w-5"></i>
                                        <p className="text-white/70">Pages visited on our website</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-phone text-white/60 w-5"></i>
                                        <p className="text-white/70">Phone numbers (processed temporarily)</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-cookie-bite text-white/60 w-5"></i>
                                        <p className="text-white/70">Cookies for analytics and ads</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-lg p-6 mb-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <i className="fas fa-cogs text-brand-500 text-xl"></i>
                                    <h3 className="text-xl font-bold text-white">How We Use Data</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-shield-alt text-white/60 w-5"></i>
                                        <p className="text-white/70">Service improvement and maintenance</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-chart-line text-white/60 w-5"></i>
                                        <p className="text-white/70">Analytics and performance monitoring</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-ban text-white/60 w-5"></i>
                                        <p className="text-white/70">Abuse prevention and security</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-bell text-white/60 w-5"></i>
                                        <p className="text-white/70">Service notifications</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-lg p-6 mb-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <i className="fas fa-handshake text-brand-500 text-xl"></i>
                                    <h3 className="text-xl font-bold text-white">Third-Party Services</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-server text-white/60 w-5"></i>
                                        <p className="text-white/70">SMS and call delivery providers</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-chart-bar text-white/60 w-5"></i>
                                        <p className="text-white/70">Analytics platforms</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-ad text-white/60 w-5"></i>
                                        <p className="text-white/70">Advertising networks</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-cloud text-white/60 w-5"></i>
                                        <p className="text-white/70">Cloud hosting services</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-lg p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <i className="fas fa-user-shield text-brand-500 text-xl"></i>
                                    <h3 className="text-xl font-bold text-white">Your Rights</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-eye-slash text-white/60 w-5"></i>
                                        <p className="text-white/70">Opt-out of data collection</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-trash text-white/60 w-5"></i>
                                        <p className="text-white/70">Request data deletion</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-download text-white/60 w-5"></i>
                                        <p className="text-white/70">Export your data</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-edit text-white/60 w-5"></i>
                                        <p className="text-white/70">Update your information</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    
                    {type === 'contact' && (
                        <p className="text-white/60 text-center mb-6">Our support team is here to help with any questions or feedback you may have.</p>
                    )}

                    {type === 'contact' && (
                        <div className="bg-white/5 rounded-xl p-8 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-white/80 mb-2 text-sm">Name</label>
                                    <input type="text" placeholder="Your name" className="w-full py-3 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-white/80 mb-2 text-sm">Email</label>
                                    <input type="email" placeholder="your@email.com" className="w-full py-3 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-white/80 mb-2 text-sm">Subject</label>
                                    <input type="text" placeholder="How can we help?" className="w-full py-3 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-white/80 mb-2 text-sm">Message</label>
                                    <textarea placeholder="Tell us more about your question or feedback..." rows="5" className="w-full py-3 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-brand-500 transition-colors resize-none"></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <button className="glass-btn-primary w-full py-3 px-6 rounded-lg font-semibold">
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {type === 'disclaimer' && (
                        <p className="text-white/60 text-center mb-6">Please read this disclaimer carefully before using our services.</p>
                    )}

                    {type === 'disclaimer' && (
                        <div className="bg-red-600/10 border border-red-600 rounded-xl p-4 mb-6 flex items-start gap-3">
                            <i className="fas fa-exclamation-triangle text-red-400 text-xl mt-1"></i>
                            <div>
                                <h3 className="text-lg font-bold text-red-400 mb-1">⚠️ Warning</h3>
                                <p className="text-red-300 text-sm leading-relaxed">This is a prank tool for entertainment purposes only. Misuse for harassment, illegal activities, or any harmful purposes is strictly prohibited and may result in legal consequences.</p>
                            </div>
                        </div>
                    )}

                    {type === 'disclaimer' && (
                        <div className="mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="fas fa-gamepad text-purple-400 text-2xl"></i>
                                <h3 className="text-2xl font-bold text-white">Entertainment Purpose Only</h3>
                            </div>
                            <p className="text-white/70 leading-relaxed text-sm sm:text-base mb-6">
                                Call Bomber services are provided strictly for entertainment and prank purposes only. Our services are intended to be used for fun between friends and acquaintances with their explicit knowledge and consent. By accessing or using our services, you acknowledge and agree that you will use them responsibly and ethically.
                            </p>
                        </div>
                    )}

                    {type === 'disclaimer' && (
                        <div className="mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="fas fa-shield-alt text-red-400 text-2xl"></i>
                                <h3 className="text-2xl font-bold text-white">No Liability</h3>
                            </div>
                            <p className="text-white/70 leading-relaxed text-sm sm:text-base mb-6">
                                The services provided by Call Bomber are on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, timely, secure, or error-free. We expressly disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                            </p>
                        </div>
                    )}

                    {type === 'disclaimer' && (
                        <div className="mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="fas fa-user text-blue-400 text-2xl"></i>
                                <h3 className="text-2xl font-bold text-white">User Responsibility</h3>
                            </div>
                            <p className="text-white/70 leading-relaxed text-sm sm:text-base mb-6">
                                You are solely responsible for how you use our services. Any misuse of our bombing tools for harassment, intimidation, threats, or any other malicious purpose is strictly prohibited and may be illegal. We expressly disclaim any liability for misuse of our services by users. You agree to indemnify and hold harmless Call Bomber, its owners, operators, affiliates, licensors, and service providers from any claims resulting from your use of the service.
                            </p>
                        </div>
                    )}

                    {type === 'disclaimer' && (
                        <div className="mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="fas fa-gavel text-green-400 text-2xl"></i>
                                <h3 className="text-2xl font-bold text-white">Legal Compliance</h3>
                            </div>
                            <p className="text-white/70 leading-relaxed text-sm sm:text-base mb-6">
                                You agree to comply with all applicable local, state, national, and international laws and regulations when using our services. You understand that using our services to harass, threaten, or abuse others may be a criminal offense in many jurisdictions. Call Bomber does not condone such use and reserves the right to cooperate with law enforcement in the investigation of any alleged criminal activity.
                            </p>
                        </div>
                    )}

                    {type === 'disclaimer' && (
                        <div className="mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="fas fa-ban text-orange-400 text-2xl"></i>
                                <h3 className="text-2xl font-bold text-white">Service Limitations</h3>
                            </div>
                            <p className="text-white/70 leading-relaxed text-sm sm:text-base mb-6">
                                We reserve the right to limit or block access to our services at our sole discretion without prior notice. This includes, but is not limited to, situations where we suspect misuse, abuse, or violation of our terms. We may also implement rate limiting, CAPTCHA verification, or other measures to prevent automated abuse of our platform.
                            </p>
                        </div>
                    )}

                    {type === 'disclaimer' && (
                        <div className="mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="fas fa-handshake text-cyan-400 text-2xl"></i>
                                <h3 className="text-2xl font-bold text-white">Third-Party Services</h3>
                            </div>
                            <p className="text-white/70 leading-relaxed text-sm sm:text-base mb-6">
                                Our bombing services rely on various third-party services and APIs to deliver messages and calls. We do not guarantee the availability or performance of these third-party services. The delivery success rate of messages and calls may vary depending on factors outside our control, including carrier policies, recipient device settings, and network conditions.
                            </p>
                        </div>
                    )}

                    {type === 'disclaimer' && (
                        <div className="mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="fas fa-sync text-yellow-400 text-2xl"></i>
                                <h3 className="text-2xl font-bold text-white">Changes to Services</h3>
                            </div>
                            <p className="text-white/70 leading-relaxed text-sm sm:text-base mb-6">
                                We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice. We may also update this disclaimer from time to time. Your continued use of our services following any changes constitutes your acceptance of such changes.
                            </p>
                        </div>
                    )}

                    {type === 'disclaimer' && (
                        <div className="mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="fas fa-shield-alt text-purple-400 text-2xl"></i>
                                <h3 className="text-2xl font-bold text-white">Protection Measures</h3>
                            </div>
                            <p className="text-white/70 leading-relaxed text-sm sm:text-base mb-6">
                                While we offer options to protect numbers from our bombing services, we cannot guarantee that other similar services will not target protected numbers. If you are experiencing unwanted bombing, we recommend using your phone's built-in blocking features or third-party call and message blocking applications.
                            </p>
                        </div>
                    )}
                    
                    <div className="text-white/70 space-y-4 leading-relaxed text-sm sm:text-base">
                        {page.text.map((paragraph, index) => {
                            if (paragraph.startsWith('##')) {
                                return <h3 key={index} className="text-xl font-bold text-white mt-8 mb-4">{paragraph.replace('## ', '')}</h3>;
                            } else if (paragraph.startsWith('**Q')) {
                                return <p key={index} className="font-bold text-white mt-4">{paragraph.replace(/\*\*/g, '')}</p>;
                            } else if (paragraph.startsWith('**') && paragraph.includes('A.')) {
                                return <p key={index} className="mb-4">{paragraph.replace(/\*\*/g, '')}</p>;
                            } else if (paragraph === '') {
                                return <br key={index} />;
                            } else {
                                return <p key={index}>{paragraph}</p>;
                            }
                        })}
                        <div className="pt-8 mt-8 border-t border-white/10 text-xs text-white/40">
                            Last updated: March 2026
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}