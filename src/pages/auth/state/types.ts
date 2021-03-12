export type Role = {
  id: number
  name: string
  description: string
}

export type UserResponse = {
  id: number
  firstname: string
  lastname: string
  username: string
  role: Role
  memberGroupId?: number
}

export type LoginUserPayload = {
  data: {
    identifier: string
    password: string
  }
  onSuccess?: () => void
  onError?: (error: string) => void
}

export type RegisterUserApiData = {
  name: string
  username: string
  email: string
  password: string
}

export type RegisterUserPayload = {
  data: RegisterUserApiData
  onSuccess?: () => void
  onError?: (error: string) => void
}
