var request = require("request");
var parseString = require('xml2js').parseString;

//SOAP WS Request
var options_soap = {
    method: 'POST',
    url: 'http://ppmcontent.excers.com/niku/xog',
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'text/xml'
    },
    body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:quer="http://www.niku.com/xog/Query">\r\n   <soapenv:Header>\r\n      <quer:Auth>\r\n         <quer:Username>excers</quer:Username>\r\n         <quer:Password>niku2000</quer:Password>\r\n      </quer:Auth>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n      <quer:Query>\r\n         <quer:Code>help_test</quer:Code>\r\n         <quer:Filter>\r\n            <quer:id>5046001</quer:id>\r\n         </quer:Filter>\r\n      </quer:Query>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>\r\n'
};

request(options_soap, function(error, response, body) {
    if (error) throw new Error(error);
    parseString(body, function(err, result) {
        console.log(result["soapenv:Envelope"]["soapenv:Body"][0]["QueryResult"][0]["Records"][0]["Record"][0]["stage_code"][0]);
    });
});


//REST Request
var options_rest = {
    method: 'GET',
    url: 'http://ppmcontent.excers.com/ppm/rest/v1/projects/5046001',
    headers: {
        'cache-control': 'no-cache',
        authorization: 'Basic ZXhjZXJzOm5pa3UyMDAw'
    }
};

request(options_rest, function(error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});


//XML to JSON response format.
// {
//     "soapenv:Envelope": {
//         "$": {
//             "xmlns:soapenv": "http:\/\/schemas.xmlsoap.org\/soap\/envelope\/",
//             "xmlns:xsi": "http:\/\/www.w3.org\/2001\/XMLSchema-instance"
//         },
//         "soapenv:Header": [
//             ""
//         ],
//         "soapenv:Body": [{
//             "SessionID": [{
//                 "_": "12234102__37F5A4A7-8119-4E50-AC1B-3A040D0E9735",
//                 "$": {
//                     "xmlns": "http:\/\/www.niku.com\/xog"
//                 }
//             }],
//             "QueryResult": [{
//                 "$": {
//                     "xmlns": "http:\/\/www.niku.com\/xog\/Query"
//                 },
//                 "Code": [
//                     "help_test"
//                 ],
//                 "Records": [{
//                     "Record": [{
//                         "code": [
//                             "PR1126"
//                         ],
//                         "id": [
//                             "5046001"
//                         ],
//                         "stage_code": [
//                             "CSK_CLOSING"
//                         ]
//                     }]
//                 }],
//                 "Slice": [{
//                     "Number": [
//                         "0"
//                     ],
//                     "Size": [
//                         "1"
//                     ],
//                     "Total": [
//                         "1"
//                     ]
//                 }]
//             }]
//         }]
//     }
// }
