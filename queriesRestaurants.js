/*var MongoClient = require('/home/albert/Escritorio/MongoDBProjects/node_modules/mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
use ("restaurants");*/






// 1 Tots els documents de la col·lecció Restaurants.
db.restaurants.find({borough:"Bronx"})
// 2 Restaurant_id, name, borough i cuisine per tots els documents en la col·lecció Restaurants.
db.restaurants.find({}, {restaurant_id:1, name:1, borough:1, cuisine:1});
// 3 Restaurant_id, name, borough i cuisine, però no el camp _id per tots els documents en la col·lecció Restaurants.
db.restaurants.find({}, {restaurant_id:1, name:1, borough:1, cuisine:1, _id:0});
// 4 Restaurant_id, name, borough i zip code, però exclou el camp _id per tots els documents en la col·lecció Restaurants.
db.restaurants.find({}, {restaurant_id:1, name:1, borough:1, "address.zipcode":1, _id:0});
// 5 Tots els restaurants que estan en el Bronx.
db.restaurants.find({borough:"Bronx"});
// 6 Els primers 5 restaurants que estan en el Bronx.
db.restaurants.find({borough:"Bronx"}).limit(5);
// 7 Els 5 restaurants després de saltar els primers 5 del Bronx.
db.restaurants.find({borough:"Bronx"}).limit(5).skip(5);
// 8 Restaurants que tenen un score de més de 90.
db.restaurants.find({"grades.score":{$gt:90}});
// 9 Restaurants que tenen un score de més de 80 però menys que 100.
db.restaurants.find({"grades.score":{$gt:90, $lt:100}});
// 10 Restaurants que es localitzen en valor de latitud menys de -95.754168.
db.restaurants.find({"address.coord.0":{$lt:-65.754168}});
// 11 Restaurants que no preparen cuisine 'American' i la seva qualificació és superior a 70 i latitud inferior a -65.754168 (sense l'operador $and)
db.restaurants.find({cuisine:{$ne: "American "}, "grades.score":{$gt:70}, "address.coord.0":{$lt:-65.754168}});
// 12 Restaurants que no preparen cuisine 'American' i la seva qualificació és superior a 70 i latitud inferior a -65.754168 (amb l'operador $and)
db.restaurants.find({$and : [ {cuisine:{$ne:"American "}}, {"grades.score":{$gt:70}}, {"address.coord.0":{$lt:-65.754168}}]});
// 13 Restaurants que no preparen  cuisine de 'American', que van obtenir un punt de grau 'A' i que no pertany a Brooklyn en ordre descendent segons la cuisine.
db.restaurants.find({cuisine:{$ne: "American "}, borough:{$ne: "Brooklyn"}, "grades.grade":"A"}).sort({cuisine:1});
// 14 El restaurant_id, name, borough i cuisine per a aquells restaurants que contenen 'Wil' com les tres primeres lletres en el seu nom.
db.restaurants.find({name: /^Wil/}, {restaurant_id:1, name:1, borough:1, cuisine:1, _id:0});
// 15 El restaurant_id, name, borough i cuisine per a aquells restaurants que contenen 'ces' com les últimes tres lletres en el seu nom.
db.restaurants.find({name: /ces$/}, {restaurant_id:1, name:1, borough:1, cuisine:1, _id:0});
// 16 El restaurant_id, name, borough i cuisine per a aquells restaurants que contenen 'Reg' com tres lletres en algun lloc en el seu nom.
db.restaurants.find({name: /Reg/}, {restaurant_id:1, name:1, borough:1, cuisine:1, _id:0});
// 17 Restaurants que pertanyen al Bronx i van preparar qualsevol plat americà o xinès.
db.restaurants.find({borough:"Bronx", cuisine:"American ", cuisine: {$regex: "Chinese"}});
// 18 Restaurant_id, name, borough i cuisine per dels restaurants que pertanyen a Staten Island o Queens o Bronx o Brooklyn.
db.restaurants.find({ $or: [{borough:"Staten Island"}, {borough:"Queens"}, {borough: "Bronx"}]}, {restaurant_id:1, name:1, borough:1, cuisine:1, _id:0});
// 19 Restaurant_id, name, borough i cuisine per a aquells restaurants que no pertanyen a Staten Island o Queens o Bronx o Brooklyn.
db.restaurants.find({ $or: [{borough: {$ne:"Staten Island"}}, {borough: {$ne:"Queens"}}, {borough: {$ne:"Bronx"}}]}, {restaurant_id:1, name:1, borough:1, cuisine:1, _id:0});
// 20 Restaurant_id, name, borough i cuisine per a aquells restaurants que aconsegueixin un marcador que no és més de 10.
db.restaurants.find({"grades.score":{$lte:10}}, {restaurant_id:1, name:1, borough:1, cuisine:1, _id:0});
// 21 Restaurant_id, name, borough i cuisine per a aquells restaurants que preparen peix excepte 'American' i 'Chinees' o el name del restaurant comença amb lletres 'Wil'.
db.restaurants.find({ $or:[{name: /^Wil/}, {cuisine:"Seafood"}]}, {restaurant_id:1, name:1, borough:1, cuisine:1, _id:0});
// 22 Restaurant_id, name, i grades per a aquells restaurants que aconsegueixin un grau "A" i un score 11 en dades d'estudi ISODate "2014-08-11T00:00:00Z".
db.restaurants.find({"grades.date": ISODate("2014-08-11T00:00:00Z"), "grades.grade":"A", "grades.score":{$eq:11}}, {restaurant_id:1, name:1, grades:1, _id:0});
// 23 Restaurant_id, name i grades per a aquells restaurants on el 2n element de varietat de graus conté un grau de "A" i marcador 9 sobre un ISODate "2014-08-11T00:00:00Z".
db.restaurants.find({"grades.1.date": ISODate("2014-08-11T00:00:00Z"), "grades.1.grade":"A", "grades.1.score":{$eq:9}}, {restaurant_id:1, name:1, grades:1, _id:0});
// 24 Restaurant_id, name, adreça i ubicació geogràfica pels restaurants on el segon element del array coord és més de 42 i fins a 52.
db.restaurants.find({"address.coord.1": {$gt:42, $lte:52}}, {restaurant_id:1, name:1, address:1, borough:1, _id:0});
// 25 El nom dels restaurants en ordre ascendent.
db.restaurants.find({}, {name:1, _id:0}).sort({name:1});
// 26 El nom dels restaurants en ordre descendent.
db.restaurants.find({}, {name:1, _id:0}).sort({name:-1});
// 27 El nom de la cuisine en ordre ascendent i el barri en ordre descendent.
db.restaurants.find({}, {cuisine:1, borough:1, _id:0}).sort({cuisine:1}).sort({borough:-1});
// 28 Escriu una consulta per saber tant si totes les direccions contenen el carrer o no.
db.restaurants.countDocuments({"address.street":{$exists:1}});
// 29 Restaurants on el valor del camp coord és Double.
db.restaurants.find({"address.coord" : { $type : "double" } } );
// 30 Restaurant_id, name i grade per a aquells restaurants que retornin 0 com a resta després de dividir el marcador per 7.
db.restaurants.find({"grades.score":{ $mod: [ 7, 0 ] }}, {restaurant_id:1, name:1, "grades.score.$": 1, _id:0});
// 31 El name de restaurant, borough, longitud i altitud i cuisine per a aquells restaurants que contenen 'mon' com tres lletres en algun lloc del seu nom.
db.restaurants.find({name: {$regex: "mon"}}, {name:1, "address.coord": 1, borough:1, cuisine:1, _id:0});
// 32 El name de restaurant, borough, longitud i latitud i cuisine per a aquells restaurants que contenen 'Mad' com primeres tres lletres del seu nom.
db.restaurants.find({name: {$regex: "^Mad"}}, {name:1, "address.coord": 1, borough:1, cuisine:1, _id:0});


//Per tal d'ofuscar l'arxiu:
var fs = require("fs");
var JavaScriptObfuscator = require('javascript-obfuscator');
fs.readFile('./queriesRestaurants', "UTF-8", function(err, data) {
    if (err) {
        throw err;
    }
    var obfuscationResult = JavaScriptObfuscator.obfuscate(data);
    fs.writeFile('./queriesRestaurantsOfuscated.js', obfuscationResult.getObfuscatedCode() , function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("S'ha creat l'arxiu 'queriesRestaurantsOfuscated.js'");
    });
});
