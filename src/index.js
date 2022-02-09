const express = require('express')
const app = express()
const port = process.env.PORT || 8000


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/auth/:token',(req, res) => {
    if(req.params.token === 'allowAll'){
        res.json([
            {
            "Effect": "Allow",
            "Action": [
                "iot:*"
            ],
            "Resource": [
                "*"           
            ]
        }])
    }
    else if(req.params.token === 'allow'){
        res.json([
            {
            "Effect": "Allow",
            "Action": [
                "iot:Publish"
            ],
            "Resource": [
                "arn:aws:iot:us-east-1:381975159270:topic/${iot:ClientId}",
                "arn:aws:iot:us-east-1:381975159270:topic/${iot:ClientId}/count"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "iot:Connect"
            ],
            "Resource": [
                "arn:aws:iot:us-east-1:381975159270:client/${iot:ClientId}"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "iot:Subscribe"
            ],
            "Resource": [
                "arn:aws:iot:us-east-1:381975159270:topicfilter/${iot:ClientId}",
                "arn:aws:iot:us-east-1:381975159270:topicfilter/${iot:ClientId}/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "iot:Receive"
            ],
            "Resource": [
                "arn:aws:iot:us-east-1:381975159270:topic/${iot:ClientId}",
                "arn:aws:iot:us-east-1:381975159270:topic/${iot:ClientId}/*"
            ]
        }
        ])
    }else{
        res.json(
            [
            {
            "Effect": "Deny",
            "Action": [
                "iot:Publish"
            ],
            "Resource": [
                "arn:aws:iot:us-east-1:381975159270:topic/${iot:ClientId}",
                "arn:aws:iot:us-east-1:381975159270:topic/${iot:ClientId}/count"
            ]
        },
        {
            "Effect": "Deny",
            "Action": [
                "iot:Connect"
            ],
            "Resource": [
                "arn:aws:iot:us-east-1:381975159270:client/${iot:ClientId}"
            ]
        },
        {
            "Effect": "Deny",
            "Action": [
                "iot:Subscribe"
            ],
            "Resource": [
                "arn:aws:iot:us-east-1:381975159270:topicfilter/${iot:ClientId}",
                "arn:aws:iot:us-east-1:381975159270:topicfilter/${iot:ClientId}/*"
            ]
        },
        {
            "Effect": "Deny",
            "Action": [
                "iot:Receive"
            ],
            "Resource": [
                "arn:aws:iot:us-east-1:381975159270:topic/${iot:ClientId}",
                "arn:aws:iot:us-east-1:381975159270:topic/${iot:ClientId}/*"
            ]
        }
        ])
    }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})