
//var modelId = 'ml-JXDMJuy8lgk';
var modelId = 'ml-VSdUx0D5JkG';
var MLendPoint = 'https://realtime.machinelearning.us-east-1.amazonaws.com/';

    app.post('/whatCity', function (req, res) {
        //recieve base64
        var base64Data = req.body.img;
        console.log('get this data', req.body);
        //rekognition
        var params = {
            Image: {
                /*S3Object: {
                    Bucket: s3Bucket,
                    Name: '1489721804780'
                }*/
                Bytes: new Buffer(base64Data, 'base64')//no headers
            },
            MaxLabels: 999,
            MinConfidence: 0
        };
        var rekognition = new AWS.Rekognition();
        rekognition.detectLabels(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {           // successful response
                console.log(data);
                var rResult = data;
                var reverse = {}
                rResult.OrientationCorrection = { 'S': rResult.OrientationCorrection };
                for (var jj in rResult.Labels) {
                    reverse[rResult.Labels[jj].Name] = rResult.Labels[jj].Confidence;
                    rResult.Labels[jj].Name = { 'S': rResult.Labels[jj].Name };
                    rResult.Labels[jj].Confidence = { 'N': rResult.Labels[jj].Confidence.toString() };
                    rResult.Labels[jj] = { 'M': { 'Name': rResult.Labels[jj].Name, 'Confidence': rResult.Labels[jj].Confidence } };
                }
                rResult.Labels = { 'L': rResult.Labels };
                rResult = { 'M': rResult };
                console.log('after process');
                console.log(rResult);
                //convert to feature

                var feature = {};
                var fRecord = {};
                for (var i in featureList) {
                    var featureList = ["Architecture", "Building", "Downtown", "City", "Town", "Urban", "Metropolis", "Housing", "Mansion", "Tower", "Spire", "Steeple", "Castle", "High Rise", "Palace", "Worship", "Temple", "Shrine", "Waterfront", "Town Square", "Plaza", "Port", "Harbor", "Outdoors", "Monastery", "Pagoda", "Hotel", "Resort", "Convention Center", "Road", "Office Building", "Water", "Street", "Skyscraper", "Dock", "Landing", "Marina", "Plant", "Art", "Nature", "Church", "Statue", "Sculpture", "Person", "Amusement Park", "Dome", "Landscape", "Scenery", "Sea", "Tree", "Coast", "Carnival", "Festival", "Park", "Summer", "Tropical", "Forest", "Vegetation", "Crowd", "Apartment Building", "Furniture", "Aerial View", "Parade", "Hat", "Kid", "Child", "Land", "People", "Grassland", "Field", "Jungle", "Grass", "Villa", "Shop", "Roof", "Pool", "Bay", "Indoors", "Path", "Neighborhood", "Palm Tree", "Room", "Leisure Activities", "Walkway", "Swimming Pool", "Island", "Market", "Bazaar", "Fountain", "Lake", "Human", "Beach", "Rainforest", "Parliament", "Flower", "Yard", "Blossom", "Intersection", "Backyard", "Flora", "Mountain", "Lighting", "Pedestrian", "Lagoon", "Alley", "Alleyway", "River", "Vessel", "Rock", "Lobby", "Reception", "Buddha", "Freeway", "Night", "Sidewalk", "Cathedral", "Ocean", "Tourist", "Ship", "Gold", "Highway", "Vehicle", "Boat", "Fort", "Map", "Atlas", "Waterfall", "Grove", "Sky", "Costume", "Ruins", "Beacon", "Bridge", "Deck", "Lighthouse", "Pier", "Altar", "Baby", "Poster", "Shopping Mall", "Column", "Sunset", "Sunrise", "Modern Art", "Campus", "Flyer", "Patio", "Food", "Garden", "Dusk", "Corridor", "Clothing", "Dawn", "Boardwalk", "Terrace", "Mosque", "Dress", "Fence", "Ancient Egypt", "Watercraft", "Potted Plant", "Leaf", "Construction", "Hedge", "Playground", "Clock Tower", "Bell Tower", "Red Sky", "Cafeteria", "Cottage", "Tile", "Mosaic", "Train", "Pillar", "Traffic Jam", "Rowboat", "Night Life", "Auditorium", "Night Club", "Restaurant", "Cap", "Car", "Soil", "Water Park", "Bar Counter", "Diver", "Diving", "Cliff", "Snorkeling", "Bicycle", "Brochure", "Shack", "Aisle", "Pub", "Throne", "Log Cabin", "Porch", "Hut", "Fir", "Sand", "Cyclist", "Interior Design", "Sign", "Hammock", "Kitchen", "Pavement", "Overpass", "Suspension Bridge", "Wood", "Train Station", "Text", "Hall", "Tabletop", "Table", "House", "Canoe", "Sport", "Monument", "Deli", "Concert", "Collage", "Transportation", "Countryside", "Lumber", "Arena", "Promontory", "Diagram", "Plan", "Maillot", "Swimwear", "Stadium", "Factory", "Meal", "Bowl", "Rail", "Gazebo", "Hippie", "Food Court", "Parthenon", "Adventure", "Trail", "Grocery Store", "Accessories", "Theater", "Selfie", "Ballroom", "Conifer", "Subway", "Roller Coaster", "Coaster", "Trademark", "Logo", "Automobile", "Cherry Blossom", "Canopy", "Laughing", "Cabin", "Smile", "Rope Bridge", "Mushroom", "Refinery", "Bus", "Pine", "Spruce", "Agaric", "Swimming", "Machine", "Van", "Lunch", "Sunlight", "Audience", "Greeting Card", "Apartment", "Spring Break", "Balcony", "Ferris Wheel", "Cove", "Drawing", "Light", "Engine", "Motor", "Dining Room", "Stage", "Team", "Arch", "Troop", "Shelter", "Kayak", "Cafe", "Canal", "Tribe", "Boutique", "Spa", "Belt", "Carousel", "Mail", "Face", "Cruise Ship", "Ocean Liner", "Caravan", "Reception Room", "Waiting Room", "Moss", "Dinner", "Supper", "Trolley", "Streetcar", "Universe", "Outer Space", "Prayer Beads", "Club", "Bikini", "Terminal", "Shorts", "Barge", "Monorail", "Railway", "Bike", "Locomotive", "Sea Life", "Carpet", "Tubing", "Flare", "Living Room", "Hair", "Candy", "Confectionery", "Sweets", "Cable Car", "Yew", "Aircraft", "Paper", "Rock Concert", "Fireworks", "Tapestry", "Lamp", "Vegetable", "Billboard", "Footwear", "Shoe", "Fruit", "Monk", "Pond", "Female", "Sedan", "Rafting", "Lady", "Woman", "Bench", "Tugboat", "Aquatic", "Ambulance", "Fish", "Observatory", "Planetarium", "Battleship", "Maple", "Animal", "Peninsula", "Wilderness", "Mammal", "Cobblestone", "Vault Ceiling", "Bakery", "Suv", "Chandelier", "Hot Rod", "Music Band", "Ice", "Snow", "Hacienda", "Label", "Fractal", "Airliner", "Airplane", "Flight", "Jet", "Flying", "Walking", "Nebula", "Moat", "Seafood", "Space", "Bead", "Tree Trunk", "Salad", "Sitting", "Produce", "Money", "Bread", "Pita", "World", "Sycamore", "Oak", "Floor", "Wagon", "Tree House", "Sun", "Flag", "Destroyer", "Umbrella", "Emblem", "Girl", "Flooring", "Menu", "Mountain Range", "Hiking", "Train Track", "Banana Boat", "Portrait", "Cruiser", "Museum", "Ditch", "Dinghy", "Sailboat", "Arch Bridge", "Buffet", "Dance Pose", "Elephant", "Car Show", "Lizard", "Reptile", "Can", "Canned Goods", "Tin", "Arctic", "Iceberg", "Sink", "Court", "Screen", "Gear", "Space Station", "Tent", "Camping", "Mountain Tent", "License", "Outrigger", "Banner", "Yacht", "American Flag", "Lilac", "Lightning", "Dish", "Plate", "Coat", "Weather", "Cabbage", "Kale", "Finger", "Marching", "Assembly Line", "Tram", "Bungee", "GPS", "Bird", "Poultry", "Turkey Bird", "Race Car", "Sports Car", "Electronics", "Phone", "Galaxy", "Milky Way", "Cell Phone", "Mobile Phone", "Aquarium", "Rope", "Swing", "Rainbow", "Bush", "Dirt Road", "Gravel", "Birch", "Wheel", "Wall", "Petal", "Geranium", "Exercise", "Fitness", "Jogging", "Flood", "Bracelet", "Jewelry", "Bead Necklace", "Rosary", "Glass", "Lawn", "Jacuzzi", "Tub", "Cinema", "Fisheye", "File", "Webpage", "Gondola", "Airship", "Blimp", "Flower Arrangement", "Planting", "Flower Bouquet", "Arecaceae", "Awning", "Astronomy", "Apparel", "T-Shirt", "Beverage", "Bottle", "Mineral Water", "Water Bottle", "Jar", "Slum", "Ferry", "Freighter", "Tanker", "Brass Section", "Underwater", "Sea Waves", "Farm", "Pasture", "Ranch", "Rural", "Word", "Drawbridge", "Tsunami", "Hill", "Horizon", "Park Bench", "Sun Hat", "Cab", "Taxi", "Globe", "Planet", "Sphere", "Bunker", "Fireplace", "Hearth", "Hole", "Cradle", "Crib", "Corn", "Grain", "Crest", "Peak", "Silhouette", "Starry Sky", "Savanna", "Cactus", "Fire", "Jeep", "Disco", "Music", "Kicking", "Tulip", "Noodle", "Pasta", "Marathon", "Running", "Ice Skating", "Rink", "Skating", "Onion", "Shallot", "Box", "Crate", "Fried Chicken", "Bbq", "Puffer", "Dance", "Performer", "Butterfly", "Insect", "Invertebrate", "Monarch", "Ornament", "Navy", "Denim", "Jeans", "Pants", "Conference Room", "Meeting Room", "Monitor", "Dam"];
                    feature[i] = reverse[featureList[i]] ? reverse[featureList[i]] : 0;
                    fRecord[featureList[i]] = feature[i];
                }
                //use ML
                var params = {
                    MLModelId: modelId, /* required */
                    PredictEndpoint: MLendPoint, /* required */
                    Record: fRecord
                    //{ /* required */
                    //someKey: 'STRING_VALUE',
                    /* anotherKey: ... */
                    //}
                };
                console.log('predict param', params);
                var machinelearning = new AWS.MachineLearning();
                machinelearning.predict(params, function (err, data) {
                    if (err) console.log(err, err.stack); // an error occurred

                    else {          // successful response
                        console.log('predicted done');
                        res.status(200).json(data);
                    }
                });
                // tell city
            }
        });
    });

    app.post('/labels', function (req, res) {
        //recieve base64
        var base64Data = req.body.img;
        console.log('get this data', req.body);
        //rekognition
        var params = {
            Image: {
                /*S3Object: {
                    Bucket: s3Bucket,
                    Name: '1489721804780'
                }*/
                Bytes: new Buffer(base64Data, 'base64')//no headers
            },
            MaxLabels: 999,
            MinConfidence: 0
        };
        var rekognition = new AWS.Rekognition();
        rekognition.detectLabels(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {           // successful response
                console.log(data);
                var rResult = data;
                var reverse = {}
                rResult.OrientationCorrection = { 'S': rResult.OrientationCorrection };
                for (var jj in rResult.Labels) {
                    reverse[rResult.Labels[jj].Name] = rResult.Labels[jj].Confidence;
                    rResult.Labels[jj].Name = { 'S': rResult.Labels[jj].Name };
                    rResult.Labels[jj].Confidence = { 'N': rResult.Labels[jj].Confidence.toString() };
                    rResult.Labels[jj] = { 'M': { 'Name': rResult.Labels[jj].Name, 'Confidence': rResult.Labels[jj].Confidence } };
                }
                rResult.Labels = { 'L': rResult.Labels };
                rResult = { 'M': rResult };
                console.log('after process');
                console.log(rResult);
                res.status(200).json(data);
                //convert to feature
            }
        });
    });
    app.get('/mlData', function (req, res) {

        var N = req.query.N || 20;
        var thresh = req.query.thresh;
        console.log('get N,th: ', N, thresh);
        var params = {
            TableName: ddbTable
        };

        console.log("Scanning table.");
        var wholeTable = {
            Count: 0,
            Items: [],
            ScannedCount: 0
        };
        ddb.scan(params, onScan);
        function onScan(err, data) {
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                // print all the movies
                console.log("Scan succeeded.");
                //console.log(JSON.stringify(data));
                wholeTable = {
                    Count: wholeTable.Count + data.Count,
                    Items: wholeTable.Items.concat(data.Items),
                    ScannedCount: wholeTable.ScannedCount + data.ScannedCount
                }

                // continue scanning if we have more movies, because
                // scan can retrieve a maximum of 1MB of data
                if (typeof data.LastEvaluatedKey != "undefined") {
                    console.log("Scanning for more...");
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                    ddb.scan(params, onScan);
                } else {
                    console.log("Scan done. " + wholeTable.Count + ', ' + wholeTable.Items.length + " items");

                    //poll all tag
                    //count each tag
                    //make reverse index
                    var labels = {};
                    var mlTable = [];
                    wt = wholeTable;
                    for (var i in wt.Items) {
                        if (!mlTable[wt.Items[i].url.S])
                            mlTable[wt.Items[i].url.S] = [];
                        for (var j in wt.Items[i].rekObj.M.Labels.L) {
                            if (labels[wt.Items[i].rekObj.M.Labels.L[j].M.Name.S] == undefined) {
                                labels[wt.Items[i].rekObj.M.Labels.L[j].M.Name.S] = 1;
                            } else {
                                labels[wt.Items[i].rekObj.M.Labels.L[j].M.Name.S]++;
                            }
                            mlTable[wt.Items[i].url.S][wt.Items[i].rekObj.M.Labels.L[j].M.Name.S] = parseFloat(wt.Items[i].rekObj.M.Labels.L[j].M.Confidence.N);
                        }
                    }
                    var sortable = []
                    for (var i in labels) {
                        sortable.push([i, labels[i]]);
                    }
                    sortable.sort(function (a, b) {
                        return b[1] - a[1];
                    });

                    //pick Max N 
                    var goodFeature = sortable.slice(0, N)

                    //make sortable
                    var completeTable = [];
                    //var urls = [];
                    var cityImages = [];
                    var features = [];
                    for (var i in wt.Items) {
                        if (!completeTable[i])
                            completeTable[i] = [];
                        for (var j in goodFeature) {
                            completeTable[i][j] = mlTable[wt.Items[i].url.S][goodFeature[j][0]] || 0.;
                            if (thresh) {
                                completeTable[i][j] = completeTable[i][j] > thresh ? 1 : 0;
                            }
                            if (i == 0) {
                                features[j] = goodFeature[j][0];
                            }
                        }
                        //urls[i] = wt.Items[i].url.S;
                        cityImages[i] = wt.Items[i];
                    }

                    //output table
                    //var outputStr = 'url,airport,city';
                    var outputStr = 'city';
                    for (var i in features) {
                        outputStr += ',' + features[i];
                    }
                    outputStr += '\n'
                    for (var i in cityImages) {
                        //outputStr += '"' + cityImages[i].url.S + '","' + cityImages[i].AP_CODE.S + '","' + cityImages[i].city.S + '"';
                        outputStr += '"' + cityImages[i].city.S + '"';
                        for (var j in completeTable[i]) {

                            outputStr += ',' + completeTable[i][j];
                        }
                        outputStr += '\n'
                    }

                    res.status(200).json({});

                    var s3 = new AWS.S3();
                    var contentType = 'text/csv';
                    var s3Key = 'MLData/' + makeS3Key(N + (thresh ? '-' + thresh : ''), contentType);
                    console.log('training data key ' + s3Key);

                    var s3Params = {
                        Bucket: s3Bucket, /* required */
                        Key: s3Key, /* required */
                        Body: outputStr,
                        ContentType: contentType
                    };
                    s3.putObject(s3Params, function (err, data) {
                        if (err) {
                            console.log('put error', err, err.stack); // an error occurred
                        } else {            // successful response
                            console.log('push done ' + outputStr.length, data);
                        }
                    });
                }
            }
        }
    });

    app.post('/putImage', function (req, res) {

        var items = req.body.images;

        for (var i in items) {
            console.log(new Date().toString());

            items[i].url = { 'S': items[i].url };
            items[i].AP_CODE = { 'S': items[i].AP_CODE };
            items[i].city = { 'S': items[i].city };

            //v.40: check file exists
            getbase64FromUrl(items[i].url, function (contentType, urlHeader, base64Data) {
                i = this.i;
                if (base64Data.length == 0) {
                    console.log('file not found: ' + items[i].url.S);
                } else {
                    console.log('file exists: ' + items[i].url.S);

                    console.log('table ' + ddbTable);
                    var params = {
                        'TableName': ddbTable,
                        'Item': extend(items[i], {}),
                        //v.39: make sure no duplicate records
                        'Expected': {
                            'url': { 'Exists': false }
                        }
                    };
                    //console.log(params);
                    ddb.putItem(
                        params
                        , function (err, data) {
                            i = this.i;
                            contentType = this.contentType;
                            base64Data = this.base64Data;
                            if (err) {
                                var returnStatus = 500;

                                if (err.code === 'ConditionalCheckFailedException') {
                                    returnStatus = 409;
                                }
                                console.log('DDB Error: ' + err);
                                console.log(items[i]);
                            } else {

                                //put in S3 bucket
                                //var s3 = new AWS.S3({ region: 'us-east-1' });
                                var s3 = new AWS.S3();
                                //var s3Key = Date.now() + (items[i].url.S.lastIndexOf('.') - items[i].url.S.length >= -5 ? items[i].url.S.substring(items[i].url.S.lastIndexOf('.'), items[i].url.S.length) : '');
                                var s3Key = 'images/' + makeS3Key('', contentType);
                                console.log('fname ' + s3Key);
                                console.log('type ' + contentType);

                                var params = {
                                    Bucket: s3Bucket, /* required */
                                    Key: s3Key, /* required */
                                    Body: new Buffer(base64Data, 'base64'),
                                    ContentEncoding: 'base64',
                                    ContentType: contentType
                                };
                                s3.putObject(params, function (err, data) {
                                    i = this.i;
                                    s3Key = this.s3Key;
                                    if (err) {
                                        console.log(err, err.stack); // an error occurred
                                    } else {            // successful response
                                        console.log(data);
                                        var params = {
                                            TableName: ddbTable,
                                            Key: {
                                                "url": items[i].url
                                            },
                                            UpdateExpression: "SET s3Key=:k ",
                                            ExpressionAttributeValues: {
                                                ":k": { 'S': s3Key }
                                            }/*,
                                        ReturnValues: "UPDATED_NEW"*/
                                        };

                                        console.log("Updating the item...", params);
                                        ddb.updateItem(params, function (err, data) {
                                            if (err) {
                                                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                                            } else {
                                                console.log("UpdateItem s3key succeeded:", JSON.stringify(data, null, 2));
                                            }
                                        });
                                    }
                                }.bind({ s3Key: s3Key, i: i }));


                                //rekognition
                                var params = {
                                    Image: {
                                        /*S3Object: {
                                            Bucket: s3Bucket,
                                            Name: '1489721804780'
                                        }*/
                                        Bytes: new Buffer(base64Data, 'base64')
                                    },
                                    MaxLabels: 999,
                                    MinConfidence: 0
                                };
                                //console.log(JSON.stringify(params));
                                var rekognition = new AWS.Rekognition();
                                rekognition.detectLabels(params, function (err, data) {
                                    i = this.i;
                                    if (err) console.log(err, err.stack); // an error occurred
                                    else {           // successful response
                                        console.log(data);
                                        var rResult = data;
                                        rResult.OrientationCorrection = { 'S': rResult.OrientationCorrection };
                                        for (var jj in rResult.Labels) {
                                            rResult.Labels[jj].Name = { 'S': rResult.Labels[jj].Name };
                                            rResult.Labels[jj].Confidence = { 'N': rResult.Labels[jj].Confidence.toString() };
                                            rResult.Labels[jj] = { 'M': { 'Name': rResult.Labels[jj].Name, 'Confidence': rResult.Labels[jj].Confidence } };
                                        }
                                        rResult.Labels = { 'L': rResult.Labels };
                                        rResult = { 'M': rResult };
                                        console.log('after process');
                                        console.log(rResult);
                                        // Update the item, for rekognition
                                        var params = {
                                            TableName: ddbTable,
                                            Key: {
                                                "url": items[i].url
                                            },
                                            UpdateExpression: "SET rekObj=:r ",
                                            ExpressionAttributeValues: {
                                                ":r": rResult
                                            }
                                        };

                                        console.log("Updating the item...", params);
                                        ddb.updateItem(params, function (err, data) {
                                            if (err) {
                                                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                                            } else {
                                                console.log("UpdateItem rekObjsucceeded:", JSON.stringify(data, null, 2));
                                            }
                                        });
                                    }
                                }.bind({ i: i }));
                            }
                        }.bind({ i: i, base64Data: base64Data, contentType: contentType }));
                }
            }.bind({ i: i }));
        }
        res.status(200).json({ 'status': 'successful' });
    });
