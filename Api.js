function urlAleatorio() {
    return "https://narutodb.xyz/api/akatsuki?page=" + Math.floor(Math.random() * 10) + "&limit=4";
}

function getMyApiXmlHttpRequest() {
    var solicitud = new XMLHttpRequest();

    url = urlAleatorio();

    solicitud.open("GET", url, true);

    solicitud.onload = function () {
        if (solicitud.status >= 200 && solicitud.status < 400) {
            var jsonResponse = JSON.parse(solicitud.responseText);

            if (jsonResponse && Array.isArray(jsonResponse.akatsuki)) {
                var contenedor_respuesta = document.getElementById("contenedor_respuesta");
                contenedor_respuesta.innerHTML = '';

                var elementosAMostrar = Math.min(3, jsonResponse.akatsuki.length);

                for (var i = 0; i < elementosAMostrar; i++) {
                    var member = jsonResponse.akatsuki[i];

                    crearImagen(contenedor_respuesta, member, i);
                }
            } else {
                console.error("Error");
            }

        } else {
            console.error("Error en la solicitud");
        }
    };

    solicitud.onerror = function () {
        console.error("Error en la red");
    };

    solicitud.send();
}

function crearImagen(contenedor_respuesta, member, index) {
    var contenedor = document.createElement("div");
    contenedor.classList.add("respuesta-container");
    contenedor.id = "contenedor_" + index;

    contenedor_respuesta.appendChild(contenedor);

    var imagen = document.createElement("img");
    var parrafo = document.createElement("pre");
    imagen.width = 300;
    imagen.height = 300;

    imagen.onload = (function (contenedor) {
        return function () {
            contenedor.appendChild(imagen);
        };
    })(contenedor);

    imagen.src = member.images[0];
    parrafo.textContent = "Nombre: " + member.name + "\n" + "Estatus: " + member.personal.status;
    contenedor.appendChild(parrafo);
}


function getMyApiFetch() {

    url = urlAleatorio();

    fetch(url)
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error('Error en la solicitud:', respuesta.status, respuesta.statusText);
            }
            return respuesta.json();
        })
        .then(function (jsonResponse) {
            if (jsonResponse && Array.isArray(jsonResponse.akatsuki)) {
                var respuesta_contenedor = document.getElementById("contenedor_respuesta");
                respuesta_contenedor.innerHTML = '';

                var elementosAMostrar = Math.min(3, jsonResponse.akatsuki.length);

                for (var i = 0; i < elementosAMostrar; i++) {
                    var member = jsonResponse.akatsuki[i];

                    crearImagen(respuesta_contenedor, member, i);
                }
            } else {
                console.error("Error");
            }
        })
        .catch(function (error) {
            console.log("Error");
        });
}

function getMyApiJQueryCnd() {
    var Url = urlAleatorio();

    $.ajax({
        url: Url,
        method: "GET",
        success: function (jsonResponse) {
            if (jsonResponse && Array.isArray(jsonResponse.akatsuki)) {
                var contenedor_respuesta = $("#contenedor_respuesta");
                contenedor_respuesta.empty();

                var elementosAMostrar = Math.min(3, jsonResponse.akatsuki.length);

                for (var i = 0; i < elementosAMostrar; i++) {
                    var member = jsonResponse.akatsuki[i];

                    crearImagenJQuery(contenedor_respuesta, member, i);
                }
            } else {
                console.error("Error");
            }
        },
        error: function () {
            console.error("Error");
        }
    });
}

function getMyApiJQueryLocal() {
    var Url = urlAleatorio();

    $.ajax({
        url: Url,
        method: "GET",
        success: function (jsonResponse) {
            if (jsonResponse && Array.isArray(jsonResponse.akatsuki)) {
                var contenedor_respuesta = $("#contenedor_respuesta");
                contenedor_respuesta.empty();

                var elementosAMostrar = Math.min(3, jsonResponse.akatsuki.length);

                for (var i = 0; i < elementosAMostrar; i++) {
                    var member = jsonResponse.akatsuki[i];

                    crearImagenJQuery(contenedor_respuesta, member, i);
                }
            } else {
                console.error("Error");
            }
        },
        error: function () {
            console.error("Error");
        }
    });
}

function crearImagenJQuery(contenedor_respuesta, member, index) {
    var contenedor = $("<div>").addClass("respuesta-container").attr("id", "contenedor_" + index);

    contenedor_respuesta.append(contenedor);

    var imagen = $("<img>").on("load", function () {
        contenedor.append(imagen);
    });

    imagen.attr("src", member.images[0]).attr("width", 300).attr("height", 300);

    var parrafo = $("<pre>").text("Nombre: " + member.name + "\n" + "Estatus: " + member.personal.status);

    contenedor.append(parrafo);
}
