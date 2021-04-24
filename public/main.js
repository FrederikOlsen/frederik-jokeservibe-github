// globals
let grid = document.getElementById('test');

function main() {
    console.log("main bliver kaldt");
    fetchJokes();
}
main();

function fetchJokes() {
    console.log("fetchJokes() bliver kaldt");

    let url = window.location.href + '/jokes';

    fetch(url)
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data);

    })
}