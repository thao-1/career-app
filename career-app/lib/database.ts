interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  jobTitle?: string
  createdAt: Date
}

interface Application {
  id: string
  userId: string
  jobId: string
  jobTitle: string
  company: string
  location?: string
  source?: string
  url?: string
  coverLetter?: string
  resumeUsed?: string
  status: "pending" | "applied" | "interview" | "rejected" | "offer"
  appliedAt: Date
}

// Mock in-memory storage (use a real database in production)
const users: User[] = []
const applications: Application[] = []

export async function createUser(userData: Omit<User, "id" | "createdAt">): Promise<User> {
  const user: User = {
    id: Math.random().toString(36).substr(2, 9),
    ...userData,
    createdAt: new Date(),
  }
  users.push(user)
  return user
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return users.find((user) => user.email === email) || null
}

export async function getUserById(id: string): Promise<User | null> {
  return users.find((user) => user.id === id) || null
}

export async function createApplication(applicationData: Omit<Application, "id">): Promise<Application> {
  const application: Application = {
    id: Math.random().toString(36).substr(2, 9),
    ...applicationData,
  }
  applications.push(application)
  return application
}

export async function getUserApplications(userId: string): Promise<Application[]> {
  return applications.filter((app) => app.userId === userId)
}

export async function updateApplicationStatus(id: string, status: Application["status"]): Promise<Application | null> {
  const application = applications.find((app) => app.id === id)
  if (application) {
    application.status = status
    return application
  }
  return null
}
