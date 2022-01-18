const http=require('http');
const fs= require('fs');
const server=http.createServer(function(request,response){
if (request.url==='/'){
const text=fs.readFileSync('index.html','utf8');
response.end(text);
};

    if(request.url.startsWith("/")){
         
        // получаем путь после слеша
        var filePath = request.url.substr(1);
        fs.readFile(filePath, function(error, data){
                 
            if(error){
                     
                response.statusCode = 404;
                response.end(filePath);
            }   
            else{
                response.end(data);
            }
            return;
        })
    }
    else{
        // во всех остальных случаях отправляем строку hello world!
        response.end("Hello World!");
    }
})
console.log('port=',process.env.PORT);
server.listen(process.env.PORT||3000);
console.log('Server started');
