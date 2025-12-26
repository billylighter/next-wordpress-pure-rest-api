"use client";

import clsx from "clsx";
import ProductTag from "@/types/ProductTag";

interface Props {
    tags: ProductTag[];
    selectedIds?: number[]; // optional
    onChange: (ids: number[]) => void;
}

export default function SidebarTagFilter({
                                             tags,
                                             selectedIds = [], // DEFAULT VALUE (important)
                                             onChange,
                                         }: Props) {

    const toggle = (id: number) => {
        if (selectedIds.includes(id)) {
            onChange(selectedIds.filter((x) => x !== id));
        } else {
            onChange([...selectedIds, id]);
        }
    };

    return (
        <div>
            <h3 className="mb-4 text-lg font-semibold">Tags</h3>

            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                    const active = selectedIds.includes(tag.id);

                    return (
                        <button
                            key={tag.id}
                            type="button"
                            onClick={() => toggle(tag.id)}
                            className={clsx(
                                "px-3 py-1 rounded-full border text-sm transition cursor-pointer",
                                active
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                            )}
                        >
                            {tag.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
