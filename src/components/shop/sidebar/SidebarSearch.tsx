interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function SidebarSearch({
                                          value,
                                          onChange,
                                      }: Props) {
    return (
        <div className="flex gap-2">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-3 py-2 border rounded-md"
            />
        </div>
    );
}
