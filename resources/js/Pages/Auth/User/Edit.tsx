import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { FormEventHandler, useEffect } from "react";
import SuccessToast from "@/Components/Toast/SuccessToast";

export default function Edit({ auth, user }: PageProps<{ user: User }>) {
    const {
        data,
        setData,
        put,
        errors,
        processing,
        recentlySuccessful,
        reset,
    } = useForm({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        reset("password", "password_confirmation");
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("users.update", user.id), {
            onSuccess: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Edit User
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
                                Edit User Account
                            </h2>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Update user information
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
                                User Account Updated Successfully.
                            </SuccessToast>
                        </Transition>

                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                    autoComplete="username"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="mobile" value="Mobile" />

                                <TextInput
                                    id="mobile"
                                    className="mt-1 block w-full"
                                    value={data.mobile}
                                    onChange={(e) =>
                                        setData("mobile", e.target.value)
                                    }
                                    required
                                    autoComplete="mobile"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.mobile}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="New Password"
                                />

                                <TextInput
                                    id="password"
                                    className="mt-1 block w-full"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    autoComplete="password"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.password}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />

                                <TextInput
                                    id="password_confirmation"
                                    className="mt-1 block w-full"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    autoComplete="password_confirmation"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.password_confirmation}
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
