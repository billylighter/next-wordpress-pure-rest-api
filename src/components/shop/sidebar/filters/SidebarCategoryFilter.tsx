"use client";

import {JSX, useCallback} from "react";
import CategoryTree from "@/types/CategoryTree";

interface Props {
    categories: CategoryTree[];
    selectedIds: number[];
    onChange: (ids: number[]) => void;
}

export default function SidebarCategoryFilter(
    {
        categories,
        selectedIds,
        onChange,
    }: Props) {
    const toggle = useCallback(
        (id: number) => {
            onChange(
                selectedIds.includes(id)
                    ? selectedIds.filter((x) => x !== id)
                    : [...selectedIds, id]
            );
        },
        [selectedIds, onChange]
    );

    function renderTree(nodes: CategoryTree[], level = 0): JSX.Element {
        return (
            <ul className="space-y-2">
                {nodes.map((node) => (
                    <li
                        key={node.id}
                        className={"pl-2"}
                    >
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(node.id)}
                                onChange={() => toggle(node.id)}
                                className="accent-black"
                            />
                            <span className="text-sm">{node.name}</span>
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
    }

    return (
        <nav aria-label="Product categories">
            <h3 className="mb-4 text-lg font-semibold">Categories</h3>
            {renderTree(categories)}
        </nav>
    );
}