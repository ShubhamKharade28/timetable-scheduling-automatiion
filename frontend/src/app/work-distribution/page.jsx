"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/app/api/constants";

const WorkloadDistributionPage = () => {
    const [workloadData, setWorkloadData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkloadData = async () => {
            try {
                const response = await fetch(`${API_URL}/workload`);
                if (!response.ok) {
                    throw new Error("Failed to fetch workload data");
                }
                const data = await response.json();
                setWorkloadData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkloadData();
    }, []);

    return (
        <main>
            <h1>Workload Distribution</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {workloadData && (
                <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                    {JSON.stringify(workloadData, null, 2)}
                </pre>
            )}
        </main>
    );
};

export default WorkloadDistributionPage;
