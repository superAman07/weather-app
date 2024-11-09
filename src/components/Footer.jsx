export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-gray-300 py-4 text-center shadow-md mt-auto">
            <p className="text-lg font-medium">
                Made by <span className="text-amber-400">Aman Vishwakarma</span>
            </p>
            <div className="mt-2 text-gray-500 text-sm">
                © {new Date().getFullYear()} Aman Vishwakarma. All rights reserved.
            </div>
        </footer>
    );
}
