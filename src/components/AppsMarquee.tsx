"use client"

import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { AppsMarqueeItem } from '@/types/data-types';

const AppsMarquee = ({ appsMarquee }: { appsMarquee: AppsMarqueeItem[] }) => {
    return (
        <section className="py-12 relative overflow-hidden">
            <div className="container mx-auto">
                <Marquee
                    direction="left"
                    speed={35}
                    autoFill
                    gradient={false}
                    pauseOnHover={false}
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                    }}
                >
                    <div className="inline-flex items-center py-6 gap-16 md:gap-20">
                        {appsMarquee.map((app, index) => (
                            <div 
                                key={index} 
                                className={`flex items-center gap-2.5 ${index === 0 ? 'ml-16 md:ml-20' : ''}`}
                            >
                                <Image
                                    src={app.logo}
                                    alt={app.name}
                                    width={36}
                                    height={36}
                                    loading={index < 3 ? "eager" : "lazy"}
                                    className="object-contain grayscale opacity-70 dark:opacity-60"
                                />
                                <p className="text-sm md:text-base lg:text-lg font-medium text-gray-600 dark:text-gray-500 whitespace-nowrap">
                                    {app.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </Marquee>
            </div>
        </section>
    )
}

export default AppsMarquee;



