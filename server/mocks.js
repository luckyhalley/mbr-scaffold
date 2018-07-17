module.exports = {
    'GetList': {
        "status": 200,
        "data|10": [{
            "name": '@cname',
            "id|+1": 1,
            "value|0-500": 20
          }]
      },
      'GetUserInfo': {
        "status": 200,
        "data": {
            "name": '@cname',
            "id|1-1000": 1,
            'birthday': '@date("yyyy-MM-dd")',
            'city': '@city(true)',
            'isMale|1': true
        }
      }
}