// app/custom-domain/page.tsx
import Step3 from '../../../public/Step3.png'
import Image from "next/image";

export const metadata = {
  title: "Custom Domain | DocStar",  
  description: "Add custom domain to your DocStar documentation",
}
export default function WhiteLabelling() {
  return (
    <div className='py-10'>
    <section
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-16 scroll-mt-16"
      id="white-labelling"
    >
      <article className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl prose-slate max-w-none">
        <h1 className="text-4xl font-extrabold mb-8 leading-tight">
          How to white label your Techdoc Documentation for branding?
        </h1>

        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            White labelling allows you the flexibility to use various web
            addresses for your Techdoc.
          </p>

          <div className="border-l-4 p-4 rounded-r-lg theme-bg-secondary" style={{ borderColor: 'var(--app-border)' }}>
            <p className="mb-3">
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

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-8 pb-3 border-b-2" style={{ borderColor: 'var(--app-border)' }}>
            For Cloudflare:
          </h2>

          <p className="text-lg mb-6">
            Select the domain you want to use for Techdoc.
          </p>

          <div className="mb-10">
            <img
              src="https://phone91.com/static/msg91/Kb1700722592590411700722578643.png"
              alt="Cloudflare domain selection"
              className="rounded-lg border-2 border-gray-300 shadow-lg w-full hover:shadow-xl transition-shadow duration-300"
            />
          </div>

          <div className="space-y-12">
            {/* Option A */}
            <div className="rounded-lg p-8 theme-bg-secondary theme-border">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="px-3 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary" style={{ opacity: 0.8 }}>
                  Option A
                </span>
                Configure using subdomain
              </h3>

              <div className="p-4 rounded-lg theme-border mb-6">
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
                  <em className="px-2 py-1 rounded theme-bg-secondary">help</em> is
                  the subdomain.
                </p>
              </div>

              <div className="space-y-8">
                {/* Step 1 */}
                <div className="border-l-4 pl-6" style={{ borderColor: 'var(--app-border)' }}>
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary" style={{ opacity: 0.8 }}>
                      Step 1
                    </span>
                    Add domain in Techdoc settings
                  </h4>
                  <p className="mb-4 opacity-80">
                    Add your full custom domain (including subdomain or
                    endpoint).
                  </p>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <img
                        src="https://storage.googleapis.com/techdoc.walkover.in/2Uv_sfKTLPI3/tRAbnkRAR9Cs/87980b2c-4d5d-47a6-9713-c6e97742c1fc_Screenshot 2024-11-18 at 4.55.52 PM.png"
                        alt="Settings 1"
                        className="rounded-lg border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
                      />
                      <p className="text-sm text-center opacity-70">
                        Settings Configuration
                      </p>
                    </div>
                    <div className="space-y-2">
                      <img
                        src="https://storage.googleapis.com/techdoc.walkover.in/2Uv_sfKTLPI3/tRAbnkRAR9Cs/5b85a7d6-a865-4477-bbcf-6c0e7e3e1ffc_Screenshot 2024-11-18 at 4.48.50 PM.png"
                        alt="Settings 2"
                        className="rounded-lg border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
                      />
                      <p className="text-sm text-center opacity-70">
                        Domain Setup
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="border-l-4 pl-6" style={{ borderColor: 'var(--app-border)' }}>
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary" style={{ opacity: 0.8 }}>
                      Step 2
                    </span>
                    Create a CNAME record
                  </h4>
                  <p className="mb-4 opacity-80">
                    In Cloudflare:{" "}
                    <span className="px-2 py-1 rounded font-mono text-sm theme-bg-secondary">
                      DNS → Records → Add record
                    </span>
                  </p>

                  <div className="mb-4">
                    <img
                      src="https://phone91.com/static/msg91/Kb17007225951817951700722582368.png"
                      alt="DNS CNAME record"
                      className="rounded-lg border-2 border-gray-200 shadow-md w-full hover:shadow-lg transition-shadow duration-300"
                    />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="border-l-4 pl-6" style={{ borderColor: 'var(--app-border)' }}>
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary" style={{ opacity: 0.8 }}>
                      Step 3
                    </span>
                    Fill details
                  </h4>

                  <div className="p-4 rounded-lg theme-border mb-4">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="px-2 py-1 rounded text-sm font-medium mr-3 mt-0.5 theme-bg-secondary" style={{ opacity: 0.8 }}>
                          Type:
                        </span>
                        <span className="font-mono px-2 py-1 rounded theme-bg-secondary">
                          CNAME
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="px-2 py-1 rounded text-sm font-medium mr-3 mt-0.5 theme-bg-secondary" style={{ opacity: 0.8 }}>
                          Name:
                        </span>
                        <span>
                          your subdomain (e.g.,{" "}
                          <code className="px-2 py-1 rounded theme-bg-secondary">
                            help
                          </code>
                          )
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="px-2 py-1 rounded text-sm font-medium mr-3 mt-0.5 theme-bg-secondary" style={{ opacity: 0.8 }}>
                          Target:
                        </span>
                        <span>Techdoc or your custom domain endpoint</span>
                      </li>
                    </ul>
                  </div>

                  <Image
                    src={Step3}
                    alt="CNAME record details"
                    className="rounded-lg border-2 border-gray-200 shadow-md w-full hover:shadow-lg transition-shadow duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Option B */}
            <div className="rounded-lg p-8 theme-bg-secondary theme-border">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="px-3 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary" style={{ opacity: 0.8 }}>
                  Option B
                </span>
                Configure using endpoint
              </h3>

              <div className="p-4 rounded-lg theme-border mb-6">
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

              <div className="space-y-8">
                {/* Step 1 */}
                <div className="border-l-4 pl-6" style={{ borderColor: 'var(--app-border)' }}>
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary" style={{ opacity: 0.8 }}>
                      Step 1
                    </span>
                    Add domain in Techdoc Configuration
                  </h4>
                  <p className="opacity-80">
                    Go to{" "}
                    <span className="px-2 py-1 rounded font-mono text-sm theme-bg-secondary">
                      Configurations → Domain tab
                    </span>{" "}
                    and fill in your details.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="border-l-4 pl-6" style={{ borderColor: 'var(--app-border)' }}>
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary" style={{ opacity: 0.8 }}>
                      Step 2
                    </span>
                    Open Worker Routes
                  </h4>
                  <img
                    src="https://phone91.com/static/msg91/Kb17007225962871091700722582779.png"
                    alt="Worker Routes"
                    className="rounded-lg border-2 border-gray-200 shadow-md w-full hover:shadow-lg transition-shadow duration-300"
                  />
                </div>

                {/* Step 3 */}
                <div className="border-l-4 pl-6" style={{ borderColor: 'var(--app-border)' }}>
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary" style={{ opacity: 0.8 }}>
                      Step 3
                    </span>
                    Manage Workers
                  </h4>
                  <p className="mb-4 opacity-80">
                    Use Cloudflare Workers to apply custom logic at the DNS
                    level.
                  </p>

                  <img
                    src="https://phone91.com/static/msg91/Kb1700722595687111700722582673.png"
                    alt="Manage Workers"
                    className="rounded-lg border-2 border-gray-200 shadow-md w-full hover:shadow-lg transition-shadow duration-300"
                  />
                </div>

                {/* Step 4 */}
                <div className="border-l-4 pl-6" style={{ borderColor: 'var(--app-border)' }}>
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary" style={{ opacity: 0.8 }}>
                      Step 4
                    </span>
                    Create Application
                  </h4>
                  <img
                    src="https://phone91.com/static/msg91/Kb17007225920268841700722581330.png"
                    alt="Create application"
                    className="rounded-lg border-2 border-gray-200 shadow-md w-full hover:shadow-lg transition-shadow duration-300"
                  />
                </div>

                {/* Step 5 */}
                <div className="border-l-4 pl-6" style={{ borderColor: 'var(--app-border)' }}>
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary" style={{ opacity: 0.8 }}>
                      Step 5
                    </span>
                    Quick Edit your Worker
                  </h4>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <img
                        src="https://phone91.com/static/msg91/Kb17007225955260211700722582485.png"
                        alt="Quick edit"
                        className="rounded-lg border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
                      />
                      <p className="text-sm text-center opacity-70">
                        Quick Edit Interface
                      </p>
                    </div>
                    <div className="space-y-2">
                      <img
                        src="https://phone91.com/static/msg91/Kb17007225959776281700722582852.png"
                        alt="Worker file"
                        className="rounded-lg border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
                      />
                      <p className="text-sm text-center opacity-70">
                        Worker File Structure
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="border-l-4 pl-6" style={{ borderColor: 'var(--app-border)' }}>
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="px-2 py-1 rounded-full text-sm font-medium mr-3 theme-bg-secondary" style={{ opacity: 0.8 }}>
                      Step 6
                    </span>
                    Paste this code
                  </h4>

                  <div className="p-6 rounded-lg overflow-x-auto text-sm leading-relaxed shadow-lg theme-bg-secondary theme-border" style={{ opacity: 0.95 }}>
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

                  <div className="mt-6 rounded-lg p-4 theme-bg-secondary theme-border">
                    <h5 className="font-semibold mb-3 flex items-center">
                      <span className="mr-2 opacity-80">⚙️</span>
                      Variable Reference
                    </h5>
                    <ul className="space-y-2 text-sm opacity-80">
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
