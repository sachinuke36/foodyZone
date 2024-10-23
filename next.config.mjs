/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            hostname:"lh3.googleusercontent.com"
        }]
    },
    eslint: {
        ignoreDuringBuilds: true, 
    },

};

export default nextConfig;
