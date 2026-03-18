import { api } from "../../../shared/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button";

type Membership = {
  membershipId: string;
  firstName: string;
  lastName: string;
  type: "ADULT" | "CHILD" | "STUDENT" | "FAMILY";
  duration: "TRIAL" | "MONTHLY" | "YEARLY";
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
};

const AdminMemberships = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);


  const token = localStorage.getItem("accessToken");

  const searchMemberships = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      setSearched(true);
      const normalizedName = lastName.trim();

      const response = await api.get(
        "/api/admin/memberships",
        {
          params: { lastName: normalizedName },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMemberships(response.data);
    } catch {
      setError("Failed to load memberships");
    } finally {
      setLoading(false);
    }
  };

  const approveMembership = async (membershipId: string) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setActionLoadingId(membershipId)

      const response = await api.post(
        `/api/admin/memberships/${membershipId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMemberships(prev =>
        prev.map(m =>
          m.membershipId === membershipId ? response.data : m
        )
      );
    } catch {
      alert("Failed to approve memberships");
    } finally {
      setActionLoadingId(null);
    }
  };
  const rejectMembership = async (membershipId: string) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setActionLoadingId(membershipId)

      const response = await api.post(
        `/api/admin/memberships/${membershipId}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMemberships(prev =>
        prev.map(m =>
          m.membershipId === membershipId ? response.data : m
        )
      );
    } catch {
      alert("Failed to reject memberships");
    } finally {
      setActionLoadingId(null);
    }
  };
  const searchActiveMemberships = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      setSearched(true);

      const response = await api.get(
        "/api/admin/memberships/active",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMemberships(response.data);
    } catch {
      setError("Failed to load memberships");
    } finally {
      setLoading(false);
    }
  };
  const searchPendingMemberships = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      setSearched(true);

      const response = await api.get(
        "/api/admin/memberships/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMemberships(response.data);
    } catch {
      setError("Failed to load memberships");
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <p className="text-2xl font-semibold text-center mb-6">
        Loading memberships ...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-600 text-center">
        {error}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-24">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Admin Memberships
        </h2>

        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Search by last name"
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <Button
              name="Search"
              type="button"
              variant="primary"
              onClick={searchMemberships}
              disabled={!lastName}
            />
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              name="Show active memberships"
              type="button"
              variant="primary"
              onClick={searchActiveMemberships}
              disabled={loading}
            />

            <Button
              name="Show pending memberships"
              type="button"
              variant="primary"
              onClick={searchPendingMemberships}
              disabled={loading}
            />
          </div>
        </div>

        {searched && memberships.length === 0 && (
          <p className="text-center text-gray-500">
            No memberships found.
          </p>
        )}

        {memberships.map((m) => (
          <div
            key={m.membershipId}
            className="border border-gray-200 rounded-lg p-6 mb-4 bg-gray-50 hover:bg-gray-100 transition"
          >
            <div className="flex justify-between items-start">

              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {m.firstName} {m.lastName}
                </h3>

                <p className="text-sm text-gray-600">
                  {m.type} • {m.duration}
                </p>
              </div>

              <span
                className={`
          px-3 py-1 text-xs font-medium rounded-full
          ${m.status === "PENDING" && "bg-yellow-100 text-yellow-800"}
          ${m.status === "APPROVED" && "bg-green-100 text-green-800"}
          ${m.status === "REJECTED" && "bg-red-100 text-red-800"}
          ${m.status === "CANCELLED" && "bg-gray-200 text-gray-700"}
        `}
              >
                {m.status}
              </span>

            </div>

            {m.status === "PENDING" && (
              <div className="flex gap-3 mt-4 justify-end">
                <Button
                  name="Approve"
                  type="button"
                  variant="primary"
                  loading={actionLoadingId === m.membershipId}
                  disabled={actionLoadingId !== null}
                  onClick={() => approveMembership(m.membershipId)}
                />

                <Button
                  name="Reject"
                  type="button"
                  variant="secondary"
                  danger
                  loading={actionLoadingId === m.membershipId}
                  disabled={actionLoadingId !== null}
                  onClick={() => rejectMembership(m.membershipId)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div >
  );
};


export default AdminMemberships;