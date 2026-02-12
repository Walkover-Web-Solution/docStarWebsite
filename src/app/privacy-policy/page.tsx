import { fetchMeta } from "@/services/meta.api";
import { generateSEOMetadata } from "@/lib/seo";
import { MetaItem } from "@/types/data-types";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  let meta: MetaItem | null = null;
  try {
    meta = await fetchMeta("/privacy-policy");
  } catch (error) {
    console.error("[PrivacyPolicyPage] Unable to load meta from API:", error);
  }

  return generateSEOMetadata({
    meta,
    defaultTitle: "Privacy Policy | DocStar",
    defaultDescription: "Privacy Policy",
    pathname: "/privacy-policy",
  });
}

const PrivacyPolicy = () => {
  return (
    <div className="pt-32 pb-16 px-4 md:px-8 container mx-auto">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4 text-lg">
        At <span className="font-semibold">DocStar</span>, your privacy is
        important to us. This Privacy Policy outlines how we collect, use, and
        protect your personal information when you access or use our platform.
        We are committed to maintaining your privacy and ensuring that your data
        is handled securely and responsibly.
      </p>

      {/* Information We Collect */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Information We Collect
      </h2>
      <p className="mb-4">
        We may collect the following types of personal information when you sign
        up, log in, or interact with DocStar:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Personal identifiers (e.g. name, email address)</li>
        <li>Usage data (e.g., pages visited, actions taken)</li>
        <li>Device information (e.g. OS)</li>
        <li>Authentication data (e.g., via Google, Apple, etc.)</li>
      </ul>

      {/* How We Use Your Information */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">
        How We Use Your Information
      </h2>
      <p className="mb-4">We use your information to:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Provide, operate, and maintain our services</li>
        <li>Personalize and improve user experience</li>
        <li>Communicate with you (e.g., updates, support)</li>
        <li>Detect and prevent fraudulent or unauthorized activity</li>
        <li>Comply with legal obligations</li>
      </ul>

      {/* User Consent and Tracking */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">
        User Consent and Tracking
      </h2>
      <p className="mb-4">
        We request your permission before accessing sensitive data or device
        features. You can choose to grant or deny these permissions. If your
        device settings allow, <span className="font-semibold">DocStar</span>{" "}
        may use Apple's AppTrackingTransparency framework to request your
        consent for tracking your activity across other companies' apps and
        websites. You may revoke consent or manage tracking permissions at any
        time through your device settings.
      </p>

      {/* Data Retention */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">Data Retention</h2>
      <p className="mb-4">
        We retain your personal data only for as long as necessary to provide
        our services, comply with our legal obligations, resolve disputes, and
        enforce our agreements. When data is no longer needed, we securely
        delete or anonymize it.
      </p>

      {/* Cookies and Tracking Technologies */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Cookies and Tracking Technologies
      </h2>
      <p className="mb-4">
        We use cookies and similar technologies to enhance your experience,
        analyze usage, and improve our services. You can manage or disable
        cookies in your browser settings.
      </p>

      {/* Mobile App Permissions */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Mobile App Permissions
      </h2>
      <p className="mb-4">
        Our mobile app may request access to certain features of your device,
        including:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Internet and network access</li>
        <li>Push notifications</li>
      </ul>

      {/* Data Security */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">Data Security</h2>
      <p className="mb-4">
        We use industry-standard security measures to protect your personal
        information. However, no method of transmission or storage is 100%
        secure, and we cannot guarantee absolute security.
      </p>

      {/* Legal Compliance */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">Legal Compliance</h2>
      <p className="mb-4">
        We comply with applicable data protection laws, including:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>
          The General Data Protection Regulation (GDPR) for users in the
          European Union
        </li>
        <li>
          The California Consumer Privacy Act (CCPA) for California residents
        </li>
        <li>
          The Information Technology Rules, 2011, and applicable provisions of
          Indian data protection laws for users in India
        </li>
      </ul>
      <p className="mb-4">
        You have the right to request access to, correction of, or deletion of
        your personal data as applicable under these laws.
      </p>

      {/* Your Rights */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">Your Rights</h2>
      <p className="mb-4">You may:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Access, update, or delete your personal information</li>
        <li>Object to processing or withdraw consent</li>
        <li>Request data portability where applicable</li>
      </ul>

      {/* Third-Party Services */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">Third-Party Services</h2>
      <p className="mb-4">
        DocStar may include links to third-party websites or services that are
        not operated by us. We are not responsible for the privacy practices of
        these third parties.
      </p>
      <p className="mb-4">
        These services may collect and process data independently in accordance
        with their own privacy policies.
      </p>

      {/* Changes to Policy */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Changes to this Privacy Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with the updated effective date. We encourage you to
        review this page periodically for updates.
      </p>

      {/* Contact Us */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy, please
        contact us at{" "}
        <a
          href="mailto:support@docstar.io"
          className="hover:underline opacity-80"
        >
          support@docstar.io
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
