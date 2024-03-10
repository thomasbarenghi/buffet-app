export interface Response<T> {
  data: T | null
  error: {
    message: string
    code: number
  } | null
}

export interface GetRequestParams {
  url: string
  cache?: 'default' | 'no-store' | 'reload' | 'force-cache' | 'only-if-cached'
  tags?: string[]
  validate?: number
}

export type HttpMethod = 'post' | 'put' | 'delete'
