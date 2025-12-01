"use client"

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
    name: "Socket",
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
    logo: "https://stuff.thingsofbrand.com/gtwy.ai/images/img8_favicon.png",
    color: "from-gray-700 to-black",
    link: "https://gtwy.ai/blogs",
  },
]

export default function Testimonials () {
  return (
    <div className="bg-gray-100 py-10">
    <section className="py-16 px-6 md:px-12">
      <h2 className="text-center text-3xl font-semibold text-slate-900 mb-10">
        Trusted by Leading Teams
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
        {customers.map((customer) => (
          <a
            key={customer.name}
            href={customer.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center justify-center rounded-xl border border-gray-400 hover:border-gray-600 hover:shadow-xl  p-4 hover:shadow-lg transition`}
          >
            <img
              src={customer.logo}
              alt={customer.name}
              className="h-12 w-12 object-contain mb-3"
            />
            <span className="text-black text-sm font-medium">{customer.name}</span>
          </a>
        ))}
      </div>
    </section>
    </div>
  )
}
