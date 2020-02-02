const http = require('http')
const ig = require('./instagram');

const PORT = process.env.PORT || 80

 const start = async () => {
    
    await ig.initialize();
    await ig.login('89625452154', '6892859694marat');
    const www = await ig.data()
    return www
}

/*server*/
const server = http.createServer((req, res)=>{
    
    if(req.method === 'GET'){
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        res.end(`
         <h1>Form</h1>
         <form action="/" method="post">
            <input type="text" name="name" />
            <button type="submit">Далее</button>
         </form>
        `)
    }else if(req.method === 'POST'){
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        const body =[]
        
        req.on('data', data =>{
            body.push(Buffer.from(data))
        })
        req.on('end', ()=>{
            const mess = body.toString().split('=')[1]

            start().then(data =>{
                for(let i =0; i<=data.length; i++){
                    if(data[i] === mess){
                        res.end(`<h1>есть такой подписчик</h1>`)
                    }else{
                        res.end(`<h1>нет такого подписчика</h1>`)
                    }
                }
            })
        })
    }

})

server.listen(PORT, ()=>{
    console.log('server is running...')
})