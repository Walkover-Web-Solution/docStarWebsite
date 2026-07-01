"use client"

import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { AppsMarqueeItem } from '@/types/data-types';
import MotionWrapper from './motion/MotionDivWrapper';

const AppsMarquee = ({ appsMarquee }: { appsMarquee: AppsMarqueeItem[] }) => {
    return (
        <section className="py-16 md:py-18 relative overflow-hidden bg-[var(--theme-bg)] border-y theme-border">
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--theme-color)]/20 to-transparent"></div>
            <div className="absolute bottom-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--theme-color)]/20 to-transparent"></div>
            
            <div className="container mx-auto px-4 mb-12">
                <MotionWrapper
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">
                        Trusted by innovative teams
                    </h3>
                </MotionWrapper>
            </div>

            <div className="container mx-auto">
                <div className="relative">
                    {/* Left and Right fade masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[var(--theme-bg)] to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[var(--theme-bg)] to-transparent z-10"></div>
                    
                    <Marquee
                        direction="left"
                        speed={40}
                        autoFill
                        gradient={false}
                        pauseOnHover={true}
                    >
                        <div className="inline-flex items-center py-6 gap-16 md:gap-24">
                            {appsMarquee.map((app, index) => (
                                <div 
                                    key={index} 
                                    className={`flex items-center gap-3.5 group cursor-pointer ${index === 0 ? 'ml-16 md:ml-24' : ''}`}
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-900 border theme-border shadow-sm flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                                        <Image
                                            src={app.logo}
                                            alt={app.name}
                                            width={32}
                                            height={32}
                                            loading={index < 3 ? "eager" : "lazy"}
                                            className="object-contain group-hover:scale-110 transition-all duration-300"
                                        />
                                    </div>
                                    <p className="text-lg font-semibold text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                                        {app.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Marquee>
                </div>
            </div>
        </section>
    )
}

export default AppsMarquee;



