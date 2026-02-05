"use client"

import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { AppsMarqueeItem } from '@/types/data-types';

const AppsMarquee = ({ appsMarquee }: { appsMarquee: AppsMarqueeItem[] }) => {
    return (
        <section className="pt-2 pb-20 container mx-auto relative overflow-hidden">
            <Marquee
                direction="left"
                speed={40}
                autoFill
                gradient={false}
                style={{
                    maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)'
                }}
            >
                <div className="inline-flex py-4 gap-20">
                    {appsMarquee.map((app, index) => (
                        <div key={index} className={`flex items-center gap-2 ${index === 0 ? 'ml-20' : ''}`}>
                            <Image
                                src={app.logo}
                                alt={app.name}
                                width={36}
                                height={36}
                                className={`object-contain grayscale opacity-80`}
                            />
                            <p className="text-center font-medium text-xl opacity-70">{app.name}</p>
                        </div>
                    ))}
                </div>
            </Marquee>
        </section>
    )
}

export default AppsMarquee;



