import Step3 from "/Step3.png";
export const WhiteLabelling = () => {
  return (
    <section
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-16 text-gray-800 scroll-mt-16"
      id="white-labelling"
    >
      <article className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl prose-slate max-w-none">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
          How to white label your Techdoc Documentation for branding?
        </h1>

        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            White labelling allows you the flexibility to use various web
            addresses for your Techdoc.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <p className="mb-3">
              For example: Your DocStar documentation will be available on{" "}
              <a
                className="text-blue-600 hover:underline font-medium break-all"
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
                className="text-blue-600 hover:underline font-medium"
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-3 border-b-2 border-blue-200">
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
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                  Option A
                </span>
                Configure using subdomain
              </h3>

              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                <p className="text-lg">
                  A subdomain is like a separate neighborhood on the internet.
                  Example:{" "}
                  <a
                    className="text-blue-600 hover:underline font-medium"
                    href="http://help.thingsofbrand.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    help.thingsofbrand.com
                  </a>{" "}
                  — here,{" "}
                  <em className="bg-yellow-100 px-2 py-1 rounded">help</em> is
                  the subdomain.
                </p>
              </div>

              <div className="space-y-8">
                <div className="border-l-4 border-green-400 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium mr-3">
                      Step 1
                    </span>
                    Add domain in Techdoc settings
                  </h4>
                  <p className="text-gray-700 mb-4">
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
                      <p className="text-sm text-gray-600 text-center">
                        Settings Configuration
                      </p>
                    </div>
                    <div className="space-y-2">
                      <img
                        src="https://storage.googleapis.com/techdoc.walkover.in/2Uv_sfKTLPI3/tRAbnkRAR9Cs/5b85a7d6-a865-4477-bbcf-6c0e7e3e1ffc_Screenshot 2024-11-18 at 4.48.50 PM.png"
                        alt="Settings 2"
                        className="rounded-lg border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
                      />
                      <p className="text-sm text-gray-600 text-center">
                        Domain Setup
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-400 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium mr-3">
                      Step 2
                    </span>
                    Create a CNAME record
                  </h4>
                  <p className="text-gray-700 mb-4">
                    In Cloudflare:{" "}
                    <span className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">
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

                <div className="border-l-4 border-green-400 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium mr-3">
                      Step 3
                    </span>
                    Fill details
                  </h4>

                  <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-3 mt-0.5">
                          Type:
                        </span>
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                          CNAME
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-3 mt-0.5">
                          Name:
                        </span>
                        <span>
                          your subdomain (e.g.,{" "}
                          <code className="bg-gray-100 px-2 py-1 rounded">
                            help
                          </code>
                          )
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-3 mt-0.5">
                          Target:
                        </span>
                        <span>Techdoc or your custom domain endpoint</span>
                      </li>
                    </ul>
                  </div>

                  <img
                    src={Step3}
                    alt="CNAME record details"
                    className="rounded-lg border-2 border-gray-200 shadow-md w-full hover:shadow-lg transition-shadow duration-300"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                  Option B
                </span>
                Configure using endpoint
              </h3>

              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                <p className="text-lg">
                  Example:{" "}
                  <a
                    className="text-blue-600 hover:underline font-medium"
                    href="http://thingsofbrand.com/help"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    thingsofbrand.com/help
                  </a>
                </p>
              </div>

              <div className="space-y-8">
                <div className="border-l-4 border-purple-400 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium mr-3">
                      Step 1
                    </span>
                    Add domain in Techdoc Configuration
                  </h4>
                  <p className="text-gray-700">
                    Go to{" "}
                    <span className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">
                      Configurations → Domain tab
                    </span>{" "}
                    and fill in your details.
                  </p>
                </div>

                <div className="border-l-4 border-purple-400 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium mr-3">
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

                <div className="border-l-4 border-purple-400 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium mr-3">
                      Step 3
                    </span>
                    Manage Workers
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Use Cloudflare Workers to apply custom logic at the DNS
                    level.
                  </p>

                  <img
                    src="https://phone91.com/static/msg91/Kb1700722595687111700722582673.png"
                    alt="Manage Workers"
                    className="rounded-lg border-2 border-gray-200 shadow-md w-full hover:shadow-lg transition-shadow duration-300"
                  />
                </div>

                <div className="border-l-4 border-purple-400 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium mr-3">
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

                <div className="border-l-4 border-purple-400 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium mr-3">
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
                      <p className="text-sm text-gray-600 text-center">
                        Quick Edit Interface
                      </p>
                    </div>
                    <div className="space-y-2">
                      <img
                        src="https://phone91.com/static/msg91/Kb17007225959776281700722582852.png"
                        alt="Worker file"
                        className="rounded-lg border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
                      />
                      <p className="text-sm text-gray-600 text-center">
                        Worker File Structure
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-400 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium mr-3">
                      Step 6
                    </span>
                    Paste this code
                  </h4>

                  <div className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm leading-relaxed shadow-lg border border-gray-700">
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

                  <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h5 className="font-semibold text-amber-800 mb-3 flex items-center">
                      <span className="text-amber-600 mr-2">⚙️</span>
                      Variable Reference
                    </h5>
                    <ul className="space-y-2 text-amber-900">
                      <li className="flex items-start">
                        <span className="font-mono bg-amber-100 px-2 py-1 rounded text-sm mr-3 mt-0.5">
                          your_collection_id
                        </span>
                        <span>ID from Techdoc Config</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-mono bg-amber-100 px-2 py-1 rounded text-sm mr-3 mt-0.5">
                          your_custom_domain
                        </span>
                        <span>Your branded domain</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-mono bg-amber-100 px-2 py-1 rounded text-sm mr-3 mt-0.5">
                          your_endpoint
                        </span>
                        <span>
                          The path (e.g.,{" "}
                          <code className="bg-amber-100 px-1 py-0.5 rounded">
                            help
                          </code>
                          )
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-purple-400 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium mr-3">
                      Step 7
                    </span>
                    Assign route in Worker Routes
                  </h4>
                  <img
                    src="https://phone91.com/static/msg91/Kb17007225872562321700722578517.png"
                    alt="Route example"
                    className="rounded-lg border-2 border-gray-200 shadow-md w-full hover:shadow-lg transition-shadow duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};
