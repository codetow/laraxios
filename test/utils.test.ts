import { convertToFormData, formatURL, requestFormatter } from '../src/utils'

describe('Utils Suite', function () {
  test('format url', () => {
    const fu = formatURL
    expect(fu({
      baseURL: 'https://sub.example.com/',
      url: undefined
    }))
      .toStrictEqual('https://sub.example.com/')
    expect(fu({
      baseURL: 'https://sub.example.com/',
      url: 'foo/bar'
    }))
      .toStrictEqual('https://sub.example.com/')
    expect(fu({
      baseURL: 'https://sub.example.com/api/v1',
      url: '/foo/bar'
    }))
      .toStrictEqual('https://sub.example.com')
    expect(fu({
      baseURL: 'https://localhost:8000/api/v1',
      url: '/foo/bar'
    }))
      .toStrictEqual('https://localhost:8000')
    expect(fu({
      baseURL: ' https://localhost:8000/api/v1 ',
      url: '/foo/bar'
    }))
      .toStrictEqual('https://localhost:8000')
  })
  test('convert regular data to FormData', () => {
    const fd = convertToFormData({
      foo: 1,
      bar: [1, 2, true],
      baz: false,
      qux: new Blob(['SomeBlobData'])
    })

    expect(fd.get('foo'))
      .toStrictEqual('1')
    expect(fd.get('bar[0]'))
      .toStrictEqual('1')
    expect(fd.get('bar[1]'))
      .toStrictEqual('2')
    expect(fd.get('bar[2]'))
      .toStrictEqual('1')
    expect(fd.get('baz'))
      .toStrictEqual('0')
    expect(fd.get('qux'))
      .toBeInstanceOf(Blob)
  })

  test('prepare request options', () => {
    let o = requestFormatter

    expect(o({
      url: 'test',
      headers: {
        'Authorization': 'Bearer 1'
      }
    })).toStrictEqual({
      method: 'get',
      url: 'test',
      params: {},
      data: {},
      headers: {
        'Authorization': 'Bearer 1'
      }
    })
    // DELETE
    expect(o({
      url: 'test',
      data: {},
      method: 'delete',
      params: {
        foo: true
      }
    })).toStrictEqual({
      method: 'delete',
      url: 'test',
      params: {
        foo: true
      },
      data: {}
    })
    // PUT/PATCH
    const ro = o({
      url: 'test',
      data: {
        bar: 2
      },
      method: 'put'
    })
    expect(ro.url).toStrictEqual('test')
    expect(ro.method).toStrictEqual('post')
    expect(ro.data).toBeInstanceOf(FormData)
    if (ro.data instanceof FormData) {
      expect(ro.data.get('_method')).toStrictEqual('put')
      expect(ro.data.get('bar')).toStrictEqual('2')
    }
  })
})
