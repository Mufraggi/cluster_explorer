

import { Activity, CheckCircle, Clock, AlertCircle } from "lucide-react"
import {Card, CardContent, CardHeader, CardTitle} from "./card.js";
import * as React from "react";

export function StatsCards() {


    const totalMessages = 100
    const processedMessages = 30
    const pendingMessages = 10
    const uniqueShards = 10

    const stats = [
        {
            title: "Total Messages",
            value: totalMessages,
            icon: Activity,
            color: "text-blue-600",
        },
        {
            title: "Processed",
            value: processedMessages,
            icon: CheckCircle,
            color: "text-green-600",
        },
        {
            title: "Pending",
            value: pendingMessages,
            icon: Clock,
            color: "text-orange-600",
        },
        {
            title: "Active Shards",
            value: uniqueShards,
            icon: AlertCircle,
            color: "text-purple-600",
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
