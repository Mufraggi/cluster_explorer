import {ClusterMessage} from "./components/Table.js";


const SHARD_IDS = ["shard-1", "shard-2", "shard-3", "shard-4"]
const ENTITY_TYPES = ["user", "order", "payment", "notification", "workflow"]
const TAGS = ["create", "update", "delete", "process", "validate", "notify"]

const generateTraceId = () => Math.random().toString(16).substring(2, 34)
const generateSpanId = () => Math.random().toString(16).substring(2, 18)
const generateMessageId = () => `msg_${Math.random().toString(36).substring(2, 15)}`
const generateEntityId = () => `entity_${Math.random().toString(36).substring(2, 10)}`

const samplePayloads = {
    user: {
        userId: "user_123",
        email: "user@example.com",
        action: "profile_update",
        data: { name: "John Doe", age: 30 },
    },
    order: {
        orderId: "order_456",
        customerId: "customer_789",
        items: [{ id: "item_1", quantity: 2, price: 29.99 }],
        total: 59.98,
    },
    payment: {
        paymentId: "pay_789",
        orderId: "order_456",
        amount: 59.98,
        method: "credit_card",
        status: "completed",
    },
    notification: {
        notificationId: "notif_123",
        userId: "user_123",
        type: "email",
        template: "order_confirmation",
        sent: true,
    },
    workflow: {
        workflowId: "wf_456",
        name: "order_processing",
        step: "payment_validation",
        status: "in_progress",
    },
}

const sampleHeaders = {
    "content-type": "application/json",
    "x-request-id": "req_123456",
    "x-correlation-id": "corr_789012",
    "user-agent": "effect-cluster/1.0.0",
}

export function generateMockData(): ClusterMessage[] {
    const messages: ClusterMessage[] = []
    const traceGroups: string[] = []

    for (let i = 0; i < 10; i++) {
        traceGroups.push(generateTraceId())
    }

    for (let i = 1; i <= 75; i++) {
        const entityType = ENTITY_TYPES[Math.floor(Math.random() * ENTITY_TYPES.length)]
        const shardId = SHARD_IDS[Math.floor(Math.random() * SHARD_IDS.length)]
        const hasTrace = Math.random() > 0.3
        const traceId = hasTrace ? traceGroups[Math.floor(Math.random() * traceGroups.length)] : undefined
        const processed = Math.random() > 0.4

        const now = new Date()
        const lastRead = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000)

        const message: ClusterMessage = {
            id: i,
            rowid: i,
            message_id: generateMessageId(),
            shard_id: shardId,
            entity_type: entityType,
            entity_id: generateEntityId(),
            kind: Math.floor(Math.random() * 10) + 1,
            tag: Math.random() > 0.3 ? TAGS[Math.floor(Math.random() * TAGS.length)] : undefined,
            payload: JSON.stringify(samplePayloads[entityType as keyof typeof samplePayloads]),
            headers: JSON.stringify(sampleHeaders),
            trace_id: traceId,
            span_id: hasTrace ? generateSpanId() : undefined,
            sampled: Math.random() > 0.5,
            processed,
            request_id: Math.random() > 0.7 ? Math.floor(Math.random() * 1000) + 1000 : undefined,
            reply_id: Math.random() > 0.8 ? Math.floor(Math.random() * 1000) + 2000 : undefined,
            last_reply_id: Math.random() > 0.9 ? Math.floor(Math.random() * 1000) + 3000 : undefined,
            last_read: lastRead,
            deliver_at: Math.random() > 0.8 ? Date.now() + Math.random() * 3600000 : undefined,
        }

        messages.push(message)
    }

    return messages.sort((a, b) => b.last_read.getTime() - a.last_read.getTime())
}
