import { useEffect, useState } from "react"
import { Receipt, Download } from "lucide-react"
import Loading from "../../Alert/Loading"
import authApiClient from "../../../services/auth_api_client"
import { Helmet } from "react-helmet"

export default function PaymentHistory() {
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchHistory = async () => {
    try {
      const response = await authApiClient.get("/payment/history/")
      setPurchases(response.data);
    } catch (err) {
      setError("Failed to load payment history." + err.response?.data);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate)
    return date.toISOString().split("T")[0]
  };

  const downloadInvoice = async (invoiceId) => {
    try {
      const response = await authApiClient.get(
        `/payments/invoice/${invoiceId}/`,
        { responseType: "blob" }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `${invoiceId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error("Invoice download failed", error)
    }
  };

  const totalSpent = purchases
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + parseFloat(p.amount), 0)

  const totalTransactions = purchases.length

  if (loading) {
    return (
      <Loading />
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-red-500">
        {error}
      </div>
    )
  }

  return (
    <>
    <Helmet>
      <title>Purchases History</title>
    </Helmet>
    <div className="p-8 bg-zinc-950 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Receipt className="w-6 h-6 text-red-500" />
          Purchase History
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          View all your transactions and download invoices.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Total Spent
          </p>
          <p className="mt-2 text-2xl font-bold text-white">
            ${totalSpent.toFixed(2)}
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Transactions
          </p>
          <p className="mt-2 text-2xl font-bold text-white">
            {totalTransactions}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
        {purchases.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">
            No payment history found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wide text-zinc-400">
                    Invoice
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wide text-zinc-400">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wide text-zinc-400">
                    Payment Method
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wide text-zinc-400">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wide text-zinc-400">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wide text-zinc-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => (
                  <tr
                    key={purchase.id}
                    className="border-b border-zinc-800 last:border-0"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-zinc-200">
                      {purchase.id}
                    </td>

                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {formatDate(purchase.paid_at)}
                    </td>

                    <td className="px-6 py-4 text-sm text-zinc-300">
                      {purchase.transaction.gateway_name}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-zinc-200">
                      ${purchase.amount}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          purchase.status === "PAID"
                            ? "bg-green-600/10 text-green-400"
                            : "bg-yellow-600/10 text-yellow-400"
                        }`}
                      >
                        {purchase.status === "PAID" ? "PAID" : "Refunded"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => downloadInvoice(purchase.id)}
                        className="text-zinc-500 hover:text-zinc-300"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </>
  )
}
