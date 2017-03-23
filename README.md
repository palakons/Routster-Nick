# Team Routster - Airvolution 2017: Photo Matching Backends
These codes handle backend for image matching with ones already pre-processed
input is a url to the target image
output will be the list of images that "match" along with name, code, and corrdinate fo teh nearest airport, sorted by matching "score"

## make sure aws-sdk version is later than 2.11.0
there is npm bug prevent updating
Run `npm update aws-sdk` 

## Start Server
* update region code name line 5825 in app.js

  `AWS.config.region = process.env.REGION || '<region code here>';`
* update DynamoDB table name line 5829 in app.js

  `var ddbTable = process.env.TRAINING_IMAGE_TABLE || '<DynamoDB table name here>';`
* update S3 bucket name line 10 in app.js

  `var s3Bucket = process.env.TRAINING_IMAGE_BUCKET || '<S3 bucket name here>';`
* Run 

  `node app.js` 

## Endpoints
### Pre-processing: Put "Celeb" image into DB

  POST ./putIG  

```JavScript
{
    "data": [
        {
            "user": {
                "full_name": "Lubuk Lobster"
            },
            "caption": {
                "created_time": 1481376384
            },
            "images": {
                "standard_resolution": {
                    'url':'https://instagram.fkul10-1.fna.fbcdn.net/t51.2885-15/e35/12751212_1045563238837494_240075269_n.jpg'
                }
            },
            "location": {
                "name": "Lubuk Lobster",
                "latitude": 2.996569,
                "longitude": 101.660115
            }
        }
    ]
}
```


### Get similar images

  GET ./igList
  
  parameter:
  `url`: target image url
