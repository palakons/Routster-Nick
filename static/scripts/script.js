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

    console.log('going to send this whatCity...',{ 'img': $('#' + inputId)[0].value });
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