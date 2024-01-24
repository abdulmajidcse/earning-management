import { TableHTMLAttributes } from "react";

export default function Td({
    className = "",
    children,
    ...props
}: TableHTMLAttributes<HTMLTableCellElement>) {
    return (
        <td
            {...props}
            scope="row"
            className={`px-6 py-4 text-sm font-medium dark:text-white ${className}`}
        >
            {children}
        </td>
    );
}
