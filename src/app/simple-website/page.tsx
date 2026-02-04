import React from 'react';
import { fetchMeta } from "@/services/meta.api";
import { generateSEOMetadata } from "@/lib/seo";
import { type MetaItem } from "@/types/data-types";

export async function generateMetadata() {
  let meta: MetaItem | null = null;

  try {
    meta = await fetchMeta("/simple-website");
  } catch (error) {
    console.error("[SimpleWebsitePage] Unable to load meta from API:", error);
  }

  return generateSEOMetadata({
    meta,
    pathname: "/simple-website",
  });
}

const SimpleWebsite: React.FC = () => {
  return (
    <div className="min-h-screen px-6 py-20 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">
          Build Your Personal Website Without Code
        </h1>
        <p className="text-lg mb-10 opacity-80">
          With the intuitive features of <span className="font-semibold">DocStar</span>, you can create your own personal website without needing a developer team or any coding skills.
          Turn your ideas and vision into a fully functional website, and let the world explore what you've built—<span className="italic">no tech expertise required</span>!
        </p>

        <div className="p-10 rounded-xl shadow-md ">
          <h2 className="text-2xl font-semibold mb-4">
            Fast, Easy, and No-Code
          </h2>
          <p className="text-lg opacity-80">
            Build your website in no time and showcase your ideas to the world with ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleWebsite;
