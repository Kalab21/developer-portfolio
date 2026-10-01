import type { NextConfig } from "next";
import { resume } from "./src/data/resume";

const nextConfig: NextConfig = {
  // The resume keeps one stable URL. Caches must revalidate it on every
  // request, so a newly deployed PDF is served at once without a ?v= query.
  async headers() {
    return [
      {
        source: `/${resume.fileName}`,
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
