"use client";

import {useState, FormEvent} from "react";

interface SidebarSearchProps {
    placeholder?: string;
}

export default function SidebarSearch(
    {
        placeholder = "Search products...",

    }: SidebarSearchProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('submited');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-black"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
                Search
            </button>
        </form>
    );
}
