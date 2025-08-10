import { createFileRoute } from '@tanstack/react-router'
import * as React from "react"

export const Route = createFileRoute('/workflows')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/workflows"!</div>
}
