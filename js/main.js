// Constructor de objetos
function Usuario(nombre, apellido, edad, mail, nacionalidad) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.mail = mail;
    this.nacionalidad = nacionalidad;
}

//Agrega objetos al array
function agregarContacto() {
    while (true) {
        let edad;
        let mail;
        let nombre = prompt("Ingrese el nombre del contacto").trim();
        let apellido = prompt("Ingrese el apellido del contacto").trim();           //Quita espacios al principio y al final

        do{                                                                         //Hacec una pequeña validacion de que el dato sea numerico, hasta que el dato no sea valido no va a salir del bucle
            edad = parseInt(prompt("Ingrese la edad del contacto"));
            if (edad >= 250){
                alert("MATUSALEN!! Eres tu?");                                      //Si ingresa una edad mayor a 250 muestra el mensaje
            }
        } while (isNaN(edad) || edad >= 120 );

        while (!mail || !mail.includes("@")) {                                      // Comprobacion del formato de correo electronico que incluya el @
            mail = prompt("Ingrese el correo electronico del contacto (debe contener '@')");
        }

        let nacionalidad = prompt("Ingrese la nacionalidad del contacto").trim();

        if (/^[a-z]/.test(nacionalidad)) {
            nacionalidad = nacionalidad.charAt(0).toUpperCase() + nacionalidad.slice(1);
        }

        if (/^[a-z]/.test(nombre)) {                                                //"/^/" hace referencia al primer elemento de la string "[a-z]" representa cualquier letra minuscula
            nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);              // Convertir nombre a mayusculas si comienzan con minuscula
        }

        if (/^[a-z]/.test(apellido)) {                                              //.test devuelve true o false segun /^[a-z]/ en la cadena entre parentesis
            apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);        // Convertir apellido a mayusculas si comienzan con minuscula
        }

        const nuevoUsuario = new Usuario(nombre, apellido, edad, mail, nacionalidad);
        users.push(nuevoUsuario);                                                   // Agrega el objeto al array

        const continuar = prompt("¿Desea agregar otro contacto? (si/no)").toLowerCase();
        if (continuar !== "si") {
            break;                                                                  // Finaliza el bucle si el usuario no quiere agregar mas contactos
        }
    }
}

