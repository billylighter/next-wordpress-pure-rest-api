'use client';

type PriceValue = {
    min: number | null;
    max: number | null;
};

type Props = {
    min: number;
    max: number;
    value: PriceValue;
    onChange: (value: PriceValue) => void;
};

export default function SidebarPriceFilter({
                                               min,
                                               max,
                                               value,
                                               onChange,
                                           }: Props) {
    return (
        <div className="space-y-2">
            <h3 className="font-semibold">Price</h3>

            <div className="flex gap-2">
                <input
                    type="number"
                    min={min}
                    placeholder="Min"
                    className="w-full border rounded px-2 py-1"
                    value={value.min ?? ""}
                    onChange={(e) =>
                        onChange({
                            ...value,
                            min: e.target.value ? Number(e.target.value) : null,
                        })
                    }
                />

                <input
                    type="number"
                    max={max}
                    placeholder="Max"
                    className="w-full border rounded px-2 py-1"
                    value={value.max ?? ""}
                    onChange={(e) =>
                        onChange({
                            ...value,
                            max: e.target.value ? Number(e.target.value) : null,
                        })
                    }
                />
            </div>
        </div>
    );
}
