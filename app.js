'use strict';

function formatRepo(repo) {
    return `<li><a href="${repo.url}">${repo.name}</a></li>`
}

function displayResults(response) {
    console.log('displayResults ran.')
    let results = ``;
    for (let i = 0; i < response.length; i++) {
        results += formatRepo(response[i]);
    }
    $('.results ul').empty();
    $('.results ul').append(results);
}

function getRepos(username) {
    console.log(`getRepos ran.`)

    const url = `https://api.github.com/users/${username}/repos`;

    const options = {
        headers: new Headers({
            "Accept": "application/vnd.github.v3+json"
        })
    }

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            $('.error-msg').text(`Error: ${response.statusText}`)
            throw new Error(response.statusText);
        })
        .then(response => displayResults(response))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        console.log("watchForm ran");
        const username = $('#js-username').val();
        console.log(`${username} is the entered username.`);
        getRepos(username);
    });
}

$(watchForm)