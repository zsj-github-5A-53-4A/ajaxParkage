# 使用方法看下文

```js
let axios = new Axios({
    // 设置默认的前置地址
    BASE_URL: "http://1.14.68.137:8000"
})


// post方法 url , options ,callback
axios.post('/api/v0/owner/', {
    responseType: 'json',
    params: {
        name: '小马哥',
        phone_number: 18191347562,
        home_number: '3-3-3',
        park_lot: 255,
        park_state: 1
    }
}, function (res) {
    console.log(res);
})
// post方法 url , options ,callback
axios.get("/api/v0/owner/", {
    responseType: 'json',
    params: {
        page: '3',
    }
}, function (res) {
    console.log(res);
})
```
**如果还不懂去读源码**