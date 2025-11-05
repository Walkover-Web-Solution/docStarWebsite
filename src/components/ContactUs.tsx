/**
 * Provides static contact information for the DocStar support team, including email, phone, WhatsApp,
 * and a link to schedule a live demo. The component relies on semantic markup to improve accessibility.
 */

// Centralized reference for the various contact endpoints rendered in the support card.
const CONTACT = {
  EMAIL: "support@docstar.io",
  PHONE: "+91 7724884259",
  WHATSAPP: "+91 7724884259",
  DEMO_LINK: "https://cal.com/docstar-team",
};

/**
 * Renders the support page content with direct contact options and a call-to-action
 * for booking a one-on-one product demo.
 */
export const ContactUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-gray-800 mt-10">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-900">
        Support
      </h1>
      <p className="text-lg text-center mb-14 max-w-2xl mx-auto text-gray-700">
        Need help? Our team is ready to assist you—whether you’re just getting
        started, launching your documentation hub, or have a technical question.
        Reach out, and we’ll respond promptly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-20">
        <section
          className="bg-white shadow-lg rounded-xl p-8 border border-gray-100 hover:shadow-2xl transition"
          aria-label="Contact Support"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
            Contact Support
          </h2>
          <p className="mb-6 text-gray-700">
            Our support team typically replies within 24 hours on business days.
          </p>
          {/* Key contact methods are separated into a list for screen-reader clarity and quick scanning. */}
          <ul className="space-y-5 text-base leading-relaxed">
            <li className="flex gap-2 items-center">
              <span className="sr-only">Email:</span>
              <b>Email:</b>
              <a
                href={`mailto:${CONTACT.EMAIL}`}
                className="text-blue-600 hover:underline"
              >
                {CONTACT.EMAIL}
              </a>
            </li>
            <li className="flex gap-2 items-center">
              <span className="sr-only">Phone:</span>
              <b>Phone:</b>
              <a
                href={`tel:${CONTACT.PHONE.replace(/ /g, "")}`}
                className="text-blue-600 hover:underline"
              >
                {CONTACT.PHONE}
              </a>
            </li>
            <li className="flex gap-2 items-center">
              <span className="sr-only">WhatsApp:</span>
              <b>WhatsApp:</b>
              <a
                href={`https://wa.me/${CONTACT.WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {CONTACT.WHATSAPP}
              </a>
            </li>
          </ul>
        </section>
        <section
          className="bg-white shadow-lg rounded-xl p-8 border border-gray-100 hover:shadow-2xl transition"
          aria-label="Schedule a Demo"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
            Schedule a 1:1 Demo
          </h2>
          <p className="mb-6 text-gray-700">
            Want a guided tour? Book a demo with our product specialist—we’ll
            show you the features and answer any questions.
          </p>
          {/* External link opens in a new tab to preserve the current browsing session. */}
          <a
            href={CONTACT.DEMO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-semibold text-white bg-black hover:bg-gray-900 transition-colors rounded-xl px-6 py-3 border-0 shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            Book a Demo
          </a>
        </section>
      </div>
    </div>
  );
};
