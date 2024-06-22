import { fetchCountries } from './js/fetchCountries.js';
var _ = require('lodash');

const searchBox = document.getElementById('search-box');
const debounced = _.debounce(fetchCountries, 300)
searchBox.addEventListener('input', (event) => {
    debounced(event.target.value)
})
