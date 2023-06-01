
function obtenerToken() {
const clientId = 'twKZmX5jJN1Dtws2p9o4WpGMgZuTlMnI7BSgzWH8lMPudfu0H5';
const clientSecret = 'RusfcJU2lLpzOWA06LvAvKFXmMrONUBdHRXToCDz';
const tokenUrl = 'https://api.petfinder.com/v2/oauth2/token';

const response = $.ajax({
    url: tokenUrl,
    method: 'POST',
    data: {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret
    }
});

return response
}

function obtenerMascotas() {
    const apiUrl = 'https://api.petfinder.com/v2/animals?type=dog';
    obtenerToken()
      .done(dataAuth => {
        const accessToken = dataAuth.access_token;
  
        $.ajax({
          url: apiUrl,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
          .done(data => {
            mostrarMascotas(data);
            $('#mascotas-container').show(); // Show the container after data is fetched
          })
          .fail(error => {
            console.error('Error:', error);
          });
      })
      .fail(error => {
        console.error('Error:', error);
      });
  }
  
  function mostrarMascotas(dataAPI) {
    const contenedor = $('#mascotas-container');
    contenedor.empty();
  
    const insertedAnimals = [];
  
    dataAPI.animals.forEach(mascota => {
      if (mascota.photos.length > 0 && insertedAnimals.includes(mascota.name) == false) {
        const colDiv = $('<div>').addClass('col-md-4');
        const card = $('<div>').addClass('card d-flex flex-column h-100');
        const link = $('<a>').attr('href', mascota.url).attr('target', '_blank');
        const imagen = $('<img>').attr({
          src: mascota.photos[0].medium,
          alt: mascota.name
        }).addClass('card-img-top');
        const cardBody = $('<div>').addClass('card-body');
        const nombre = $('<h5>').addClass('card-title').text(mascota.name);
        const descripcion = $('<p>').addClass('card-text').text(mascota.description);
        cardBody.append(nombre, descripcion);
        link.append(imagen);
        card.append(link, cardBody);
        colDiv.append(card);
        contenedor.append(colDiv);
        insertedAnimals.push(mascota.name);
      }
    });
  }
  

  obtenerMascotas();
  