import { NextResponse } from "next/server"

// This would be a secure server-side API endpoint
export async function GET() {
  return NextResponse.json({
    adminPassword: process.env.ADMIN_PASSWORD || "sniffgamechangerpredictions",
    dashboardPassword: process.env.DASHBOARD_PASSWORD || "sniffgamechangerpredictions",
    whatsappNumber: process.env.WHATSAPP_NUMBER || "254753218553",
    whatsappGroup: process.env.WHATSAPP_GROUP || "https://chat.whatsapp.com/ICuHNh1Oi6PBeCq5KhiNMu",
  })
}
