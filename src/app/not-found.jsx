import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-[#FAF6F0]">
            <div className="text-center max-w-md">
                <h1 className="text-7xl font-bold text-[#C4622D]">404</h1>
                <h2 className="text-2xl font-bold text-[#2B2420] mt-4">Page Not Found</h2>
                <p className="text-[#6B5F55] mt-2 text-sm">
                    Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-block px-6 py-2.5 rounded-md bg-[#C4622D] text-white font-medium hover:bg-[#A34E22] transition-colors"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}