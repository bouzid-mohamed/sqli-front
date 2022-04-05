export default function getData() {
    fetch('../../data/data.json'
        , {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
        });
}