const http = require("http");
const fs = require("fs");
  
http.createServer(function(request, response){
      
    console.log(`Запрошенный адрес: ${request.url}`);
    // получаем путь после слеша
    const filePath = `./app/${request.url.substr(1)}`;
    // смотрим, есть ли такой файл
    fs.access(filePath, fs.constants.R_OK, err => {
        // если произошла ошибка - отправляем статусный код 404
        if(err){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }
        else{
            fs.createReadStream(filePath).pipe(response);
        }
      });
}).listen(3000, function(){
    console.log("Server started at 3000");
});
// const http = require("http");
  
// http.createServer(function(request, response){
     
//     response.setHeader("Content-Type", "text/html; charset=utf-8;");
     
//     if(request.url === "/"){
//         response.statusCode = 302; // временная переадресация
//         // на адрес localhost:3000/newpage
//         console.log(request.url);
//         response.setHeader("Location", "/newpage");
//     }
//     else if(request.url == "/newpage"){
//         console.log(request.url);
//         response.write("New address");
//     }
//     else{
//         response.statusCode = 404; // адрес не найден
//         response.write("Not Found");
//     }
//     response.end();
// }).listen(3000);