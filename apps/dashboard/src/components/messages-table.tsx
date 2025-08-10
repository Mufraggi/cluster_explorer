import { useState, useMemo } from "react"
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    type ColumnDef,
    type SortingState,
    type ColumnFiltersState,
    type VisibilityState,
} from "@tanstack/react-table"





import { format } from "date-fns"
import { ChevronDown, Eye, Download, ArrowUpDown, Check, X } from "lucide-react"

import * as React from "react"
import {Button} from "./ui/button.js";
import {Badge} from "./ui/badge.js";
import {Input} from "./ui/input.js";
import {Checkbox} from "./ui/checkbox.js";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./ui/table.js";
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger} from "./ui/dropdown-menu.js";
import {ClusterMessage, TableFilters} from "./Table.js";
import {generateMockData} from "../mock-data.js";

export function MessagesTable() {
    const messages = generateMockData()
    //const { messages, setSelectedMessage, updateMessage } = useClusterStore()
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [globalFilter, setGlobalFilter] = useState("")

    const columns: ColumnDef<ClusterMessage>[] = useMemo(
        () => [
            {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected()}
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "message_id",
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Message ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => <div className="font-mono text-sm truncate max-w-[200px]">{row.getValue("message_id")}</div>,
            },
            {
                accessorKey: "shard_id",
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Shard ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => <Badge variant="outline">{row.getValue("shard_id")}</Badge>,
            },
            {
                accessorKey: "entity_type",
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Entity Type
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => <Badge variant="secondary">{row.getValue("entity_type")}</Badge>,
            },
            {
                accessorKey: "entity_id",
                header: "Entity ID",
                cell: ({ row }) => <div className="font-mono text-sm truncate max-w-[150px]">{row.getValue("entity_id")}</div>,
            },
            {
                accessorKey: "processed",
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => {
                    const processed = row.getValue("processed") as boolean
                    return (
                        <Badge
                            variant={processed ? "default" : "destructive"}
                            className={processed ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : ""}
                        >
                            {processed ? (
                                <>
                                    <Check className="w-3 h-3 mr-1" />
                                    Processed
                                </>
                            ) : (
                                <>
                                    <X className="w-3 h-3 mr-1" />
                                    Pending
                                </>
                            )}
                        </Badge>
                    )
                },
            },
            {
                accessorKey: "last_read",
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Last Read
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => {
                    const date = row.getValue("last_read") as Date
                    return <div className="text-sm">{format(date, "MMM dd, HH:mm:ss")}</div>
                },
            },
            {
                accessorKey: "trace_id",
                header: "Trace ID",
                cell: ({ row }) => {
                    const traceId = row.getValue("trace_id") as string
                    return traceId ? (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100">
                            {traceId.slice(0, 8)}...
                        </Badge>
                    ) : (
                        <span className="text-muted-foreground">-</span>
                    )
                },
            },
            {
                id: "actions",
                enableHiding: false,
                cell: ({ row }) => {
                    const message = row.original
                    return (
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => console.log(message)}>
                                <Eye className="h-4 w-4" />
                            </Button>
                        </div>
                    )
                },
            },
        ],
        [],
    )

    const table = useReactTable({
        data: messages,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: "includesString",
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
    })

    const selectedRows = table.getFilteredSelectedRowModel().rows
    //const selectedMessages = selectedRows.map((row) => row.original)

   /* const handleBulkAction = (action: "process" | "delete") => {
        selectedMessages.forEach((message) => {
            if (action === "process") {
                updateMessage(message.id, { processed: true })
            }
        })
        setRowSelection({})
    }*/

    const exportToCSV = () => {
        const filteredData = table.getFilteredRowModel().rows.map((row) => row.original)
        const csv = [
            Object.keys(filteredData[0] || {}).join(","),
            ...filteredData.map((row) => Object.values(row).join(",")),
        ].join("\n")

        const blob = new Blob([csv], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `cluster-messages-${format(new Date(), "yyyy-MM-dd")}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Input
                        placeholder="Search messages..."
                        value={globalFilter ?? ""}
                        onChange={(event) => setGlobalFilter(String(event.target.value))}
                        className="max-w-sm"
                    />
                    <TableFilters table={table} />
                </div>

                <div className="flex items-center space-x-2">
                    {selectedRows.length > 0 && (
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">{selectedRows.length} selected</span>
                            <Button size="sm" onClick={() => console.log("process")}>
                                Mark as Processed
                            </Button>
                        </div>
                    )}

                    <Button variant="outline" size="sm" onClick={exportToCSV}>
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-muted/50">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                    selected.
                </div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value))
                            }}
                            className="h-8 w-[70px] rounded border border-input bg-background px-3 py-1 text-sm"
                        >
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex bg-transparent"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to first page</span>
                            {"<<"}
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0 bg-transparent"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            {"<"}
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0 bg-transparent"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            {">"}
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex bg-transparent"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to last page</span>
                            {">>"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
