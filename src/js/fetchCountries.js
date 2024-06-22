export function fetchCountries(name) {
  fetch('https://restcountries.com/v3.1/name/' + name.trim())
    .then(async response => {
      if (response.status == 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name', {
          timeout: 3000,
        });
        document.getElementById('result').innerHTML = '';
        return;
      }
      if (response.status != 200) {
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.body);
      }
      var json = await response.json();
      html = '';
      if (json.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.',
          {
            timeout: 3000,
          }
        );
      }
      if (json.length == 1) {
        const languagesValues = Object.values(json[0].languages);
        html = `<div class="name">
                      <img src="${json[0].flags.svg}" class="img"/>
                      <h1>${json[0].name.official}</h1>
                    </div>
                    <p><strong>Capital:</strong> ${json[0].capital}</p>
                    <p><strong>Population:</strong> ${json[0].population}</p>
                    <p><strong>Languages:</strong> ${languagesValues.join(
                      ', '
                    )}</p>
                    `;
      }
      if (json.length == 0) {
        Notiflix.Notify.error('Oops, there is no country with that name', {
          timeout: 3000,
        });
      }
      if (json.length >= 2 && json.length <= 10) {
        html = '<ul class="no-padding">';
        for (i in json) {
          html += `
                  <li class="list-item">
                    <img src="${json[i].flags.svg}" class="list-img"/>
                    ${json[i].name.official}
                  </li>
                `;
        }
        html += '</ul>';
      }
      document.getElementById('result').innerHTML = html;
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.error('Oops, there is no country with that name', {
        timeout: 3000,
      });
    });
}
