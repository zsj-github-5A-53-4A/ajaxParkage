function type(type) {
    let types = Object.prototype.toString.call(type)
    return types.substring(types.indexOf(' ') + 1, types.length - 1)
}
class Axios {
    constructor(options) {
        if (type(options) != 'Object') throw Error('error');
        this.BASE_URL = options.BASE_URL;
        this.type = 'GET';
        this.responseType = 'json';
    }
    post(url, options, callback) {
        if (arguments.length == 2 && type(arguments[1] == 'Function')) callback = arguments[1];
        let responseType = this.responseType;
        let query_params = '';
        url = this.BASE_URL + url;
        if (type(arguments[1]) == "Object") {
            if ('responseType' in options) responseType = options.responseType;
            if ('params' in options) {
                let params = options.params;
                if (type(params) == 'Object') {
                    for (let i in params) query_params += i + '=' + params[i] + '&';
                    query_params = query_params.substring(0, query_params.length - 1);
                    console.log(query_params);
                } else if (type(params) == 'String') query_params = params;
                else throw Error('Wrong parameter "params" type!');
            } else throw Error('Missing "params" parameter!');
        }
        let ajax = new XMLHttpRequest();
        let _ = this;
        ajax.open('POST', url);
        ajax.setRequestHeader('content-Type', 'application/x-www-form-urlencoded');
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.status == 200 || ajax.status == 201 || ajax.status == 304) {
                    if (_.responseType == 'json') callback(JSON.parse(ajax.responseText));
                    else callback(ajax.responseText);
                } else throw Error(ajax.status);
            }
        };
        ajax.send(query_params);
    }
    get(url, options, callback) {
        if (arguments.length == 2 && type(arguments[1] == 'Function')) callback = arguments[1];
        let responseType = this.responseType;
        let query_params = '?';
        url = this.BASE_URL + url;
        if (type(arguments[1]) == 'Object') {
            if ('responseType' in options) responseType = options.responseType;
            if ('params' in options) {
                let params = options.params;
                for (let i in params) query_params += i + '=' + params[i] + '&';
                query_params = query_params.substring(0, query_params.length - 1);
                url += query_params;
            }
        }
        let ajax = new XMLHttpRequest();
        let _ = this;
        ajax.open('GET', url);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.status == 200 || ajax.status == 201 || ajax.status == 304) {
                    if (_.responseType == 'json') callback(JSON.parse(ajax.responseText));
                    else callback(ajax.responseText);
                } else throw Error(ajax.status);
            }
        };
        ajax.send();
    }
}

// let axios = new Axios({
//     BASE_URL: "http://1.14.68.137:8000"
// })

