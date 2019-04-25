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
            
            let loopTimes = 20;
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