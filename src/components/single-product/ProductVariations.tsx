"use client";

import {useState} from "react";
import Product from "@/types/Product";
import ProductAttribute from "@/types/ProductAttribute";

type Props = {
    products: Product[];
    attributes: ProductAttribute[];
};

export default function ProductVariations({products, attributes}: Props) {

    const [selected, setSelected] = useState<Record<number, string>>(() => {
        const defaults: Record<number, string> = {};

        attributes?.forEach(attr => {
            if (attr.options?.length) {
                defaults[attr.id] = attr.options[0];
            }
        });

        return defaults;
    });

    if (!attributes?.length) return null;

    const handleChange = (attributeId: number, value: string) => {
        setSelected(prev => ({
            ...prev,
            [attributeId]: value,
        }));
    };

    const matchedProduct = products.find(product =>
        Object.entries(selected).every(([attrId, option]) =>
            product.attributes.some(
                attr =>
                    attr.id === Number(attrId) &&
                    attr.option === option
            )
        )
    );

    const matchedProductId = matchedProduct?.id ?? null;

    return (
        <div className="space-y-6">
            {attributes.map(attribute => (
                <div key={attribute.id}>
                    <div className="mb-2 text-gray-700 font-bold">
                        {attribute.name}
                    </div>

                    <ul className="flex flex-wrap gap-3">
                        {attribute.options.map(option => {
                            const inputId = `attr-${attribute.id}-${option}`;

                            return (
                                <li key={option}>
                                    <label
                                        htmlFor={inputId}
                                        className={`cursor-pointer rounded border px-3 py-1
                                            ${
                                            selected[attribute.id] === option
                                                ? "border-black bg-black text-white"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            id={inputId}
                                            name={`attribute-${attribute.id}`}
                                            value={option}
                                            checked={selected[attribute.id] === option}
                                            onChange={() =>
                                                handleChange(attribute.id, option)
                                            }
                                            className="hidden"
                                        />
                                        {option}
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}

            {/* Debug / usage example */}
            <div className="text-sm text-gray-500">
                Selected product ID: {matchedProductId ?? "—"}
            </div>
        </div>
    );
}
