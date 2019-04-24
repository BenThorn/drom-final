//vars to grab the info
let rank1name;
/*let rank2name = document.querySelector("#teamTwoName");
let rank3name = document.querySelector("#teamThreeName");
let rank4name = document.querySelector("#teamFourName");
let rank5name = document.querySelector("#teamFiveName");
let rank6name = document.querySelector("#teamSixName");
let rank7name = document.querySelector("#teamSevenName");
let rank8name = document.querySelector("#teamEightName");
let rank9name = document.querySelector("#teamNineName");
let rank10name = document.querySelector("#teamTenName");*/

var scores = {
    rank1: {
        "name": "Team Name",
        "score": "Team Score",
        "streak": ""
    },
    rank2: {
        "name": "Team Name",
        "score": "Team Score",
        "streak": ""
    },
    rank3: {
        "name": "Team Name",
        "score": "Team Score",
        "streak": ""
    },
    rank4: {
        "name": "Team Name",
        "score": "Team Score",
        "streak": ""
    },
    rank5: {
        "name": "Team Name",
        "score": "Team Score",
        "streak": ""
    },
    rank6: {
        "name": "Team Name",
        "score": "Team Score",
        "streak": ""
    },
    rank7: {
        "name": "Team Name",
        "score": "Team Score",
        "streak": ""
    },
    rank8: {
        "name": "Team Name",
        "score": "Team Score",
        "streak": ""
    },
    rank9: {
        "name": "Team Name",
        "score": "Team Score",
        "streak": ""
    },
    rank10: {
        "name": "Team Name",
        "score": "Team Score",
        "streak": ""
    },
    temp: {
        "name": "",
        "score": "",
        "streak": ""
    },
};

//window.onload = function () {
//    rank1name = "changed";
//    //Set the blank 
//    document.querySelector("#teamOneName").innerHTML = rank1name;
//}


function rank() {
    //Collect inputed data
    let newTeam = document.querySelector("#team");
    let newScore = document.querySelector("#score");
    //Compare Scores
    for (var i = 0; i < scores.length; i++) {

    }
    //When rank is found put name, score, and streak in appropriate ranking

    //Push last ranking out
}

const compare = function (a, b) {
    if (a.score < b.score) {
        return 1;
    }
    if (a.score > b.score) {
        return -1;
    }
    return 0;
}

const getUpdate = () => {
    $.ajax({
        cache: false,
        type: "GET",
        url: '/getScores',
        dataType: "json",
        success: (result, status, xhr) => {
            scores = result.scores;
            scores.sort(compare);
            
            let loopTimes = 10;
            if(scores.length < loopTimes) {
                loopTimes = scores.length;
            }
            
            let scoresDiv = document.querySelector("#scores");
            scoresDiv.innerHTML = "";
            for(let i = 0; i < loopTimes; i++) {
                let div = document.createElement('div');
                div.className = 'data';
                
                let number = document.createElement('p');
                number.className = 'number';
                number.innerHTML = `${i+1}`;
                div.appendChild(number);
                
                let teamName = document.createElement('p');
                teamName.className = 'teamName';
                teamName.innerHTML = `${scores[i].team}`;
                div.appendChild(teamName);
                
                let teamScore = document.createElement('p');
                teamScore.className = 'teamScore';
                teamScore.innerHTML = `${scores[i].score}`;
                div.appendChild(teamScore);
                
                let teamStreak = document.createElement('p');
                teamStreak.className = 'teamStreak';
                teamStreak.innerHTML = `${scores[i].streak}`;
                div.appendChild(teamStreak); 
                
                scoresDiv.appendChild(div);
            }


        },
        error: (xhr, status, error) => {
            const messageObj = JSON.parse(xhr.responseText);

            handleError(messageObj.error);
        }
    });
};

//every 5 seconds call getUpdate
window.onload = function () {
    getUpdate();
    setInterval(getUpdate, 5000);
}
