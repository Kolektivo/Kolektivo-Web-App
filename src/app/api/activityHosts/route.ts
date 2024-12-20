import { createActivityHost } from "@/services/domain/activityHosts.service"
import { ActivityHost } from "@/types/activityHosts"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
    const activityHost = await req.json() as ActivityHost
    return createActivityHost(activityHost)
}