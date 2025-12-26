import Link from "next/link";

export default function NavbarBrand(){
    const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
    return(
        <Link href={"/"} className="text-lg font-bold">{APP_NAME}</Link>
    )
}