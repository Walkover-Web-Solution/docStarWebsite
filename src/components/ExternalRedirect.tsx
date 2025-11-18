/**
 * Performs a client-side redirect to a supplied external URL as soon as the component mounts.
 * Used for pages that simply hand off to other properties while keeping navigation centralized.
 */
import { useEffect } from "react";

/**
 * Redirects the browser to the provided URL and renders nothing.
 */
const ExternalRedirect = ({ url }: { url: string }) => {
  useEffect(() => {
    // Replace the current location so the browser performs a full navigation.
    window.location.href = url;
  }, [url]);

  return null;
};

export default ExternalRedirect;
