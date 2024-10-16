/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Use 'http' if needed
        hostname: "drive.google.com",
        port: "", // Leave empty for default ports
        pathname: "/**", // Allows all paths or specify more restrictive paths as needed
      },
    ],
  },
};

export default nextConfig;
