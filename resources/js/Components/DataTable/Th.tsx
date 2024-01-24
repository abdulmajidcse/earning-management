import { TableHTMLAttributes } from "react";

export default function Th({
    className = "",
    children,
    ...props
}: TableHTMLAttributes<HTMLTableCellElement>) {
    return (
        <th
            {...props}
            scope="col"
            className={`px-6 py-3 text-left text-xs font-medium whitespace-nowrap text-gray-500 uppercase tracking-wider dark:bg-gray-800 dark:text-gray-400 ${className}`}
        >
            {children}
        </th>
    );
}
