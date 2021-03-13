export type UserResponse = {
  id: string
  username: string
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
  username: string
  email: string
  password: string
}

export type RegisterUserPayload = {
  data: RegisterUserApiData
  onSuccess?: () => void
  onError?: (error: string) => void
}
