import Mock from 'mockjs';
Mock.mock("/api/v1/news","get",{
    "data|5":[
        {
            "id|+1":1,
            "title|+1":[Mock.Random.cword(8,10),Mock.Random.cword(8,10),Mock.Random.cword(8,10),Mock.Random.cword(8,10),Mock.Random.cword(8,10)],
            "image|+1":[Mock.Random.image("200x100",Mock.Random.color()),Mock.Random.image("200x100",Mock.Random.color()),Mock.Random.image("200x100",Mock.Random.color()),Mock.Random.image("200x100",Mock.Random.color()),Mock.Random.image("200x100",Mock.Random.color())],
            "date|+1":[Mock.Random.date("yyyy-MM-dd"),Mock.Random.date("yyyy-MM-dd"),Mock.Random.date("yyyy-MM-dd"),Mock.Random.date("yyyy-MM-dd"),Mock.Random.date("yyyy-MM-dd"),Mock.Random.date("yyyy-MM-dd")]
        }
    ]
})
