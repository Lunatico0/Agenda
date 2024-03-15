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

//Edita un objeto dentro del array
function editarContacto() {
    const mostrarTodos = confirm("¿Quieres mostrar todos los contactos antes de editar?");
    let buscado;

    if (mostrarTodos) {
        mostrarContactos(mostrarTodos);
    } else {
        buscado = mostrarContactos(mostrarTodos);
    }

    if (!buscado) {
        alert("Contacto no encontrado.");
        return;
    }

    console.log(`El usuario: ${buscado.nombre} ${buscado.apellido} con ${buscado.edad} años, su nacionalidad es ${buscado.nacionalidad} y su e-mail es: ${buscado.mail}`);
    alert(`El usuario: ${buscado.nombre} ${buscado.apellido} con ${buscado.edad} años, su nacionalidad es ${buscado.nacionalidad} y su e-mail es: ${buscado.mail}`);

    if (buscado.length > 1) {
        for (let i = 0; i < buscado.length; i++) {
            console.log(`${i + 1}. ${buscado[i].nombre} ${buscado[i].apellido}`);
        }
        // Si hay múltiples coincidencias, permite al usuario seleccionar cuál editar
        const seleccion = parseInt(prompt("Se encontraron múltiples coincidencias. Ingrese el número del contacto que desea editar:"));
        if (isNaN(seleccion) || seleccion < 1 || seleccion > buscado.length) {
            alert("Selección inválida.");
            return;
        }
        buscado = buscado[seleccion - 1];
    }

    const edit = prompt("Ingrese: nombre, apellido, edad, mail, nacionalidad o todos. Según el campo que quiera editar");
    let mail;
    switch (edit.toLowerCase().trim()) {
        case "nombre":
            buscado.nombre = prompt("Ingrese el nuevo nombre del contacto").trim();
            if (/^[a-z]/.test(buscado.nombre)) {
                buscado.nombre = buscado.nombre.charAt(0).toUpperCase() + buscado.nombre.slice(1);
            }
            break;
        case "apellido":
            buscado.apellido = prompt("Ingrese el nuevo apellido del contacto").trim();
            if (/^[a-z]/.test(buscado.apellido)) {
                buscado.apellido = buscado.apellido.charAt(0).toUpperCase() + buscado.apellido.slice(1);
            }
            break;
        case "edad":
            do {
                buscado.edad = parseInt(prompt("Ingrese la nueva edad del contacto"));
            } while (isNaN(buscado.edad))
            break;
        case "mail":
            while (!mail || !mail.includes("@")) {
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
    const mostrarTodos = confirm("¿Quieres mostrar todos los contactos antes de eliminar?");
    let buscado;
    if (mostrarTodos) {
        mostrarContactos(true);
    } else {
        const nombreOApellido = prompt("Ingresa el nombre o apellido del contacto");
        buscado = buscarContacto(nombreOApellido);
    }

    if (!buscado) {
        alert("Nombre o apellido no válido.");
        return;
    }

    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el contacto ${buscado.nombre} ${buscado.apellido}?`);
    if (confirmacion) {
        const indice = users.findIndex(user => user === buscado);
        users.splice(indice, 1);
        alert("Contacto eliminado exitosamente.");
    } else {
        alert("Eliminación cancelada.");
    }
}

//Mustra cada objeto del array
function mostrarContactos(mostrarTodos = true) {
    if (users.length === 0) {
        alert("La agenda está vacía");
        return null;
    }

    if (mostrarTodos) {
        for (const user of users) {
            console.log(`El usuario: ${user.nombre} ${user.apellido} con ${user.edad} años, su nacionalidad es ${user.nacionalidad} y su e-mail es: ${user.mail}`);
            alert(`El usuario: ${user.nombre} ${user.apellido} con ${user.edad} años, su nacionalidad es ${user.nacionalidad} y su e-mail es: ${user.mail}`);
        }
    } else {
        const buscado = prompt("Ingresa el nombre o apellido del contacto");
        const encontrados = buscarContacto(buscado);
        if (encontrados.length === 0) {
            alert("No se encontraron contactos con ese nombre o apellido.");
            return null;
        } else {
            return encontrados;
        }
    }
}

//Busca un objeto en el array
function buscarContacto(buscado) {
    const busqueda = buscado.toLowerCase();
    return users.find(user => user.nombre.toLowerCase() === busqueda || user.apellido.toLowerCase() === busqueda);
}

const users = [];
let option;

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

// let nuevoUsuario = new Usuario("Patricio", "Pittana", 25, "pittanapatricio@gmail.com", "Argentina");
// users.push(nuevoUsuario)
// nuevoUsuario = new Usuario("Carolina", "Pittana", 45, "capittana@gmail.com", "Argentina");
// users.push(nuevoUsuario)
// nuevoUsuario = new Usuario("Beltran", "Pittana", 38, "jorgepittana@gmail.com", "Argentina");
// users.push(nuevoUsuario)
// nuevoUsuario = new Usuario("Milagros", "Vergara", 23, "milagrosvergarabegnis@gmail.com", "Argentina");
// users.push(nuevoUsuario)
// nuevoUsuario = new Usuario("Brisa", "Vergara", 12, "brisavergara@gmail.com", "Argentina");
// users.push(nuevoUsuario)
// nuevoUsuario = new Usuario("Carlos", "Vergara", 65, "carlosvergara@gmail.com", "Argentina");
// users.push(nuevoUsuario)
// nuevoUsuario = new Usuario("Mario", "Cardoso", 65, "tmbc.logistica@gmail.com", "Argentina");
// users.push(nuevoUsuario)
// nuevoUsuario = new Usuario("Beltran", "Cardoso", 26, "bcproducciones@gmail.com", "Argentina");
// users.push(nuevoUsuario)