import request from '../src/request'
import axios, { AxiosError, Method } from 'axios'
const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    Accept: 'application/json'
  }
})

axiosInstance.request = jest.fn()

const mockedAxiosInstance = axiosInstance as jest.Mocked<typeof axios>

const mockedErrorHandler = jest.fn()

describe('Request Test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('sends a get request', async () => {
    const options = {
      url: 'user',
      params: {
        id: 1
      }
    }

    await request(axios, mockedAxiosInstance, options)
    expect(mockedAxiosInstance.request)
      .toBeCalledWith({
        method: 'get',
        url: 'user',
        data: {},
        params: {
          id: 1
        }
      })
  })

  test('sends a post request', async () => {
    const options = {
      url: 'user',
      method: 'post'
    }

    await request(axios, mockedAxiosInstance, options)
    expect(mockedAxiosInstance.request)
      .toBeCalledWith({
        method: 'post',
        url: 'user',
        data: {},
        params: {}
      })
  })

  test('sends a put request', async () => {
    const options = {
      url: 'user',
      method: 'put'
    }

    await request(axios, mockedAxiosInstance, options)
    expect(mockedAxiosInstance.request)
      .toBeCalledWith({
        method: 'post',
        url: 'user',
        data: {
          _method: 'put'
        },
        params: {}
      })
  })

  test('fail with error handler', async () => {
    const mockIsAxiosError = jest.spyOn(axios, 'isAxiosError')
    mockIsAxiosError.mockImplementation(() => true)

    const options = {
      url: '/login',
      method: 'get' as Method,
      errorHandler: mockedErrorHandler
    }
    const error: any = {
      isAxiosError: true,
      toJSON: () => ({}),
      response: {
        data: {},
        status: 404,
        statusText: 'not found',
        headers: {},
        config: {
          url: 'https://example.com'
        }
      },
      name: '',
      message: ''
    }
    mockedAxiosInstance.request.mockRejectedValueOnce(error)

    const errorResponse = await request(axios, mockedAxiosInstance, options)

    expect(errorResponse)
      .toEqual(error.response)
    expect(mockedErrorHandler)
      .toBeCalled()
    // .toBeCalledWith(error.response)
  })

  test('fail request without axios error', async () => {
    const mockIsAxiosError = jest.spyOn(axios, 'isAxiosError')
    mockIsAxiosError.mockImplementation(() => false)

    const options = {
      url: '/login',
      method: 'get' as Method,
      errorHandler: mockedErrorHandler
    }
    const error = new Error('Wrong inputs passed in')
    mockedAxiosInstance.request.mockRejectedValueOnce(error)

    try {
      await request(axios, mockedAxiosInstance, options)
    } catch (e) {
      expect(mockedErrorHandler)
        .not
        .toBeCalled()
      expect(e)
        .toEqual(error)
    }
  })
})
