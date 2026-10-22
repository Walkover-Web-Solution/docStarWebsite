import { NextRequest } from "next/server";
import { requireAdmin } from "@/server/auth";
import { handle, json } from "@/server/http";

export const dynamic = "force-dynamic";

export const GET = handle(async (request: NextRequest) => json(await requireAdmin(request)));
