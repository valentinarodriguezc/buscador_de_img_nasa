document.getElementById('btnBuscar').addEventListener('click', function() {
    let searches = document.getElementById('inputBuscar').value;
    let url = `https://images-api.nasa.gov/search?q=${searches}`;

    fetch(url)
       .then(response => response.json())
        .then(data => {
            let container = document.getElementById('contenedor');
            container.innerHTML = ''; 

            if (data.collection.items.length === 0) {
                container.innerHTML = '<p>No hay resultados.</p>';
                return;
            }

            data.collection.items.forEach(item => {
                if (item.links && item.links.length > 0) {
                    let imagenUrl = item.links[0].href;
                    let title = item.data[0].title;
                    let description = item.data[0].description || 'Sin descripción disponible';
                    let date = item.data[0].date_created || 'Fecha no disponible';

                    container.innerHTML += `
                        <div class="col-md-4 mb-4">
                            <div class="card">
                                <img src="${imagenUrl}" class="card-img-top" alt="${title}">
                                <div class="card-body">
                                    <h5 class="card-title">${title}</h5>
                                    <p class="card-text">${description}</p>
                                    <p class="card-text"><small class="text-muted">${date}</small></p>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });
        })
        .catch(error => {
            console.error('Error al buscar los datos:', error);
        });
});