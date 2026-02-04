// app/custom-domain/page.tsx
import Step3 from '../../../public/Step3.png'
import Image from "next/image";
import { fetchMeta } from "@/services/meta.api";
import { generateSEOMetadata } from "@/lib/seo";
import { type MetaItem } from "@/types/data-types";

export async function generateMetadata() {
  let meta: MetaItem | null = null;

  try {
    meta = await fetchMeta("/custom-domain");
  } catch (error) {
    console.error("[CustomDomainPage] Unable to load meta from API:", error);
  }

  return generateSEOMetadata({
    meta,
    pathname: "/custom-domain",
  });
}

export default function WhiteLabelling() {
  return (
    <div className="container mx-auto">
      <section
        className="px-4 py-8 sm:px-5 sm:py-10 md:px-6 md:py-12 lg:py-16 mt-8 sm:mt-10 md:mt-12 scroll-mt-16"
        id="white-labelling"
      >
        <article className="prose prose-sm mt-8 sm:prose-[15px] md:prose-base prose-slate max-w-none">
          <h1 className="h1 mb-4">
          How to white label your Techdoc Documentation for branding?xzc
        </h1>

          <div className="space-y-3 sm:space-y-3.5 md:space-y-4">
            <p className="text-sm sm:text-[15px] md:text-base leading-relaxed">
            White labelling allows you the flexibility to use various web
            addresses for your Techdoc.
          </p>

            <div className="border-l-4 p-3 sm:p-3.5 md:p-4 rounded-r-lg theme-bg-secondary theme-border">
              <p className="mb-2">
              For example: Your DocStar documentation will be available on{" "}
              <a
                className="hover:underline font-medium break-all opacity-80"
                href="https://docstar.io/{{folder_slug}}/{{article_slug}}"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://docstar.io/&#123;&#123;folder_slug&#125;&#125;/&#123;&#123;article_slug&#125;&#125;
              </a>
            </p>

              <p>
              But if you want it to be present on your own domain like{" "}
              <a
                className="hover:underline font-medium opacity-80"
                href="http://thingsofbrand.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                thingsofbrand.com
              </a>
              , follow the steps below.
              </p>
            </div>
          </div>

          <div className="mt-6 sm:mt-7 md:mt-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-5 sm:mb-5.5 md:mb-6 pb-2 border-b-2 theme-border leading-tight">
            For Cloudflare:
            </h2>

            <p className="text-sm sm:text-[15px] md:text-base mb-3 sm:mb-3.5 md:mb-4 leading-relaxed">
            Select the domain you want to use for Techdoc.
            </p>

            <div className="mb-5 sm:mb-5.5 md:mb-6">
            <img
              src="https://phone91.com/static/msg91/Kb1700722592590411700722578643.png"
              alt="Cloudflare domain selection"
              className="rounded-lg border-2 border-gray-300 shadow-lg w-full hover:shadow-xl transition-shadow duration-300"
            />
            </div>

            <div className="space-y-6 sm:space-y-7 md:space-y-8">
              {/* Option A */}
              <div className="rounded-lg p-4 sm:p-5 md:p-6 lg:p-8 theme-bg-secondary border">
              <h3 className="text-xl sm:text-[22px] md:text-2xl font-bold mb-5 sm:mb-5.5 md:mb-6 flex items-center">
                <span className="px-3 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary opacity-80">
                  Option A
                </span>
                Configure using subdomain
              </h3>

              <div className="p-3 sm:p-3.5 md:p-4 rounded-lg border mb-5 sm:mb-5.5 md:mb-6">
                <p className="text-lg">
                  A subdomain is like a separate neighborhood on the internet.
                  Example:{" "}
                  <a
                    className="hover:underline font-medium opacity-80"
                    href="http://help.thingsofbrand.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    help.thingsofbrand.com
                  </a>{" "}
                  — here,{" "}
                  <em className="px-2 py-1 rounded-md theme-bg-secondary">help</em> is
                  the subdomain.
                </p>
              </div>

              <div className="space-y-6 sm:space-y-7 md:space-y-8">
                {/* Step 1 */}
                <div className="border-l-4 pl-4 sm:pl-5 md:pl-6 theme-border">
                  <h4 className="text-lg sm:text-[19px] md:text-xl font-semibold mb-3 sm:mb-3.5 md:mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary opacity-80">
                      Step 1
                    </span>
                    Add domain in Techdoc settings
                  </h4>
                  <p className="mb-3 sm:mb-3.5 md:mb-4 opacity-80 text-sm sm:text-[15px] md:text-base">
                    Add your full custom domain (including subdomain or
                    endpoint).
                    </p>

                    <div className="grid gap-3 sm:gap-3.5 md:gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-2">
                      <img
                        src="https://storage.googleapis.com/techdoc.walkover.in/2Uv_sfKTLPI3/tRAbnkRAR9Cs/87980b2c-4d5d-47a6-9713-c6e97742c1fc_Screenshot 2024-11-18 at 4.55.52 PM.png"
                        alt="Settings 1"
                        className="rounded-lg border-2 theme-border shadow-md hover:shadow-lg transition-shadow duration-300"
                      />
                      <p className="text-xs sm:text-[13px] md:text-sm text-center opacity-70">
                        Settings Configuration
                      </p>
                    </div>
                    <div className="space-y-2">
                      <img
                        src="https://storage.googleapis.com/techdoc.walkover.in/2Uv_sfKTLPI3/tRAbnkRAR9Cs/5b85a7d6-a865-4477-bbcf-6c0e7e3e1ffc_Screenshot 2024-11-18 at 4.48.50 PM.png"
                        alt="Settings 2"
                        className="rounded-lg border-2 theme-border shadow-md hover:shadow-lg transition-shadow duration-300"
                      />
                      <p className="text-xs sm:text-[13px] md:text-sm text-center opacity-70">
                        Domain Setup
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="border-l-4 pl-4 md:pl-6 theme-border">
                  <h4 className="text-lg sm:text-[19px] md:text-xl font-semibold mb-3 sm:mb-3.5 md:mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary opacity-80">
                      Step 2
                    </span>
                    Create a CNAME record
                  </h4>
                  <p className="mb-3 sm:mb-3.5 md:mb-4 opacity-80 text-sm sm:text-[15px] md:text-base">
                    In Cloudflare:{" "}
                    <span className="px-2 py-1 rounded-md font-mono text-sm theme-bg-secondary">
                      DNS → Records → Add record
                    </span>
                    </p>

                    <div className="mb-2.5 sm:mb-2.75 md:mb-3">
                    <img
                      src="https://phone91.com/static/msg91/Kb17007225951817951700722582368.png"
                      alt="DNS CNAME record"
                      className="rounded-lg border-2 theme-border shadow-md w-full hover:shadow-lg transition-shadow duration-300"
                    />
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="border-l-4 pl-4 md:pl-6 theme-border">
                  <h4 className="text-lg sm:text-[19px] md:text-xl font-semibold mb-3 sm:mb-3.5 md:mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary opacity-80">
                      Step 3
                    </span>
                    Fill details
                    </h4>

                    <div className="p-2.5 sm:p-2.75 md:p-3 rounded-lg border mb-2.5 sm:mb-2.75 md:mb-3">
                      <ul className="space-y-2 text-xs sm:text-[13px] md:text-sm">
                      <li className="flex items-start">
                        <span className="px-2 py-1 rounded-md text-sm font-medium mr-3 mt-0.5 theme-bg-secondary opacity-80">
                          Type:
                          </span>
                          <span className="font-mono px-2 py-1 rounded-md theme-bg-secondary text-xs">
                          CNAME
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="px-2 py-1 rounded-md text-sm font-medium mr-3 mt-0.5 theme-bg-secondary opacity-80">
                          Name:
                        </span>
                        <span>
                          your subdomain (e.g.,{" "}
                          <code className="px-2 py-1 rounded-md theme-bg-secondary">
                            help
                          </code>
                          )
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="px-2 py-1 rounded-md text-sm font-medium mr-3 mt-0.5 theme-bg-secondary opacity-80">
                          Target:
                          </span>
                          <span>Techdoc or your custom domain endpoint</span>
                        </li>
                      </ul>
                    </div>

                  <Image
                    src={Step3}
                    alt="CNAME record details"
                    className="rounded-lg border-2 theme-border shadow-md w-full hover:shadow-lg transition-shadow duration-300"
                  />
                  </div>
                </div>
              </div>

              {/* Option B */}
              <div className="rounded-lg p-4 sm:p-5 md:p-6 lg:p-8 theme-bg-secondary border">
              <h3 className="text-xl sm:text-[22px] md:text-2xl font-bold mb-5 sm:mb-5.5 md:mb-6 flex items-center">
                <span className="px-3 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary opacity-80">
                  Option B
                </span>
                Configure using endpoint
              </h3>

              <div className="p-3 sm:p-3.5 md:p-4 rounded-lg border mb-5 sm:mb-5.5 md:mb-6">
                <p className="text-lg">
                  Example:{" "}
                  <a
                    className="hover:underline font-medium opacity-80"
                    href="http://thingsofbrand.com/help"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    thingsofbrand.com/help
                  </a>
                </p>
              </div>

              <div className="space-y-6 sm:space-y-7 md:space-y-8">
                {/* Step 1 */}
                <div className="border-l-4 pl-4 sm:pl-5 md:pl-6 theme-border">
                  <h4 className="text-lg sm:text-[19px] md:text-xl font-semibold mb-3 sm:mb-3.5 md:mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary opacity-80">
                      Step 1
                    </span>
                    Add domain in Techdoc Configuration
                  </h4>
                  <p className="opacity-80">
                    Go to{" "}
                    <span className="px-2 py-1 rounded-md font-mono text-sm theme-bg-secondary">
                      Configurations → Domain tab
                    </span>{" "}
                    and fill in your details.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="border-l-4 pl-4 sm:pl-5 md:pl-6 theme-border">
                  <h4 className="text-lg sm:text-[19px] md:text-xl font-semibold mb-3 sm:mb-3.5 md:mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary opacity-80">
                      Step 2
                    </span>
                    Open Worker Routes
                  </h4>
                  <img
                    src="https://phone91.com/static/msg91/Kb17007225962871091700722582779.png"
                    alt="Worker Routes"
                    className="rounded-lg border-2 theme-border shadow-md w-full hover:shadow-lg transition-shadow duration-300"
                  />
                </div>

                {/* Step 3 */}
                <div className="border-l-4 pl-4 sm:pl-5 md:pl-6 theme-border">
                  <h4 className="text-lg sm:text-[19px] md:text-xl font-semibold mb-3 sm:mb-3.5 md:mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary opacity-80">
                      Step 3
                    </span>
                    Manage Workers
                  </h4>
                  <p className="mb-3 sm:mb-3.5 md:mb-4 opacity-80 text-sm sm:text-[15px] md:text-base">
                    Use Cloudflare Workers to apply custom logic at the DNS
                    level.
                  </p>

                  <img
                    src="https://phone91.com/static/msg91/Kb1700722595687111700722582673.png"
                    alt="Manage Workers"
                    className="rounded-lg border-2 theme-border shadow-md w-full hover:shadow-lg transition-shadow duration-300"
                  />
                </div>

                {/* Step 4 */}
                <div className="border-l-4 pl-4 sm:pl-5 md:pl-6 theme-border">
                  <h4 className="text-lg sm:text-[19px] md:text-xl font-semibold mb-3 sm:mb-3.5 md:mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary opacity-80">
                      Step 4
                    </span>
                    Create Application
                  </h4>
                  <img
                    src="https://phone91.com/static/msg91/Kb17007225920268841700722581330.png"
                    alt="Create application"
                    className="rounded-lg border-2 theme-border shadow-md w-full hover:shadow-lg transition-shadow duration-300"
                  />
                </div>

                {/* Step 5 */}
                <div className="border-l-4 pl-4 sm:pl-5 md:pl-6 theme-border">
                  <h4 className="text-lg sm:text-[19px] md:text-xl font-semibold mb-3 sm:mb-3.5 md:mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary opacity-80">
                      Step 5
                    </span>
                    Quick Edit your Worker
                  </h4>

                  <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-2">
                      <img
                        src="https://phone91.com/static/msg91/Kb17007225955260211700722582485.png"
                        alt="Quick edit"
                        className="rounded-lg border-2 theme-border shadow-md hover:shadow-lg transition-shadow duration-300"
                      />
                      <p className="text-xs sm:text-[13px] md:text-sm text-center opacity-70">
                        Quick Edit Interface
                      </p>
                    </div>
                    <div className="space-y-2">
                      <img
                        src="https://phone91.com/static/msg91/Kb17007225959776281700722582852.png"
                        alt="Worker file"
                        className="rounded-lg border-2 theme-border shadow-md hover:shadow-lg transition-shadow duration-300"
                      />
                      <p className="text-xs sm:text-[13px] md:text-sm text-center opacity-70">
                        Worker File Structure
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="border-l-4 pl-4 sm:pl-5 md:pl-6 theme-border">
                  <h4 className="text-lg sm:text-[19px] md:text-xl font-semibold mb-3 sm:mb-3.5 md:mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary opacity-80">
                      Step 6
                    </span>
                    Paste this code
                  </h4>

                  <div className="p-4 sm:p-5 md:p-6 rounded-lg overflow-x-auto text-xs sm:text-[13px] md:text-sm leading-relaxed shadow-lg theme-bg-secondary border" style={{ opacity: 0.95 }}>
                    <pre className="whitespace-pre-wrap">
                      <code>{`addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const pathName = '{{your_endpoint}}';
  const collectionId = '{{your_collection_id}}';
  const Domain = 'https://{{your_custom_domain}}/{{your_endpoint}}';

  if (url.pathname === \`/\${your_endpoint}/\` || url.pathname === \`/\${your_endpoint}\`) {
    event.respondWith(handleRootFaq(event));
  } else if (url.pathname.startsWith(\`/\${your_endpoint}/\`)) {
    event.respondWith(handleFaqPath(event, url));
  } else {
    event.respondWith(fetch(event.request));
  }
});

async function handleRootFaq(event) {
  const originUrl = new URL('https://techdoc.walkover.in/p');
  originUrl.searchParams.set('collectionId', collectionId);

  const response = await fetch(originUrl.toString(), {
    method: event.request.method,
    headers: new Headers(event.request.headers)
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}

async function handleFaqPath(event, url) {
  const originUrl = new URL(url.toString().replace(
    Domain,
    'https://techdoc.walkover.in/p'
  ));
  originUrl.searchParams.set('collectionId', collectionId);

  const response = await fetch(originUrl.toString(), {
    method: event.request.method,
    headers: new Headers(event.request.headers)
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}`}</code>
                    </pre>
                  </div>

                  <div className="mt-5 sm:mt-5.5 md:mt-6 rounded-lg p-3 sm:p-3.5 md:p-4 theme-bg-secondary border">
                    <h5 className="font-semibold mb-2.5 sm:mb-2.75 md:mb-3 flex items-center text-sm sm:text-[15px] md:text-base">
                      <span className="mr-2 opacity-80">⚙️</span>
                      Variable Reference
                    </h5>
                    <ul className="space-y-2 text-xs sm:text-[13px] md:text-sm opacity-80">
                      <li>
                        <strong>your_endpoint</strong> → your endpoint path
                      </li>
                      <li>
                        <strong>collection_id</strong> → your Techdoc
                        collection ID
                      </li>
                      <li>
                        <strong>your_custom_domain</strong> → your domain
                        name
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
    </div>
  );
}
