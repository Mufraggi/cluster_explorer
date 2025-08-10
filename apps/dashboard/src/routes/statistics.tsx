import { createFileRoute } from '@tanstack/react-router'
import * as React from "react"

export const Route = createFileRoute('/statistics')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/statistics"!</div>
}
