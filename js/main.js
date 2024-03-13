const users = [];
let option;

do{
    option = prompt("📙Bienvenido a la Agenda📙.\n\n1-➕Ingresar nuevo contacto➕.\n2-🖋️Editar contacto🖋️.\n3-🚫Eliminar contacto🚫.\n4-📓Mostrar lista de contactos📓.\n5-Salir.");
    switch (option){
        case "1":
            agregarContacto();                                                      // Llama a la funcion para comenzar a agregar contactos
            break;
        case "2":
            editarContacto();
            break;
        case "3":
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


// Constructor de objetos

function Usuario (nombre, apellido, edad, mail, nacionalidad){
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
        let apellido = prompt("Ingrese el apellido del contacto").trim();         //Quita espacios al principio y al final
        
        while (isNaN(edad)) {
            edad = parseInt(prompt("Ingrese la edad del contacto"));                // Comprobacion de la edad como número
        }
        
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


//Mustra cada objeto del array

function mostrarContactos(mostrarTodos = true) {
    if (users.length === 0) {
        alert("La agenda está vacía");
    } else {
        if (mostrarTodos) {
            for (const user of users) {
                console.log(`El usuario: ${user.nombre} ${user.apellido} con ${user.edad} años, su nacionalidad es ${user.nacionalidad} y su e-mail es: ${user.mail}`);
                alert(`El usuario: ${user.nombre} ${user.apellido} con ${user.edad} años, su nacionalidad es ${user.nacionalidad} y su e-mail es: ${user.mail}`);
            }
        } else {
            // Solo mostrar el contacto solicitado
            const buscado = prompt("Ingresa el nombre o apellido del contacto a mostrar");
            const encontrado = users.find(user => user.nombre === buscado || user.apellido === buscado);
            
            if (encontrado) {
                console.log(`El usuario: ${encontrado.nombre} ${encontrado.apellido} con ${encontrado.edad} años, su nacionalidad es ${encontrado.nacionalidad} y su e-mail es: ${encontrado.mail}`);
                alert(`El usuario: ${encontrado.nombre} ${encontrado.apellido} con ${encontrado.edad} años, su nacionalidad es ${encontrado.nacionalidad} y su e-mail es: ${encontrado.mail}`);
            } else {
                alert("Contacto no encontrado");
            }
        }
    }
}


//Edita un objeto dentro del array

function editarContacto() {
    const mostrarTodos = confirm("¿Quieres mostrar todos los contactos antes de editar?");
    mostrarContactos(mostrarTodos);

    let buscado = prompt("Ingrese el nombre o apellido del contacto que desea editar");
    let contactoEncontrado = null;

    if (buscado.trim() === "") {
        alert("Nombre o apellido no válido.");
        return;
    }

    for (const user of users) {
        if (user.nombre.toLowerCase() === buscado.toLowerCase() || user.apellido.toLowerCase() === buscado.toLowerCase()) {
            contactoEncontrado = user;
            console.log(`El usuario: ${contactoEncontrado.nombre} ${contactoEncontrado.apellido} con ${contactoEncontrado.edad} años, su nacionalidad es ${contactoEncontrado.nacionalidad} y su e-mail es: ${contactoEncontrado.mail}`);
            alert(`El usuario: ${contactoEncontrado.nombre} ${contactoEncontrado.apellido} con ${contactoEncontrado.edad} años, su nacionalidad es ${contactoEncontrado.nacionalidad} y su e-mail es: ${contactoEncontrado.mail}`);
            const edit = prompt("Ingrese: nombre, apellido, edad, mail, nacionalidad o todos. Segun el campo que quiera editar");
            switch (edit.toLowerCase().trim()){
                case "nombre":
                    contactoEncontrado.nombre = prompt("Ingrese el nuevo nombre del contacto").trim();
                    if (/^[a-z]/.test(contactoEncontrado.nombre)) {
                        contactoEncontrado.nombre = contactoEncontrado.nombre.charAt(0).toUpperCase() + contactoEncontrado.nombre.slice(1);
                    }
                    break;
                case "apellido":
                    contactoEncontrado.apellido = prompt("Ingrese el nuevo apellido del contacto").trim();
                    if (/^[a-z]/.test(contactoEncontrado.apellido)) {
                        contactoEncontrado.apellido = contactoEncontrado.apellido.charAt(0).toUpperCase() + contactoEncontrado.apellido.slice(1);
                    }
                    break;
                case "edad":
                    do{
                        contactoEncontrado.edad = parseInt(prompt("Ingrese la nueva edad del contacto"));
                    } while (isNaN(contactoEncontrado.edad))
                    break;
                case "mail":
                    contactoEncontrado.mail = null;
                    while (!mail || !mail.includes("@")) {
                        contactoEncontrado.mail = prompt("Ingrese el nuevo correo electronico del contacto (debe contener '@')").trim();
                    }
                    break;
                case "nacionalidad":
                    contactoEncontrado.nacionalidad = prompt("Ingrese la nueva nacionalidad del contacto").trim();
                    if (/^[a-z]/.test(contactoEncontrado.nacionalidad)) {
                        contactoEncontrado.nacionalidad = contactoEncontrado.nacionalidad.charAt(0).toUpperCase() + contactoEncontrado.nacionalidad.slice(1);
                    }
                    break;
                case "todos":
                    contactoEncontrado.nombre = prompt("Ingrese el nuevo nombre del contacto").trim();
                    if (/^[a-z]/.test(contactoEncontrado.nombre)) {
                        contactoEncontrado.nombre = contactoEncontrado.nombre.charAt(0).toUpperCase() + contactoEncontrado.nombre.slice(1);
                    }
                    contactoEncontrado.apellido = prompt("Ingrese el nuevo apellido del contacto").trim();
                    if (/^[a-z]/.test(contactoEncontrado.apellido)) {
                        contactoEncontrado.apellido = contactoEncontrado.apellido.charAt(0).toUpperCase() + contactoEncontrado.apellido.slice(1);
                    }
                    do{
                        contactoEncontrado.edad = parseInt(prompt("Ingrese la nueva edad del contacto"));
                    } while (isNaN(contactoEncontrado.edad))
                    contactoEncontrado.mail = null;
                    while (!mail || !mail.includes("@")) {
                        contactoEncontrado.mail = prompt("Ingrese el nuevo correo electronico del contacto (debe contener '@')").trim();
                    }
                    contactoEncontrado.nacionalidad = prompt("Ingrese la nueva nacionalidad del contacto").trim();
                    if (/^[a-z]/.test(contactoEncontrado.nacionalidad)) {
                        contactoEncontrado.nacionalidad = contactoEncontrado.nacionalidad.charAt(0).toUpperCase() + contactoEncontrado.nacionalidad.slice(1);
                    }
                    break;
                default:
                    alert("Opcion incorrecta. Gracias, vuelva pronto.");
                    break;
                break;
            }
        }
        if (!contactoEncontrado) {
            alert("Contacto no encontrado.");
            return;
        }
    }
}
