import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps, User, PaginatedData } from "@/types";
import Pagination from "@/Components/Pagination";
import { useId } from "react";
import NoDataFound from "@/Components/DataTable/NoDataFound";
import DataTable from "@/Components/DataTable/DataTable";
import Th from "@/Components/DataTable/Th";
import Td from "@/Components/DataTable/Td";
import moneyFormat from "@/helpers/moneyFormat";

export default function Index({
    auth,
    users,
}: PageProps<{ users: PaginatedData<User> }>) {
    const {
        data: userList,
        from = 0,
        current_page,
        last_page,
        links,
        next_page_url,
        prev_page_url,
        to,
        total,
    } = users;

    let sl: number = from;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    User List
                </h2>
            }
            headerAction={
                <Link href={route("users.create")} className="theme-btn">
                    New User
                </Link>
            }
        >
            <Head title="User List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <DataTable
                        thead={
                            <tr>
                                <Th>SL</Th>

                                <Th>Name</Th>

                                <Th>Mobile</Th>

                                <Th>Email</Th>

                                <Th>Current Withdraw</Th>

                                <Th>Account Status</Th>

                                <Th>Action</Th>
                            </tr>
                        }
                    >
                        {userList.length > 0 ? (
                            userList.map(
                                ({
                                    id,
                                    name,
                                    email,
                                    mobile,
                                    current_transactions_sum_amount = 0,
                                    is_active,
                                }) => (
                                    <tr
                                        key={`user-list-${useId()}`}
                                        className="bg-white dark:bg-gray-700 dark:text-white text-left"
                                    >
                                        <Td>{sl++}</Td>

                                        <Td>{name}</Td>

                                        <Td>{mobile}</Td>

                                        <Td>{email}</Td>

                                        <Td>
                                            {moneyFormat(
                                                current_transactions_sum_amount
                                            )}
                                        </Td>

                                        <Td>
                                            {is_active ? "Active" : "Banned"}
                                        </Td>

                                        <Td className="whitespace-nowrap">
                                            <div className="space-x-2">
                                                <Link
                                                    href={route(
                                                        "users.show",
                                                        id
                                                    )}
                                                    className="underline text-blue-500 hover:no-underline"
                                                >
                                                    View
                                                </Link>

                                                <Link
                                                    href={route(
                                                        "users.edit",
                                                        id
                                                    )}
                                                    className="underline text-blue-500 hover:no-underline"
                                                >
                                                    Edit
                                                </Link>

                                                <Link
                                                    href={route(
                                                        "users.changeStatus",
                                                        id
                                                    )}
                                                    method="put"
                                                    className="underline text-red-500 hover:no-underline"
                                                >
                                                    {is_active
                                                        ? "Banned"
                                                        : "Active"}
                                                </Link>
                                            </div>
                                        </Td>
                                    </tr>
                                )
                            )
                        ) : (
                            <NoDataFound />
                        )}
                    </DataTable>

                    <Pagination
                        current_page={current_page}
                        from={from}
                        last_page={last_page}
                        links={links}
                        next_page_url={next_page_url}
                        prev_page_url={prev_page_url}
                        to={to}
                        total={total}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
