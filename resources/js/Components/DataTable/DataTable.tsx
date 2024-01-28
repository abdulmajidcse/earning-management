import { ReactNode } from "react";

export default function DataTable({
    className = "",
    thead,
    children,
}: {
    className?: string;
    thead: ReactNode;
    children: ReactNode;
}) {
    return (
        <>
            <div
                className={`shadow overflow-x-auto border-b border-gray-200 dark:border-gray-700 sm:rounded-lg ${className}`}
            >
                <table className="min-w-full divide-y divide-gray-200 dark:divide-none">
                    <thead className="bg-gray-50">{thead}</thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-none">
                        {children}
                    </tbody>
                </table>
            </div>
        </>
    );
}
