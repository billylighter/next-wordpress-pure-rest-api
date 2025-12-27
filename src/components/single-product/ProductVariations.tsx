"use client";

import { useState, useMemo } from "react";
import Product from "@/types/Product";
import ProductAttribute from "@/types/ProductAttribute";

type Props = {
    products: Product[];
    attributes: ProductAttribute[];
};

export default function ProductVariations({ products, attributes }: Props) {
    const [selected, setSelected] = useState<Record<number, string>>(() => {
        const defaults: Record<number, string> = {};
        attributes.forEach(attr => {
            if (attr.options?.length) {
                defaults[attr.id] = attr.options[0];
            }
        });
        return defaults;
    });

    if (!attributes.length) return null;

    const handleChange = (attributeId: number, value: string) => {
        setSelected(prev => ({
            ...prev,
            [attributeId]: value,
        }));
    };

    /**
     * Проверяем, доступна ли опция с учетом текущего выбора
     */
    const isOptionAvailable = (attributeId: number, option: string) => {
        return products.some(product =>
            product.attributes.every(attr => {
                // для текущего атрибута проверяем option
                if (attr.id === attributeId) {
                    return attr.option === option;
                }

                // для остальных — текущее выбранное значение
                return selected[attr.id] === attr.option;
            })
        );
    };

    /**
     * Текущая выбранная вариация
     */
    const matchedProduct = useMemo(() => {
        return products.find(product =>
            product.attributes.every(attr =>
                selected[attr.id] === attr.option
            )
        );
    }, [products, selected]);

    return (
        <div className="space-y-6">
            {attributes.map(attribute => (
                <div key={attribute.id}>
                    <div className="mb-2 font-semibold text-gray-800">
                        {attribute.name}
                    </div>

                    <ul className="flex flex-wrap gap-3">
                        {attribute.options.map(option => {
                            const available = isOptionAvailable(attribute.id, option);
                            const active = selected[attribute.id] === option;

                            return (
                                <li key={option}>
                                    <button
                                        type="button"
                                        disabled={!available}
                                        onClick={() => available && handleChange(attribute.id, option)}
                                        className={`
                                            rounded border px-3 py-1 text-sm
                                            transition
                                            ${
                                            active
                                                ? "border-black bg-black text-white"
                                                : available
                                                    ? "border-gray-300 hover:border-black"
                                                    : "border-gray-200 text-gray-400 cursor-not-allowed line-through"
                                        }
                                        `}
                                    >
                                        {option}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}

            <div className="text-sm text-gray-500">
                Selected product ID: {matchedProduct?.id ?? "—"}
            </div>
        </div>
    );
}
