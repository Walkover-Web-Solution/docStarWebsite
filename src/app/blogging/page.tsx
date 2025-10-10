export default function BloggingPage() {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-20 lg:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-black mb-6">
            Start Creating and Publishing Your Blog
          </h1>
          <p className="text-lg text-gray-700 mb-12">
            With the <span className="font-semibold">Blog View</span> feature of <span className="font-semibold">DocStar</span>, you can easily format, organize, and share your content, making it accessible and engaging for your audience.
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition duration-300">
              <h2 className="text-2xl font-semibold text-black mb-4">
                Boost Your Blog’s Reach with SEO
              </h2>
              <p className="text-gray-700">
                DocStar helps you optimize each blog for search engines, making your content easy to find and reach a larger audience with just a few clicks.
              </p>
            </div>
  
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition duration-300">
              <h2 className="text-2xl font-semibold text-black mb-4">
                Personalize Your Blog’s Header and Footer
              </h2>
              <p className="text-gray-700">
                Easily customize the header and footer of your blogging platform to make it truly your own.
              </p>
            </div>
  
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition duration-300">
              <h2 className="text-2xl font-semibold text-black mb-4">
                Hassle-Free Blog Setup
              </h2>
              <p className="text-gray-700">
                Set up your blogging platform in just a few clicks and start blogging without any hassle.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  