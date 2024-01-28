import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps, Transaction, PaginatedData } from "@/types";
import Pagination from "@/Components/Pagination";
import { useId } from "react";
import NoDataFound from "@/Components/DataTable/NoDataFound";
import DataTable from "@/Components/DataTable/DataTable";
import Th from "@/Components/DataTable/Th";
import Td from "@/Components/DataTable/Td";
import moneyFormat from "@/helpers/moneyFormat";
import moment from "moment";

export default function Dashboard({
    auth,
    currentTransactions,
}: PageProps<{ currentTransactions: PaginatedData<Transaction> }>) {
    const {
        data: transactions,
        from = 0,
        current_page,
        last_page,
        links,
        next_page_url,
        prev_page_url,
        to,
        total,
    } = currentTransactions;

    let sl: number = from;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
            headerAction={
                <Link href={route("transactions.create")} className="theme-btn">
                    New Transaction
                </Link>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Transaction List
                        </h2>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Your all transactions which are active currently.
                        </p>
                    </header>
                    <DataTable
                        thead={
                            <tr>
                                <Th>SL</Th>

                                <Th>Sent From Email</Th>

                                <Th>Amount</Th>

                                <Th>Sent Date</Th>
                            </tr>
                        }
                    >
                        {transactions.length > 0 ? (
                            transactions.map(
                                ({ sent_from_email, amount, sent_at }) => (
                                    <tr
                                        key={`user-list-${useId()}`}
                                        className="bg-white dark:bg-gray-700 dark:text-white text-left"
                                    >
                                        <Td>{sl++}</Td>

                                        <Td>{sent_from_email}</Td>

                                        <Td>{moneyFormat(amount)}</Td>

                                        <Td>
                                            {moment(sent_at).format(
                                                "YYYY-MM-DD hh:mm A"
                                            )}
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
