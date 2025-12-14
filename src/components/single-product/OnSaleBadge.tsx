import React from "react";

interface OnSaleBadgeProps {
    text?: string;
}

export default function OnSaleBadge({ text }: OnSaleBadgeProps) {
    const textBadge = (text) ? text : 'On sale';
    return (
        <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
                {textBadge}
            </span>
        </div>
    );
}
