async function rj(data)
{

    const response = await fetch("./data1.json");
    var data2 = await response.json();
    console.log(data2);
    var new7 = data2.users;
    var result = new7.filter(function (part) {
        return (part.Device == device[1]);
    });
    console.log(result);
    result[0].Data= data;
    console.log(data2);
    $.ajax({
    type: "POST",
    url: "json.php",
    data: {json : JSON.stringify(data2)},
});

}

var parameters = location.search.substring(1).split("&");

var device = parameters[0].split("=");

document.getElementById("name").textContent = device[1]+" Configurator";

var searchbutton = document.getElementById("searchButton");

searchbutton.addEventListener("click", function () {
    var data = document.getElementById("textdata").value;
    rj(data);
});

console.log(device);

//rj();

