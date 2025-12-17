"use client";

import React from "react";
import CategoryTree from "@/types/CategoryTree";

interface CategoryFilterProps {
    categories: CategoryTree[];
    selectedIds: number[];
    onChange: (ids: number[]) => void;
}

// Tailwind-safe indentation per depth
const INDENT_BY_LEVEL = [
    "pl-0",   // level 0 (parent)
    "pl-4",   // level 1
    "pl-8",   // level 2
    "pl-12",  // level 3
];

export default function CategoryFilter({
                                           categories,
                                           selectedIds,
                                           onChange,
                                       }: CategoryFilterProps) {

    const toggle = (id: number) => {
        onChange(
            selectedIds.includes(id)
                ? selectedIds.filter((x) => x !== id)
                : [...selectedIds, id]
        );
    };

    const   renderTree = (nodes: CategoryTree[], level = 0) => (
        <ul className="space-y-2">
            {nodes.map((node) => (
                <li key={node.id}
                    className={"pl-2"}>
                    <label className="flex items-center justify-start gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(node.id)}
                            onChange={() => toggle(node.id)}
                            className="accent-black inline"
                        />
                        <span>{node.name}</span>
                    </label>

                    {node.children.length > 0 && (
                        <div className="mt-2">
                            {renderTree(node.children, level + 1)}
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <nav aria-label="Product categories">
            {renderTree(categories)}
        </nav>
    );
}