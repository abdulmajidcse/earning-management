import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { FormEventHandler } from "react";
import SuccessToast from "@/Components/Toast/SuccessToast";

export default function Create({ auth }: PageProps) {
    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        reset,
    } = useForm({
        sent_from_email: "",
        amount: "",
        sent_at: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("transactions.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    New Transaction
                </h2>
            }
            headerAction={
                <Link href={route("dashboard")} className="theme-btn">
                    Your Transaction List
                </Link>
            }
        >
            <Head title="New Transaction" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <section className="max-w-xl">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                New Transaction
                            </h2>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Add new Transaction information
                            </p>
                        </header>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <SuccessToast>
                                New Transaction Created Successfully.
                            </SuccessToast>
                        </Transition>

                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel
                                    htmlFor="sent_from_email"
                                    value="Sent From Email"
                                />

                                <TextInput
                                    id="sent_from_email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.sent_from_email}
                                    onChange={(e) =>
                                        setData(
                                            "sent_from_email",
                                            e.target.value
                                        )
                                    }
                                    required
                                    isFocused
                                    autoComplete="sent_from_email"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.sent_from_email}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="amount" value="Amount" />

                                <TextInput
                                    id="amount"
                                    className="mt-1 block w-full"
                                    value={data.amount}
                                    onChange={(e) =>
                                        setData("amount", e.target.value)
                                    }
                                    required
                                    autoComplete="amount"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.amount}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="sent_at"
                                    value="Sent Date"
                                />

                                <TextInput
                                    id="sent_at"
                                    type="datetime-local"
                                    className="mt-1 block w-full"
                                    value={data.sent_at}
                                    onChange={(e) =>
                                        setData("sent_at", e.target.value)
                                    }
                                    required
                                    autoComplete="sent_at"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.sent_at}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>
                                    Save
                                </PrimaryButton>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
