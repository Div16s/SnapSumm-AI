import Link from "next/link";
import { cn } from "@/lib/utils";

const NavLink = ({
    href,
    children,
    className,
} : {
    href: string;
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <Link href={href} className={cn("transition-colors duration-200 text-gray-700 hover:text-blue-400",className)}>
            {children}
        </Link>
    )
}

export default NavLink;