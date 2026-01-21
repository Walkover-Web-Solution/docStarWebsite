const ViasocketSection = () => {
  return (
    <section className="w-full bg-[#f8f9fa] py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-center">
          <figure className="" style={{ height: 280, width: 280 }}>
            <img
              src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_cc20e475b2a1d20754a9539d45076edb/viasocket.png"
              alt="Viasocket Team Member"
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="flex flex-col justify-center space-y-4">
            <blockquote className="text-xl lg:text-2xl font-normal text-gray-900 leading-relaxed">
              "We wanted to really customize the look and feel of our
              documentation and to link it to our visual identity as a brand.
              And with GitBook, we managed to do everything we wanted."
            </blockquote>

            <div className="space-y-1">
              <p className="text-gray-600 text-base">
                Viasocket Team, Solutions Architect{" "}
                <span className="font-semibold text-gray-900">Batch</span>
              </p>
            </div>

            <a href="#" className="hover:underline">
              Read the story →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViasocketSection;
