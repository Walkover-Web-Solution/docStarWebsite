export const metadata = {
  title: "Data Retention and Deletion Policy | DocStar",  
  description: "Data retention and deletion policy",
}

const DataRetentionPolicy = () => {
    return (
      <div className="bg-white">
      <div className="bg-white text-gray-800 pt-32 pb-16 px-4 md:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-black">Data Retention and Deletion Policy</h1>
  
        <p className="mb-4 text-lg">
          At <span className="font-semibold">DocStar</span>, we prioritize the security and privacy of your data. This Data Retention and Deletion Policy outlines how we manage, retain, and delete your data to ensure transparency and clarity in our practices.
        </p>
  
        {/* Scope of Policy */}
        <h2 className="text-2xl font-semibold mt-8 mb-2">1. Scope of Policy</h2>
        <p className="mb-4">
          This policy applies to all data processed by DocStar related to documentation, workflows, and integrations created by our users.
        </p>
  
        {/* Data Retention Practices */}
        <h2 className="text-2xl font-semibold mt-8 mb-2">2. Data Retention Practices</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Documentation Content</h3>
        <p className="mb-4">
          Documentation Content refers to the data and documents created, edited, and stored within DocStar. We retain this data as long as your account remains active and for the duration specified in your subscription plan.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Activity Logs</h3>
        <p className="mb-4">
          Activity Logs include metadata such as document names, creation dates, modification times, and user actions. These logs are retained for a period of 30 days for troubleshooting and security purposes and are archived after this period.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Usage Metrics</h3>
        <p className="mb-4">
          Usage Metrics include aggregated statistics about platform usage, such as the number of documents created, user engagement patterns, and feature utilization. Only statistical data is retained, and no detailed personal content is stored in these metrics.
        </p>
  
        {/* Data Deletion Process */}
        <h2 className="text-2xl font-semibold mt-8 mb-2">3. Data Deletion Process</h2>
        <p className="mb-4">
          To request the deletion of your data, you can follow these steps:
        </p>
        <p className="mb-2 font-semibold">Contact Support:</p>
        <p className="mb-4">
          Send an email to{' '}
          <a href="mailto:support@docstar.io" className="text-blue-600 hover:underline">
            support@docstar.io
          </a>{' '}
          with the subject line "Data Deletion Request."
        </p>
        <p className="mb-2 font-semibold">Provide Information:</p>
        <p className="mb-2">Include the following details in your request:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Registered email address</li>
          <li>Account username or workspace name</li>
          <li>Brief description of the data to be deleted</li>
        </ul>
  
        {/* Verification Process */}
        <h2 className="text-2xl font-semibold mt-8 mb-2">4. Verification Process</h2>
        <p className="mb-4">
          For security and to prevent unauthorized data deletion requests, we may ask for:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Verification of your identity</li>
          <li>Confirmation of account ownership linked to the data request</li>
        </ul>
  
        {/* Data Deletion Timeline */}
        <h2 className="text-2xl font-semibold mt-8 mb-2">5. Data Deletion Timeline</h2>
        <p className="mb-4">
          Once your request is verified:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>We will process and delete the specified data within 30 days</li>
          <li>You will receive a notification confirming the deletion completion</li>
          <li>Backup systems will be purged within 90 days of the deletion request</li>
        </ul>
  
        {/* Retention Periods */}
        <h2 className="text-2xl font-semibold mt-8 mb-2">6. Retention Periods</h2>
        <p className="mb-2 font-semibold">User Data:</p>
        <p className="mb-4">
          Personal information and account data are retained for the duration of your account's active status and for 12 months after account closure, unless deletion is specifically requested.
        </p>
        <p className="mb-2 font-semibold">Documentation Data:</p>
        <p className="mb-4">
          Documents and content are retained for 30 days after deletion and then archived for an additional 30 days. Archived data is not actively accessible through the platform.
        </p>
        <p className="mb-4">
          If no deletion request is made, data is retained as per our Privacy Policy to enhance our services and meet legal obligations.
        </p>
  
        {/* Data Deletion Limitations */}
        <h2 className="text-2xl font-semibold mt-8 mb-2">7. Data Deletion Limitations</h2>
        <p className="mb-4">
          Certain data may not be eligible for deletion in cases where:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>It is required to comply with legal obligations</li>
          <li>It is necessary for resolving disputes or enforcing agreements</li>
          <li>It forms part of anonymized datasets that cannot be traced back to you</li>
          <li>It is essential for maintaining platform security and preventing fraud</li>
        </ul>
  
        {/* Impact of Data Deletion */}
        <h2 className="text-2xl font-semibold mt-8 mb-2">8. Impact of Data Deletion</h2>
        <p className="mb-4">
          After data deletion:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>The data cannot be recovered</li>
          <li>Any shared documents or collaborations relying on the deleted data will no longer function</li>
          <li>Your account access may be terminated if all associated data is deleted</li>
          <li>Integration with third-party services may be affected</li>
        </ul>
  
        {/* Updates to This Policy */}
        <h2 className="text-2xl font-semibold mt-8 mb-2">9. Updates to This Policy</h2>
        <p className="mb-4">
          We may update this policy periodically to reflect changes in our data retention and deletion practices or for legal/regulatory reasons. Any changes will be reflected here with the updated date. We will notify users of significant changes via email or platform notifications.
        </p>
        <p className="mb-4 font-semibold">
          Last Updated: January 10, 2025
        </p>
  
        {/* Contact Us */}
        <h2 className="text-2xl font-semibold mt-8 mb-2">Contact Us</h2>
        <p className="mb-4">
          For any questions or concerns about this policy, please contact us at{' '}
          <a href="mailto:support@docstar.io" className="text-blue-600 hover:underline">
            support@docstar.io
          </a>.
        </p>
      </div>
      </div>
    );
  };
  
  export default DataRetentionPolicy;
