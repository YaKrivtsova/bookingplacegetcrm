const http=require('http');
const fs= require('fs');
const server=http.createServer(function(request,response){
console.log('Cookie: ', request.headers.cookie);
	if(request.headers.cookie=== undefined && !request.url.includes('js')&& !request.url.includes('css') &&request.url!='/')
	{
		 console.log('you lose');
		  console.log(request.url);
		  // response.statusCode = 302;
		  // response.setHeader("Location", "/");
		
	}	
	if (request.url==='/'){
	const text=fs.readFileSync('index.html','utf8');
	response.end(text);
	};
	if(request.url==='/saveJson')
	{
		    var post = ''; // Определена переменная post для временного хранения информации тела запроса

         request.on ('data', function (chunk) {// Через функцию мониторинга событий данных req, всякий раз, когда данные тела запроса получены, они добавляются в переменную post
        post += chunk;
		});

         request.on ('end', function () {// После срабатывания конечного события сообщение анализируется в реальный формат запроса POST через querystring.parse, а затем возвращается клиенту.
		console.log(post);
		fs.writeFileSync("test.txt",post )
        response.end();
		});
	
		
	}
	else if(request.url==='/getUser')
	{
		console.log('getUserInfo');
		
		try{
			const text=fs.readFileSync('users.txt');
			var users= JSON.parse(text).users;
			var found=false;
			var cookies=request.headers.cookie.split(';');
			for(const i in cookies)
			{
				if(cookies[i].includes('login'))
				{
					var putLogin=cookies[i].split('=')[1];
				}
				if(cookies[i].includes('password'))
				{
					var putPass=cookies[i].split('=')[1];
				}
			}
			console.log(putLogin+" "+putPass);
			for (const property in users) 
			   {
				   
					var passwordU = users[property].passwordU;
					var login = users[property].login;
					console.log(login+" "+passwordU);
					if(putPass==passwordU&&login==putLogin)
					{
						
						console.log("sucsess");
						found=true;
						response.statusCode = 302;
						response.end("/frontbookv2.html");
						break;
					}
					
					
			   }
			if(!found)
			{
				response.statusCode = 401;
				response.end();
				
			}
			
		}
		catch(e)
		{
			console.log(e);
			response.statusCode = 302;
		    response.setHeader("Location", "/");
			response.end();
		
		}
	}
	else if(request.url.includes('/getUserInfo'))
	{
		let login=request.url.split('?')[1];
		console.log(login);
		const text=fs.readFileSync('users.txt');
		var users= JSON.parse(text).users;
		let user = users.find(item =>item.log==login);
		user.password=null;
		response.end(JSON.stringify(user));
	}
    else if(request.url.startsWith("/")){
         
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
