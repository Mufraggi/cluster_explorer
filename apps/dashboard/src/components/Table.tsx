"use client"



import { Filter, X } from "lucide-react"
import type { Table } from "@tanstack/react-table"
import * as React from "react"
import {Label} from "./ui/label.js";
import {Input} from "./ui/input.js";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover.js";
import {Button} from "./ui/button.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select.js";

interface TableFiltersProps {
    table: Table<ClusterMessage>
}

export interface ClusterMessage {
    id: number
    rowid: number
    message_id: string
    shard_id: string
    entity_type: string
    entity_id: string
    kind: number
    tag?: string | undefined
    payload?: string | undefined
    headers?: string | undefined
    trace_id?: string | undefined
    span_id?: string | undefined
    sampled: boolean
    processed: boolean
    request_id?: number | undefined
    reply_id?: number | undefined
    last_reply_id?: number | undefined
    last_read: Date
    deliver_at?: number | undefined
}

export function TableFilters({ table }: TableFiltersProps) {
    const clearFilters = () => {
        table.resetColumnFilters()
    }

    const hasActiveFilters = table.getState().columnFilters.length > 0

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="relative bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {hasActiveFilters && <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium">Filters</h4>
                        {hasActiveFilters && (
                            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2">
                                <X className="h-4 w-4 mr-1" />
                                Clear
                            </Button>
                        )}
                    </div>

                    <div className="space-y-3">
                        <div>
                            <Label htmlFor="shard-filter" className="text-sm font-medium">
                                Shard ID
                            </Label>
                            <Select
                                onValueChange={(value) => table.getColumn("shard_id")?.setFilterValue(value === "all" ? "" : value)}
                            >
                                <SelectTrigger id="shard-filter">
                                    <SelectValue placeholder="All shards" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All shards</SelectItem>
                                    <SelectItem value="shard-1">shard-1</SelectItem>
                                    <SelectItem value="shard-2">shard-2</SelectItem>
                                    <SelectItem value="shard-3">shard-3</SelectItem>
                                    <SelectItem value="shard-4">shard-4</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="entity-filter" className="text-sm font-medium">
                                Entity Type
                            </Label>
                            <Select
                                onValueChange={(value) => table.getColumn("entity_type")?.setFilterValue(value === "all" ? "" : value)}
                            >
                                <SelectTrigger id="entity-filter">
                                    <SelectValue placeholder="All types" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All types</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="order">Order</SelectItem>
                                    <SelectItem value="payment">Payment</SelectItem>
                                    <SelectItem value="notification">Notification</SelectItem>
                                    <SelectItem value="workflow">Workflow</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="status-filter" className="text-sm font-medium">
                                Status
                            </Label>
                            <Select
                                onValueChange={(value) => {
                                    if (value === "all") {
                                        table.getColumn("processed")?.setFilterValue("")
                                    } else {
                                        table.getColumn("processed")?.setFilterValue(value === "processed")
                                    }
                                }}
                            >
                                <SelectTrigger id="status-filter">
                                    <SelectValue placeholder="All statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All statuses</SelectItem>
                                    <SelectItem value="processed">Processed</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="trace-filter" className="text-sm font-medium">
                                Trace ID
                            </Label>
                            <Input
                                id="trace-filter"
                                placeholder="Enter trace ID..."
                                onChange={(e) => table.getColumn("trace_id")?.setFilterValue(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
