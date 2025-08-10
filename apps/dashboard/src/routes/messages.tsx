import { createFileRoute } from '@tanstack/react-router'
import * as React from "react"
export const Route = createFileRoute('/messages')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/messages"!</div>
}
