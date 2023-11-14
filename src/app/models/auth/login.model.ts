export interface LoginRequestModel {
  username: string
  password: string
  extend?: boolean
}

export interface LoginResponseModel {
  token: string
  username: string
}
