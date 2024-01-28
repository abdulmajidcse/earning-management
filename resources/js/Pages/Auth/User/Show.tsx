import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import InputLabel from "@/Components/InputLabel";
import moment from "moment";

export default function Show({ auth, user }: PageProps<{ user: User }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    User Details
                </h2>
            }
            headerAction={
                <Link href={route("users.index")} className="theme-btn">
                    User List
                </Link>
            }
        >
            <Head title="Edit User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <section className="max-w-xl">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                User Details
                            </h2>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                User information with transactions
                            </p>
                        </header>

                        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 mt-4">
                            <div className="border-solid border-2 border-gray-300 dark:border-gray-700 rounded-md p-1">
                                <InputLabel value="Name" />
                                <p className="mt-1">{user.name}</p>
                            </div>

                            <div className="border-solid border-2 border-gray-300 dark:border-gray-700 rounded-md p-1">
                                <InputLabel value="Email" />
                                <p className="mt-1">{user.email}</p>
                            </div>

                            <div className="border-solid border-2 border-gray-300 dark:border-gray-700 rounded-md p-1">
                                <InputLabel value="Mobile" />
                                <p className="mt-1">{user.mobile}</p>
                            </div>

                            <div className="border-solid border-2 border-gray-300 dark:border-gray-700 rounded-md p-1">
                                <InputLabel value="Account Create Date" />
                                <p className="mt-1">
                                    {moment(user.created_at).format(
                                        "YYYY-MM-DD hh:mm:ss A"
                                    )}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
