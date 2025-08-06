import { ShieldCheck, LogIn, KeyRound, LockKeyhole } from "lucide-react";
import SSOImage from "/SSOImage.png";

export const SsoAuthentication = () => {
  return (
    <section className="py-20 bg-white mt-8">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-medium mb-2">
              <ShieldCheck className="w-5 h-5" />
              <span>Built for Security & Simplicity</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Instant Login, Zero Hassle: SSO by DocStar
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              DocStar’s Single Sign-On (SSO) authentication allows platforms
              like <strong>MSG91</strong> to offer a secure and seamless login
              experience. With just one set of credentials, users get instant
              access across services—simplifying workflows while keeping
              everything protected.
            </p>
            <ul className="space-y-5 text-gray-700 text-base">
              <li className="flex items-start gap-2">
                <LogIn className="w-5 h-5 text-blue-500 mt-1" />
                <span>
                  <strong>Effortless Onboarding:</strong> Users log in using
                  their MSG91 identity—no new passwords, no friction.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <LockKeyhole className="w-5 h-5 text-emerald-500 mt-1" />
                <span>
                  <strong>Enhanced Security:</strong> Powered by DocStar’s
                  secure backend, authentication is robust and reliable.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <KeyRound className="w-5 h-5 text-purple-500 mt-1" />
                <span>
                  <strong>Unified Access:</strong> Eliminate the need for
                  multiple credentials across systems—manage access
                  effortlessly.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-500 mt-1" />
                <span>
                  <strong>Trusted by MSG91:</strong> Our SSO solution is
                  actively used by MSG91 to streamline its internal workflows.
                </span>
              </li>
            </ul>
          </div>

          <div className="flex justify-center">
            <img
              src={SSOImage}
              alt="SSO Authentication Illustration"
              className="w-full max-w-md border border-gray-200 rounded-xl shadow-sm"
            />
          </div>
        </div>

        <div className="text-center text-gray-500 text-md mt-12">
          <span>
            To enable SSO for your organization, an Enterprise plan is required.
          </span>
        </div>
      </div>
    </section>
  );
};
