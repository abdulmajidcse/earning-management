export default function moneyFormat(
    amount: number | null,
    currency: string = "USD"
) {
    return (amount ?? 0).toLocaleString("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}