//Edita un objeto dentro del array
function editarContacto() {
    const mostrarTodos = confirm("¿Quieres mostrar todos los contactos antes de editar?");
    let buscado;

    if (mostrarTodos) {                                                             //Consulta si quiere que se muestren todos los contactos ("mostrarTodos" es bool)
        mostrarContactos(mostrarTodos);
    }

    const nombreOApellido = prompt("Ingresa el nombre o apellido del contacto");    //Captura el nombre o apellido ingresado para buscarlo en el array de objetos
    buscado = buscarContacto(nombreOApellido);                                      //Captura el retorno al llamar a la funcion con el parametro antes capturado

    if (!buscado || buscado.length === 0) {                                         //Si el retorno no existe o tiene una longitud de 0 mustra que el nombre o apellido no es valido
        alert("Nombre o apellido no valido o no encontrado.");
        return;
    }

    if (buscado.length > 1) {                                                       //Si el retorno existe y tiene una longitud mayor a 1 mustra con un for..of todas las coincidencias
        for (let i = 0; i < buscado.length; i++) {
            console.log(`${i + 1}. ${buscado[i].nombre} ${buscado[i].apellido}`);
            alert(`${i + 1}. ${buscado[i].nombre} ${buscado[i].apellido}`);         //Se muestra cada coincidencia con un numero representado por la posicion en el array + 1
        }
        
        const seleccion = parseInt(prompt("Se encontraron multiples coincidencias. Ingrese el numero del contacto que desea editar:"));
        if (isNaN(seleccion) || seleccion < 1 || seleccion > buscado.length) {      
            alert("Selección invalida.");
            return;
        }
        buscado = buscado[seleccion - 1];                                           //Si hay multiples coincidencias, permite al usuario seleccionar cual editar
    } else {                                                                        //En el caso que solo haya una coincidencia solo hay una posicion en el array
        buscado = buscado[0];
    }

    const edit = prompt("Ingrese: nombre, apellido, edad, mail, nacionalidad o todos. Segun el campo que quiera editar");
    let mail;                                                                       //Captura en "edit" ue atributo es el que quiere editar
    switch (edit.toLowerCase().trim()) {                                            //Un switch que cada caso tiene el nombre de los atributos piosibles incluyendo "todos" antes capturado en "edit"
        case "nombre":                                                              //Captura el dato que tiene que ser asignado al atributo
            buscado.nombre = prompt("Ingrese el nuevo nombre del contacto").trim(); //Con .trim() elimina los espacios al principio o al final
            if (/^[a-z]/.test(buscado.nombre)) {                                    //"/^/" hace referencia al primer elemento de la string "[a-z]" representa cualquier letra minuscula
                buscado.nombre = buscado.nombre.charAt(0).toUpperCase() + buscado.nombre.slice(1);
            }                                                                       //Si comienza con minuscula lo convierte a mayusculas
            break;
        case "apellido":
            buscado.apellido = prompt("Ingrese el nuevo apellido del contacto").trim();
            if (/^[a-z]/.test(buscado.apellido)) {
                buscado.apellido = buscado.apellido.charAt(0).toUpperCase() + buscado.apellido.slice(1);
            }
            break;
        case "edad":
            do{                                                                     //Hacec una pequeña validacion de que el dato sea numerico, hasta que el dato no sea valido no va a salir del bucle
                buscado.edad = parseInt(prompt("Ingrese la nueva edad del contacto"));
                if (buscado.edad >= 250){
                    alert("MATUSALEN!! Eres tu?");                                  //Si ingresa una edad mayor a 250 muestra el mensaje
                }
            } while (isNaN(buscado.edad) || buscado.edad >= 120 );
            break;
        case "mail":
            while (!mail || !mail.includes("@")) {                                  //Valida que el mail contenga "@"
                mail = prompt("Ingrese el nuevo correo electrónico del contacto (debe contener '@')").trim();
            }
            buscado.mail = mail;
            break;
        case "nacionalidad":
            buscado.nacionalidad = prompt("Ingrese la nueva nacionalidad del contacto").trim();
            if (/^[a-z]/.test(buscado.nacionalidad)) {
                buscado.nacionalidad = buscado.nacionalidad.charAt(0).toUpperCase() + buscado.nacionalidad.slice(1);
            }
            break;
        case "todos":
            buscado.nombre = prompt("Ingrese el nuevo nombre del contacto").trim();
            if (/^[a-z]/.test(buscado.nombre)) {
                buscado.nombre = buscado.nombre.charAt(0).toUpperCase() + buscado.nombre.slice(1);
            }
            buscado.apellido = prompt("Ingrese el nuevo apellido del contacto").trim();
            if (/^[a-z]/.test(buscado.apellido)) {
                buscado.apellido = buscado.apellido.charAt(0).toUpperCase() + buscado.apellido.slice(1);
            }
            do {
                buscado.edad = parseInt(prompt("Ingrese la nueva edad del contacto"));
            } while (isNaN(buscado.edad))
            while (!mail || !mail.includes("@")) {
                mail = prompt("Ingrese el nuevo correo electrónico del contacto (debe contener '@')").trim();
            }
            buscado.mail = mail;
            buscado.nacionalidad = prompt("Ingrese la nueva nacionalidad del contacto").trim();
            if (/^[a-z]/.test(buscado.nacionalidad)) {
                buscado.nacionalidad = buscado.nacionalidad.charAt(0).toUpperCase() + buscado.nacionalidad.slice(1);
            }
            break;
        default:
            alert("Opción incorrecta. Gracias, vuelva pronto.");
            break;
    }
}

//Elimina un objeto del array
function eliminarContacto() {
    const mostrarTodos = confirm("¿Quieres mostrar todos los contactos antes de eliminar?");    //Consulta si quiere que se muestren todos los contactos ("mostrarTodos" es bool)
    let buscado;
    if (mostrarTodos) {
        mostrarContactos(mostrarTodos);
    }

    const nombreOApellido = prompt("Ingresa el nombre o apellido del contacto");    //Captura el nombre o apellido ingresado para buscarlo en el array de objetos
    buscado = buscarContacto(nombreOApellido);                                      //Captura el retorno al llamar a la funcion con el parametro antes capturado

    if (!buscado || buscado.length === 0) {                                         //Si el retorno no existe o tiene una longitud de 0 mustra que el nombre o apellido no es valido
        alert("Nombre o apellido no valido o no encontrado.");
        return;
    }

    if (buscado.length > 1) {                                                       //Si el retorno existe y tiene una longitud mayor a 1 mustra con un for..of todas las coincidencias
        for (let i = 0; i < buscado.length; i++) {
            console.log(`${i + 1}. ${buscado[i].nombre} ${buscado[i].apellido}`);
            alert(`${i + 1}. ${buscado[i].nombre} ${buscado[i].apellido}`);         //Se muestra cada coincidencia con un numero representado por la posicion en el array + 1
        }
    
        const seleccion = parseInt(prompt("Se encontraron multiples coincidencias. Ingrese el numero del contacto que desea eliminar:"));
        if (isNaN(seleccion) || seleccion < 1 || seleccion > buscado.length) {      
            alert("Selección invalida.");
            return;
        }
        buscado = buscado[seleccion - 1];                                           //Si hay multiples coincidencias, permite al usuario seleccionar cual eliminar
    } else {                                                                        //En el caso que solo haya una coincidencia solo hay una posicion en el array
        buscado = buscado[0];
    }

    const confirmacion = confirm(`¿Estas seguro de que deseas eliminar el contacto ${buscado.nombre} ${buscado.apellido}?`);
    if (confirmacion) {                                                             //Pide confirmacion si borrar el contacto con ese nombre y ese apellido ("confirmacion" bool)
        const indice = users.findIndex(user => user === buscado);                   //Captura el indice de la coincidencia ingresada en el array que contiene todos los contactos
        users.splice(indice, 1);                                                    //Con un .splice() en el array que contiene los contactos, dandole como parametro el indice capturado mas la cantidad de elementos, borra dicho elemento
        alert("Contacto eliminado exitosamente.");                                  
    } else {                                                                        //En caso de cancelar muestra "eliminacion cancelada" y sale de la funcion
        alert("Eliminación cancelada.");
    }
}

