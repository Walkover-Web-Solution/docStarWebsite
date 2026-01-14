"use client"

import Image from 'next/image';
import Marquee from 'react-fast-marquee';

type Customer = {
  name: string
  logo: string
  color: string
  link: string
}

const customers: Customer[] = [
  {
    name: "Giddh",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM6Y55TrI7VBC8N2Ur1wMR3LEccw1q3ZO7Kw&s",
    color: "from-black to-gray-700",
    link: "https://giddh.com/api/",
  },
  {
    name: "viaSocket",
    logo: "https://cdn-1.webcatalog.io/catalog/viasocket/viasocket-icon-filled-256.png?v=1714777446463",
    color: "from-gray-800 to-black",
    link: "https://viasocket.com/faq",
  },
  {
    name: "Okfit",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-spTyfqWAW-laM6_nEs2-5ntUdmL_Tf1UA&s",
    color: "from-gray-600 to-gray-800",
    link: "https://help.okfit.in/",
  },
  {
    name: "MSG91",
    logo: "https://cdn.shopify.com/app-store/listing_images/1b7a23964d664a267ed7cbf3339a7589/icon/CJ75uLzOi_gCEAE=.jpeg",
    color: "from-black to-gray-600",
    link: "https://docs.msg91.com/",
  },
  {
    name: "Walkover",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0rNNFIitwuJt_wr7keKdgUXE5Cqo4REbnJbuWZu0U5INc2QdNjhZSZIxyOeWWczxj5As&usqp=CAU",
    color: "from-gray-700 to-black",
    link: "https://walkover.in/",
  },
  {
    name: "GTWY AI",
    logo: "https://thingsofbrand.com/api/icon/gtwy.ai",
    color: "from-gray-700 to-black",
    link: "https://gtwy.ai/blogs",
  },
]

const AppsMarquee = () => {
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
                    {customers.map((app, index) => (
                        <div key={index} className={`flex items-center gap-2 ${index === 0 ? 'ml-20' : ''}`}>
                            <Image
                                src={app.logo}
                                alt={app.name}
                                width={36}
                                height={36}
                                className={`object-contain grayscale opacity-80`}
                            />
                            <p className="text-center font-medium text-xl text-gray-500">{app.name}</p>
                        </div>
                    ))}
                </div>
            </Marquee>
        </section>
    )
}

export default AppsMarquee;



