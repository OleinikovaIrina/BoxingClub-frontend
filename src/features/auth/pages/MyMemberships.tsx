import { api } from "../../../shared/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button";

type Membership = {
    membershipId: string;
    firstName: string;
    lastName: string;
    type: "ADULT" | "CHILD" | "STUDENT" | "FAMILY";
    duration: "TRIAL" | "MONTHLY" | "YEARLY";
    status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
    active: boolean;
    startDate: string;
    endDate: string;
};
const MyMemberships = () => {
    const [memberships, setMemberships] = useState<Membership[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cancelLoadingId, setCancelLoadingId] = useState<string | null>(null);

    const token = localStorage.getItem("accessToken");


    const fetchMemberships = async () => {
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            setError(null);
            const response = await api.get(
                "/api/user/memberships",
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

    useEffect(() => {
        fetchMemberships();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cancelMembership = async (membershipId: string) => {
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            setCancelLoadingId(membershipId);

            await api.post(
                `/api/user/memberships/${membershipId}/cancel`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            await fetchMemberships();
        } catch {
            alert("Failed to cancel membership");
        } finally {
            setCancelLoadingId(null);
        }
    };

    if (loading) {
        return <p className="text-2xl font-semibold text-center mb-6">Loading memberships ...</p>;
    }
    if (error) {
        return (
            <p className="text-sm text-red-600">
                {error}
            </p>
        );
    }
    return (
        <div className="max-w-sm mx-auto mt-8 p-4 bg-gray-200 rounded shadow">
            <h2 className="text-2xl font-semibold text-center mb-6">
                My Memberships
            </h2>

            {memberships.length === 0 && (
                <p className="text-center text-gray-500">
                    You have no memberships yet.
                </p>
            )}

            {memberships.map((m) => (
                <div
                    key={m.membershipId}
                    className="border rounded p-3 mb-3  bg-white"
                >
                    <div className="space-y-0.5">
                        <p>
                            <b>User:</b> {m.firstName} {m.lastName}
                        </p>

                        <p>
                            <b>Type:</b> {m.type}
                        </p>

                        <p>
                            <b>Duration:</b> {m.duration}
                        </p>

                        <p>
                            <b>Status:</b>{" "}
                            <span
                                className={
                                    m.status === "PENDING"
                                        ? "text-yellow-600 font-bold"
                                        : m.status === "APPROVED"
                                            ? "text-green-600 font-bold"
                                            : m.status === "REJECTED"
                                                ? "text-red-600 font-bold"
                                                : "text-gray-500 font-bold"
                                }
                            >
                                {m.status}
                            </span>
                        </p>

                        <p>
                            <b>Period:</b> {m.startDate} to {m.endDate}
                        </p>

                        <p>
                            <b>Active:</b> {m.active ? "Yes" : "No"}
                        </p>

                        {m.status === "APPROVED" && (
                            <div className="mt-2">
                                <Button
                                    name="Cancel"
                                    type="button"
                                    danger
                                    loading={cancelLoadingId === m.membershipId}
                                    onClick={() => cancelMembership(m.membershipId)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
export default MyMemberships;