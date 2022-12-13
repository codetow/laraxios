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

  test('sends a put request', async () => {
    const options = {
      url: 'user',
      method: 'put',
    }

    await request(mockedAxiosInstance, options)
    const data = new FormData()
    data.append('_method', 'put')
    expect(mockedAxiosInstance.request)
      .toBeCalledWith({
        method: 'post',
        url: 'user',
        data,
        params: {},
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
    const error: AxiosError = {
      config: {},
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
      message: '',
    }
    mockedAxiosInstance.request.mockRejectedValueOnce(error)

    const errorResponse = await request(mockedAxiosInstance, options)

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
      await request(mockedAxiosInstance, options)
    } catch (e) {
      expect(mockedErrorHandler)
        .not
        .toBeCalled()
      expect(e)
        .toEqual(error)
    }
  })
})
