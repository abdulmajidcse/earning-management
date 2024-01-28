export default function NoDataFound() {
    return (
        <tr className="bg-white dark:bg-gray-700 dark:text-white">
            <th
                scope="row"
                className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white"
                colSpan={100}
            >
                <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    No data found. Try to broaden your search.
                </span>
            </th>
        </tr>
    );
}
