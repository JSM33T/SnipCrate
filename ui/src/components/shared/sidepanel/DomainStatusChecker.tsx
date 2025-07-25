"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

import apiService from "@/lib/apiService";

// --- DomainStatusChecker component ---
const DOMAINS = [
    "https://api.snipcrate.dev",
];

type StatusMap = Record<string, "up" | "down" | undefined>;

export default function DomainStatusChecker() {
    const [statuses, setStatuses] = useState<StatusMap>({});

    useEffect(() => {
        let cancelled = false;
        async function checkDomains() {
            const results: StatusMap = {};
            await Promise.all(
                DOMAINS.map(async (domain) => {
                    try {
                        // Use a CORS proxy if needed for public domains
                        const res = await apiService.get(domain, undefined);
                        results[domain] = res.status === 200 ? "up" : "down";
                    } catch {
                        results[domain] = "down";
                    }
                })
            );
            if (!cancelled) setStatuses(results);
        }
        checkDomains();
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="space-y-2">
            {DOMAINS.map((domain) => (
                <div key={domain} className="flex items-center justify-between">
                    <span className="truncate max-w-[140px]" title={domain}>{domain.replace(/^https?:\/\//, "")}</span>
                    <span
                        className={`ml-2 w-3 h-3 rounded-full inline-block ${statuses[domain] === "up" ? "bg-green-500" : statuses[domain] === "down" ? "bg-red-500" : "bg-gray-400"}`}
                        title={statuses[domain] === "up" ? "Status: 200" : statuses[domain] === "down" ? "Down" : "Checking..."}
                    />
                </div>
            ))}
        </div>
    );
}
