import React from "react";
import {FaFire} from "react-icons/fa6";
import {FaFireAlt} from "react-icons/fa";

interface OnSaleBadgeProps {
    text?: string;
}

export default function OnSaleBadge({ text }: OnSaleBadgeProps) {
    const textBadge = (text) ? text : 'On sale';
    return (
        <div className="absolute top-3 left-3 z-1">
            <div className="inline-flex items-center leading-normal gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
                <FaFireAlt /><span className={"mt-0.5"}>{textBadge}</span>
            </div>
        </div>
    );
}
