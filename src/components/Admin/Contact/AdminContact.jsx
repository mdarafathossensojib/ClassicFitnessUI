import { useEffect, useState } from "react";
import { Eye, Trash2, Pencil } from "lucide-react";
import AdminContactModal from "./AdminContactModal";
import authApiClient from "../../../services/auth_api_client";
import Loading from "../../Alert/Loading";
import ErrorAlert from "../../Alert/ErrorAlert";
import SuccessAlert from "../../Alert/SuccessAlert";

export default function AdminContact() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await authApiClient.get("/contact/");
      setContacts(res.data);
    } catch (error) {
      setErrorMsg("Failed to load contacts" + error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    setErrorMsg("");
    setSuccMsg("");

    try {
      await authApiClient.delete(`/contact/${id}/`);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setSuccMsg("Contact Message Deleted Successfully!");
    } catch {
      setErrorMsg("Delete Failed!");
    }
  };

  // Eye click
  const handleView = async (contact) => {
    setErrorMsg("");
    setSuccMsg("");

    try {
      let updatedContact = contact;

      if (!contact.is_read) {
        const res = await authApiClient.patch(
          `/contact/${contact.id}/`,
          { is_read: true }
        );
        updatedContact = res.data;

        setContacts((prev) =>
          prev.map((c) =>
            c.id === contact.id ? res.data : c
          )
        );
      }

      setModalMode("view");
      setSelectedContact(updatedContact);
    } catch {
      setErrorMsg("Failed to update status");
    }
  };

  const handleEdit = (contact) => {
    setModalMode("edit");
    setSelectedContact(contact);
  };

  if (loading) return <Loading />;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>

      {errorMsg && <ErrorAlert message={errorMsg} />}
      {succMsg && <SuccessAlert message={succMsg} />}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-800 text-zinc-400 text-sm uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
              >
                <td className="p-4 font-semibold">
                  {contact.name}
                </td>

                <td>{contact.email}</td>

                <td>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      contact.is_read
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {contact.is_read ? "Read" : "Unread"}
                  </span>
                </td>

                <td className="flex gap-3 py-4">
                  {/* View */}
                  <button
                    onClick={() => handleView(contact)}
                    className="text-blue-400 hover:text-blue-600"
                  >
                    <Eye size={18} />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => handleEdit(contact)}
                    className="text-green-400 hover:text-green-600"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* 🗑 Delete */}
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedContact && (
        <AdminContactModal contact={selectedContact} mode={modalMode} onClose={() => setSelectedContact(null)} refresh={fetchContacts} setErrorMsg={setErrorMsg} setSuccMsg={setSuccMsg}
        />
      )}
    </div>
  );
}
