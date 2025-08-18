import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink } from "lucide-react";

const Testimonials = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const customers = [
    {
      name: "Giddh",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM6Y55TrI7VBC8N2Ur1wMR3LEccw1q3ZO7Kw&s",
      color: "from-black to-gray-700",
      link: "https://giddh.com/api/",
    },
    {
      name: "Socket",
      logo: "https://stuff.thingsofbrand.com/viasocket.com/images/img7_viasocket_logo.png",
      color: "from-gray-100",
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
      logo: "https://stuff.thingsofbrand.com/gtwy.ai/images/img2_gtwy.ico",
      color: "from-gray-700 to-black",
      link: "https://gtwy.ai/",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(0, 0, 0, 0.03) 0%, transparent 50%)",
            "linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, transparent 50%)",
            "linear-gradient(225deg, rgba(0, 0, 0, 0.02) 0%, transparent 50%)",
            "linear-gradient(45deg, rgba(0, 0, 0, 0.03) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The results speak for themselves,
            <br />
            <motion.span
              className="text-gray-600"
              animate={{
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              so do our customers
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join thousands of companies that trust DocStar to power their
            documentation and content creation.
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {customers.map((customer, index) => (
            <motion.div
              key={index}
              className="group bg-white rounded-2xl p-8 text-center border border-gray-200 cursor-pointer relative overflow-hidden"
              variants={itemVariants}
              whileHover={{
                y: -15,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                scale: 1.05,
              }}
            >
              {/* Hover Background Effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${customer.color} opacity-0 group-hover:opacity-10`}
                initial={{ scale: 0, rotate: 180 }}
                whileHover={{ scale: 1.2, rotate: 0 }}
                transition={{ duration: 0.5 }}
              />

              <div className="relative z-10">
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-r ${customer.color} rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden`}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={customer.logo}
                    alt={customer.name}
                    className="w-full h-full object-cover rounded-full"
                    whileHover={{ scale: 1.1 }}
                  />
                </motion.div>
                <motion.h3
                  className="text-xl font-bold text-black mb-4 group-hover:text-gray-600 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {customer.name}
                </motion.h3>
                <a
                  href={customer.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-black hover:text-gray-600 font-semibold group/btn"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center"
                  >
                    View Demo
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </motion.div>
                  </motion.span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
