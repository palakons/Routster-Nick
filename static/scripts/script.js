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
        },
        {
            "user": {
                "full_name": "สตอเบอรี่แมสะงะ เชียงใหม่"
            },
            "caption": {
                "created_time": 1481376384
            },
            "images": {
                "standard_resolution": {
                    'url': 'https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/15306704_303696423358047_5609794361698025472_n.jpg'
                }
            },
            "location": {
                "name": "Mae Sa-nga, Chiang Mai,",
                "latitude": 18.7512524,
                "longitude": 98.3700802
            }
        },
        {
            "user": {
                "full_name": "Lubuk Lobster"
            },
            "caption": {
                "created_time": 1481376384
            },
            "images": {
                "standard_resolution": {
                    'url': 'https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/12751212_1045563238837494_240075269_n.jpg'
                }
            },
            "location": {
                "name": "Lubuk Lobster",
                "latitude": 2.996569,
                "longitude": 101.660115
            }
        },
        {
            "user": {
                "full_name": "NUI"
            },
            "caption": {
                "created_time": 1486278998
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/16230272_408927409450453_2631686986661888000_n.jpg"
                }
            },
            "location": {
                "name": "เกาะค้างคาว หมู่เกาะกำ",
                "latitude": 9.5686164,
                "longitude": 98.3814224
            }
        },
        {
            "user": {
                "full_name": "NUI"
            },
            "caption": {
                "created_time": 1489739702
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/17265719_424159031251294_7162171992613847040_n.jpg"
                }
            },
            "location": {
                "name": "Hollywood Road, Hong Kong",
                "latitude": 22.283891,
                "longitude": 114.1491284
            }
        },
        {
            "user": {
                "full_name": "NUI"
            },
            "caption": {
                "created_time": 1489577633
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/17267465_1741567886153446_933664716931203072_n.jpg"
                }
            },
            "location": {
                "name": "Sai Wan Swimming Shed",
                "latitude": 22.2799159,
                "longitude": 114.1152625
            }
        },
        {
            "user": {
                "full_name": "NUI"
            },
            "caption": {
                "created_time": 1483009817
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/15625395_1066464593462803_4199525069619200000_n.jpg"
                }
            },
            "location": {
                "name": "ทุ่งบัวแดง อ.กุมภวาปี อุดร",
                "latitude": 17.2123842,
                "longitude": 103.0322813
            }
        },
        {
            "user": {
                "full_name": "NUI"
            },
            "caption": {
                "created_time": 1478860222
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/15034877_1733540730301397_7438492128101007360_n.jpg"
                }
            },
            "location": {
                "name": "น้ำตกภูซาง อ.ภูซาง จ.พะเยา",
                "latitude": 19.6103012,
                "longitude": 100.4262293
            }
        },
        {
            "user": {
                "full_name": "NUI"
            },
            "caption": {
                "created_time": 1479284020
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/14677310_1801760286768800_3808855810742681600_n.jpg"
                }
            },
            "location": {
                "name": "ทุ่งกังหันลมเขาค้อ เพชรบูรณ์",
                "latitude": 16.6864526,
                "longitude": 100.9916764
            }
        },
        {
            "user": {
                "full_name": "NUI"
            },
            "caption": {
                "created_time": 1479887937
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/14482306_1801997870088324_3872466020153163776_n.jpg"
                }
            },
            "location": {
                "name": "ยอดเขาสะแกกรัง วัดสังกัสรัตนคีรี จ.อุทัยธานี",
                "latitude": 15.375475,
                "longitude": 100.0152962
            }
        },
        {
            "user": {
                "full_name": "NUI"
            },
            "caption": {
                "created_time": 1479528519
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/15101802_1277559712304565_4600709331854295040_n.jpg"
                }
            },
            "location": {
                "name": "เขื่อนภูมิพล จ ตาก, Bhumibhol Dam, Tak",
                "latitude": 17.2425051,
                "longitude": 98.9700333
            }
        },
        {
            "user": {
                "full_name": "NUI"
            },
            "caption": {
                "created_time": 1479983753
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/14134666_114056942414188_2281815201223278592_n.jpg"
                }
            },
            "location": {
                "name": "สะพานเดชาติวงศ์ นครสวรรค์",
                "latitude": 15.6881674,
                "longitude": 100.121419
            }
        },
        {
            "user": {
                "full_name": "NUI"
            },
            "caption": {
                "created_time": 1480061713
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/15043885_375535606117956_6726315116528140288_n.jpg"
                }
            },
            "location": {
                "name": "อุทยานนกน้ำบึงบอระเพ็ด จังหวัดนครสวรรค์",
                "latitude": 15.7028538,
                "longitude": 100.1584172
            }
        }, {
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
                "full_name": "Yuna A"
            },
            "caption": {
                "created_time": 1483499459
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/15802351_360445294331894_4678614541045596160_n.jpg"
                }
            },
            "location": {
                "name": "Theanna Eco Villa and Spa",
                "latitude": -8.646383,
                "longitude": 115.13966
            }
        },
        {
            "user": {
                "full_name": "Yuna A"
            },
            "caption": {
                "created_time": 1481472757
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/14582401_1749174075403730_5368962965452095488_n.jpg"
                }
            },
            "location": {
                "name": "Shanghai, China",
                "latitude": 31.2243084,
                "longitude": 120.9162604
            }
        },
        {
            "user": {
                "full_name": "Yuna A"
            },
            "caption": {
                "created_time": 1473140904
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/14272190_1373202339376142_309845740_n.jpg"
                }
            },
            "location": {
                "name": "Vasquez Rocks",
                "latitude": 34.4885142,
                "longitude": -118.3228826
            }
        },
        {
            "user": {
                "full_name": "Yuna A"
            },
            "caption": {
                "created_time": 1489390097
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/17126585_1985922124963950_6215454431983435776_n.jpg"
                }
            },
            "location": {
                "name": "Setia City Park",
                "latitude": 3.1097327,
                "longitude": 101.4573294
            }
        },
        {
            "user": {
                "full_name": "Michelle Yeoh"
            },
            "caption": {
                "created_time": 1481694456
            },
            "images": {
                "standard_resolution": {
                    "url": "https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/sh0.08/e35/p640x640/15338515_182331002234404_2681667705769033728_n.jpg"
                }
            },
            "location": {
                "name": "Paris",
                "latitude": 48.8589507,
                "longitude": 2.2775167
            }
        }
        ]
    };
    sample = {
        "data": [
            {
                "user": {
                    "full_name": "สตอเบอรี่แมสะงะ เชียงใหม่"
                },
                "caption": {
                    "created_time": 1481376384
                },
                "images": {
                    "standard_resolution": {
                        'url': 'https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/15306704_303696423358047_5609794361698025472_n.jpg'
                    }
                },
                "location": {
                    "name": "Mae Sa-nga, Chiang Mai,",
                    "latitude": 18.7512524,
                    "longitude": 98.3700802
                }
            }
        ]
    };

    var url = '/putIG';
    function callback(data, textStatus, jqXHR) {
        console.log(data);
    }

    console.log('going to send this putIG...',sample);
    $.post(url, sample, callback);
}