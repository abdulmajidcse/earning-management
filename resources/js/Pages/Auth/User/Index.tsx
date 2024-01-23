import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps, User, PaginatedData } from "@/types";

export default function Index({
    auth,
    users,
}: PageProps<{ users: PaginatedData<User> }>) {
    const { data: userList, from: dataFrom } = users;
    let sl: number = dataFrom;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    User List
                </h2>
            }
        >
            <Head title="User List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="shadow overflow-x-auto border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-none">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium whitespace-nowrap text-gray-500 uppercase tracking-wider dark:bg-gray-800 dark:text-gray-400"
                                    >
                                        SL
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium whitespace-nowrap text-gray-500 uppercase tracking-wider dark:bg-gray-800 dark:text-gray-400"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium whitespace-nowrap text-gray-500 uppercase tracking-wider dark:bg-gray-800 dark:text-gray-400"
                                    >
                                        Mobile
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium whitespace-nowrap text-gray-500 uppercase tracking-wider dark:bg-gray-800 dark:text-gray-400"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium whitespace-nowrap text-gray-500 uppercase tracking-wider dark:bg-gray-800 dark:text-gray-400"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-none">
                                {userList.length > 0 ? (
                                    userList.map(
                                        ({ id, name, email, mobile }) => (
                                            <tr className="bg-white dark:bg-gray-700 dark:text-white text-left">
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4  text-sm font-medium dark:text-white"
                                                >
                                                    {sl++}
                                                </th>

                                                <th className="px-6 py-4 text-sm font-medium dark:text-white">
                                                    {name}
                                                </th>

                                                <th className="px-6 py-4 text-sm font-medium dark:text-white">
                                                    {mobile}
                                                </th>

                                                <th className="px-6 py-4 text-sm font-medium dark:text-white">
                                                    {email}
                                                </th>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white">
                                                    <div className="space-x-2">
                                                        <a
                                                            href={route(
                                                                "users.show",
                                                                id
                                                            )}
                                                            className="underline text-blue-500 hover:no-underline"
                                                        >
                                                            View
                                                        </a>
                                                        <a
                                                            href={route(
                                                                "users.edit",
                                                                id
                                                            )}
                                                            className="underline text-blue-500 hover:no-underline"
                                                        >
                                                            Edit
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                ) : (
                                    <tr className="bg-white dark:bg-gray-700 dark:text-white">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white"
                                            colSpan={100}
                                        >
                                            <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                                                No data found. Try to broaden
                                                your search.
                                            </span>
                                        </th>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
