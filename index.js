// Pirates want treasure!
const { crew, capin } = require('./.arrg')

// 1) Generate a greeting and print it to the console
// TIP: capin.generateGreeting() // returns a promise!

capin.generateGreeting()
    .then(greeting => {
        console.log(greeting);
    })
    .catch(err => {
        console.error("Error generating greeting");
        console.error(err);
    });

// 2) Try generating a treasure map!
// TIP: capin.generateTreasureMap() // returns a promise!

capin.generateTreasureMap()
    .then(treasureMap => {
        console.log(`Treasure map: ${treasureMap}`);
    })
    .catch(err => {
        console.error("Error generating treasure map:");
        console.error(err);
    });

// 3) Try giving your crew a treasure map! They'll find the treasure for you!
// TIP: call `crew.findTreasure(treasureMap)`
// TIP: be sure to `catch()` things just in case something breaks!
// TIP: If you `console.log()` a treasure you can see it's size!

var mapPromises = [];
for(var i = 0; i < 2; i++){
    let mapPromise = capin.generateTreasureMap();
    mapPromises.push(mapPromise);
}

Promise.all(mapPromises)
    .then(treasureMaps => {
        let treasurePromises = [];
        treasureMaps.forEach(treasureMap => {
            let treasurePromise = crew.findTreasure(treasureMap);
            treasurePromises.push(treasurePromise);
        });

        return Promise.all(treasurePromises);
    })
    .then(treasures => {
        let sorted = treasures.sort((a, b) => b.size - a.size);
        sorted[0].giveToCrew()
            .then(result => {
                console.log("SUCCESS");
            })
            .catch(err => {
                console.error(err);
            });
    })
    .catch(err => {
        console.error("Error occurred generating treasure maps");
        console.error(err);
    });


// 5) Give the first treasure to your crew and keep the rest for yourself!
// TIP: call `treasure.giveToCrew()`

