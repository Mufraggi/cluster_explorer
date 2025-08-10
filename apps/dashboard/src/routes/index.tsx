import * as React from "react"
import {MessagesTable} from "../components/messages-table.js";

import { createFileRoute } from "@tanstack/react-router"
import {StatsCards} from "../components/ui/stats-cards.js";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Messages</h1>
      </div>

      <StatsCards />
      <MessagesTable />
  </div>
}
