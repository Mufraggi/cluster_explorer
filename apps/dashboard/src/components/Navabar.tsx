import * as React from "react"
import {useState} from "react"
import {Link, useLocation} from "@tanstack/react-router"


import {Activity, RefreshCw} from "lucide-react"
import {cn} from "./utils.js";
import {Badge} from "./ui/badge.js";
import {Button} from "./ui/button.js";

const navigation = [
    {name: "Workflows", href: "/workflows"},
    {name: "Messages", href: "/messages"},
    {name: "Statistics", href: "/statistics"},
]

// Fake data for messages
const fakeMessages = [
    {id: 1, processed: true},
    {id: 2, processed: false},
    {id: 3, processed: true},
    {id: 4, processed: false},
]

export function Navbar() {
    const location = useLocation()
    const [messages, setMessages] = useState(fakeMessages)
    const [isLoading, setIsLoading] = useState(false)

    const processedCount = messages.filter((m) => m.processed).length
    const pendingCount = messages.filter((m) => !m.processed).length

    const handleRefresh = () => {
        setIsLoading(true)
        // Simulate refresh with timeout
        setTimeout(() => {
            // Here you could update messages or simulate new data
            setMessages(fakeMessages) // Keep fake data for demo
            setIsLoading(false)
        }, 1000)
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                        <Activity className="h-6 w-6 text-blue-600"/>
                        <h1 className="text-xl font-bold">Effect.ts Cluster Monitor</h1>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex space-x-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-blue-600",
                                    location.pathname === item.href
                                        ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                                        : "text-gray-500",
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center space-x-4">
                    <Badge className="bg-green-100 text-green-800">
                        Processed: {processedCount}
                    </Badge>
                    <Badge className="bg-red-100 text-red-800">
                        Pending: {pendingCount}
                    </Badge>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={isLoading}
                        className="flex items-center space-x-2 bg-transparent"
                    >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}/>
                        <span>Refresh</span>
                    </Button>
                </div>
            </div>
        </nav>
    )
}
