import axios from "axios";
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
            const response = await axios.get(
                "http://localhost:8081/api/user/memberships",
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

            await axios.post(
                `http://localhost:8081/api/user/memberships/${membershipId}/cancel`,
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
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
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
                    className="border rounded p-4 flex justify-between items-start mb-4"
                >
                    <div className="space-y-1">
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
                                        ? "text-yellow-600"
                                        : m.status === "APPROVED"
                                            ? "text-green-600"
                                            : m.status === "REJECTED"
                                                ? "text-red-600"
                                                : "text-gray-500"
                                }
                            >
                                {m.status}
                            </span>
                        </p>

                        <p>
                            <b>Period:</b> {m.startDate} – {m.endDate}
                        </p>

                        <p>
                            <b>Active:</b> {m.active ? "Yes" : "No"}
                        </p>

                        {m.status == "APPROVED" && (
                            <Button
                                name="Cancel"
                                type="button"
                                danger
                                loading={cancelLoadingId === m.membershipId}
                                onClick={() => cancelMembership(m.membershipId)}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
export default MyMemberships;