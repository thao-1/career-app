import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import { getUserById } from "./database"

interface AuthUser {
  userId: string
  email: string
}

export async function verifyAuth(request: NextRequest): Promise<AuthUser | null> {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    // Verify user still exists
    const user = await getUserById(decoded.userId)
    if (!user) {
      return null
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
    }
  } catch (error) {
    console.error("Auth verification error:", error)
    return null
  }
}

export function generateAuthToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET || "fallback-secret", { expiresIn: "7d" })
}