//Mustra cada objeto del array
function mostrarContactos(mostrarTodos = true) {
    if (users.length === 0) {
        alert("La agenda esta vacía");                                              //si el tamaño del array "users" es 0 muestra un alerta de agenda vacia
        return null;
    }

    if (mostrarTodos) {                                                             //Cuando se necesita mostrar todos los elementos de la agenda
        for (const user of users) {                                                 //con un for..of recorre el array mostrando en cada iteracion los datos de cada contacto
            console.log(`El usuario: ${user.nombre} ${user.apellido} con ${user.edad} años, su nacionalidad es ${user.nacionalidad} y su e-mail es: ${user.mail}`);
            alert(`El usuario: ${user.nombre} ${user.apellido} con ${user.edad} años, su nacionalidad es ${user.nacionalidad} y su e-mail es: ${user.mail}`);
        }
    } else {                                                                        //Cuando solo se necesita mostrar uno o mas contactos que coincidan con la condicion
        const buscado = prompt("Ingresa el nombre o apellido del contacto");        //Captura el nombre o apellido del contacto a buscar
        const encontrados = buscarContacto(buscado);                                //Captura la llamada a la funcion buscarContacto con el parametro antes capturado
        if (encontrados.length === 0) {
            alert("No se encontraron contactos con ese nombre o apellido.");        //Si la captura de la funcion uscarContacto tiene un tamaño de 0 mustra que no se encontro dicho uauario
            return null;
        } else {
            return encontrados;                                                     //En caso de hberlo encontrado lo retorna
        }
    }
}

//Busca objetos en el array
function buscarContacto(buscado) {
    const busqueda = buscado.toLowerCase();                                         //Busca el contacto segun la string ingresada, y con filter devuelve todos los elementos que coinciden con la condicion
    return users.filter(user => user.nombre.toLowerCase() === busqueda || user.apellido.toLowerCase() === busqueda);
}

const users = [];
let option;

// Contactos inventados para hacer pruebas
let nuevoUsuario = new Usuario("Patricio", "Pittana", 25, "pittanapatricio@gmail.com", "Argentina");
users.push(nuevoUsuario)
nuevoUsuario = new Usuario("Noellia", "Pittana", 45, "capittana@gmail.com", "Argentina");
users.push(nuevoUsuario)
nuevoUsuario = new Usuario("Beltran", "Pittana", 38, "jorgitopittana@gmail.com", "Argentina");
users.push(nuevoUsuario)
nuevoUsuario = new Usuario("rosenda", "Bergara", 23, "rosybb85@gmail.com", "Rumania");
users.push(nuevoUsuario)
nuevoUsuario = new Usuario("laura", "bergara", 12, "llaubergara@gmail.com", "Australia");
users.push(nuevoUsuario)
nuevoUsuario = new Usuario("Sebastian", "Aguada", 46, "carloss.aguada@gmail.com", "Venezolano");
users.push(nuevoUsuario)
nuevoUsuario = new Usuario("Mario", "Aguada", 65, "aguadamarito@hotmail.com", "Ruso");
users.push(nuevoUsuario)
nuevoUsuario = new Usuario("Ramon", "Rosendo", 26, "moncho_rosendo@yahoo.com", "Argentina");
users.push(nuevoUsuario)

do {
    option = prompt("📙Bienvenido a la Agenda📙.\n\n1-➕Ingresar nuevo contacto➕.\n2-🖋️Editar contacto🖋️.\n3-🚫Eliminar contacto🚫.\n4-📓Mostrar lista de contactos📓.\n5-🚪Salir🚪.");
    switch (option) {
        case "1":
            agregarContacto();                                                      // Llama a la funcion para comenzar a agregar contactos
            break;
        case "2":
            editarContacto();                                                       // Llama a la funciion para editar contactos
            break;
        case "3":
            eliminarContacto();                                                     // Llama a la funciion para eliiminar contactos
            break;
        case "4":
            mostrarContactos();                                                     // Llama a la funcion para mostrar contactos
            break;
        case "salir", "5":
            alert("Gracias, vuelva pronto.")                                        // Termina el programa
            break;
        default:
            alert("Opcion incorrecta. Gracias, vuelva pronto.");
            break;
    }
} while (option.toLowerCase() !== "salir" && option !== "5");