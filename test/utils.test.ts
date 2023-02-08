import { payloadAdapter, formatURL, requestFormatter } from '../src/utils'

describe('Utils Suite', function () {
  test('formatting url', () => {
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
      baseURL: 'https://sub.example.com/api/v1',
      url: 'foo/bar'
    }))
      .toStrictEqual('https://sub.example.com/api/v1')

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
  test('formatting data', () => {
    const fd = payloadAdapter({
      foo: 1,
      bar: [1, 2, true, false],
      baz: false,
      qux: new Blob(['SomeBlobData'])
    })

    expect(fd.foo)
      .toStrictEqual(1)
    expect(fd.bar)
      .toStrictEqual([1, 2, '1', '0'])
    expect(fd.baz)
      .toStrictEqual('0')
    expect(fd.qux)
      .toBeInstanceOf(Blob)
  })

  test('prepare request options', () => {
    const o = requestFormatter

    expect(o({
      url: 'test',
      headers: {
        Authorization: 'Bearer 1'
      }
    })).toStrictEqual({
      method: 'get',
      url: 'test',
      params: {},
      data: {},
      headers: {
        Authorization: 'Bearer 1'
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
      data: {
        _method: 'delete'
      }
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
  })
})
