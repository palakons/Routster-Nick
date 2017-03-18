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
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/16230601_1780814025572841_3618244784189079552_n.jpg",
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
sample = {
    "data": [
        {
            "user": {
                "full_name": "davikah"
            },
            "caption": {
                "created_time": 1489810757
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/17266257_1078103035669450_7406009006973517824_n.jpg"
                }
            },
            "location": {
                "name": "Seoul, South Korea",
                "latitude": 37.5652894,
                "longitude": 126.8494627
            }
        },
        {
            "user": {
                "full_name": "Gavind"
            },
            "caption": {
                "created_time": 1488801227
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/16908002_1486749728023722_7828157262278426624_n.jpg"
                }
            },
            "location": {
                "name": "อุทธยานหินเขางู @ราชบุรี",
                "latitude": 13.5703095,
                "longitude": 99.773828
            }
        },
        {
            "user": {
                "full_name": "kalamare"
            },
            "caption": {
                "created_time": 1489575639
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/17077409_737148169775469_3567569225272786944_n.jpg"
                }
            },
            "location": {
                "name": "Ubud",
                "latitude": -8.49605,
                "longitude": 115.2310197
            }
        },
        {
            "user": {
                "full_name": "Mark"
            },
            "caption": {
                "created_time": 1485709433
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/16230040_398588553808811_2760027833601359872_n.jpg"
                }
            },
            "location": {
                "name": "Paris Eiffel Tour",
                "latitude": 48.8583736,
                "longitude": 2.2922926
            }
        },
        {
            "user": {
                "full_name": "Mark"
            },
            "caption": {
                "created_time": 1475393253
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/14540407_343229172685038_1553770205342072832_n.jpg"
                }
            },
            "location": {
                "name": "เสาชิงช้า Giant Swing",
                "latitude": 13.7518235,
                "longitude": 100.4990445
            }
        },
        {
            "user": {
                "full_name": "Mint Ardhawadee Jiramaneekul"
            },
            "caption": {
                "created_time": 1488197575
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/16906736_988792487930886_8453276175819603968_n.jpg"
                }
            },
            "location": {
                "name": "หมู่เกาะมังกร - Lord Loughborough",
                "latitude": 10.4491791,
                "longitude": 97.8482642
            }
        },
        {
            "user": {
                "full_name": "Napatsanun Srisuttisan"
            },
            "caption": {
                "created_time": 1489643305
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/17333327_1887784168136639_2653234725916770304_n.jpg"
                }
            },
            "location": {
                "name": "Forbidden City",
                "latitude": 39.9163488,
                "longitude": 116.3949659
            }
        },
        {
            "user": {
                "full_name": "Sutthatip Srisukvattananan"
            },
            "caption": {
                "created_time": 1473777454
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/14310796_1569095363399543_1294080519_n.jpg"
                }
            },
            "location": {
                "name": "Veranda Resort Pattaya - MGallery by Sofitel",
                "latitude": 12.8592342,
                "longitude": 100.8946503
            }
        },
        {
            "user": {
                "full_name": "Lee natalie"
            },
            "caption": {
                "created_time": 1489855038
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/17333689_374036296316335_481545634373959680_n.jpg"
                }
            },
            "location": {
                "name": "Kanchanaburi",
                "latitude": 14.0362449,
                "longitude": 99.041328
            }
        },
        {
            "user": {
                "full_name": "nichari chokprajakchat"
            },
            "caption": {
                "created_time": 1489491830
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/17266266_167704250412514_4929573745053401088_n.jpg"
                }
            },
            "location": {
                "name": "หมู่เกาะมังกร - Lord Loughborough",
                "latitude": 10.4491791,
                "longitude": 97.8482642
            }
        }
    ]
};

    var url = '/putIG';
    function callback(data, textStatus, jqXHR) {
        console.log(data);
    }

    console.log('going to send this putIG...');
    $.post(url, sample, callback);
}