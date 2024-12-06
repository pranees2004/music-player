import Link from "next/link";
import { RiArrowDownDoubleFill } from "react-icons/ri";

export default function TransparentNavbar() {
  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2 bg-transparent text-white z-50">
      {/* Arrow Icon */}
      <Link href="/musiclisting">
        <button className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
          <RiArrowDownDoubleFill className="h-6 w-6" />
        </button>
      </Link>

      {/* Example Placeholder for Navigation Links */}
    
    </div>
  );
}
