import React from "react";

type Plan = {
  title: string;
  price: string;
  description: string;
  features: string[];
  integrations?: string[];
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    title: "Free",
    price: "$0",
    description: "Basic tools for personal or trial use.",
    features: [
      "Block-based editor with integrations ✓",
      "Spaces & Collection: 1 ✓",
      "API playground ✓",
      "Custom Domain ❌",
      "Redirect management ❌",
      "Site Customization ❌",
      "User feedback & site insights ❌",
      "Built in SEO ❌",
      "Published Versions ❌",
      "Real Time Collaboration ❌",
      "Import/Export ❌",
      "Watermark ❌",
      "Members: 1 ✓",
      "Pages: 10 ✓",
      "Trash ❌",
      "Full text search ✓",
      "Articles bulk actions ✓",
      "Inbuilt AI ❌",
    ],
  },
  {
    title: "Starter",
    price: "$25",
    description: "Ideal for startups and growing teams.",
    features: [
      "Block-based editor with integrations ✓",
      "Spaces & Collection: 5 ✓",
      "API playground ✓",
      "Custom Domain ✓",
      "Redirect management ❌",
      "Site Customization ✓",
      "User feedback & site insights ✓",
      "Built in SEO ✓",
      "Published Versions ✓",
      "Real Time Collaboration ✓",
      "Import/Export ✓",
      "Watermark ❌",
      "Members: 5 (Add more users $8/user) ✓",
      "Pages: Unlimited ✓",
      "Trash ✓",
      "Full text search ✓",
      "Articles bulk actions ✓",
      "Inbuilt AI ✓",
    ],
  },
  {
    title: "Business",
    price: "$100",
    description: "Advanced features for larger organizations.",
    features: [
      "Block-based editor with integrations ✓",
      "Spaces & Collection: Unlimited ✓",
      "API playground ✓",
      "Custom Domain ✓",
      "Redirect management ✓",
      "Site Customization ✓",
      "User feedback & site insights ✓",
      "Built in SEO ✓",
      "Published Versions ✓",
      "Real Time Collaboration ✓",
      "Import/Export ✓",
      "Watermark ✓",
      "Members: Unlimited ✓",
      "Pages: Unlimited ✓",
      "Trash ✓",
      "Full text search ✓",
      "Articles bulk actions ✓",
      "Inbuilt AI ✓",
    ],
  },
];

export const Pricing: React.FC = () => {
  return (
    <div className="pricing-page pt-24 pb-16 px-4 sm:px-6 lg:px-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-2">
          Choose the plan that’s right for you
        </h2>
        <p className="text-md" style={{ opacity: 0.7 }}>
          Simple, transparent pricing for individuals, teams, and enterprises.
        </p>
      </div>

      <div className="grid  grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="rounded-2xl shadow-md p-6 transition-all duration-300 ease-in-out hover:shadow-xl border"
          >
            <h3 className="text-2xl font-semibold">
              {plan.title}
            </h3>
            <p className="text-3xl font-bold mt-2">
              {plan.price}
              <span className="text-base font-medium opacity-80">
                {" "}
                / month
              </span>
            </p>
            <p className="text-base mb-4 opacity-80">{plan.description}</p>

            <ul className="mt-4 space-y-2 text-sm">
              {plan.features.map((feature, i) => {
                const hasCheck = feature.trim().endsWith("✓");
                const hasCross = feature.trim().endsWith("❌");
                const cleanedText = feature.replace(/[✓❌]$/, "").trim();

                return (
                  <li key={i} className="flex items-start">
                    <span
                      className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold theme-badge"
                    >
                      {hasCheck ? "✓" : hasCross ? "✗" : ""}
                    </span>
                    {cleanedText}
                  </li>
                );
              })}
            </ul>

            {plan.integrations && (
              <div className="mt-4">
                <p className="mt-2 text-sm opacity-80">Integrations:</p>
                <div className="flex flex-wrap gap-2 mt-1 text-sm">
                  {plan.integrations.map((icon, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-md theme-bg-secondary border"
                    >
                      {icon}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <a
              href="https://app.docstar.io/login"
              className="mt-6 block text-center w-full py-2 rounded-xl font-semibold hover:opacity-90 transition"
            >
              {plan.title === "Free" ? "Sign up" : "Get started"}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
