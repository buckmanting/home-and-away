const fs = require('fs');
const { resolve } = require('path');
const readLine = require('readline');

console.log('starting up!');

// scored the most goals at home
const getTopHomeTotalScorers = results => {
    return Object.values(results)
        .map(team => {
            return {
                name: team.name,
                homeGoals: team.homeGoals
            };
        })
        .sort((a, b) => b.homeGoals - a.homeGoals)
        .slice(0, 9);
};

// scored the most goals away
const getTopAwayTotalScorers = results => {
    return Object.values(results)
        .map(team => {
            return {
                name: team.name,
                awayGoals: team.awayGoals
            };
        })
        .sort((a, b) => b.awayGoals - a.awayGoals)
        .slice(0, 9);
};

// scored at home on the most occasions
const getTopHomeScorers = results => {
    return Object.values(results)
        .map(team => {
            return {
                name: team.name,
                scoredAtHome: team.scoredAtHome
            };
        })
        .sort((a, b) => b.scoredAtHome - a.scoredAtHome)
        .slice(0, 9);
};

// scored away on the most occasions
const getTopAwayScorers = results => {
    return Object.values(results)
        .map(team => {
            return {
                name: team.name,
                scoredAway: team.scoredAway
            };
        })
        .sort((a, b) => b.scoredAway - a.scoredAway)
        .slice(0, 9);
};


/*
{
    "team-name":{
        homeGoals: 10,
        scoredAtHome: 6,
        awayGoals: 9,
        scoredAway: 5
    }
}
*/
const calculateResults = () => {
    const results = {};

    scores.forEach((score) => {
        if (!results[score[0]]) {
            results[score[0]] = {
                name: score[0],
                homeGoals: 0,
                scoredAtHome: 0,
                awayGoals: 0,
                scoredAway: 0
            }
        }
        results[score[0]].homeGoals += Number(score[1]);
        results[score[0]].scoredAtHome += Number((score[1] > 0));

        if (!results[score[3]]) {
            results[score[3]] = {
                name: score[3],
                homeGoals: 0,
                scoredAtHome: 0,
                awayGoals: 0,
                scoredAway: 0
            }
        }
        results[score[3]].awayGoals += Number(score[2]);
        results[score[3]].scoredAway += Number((score[2] > 0));
    });
    // console.log('results');
    // console.table(results);

    console.log('scored the most goals at home');
    console.table(getTopHomeTotalScorers(results));

    console.log('scored the most goals away');
    console.table(getTopAwayTotalScorers(results));

    console.log('scored at home on the most occasions');
    console.table(getTopHomeScorers(results));

    console.log('scored away on the most occasions');
    console.table(getTopAwayScorers(results));
};

const stream = fs.createReadStream('scores.csv');
const reader = readLine.createInterface({ input: stream });

let scores = [];

reader.on('line', (row) => { scores.push(row.split(',')) });
reader.on('close', () => calculateResults());