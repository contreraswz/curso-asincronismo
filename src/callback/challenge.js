const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const API = 'https://api.escuelajs.co/api/v1';
             

//declaración de la funcion fetchData, esta función es la encarfada de obeter la informacion del API y convertirla a objeto
function fetchData(urlApi, callback){//lleva parametros de URL y una funcion callback, osea que llamara a una funcion determinada
    let xhttp = new XMLHttpRequest();//inicializa una variable xhttp de XMLHttpRequest, pára poder acceder a sus metodos

    xhttp.open('GET', urlApi, true);//El metodo "".open" realiza la petición de apertura de comunicación, el metodo puede ser 'GET' o 'POST', luego se envia la URL, si es asincrono (true o false), usuario y contraseña. En esta caso solo se utiliza el metodo, la url y async
    xhttp.onreadystatechange = function(event){//Almacena el nombre de la función que se ejecutará cuando el objeto XMLHttpRequest cambie de estado
        //el atributo readyState define el estado del objeto XMLHttpRequest
        //0 No inicializado
        //1 Loading
        //2 ejecutado
        //3 interactuando
        //4 completado
        if (xhttp.readyState===4){
            //si la respuesta de la API es exitosa (200 Ok)
            if (xhttp.status===200) {
                //se ejecuta el callback recibiendo como argumentos un objeto, como la respuesta de la API es un texto plano, el metodo JSON.parse tranformará este texto en un objeto.
                //El atributo devuelve un DOMString que contiene la  respuesta a la consulta como un texto o null si la consulta no tuvo exito o aun no ha sido completada
                callback(null, JSON.parse(xhttp.responseText));
            }else{
                const error = new Error('Error '+ urlApi);//se inicializa un objeto de tipo Error donde se le envian como argumentos un mensaje de error y la URL de la API para conocer en dónde se produjo el error
                return callback(error, null);//se ejecuta el callback recibiendo como argumentos el error y null debido a que no se pudo obtener el objeto
            }
        } 
    }
    xhttp.send();//el método .send() envia la petición al servidor
}

fetchData(`${API}/products`, function (error1, data1){//se invoca el metodo fetchData() pasandole como argumentos la varible API concatenada con la cadena 'products' para acceder a la URL de la API deseada, y una función anónima que recibe 2 parámetros (un objeto de error y un arreglo que almacena todos los objetos traidos por la API).
    if (error1) return console.error(error1);//se valida si existe un error, en caso de que exista se detiene el proceso y se imprime el error
    fetchData(`${API}/products/${data1[0].id}`, function (error2, data2){
        if (error2) return console.error(error2);
        fetchData(`${API}/categories/${data2?.category?.id}`, function (error3, data3){
            if (error3) return console.error(error3);
            console.log(data1[0]);
            console.log(data2.title);
            console.log(data3.name);
        });
    });

});