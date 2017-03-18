function processTextArea(domId) {
    var items = [];
    var lines = $('#' + domId).val().split('\n');
    console.log(lines);
    for (var i = 0; i < lines.length; i++) {
        //code here using lines[i] which will give you each line
        var item = lines[i].split('#');
        if (item.indexOf('') == -1) {
            items.push({
                'url': item[0],
                'AP_CODE': item[1],
                'city': item[2]
            });
        }
    }
    return items;
}
function getData(json) {

    var url = '/putImage';
    function callback(data, textStatus, jqXHR) {
        console.log(data);
    }

    console.log('going to send this...');
    console.log(json);
    $.post(url, { 'images': json }, callback);
}
function buttonClick() {
    //getData(processTextArea('sourceText'));
    var json = processTextArea('sourceText');
    //console.log(json);
    for (var i in json) {
        getData([json[i]]);
    }
}
function whatCity() {

    var inputId = 'sourceText2';
    var url = '/labels';
    function callback(data, textStatus, jqXHR) {
        console.log(data);
    }

    console.log('going to send this whatCity...', { 'img': $('#' + inputId)[0].value });
    $.post(url, { 'img': $('#' + inputId)[0].value }, callback);
}
function updateTable(inputId, domId) {

    var text = '<table class = "table"><thead><tr><th>No.</th><th>Airport</th><th>city</th><th>url</th></tr></thead><tbody>';

    var lines = $('#' + inputId).val().split('\n');
    for (var i in lines) {
        var item = lines[i].split('#');
        text += '<tr><td>' + i + '</td><td>' + item[1] + '</td><td>' + item[2] + '</td><td>' + item[0] + '</td></tr>';
    }
    text += '</tbody></table>';
    $('#' + domId)[0].innerHTML = text;
}
function callIG() {
    var sample = {
        "data": [{
            "comments": {
                "count": 0
            },
            "caption": {
                "created_time": "1296710352",
                "text": "Inside le truc #foodtruck",
                "from": {
                    "username": "kevin",
                    "full_name": "Kevin Systrom",
                    "type": "user",
                    "id": "3"
                },
                "id": "26621408"
            },
            "likes": {
                "count": 15
            },
            "link": "http://instagr.am/p/BWrVZ/",
            "user": {
                "username": "kevin",
                "full_name": "Kevin Systrom",
                "profile_picture": "http://distillery.s3.amazonaws.com/profiles/profile_3_75sq_1295574122.jpg",
                "id": "3"
            },
            "created_time": "1296710327",
            "images": {
                "low_resolution": {
                    "url": "http://distillery.s3.amazonaws.com/media/2011/02/02/6ea7baea55774c5e81e7e3e1f6e791a7_6.jpg",
                    "width": 306,
                    "height": 306
                },
                "thumbnail": {
                    "url": "http://distillery.s3.amazonaws.com/media/2011/02/02/6ea7baea55774c5e81e7e3e1f6e791a7_5.jpg",
                    "width": 150,
                    "height": 150
                },
                "standard_resolution": {
                    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJeASsQnKnr95B6DLSYN3IfwpnN3hmbVoGJzmZY_9wjHyf_zmK",
                    "width": 612,
                    "height": 612
                }
            },
            "type": "image",
            "users_in_photo": [],
            "filter": "Earlybird",
            "tags": ["foodtruck"],
            "id": "22721881",
            "location": {
                "latitude": 37.778720183610183,
                "longitude": -122.3962783813477,
                "id": "520640",
                "street_address": "",
                "name": "Le Truc"
            }
        }]
    };


    var url = '/putIG';
    function callback(data, textStatus, jqXHR) {
        console.log(data);
    }

    console.log('going to send this putIG...');
    $.post(url, sample, callback);
}