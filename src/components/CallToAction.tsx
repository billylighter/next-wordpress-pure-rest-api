import Link from 'next/link';
import {CiShop} from "react-icons/ci";

type CallToActionProps = {
    title?: string;
    description?: string;
    buttonText?: string;
};

export default function CallToAction({
                                         title = 'Discover Our Products',
                                         description = 'Browse our curated selection and find exactly what you need for your next project.',
                                         buttonText = 'Go to Shop',
                                     }: CallToActionProps) {
    return (
        <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white
                            py-20 min-h-[480px] md:min-h-[520px] flex items-center">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">{description}</p>
                <Link
                    href="/shop"
                    className="inline-flex items-center bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300"
                >
                    <CiShop size={24} className={"me-1"}/> {buttonText}
                </Link>
            </div>
        </section>
    );
}
