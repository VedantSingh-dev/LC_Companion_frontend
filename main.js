let obj = {};
async function stats() {
    const id = document.querySelector('input').value;
    const apiUrl = `https://lc-companion-backend-api.vercel.app/stats/${id}`;
    const response = await fetch(apiUrl);
    const json = await response.json();
    obj = json;
    ques_cnt()
}


function ques_cnt() {
    document.querySelector('.total').innerHTML = obj.Questions_Solved.total;
    document.querySelector('.easy').innerHTML = obj.Questions_Solved.easy;
    document.querySelector('.medium').innerHTML = obj.Questions_Solved.medium;
    document.querySelector('.hard').innerHTML = obj.Questions_Solved.hard;
    contest();
}


function contest() {
    document.querySelector('.rating').innerHTML = obj.Contest_History.overall_rating.toFixed(2);
    const contestList = document.querySelector('.contest-list');
    contestList.innerHTML = '';

    const arr = obj.Contest_History.contests;
    arr.forEach(e => {
        let ele = document.createElement("div");
        ele.innerHTML = `<div><strong>${e.contest_name}</strong><span>${e.questions_solved}/4</span></div>`;
        contestList.appendChild(ele.firstChild);
    });
    topics();
}


function topics() {
    const topic = obj.Topicwise_Question_Solved;
    const topicTags = document.querySelector('.topic-tags');
    topicTags.innerHTML = '';

    for (let key in topic) {
        let ele = document.createElement("div");
        ele.innerHTML = `<span>${key}: ${topic[key]}</span>`;
        topicTags.appendChild(ele.firstChild);
    }
    last_submissions();
}

function last_submissions() {
    const submissions = obj.Last_20_Accepted_Submissions;
    const submissionList = document.querySelector('.submission-list');
    submissionList.innerHTML = '';

    for (let key in submissions) {
        let ele = document.createElement("div");
        ele.innerHTML = `<div>${key}: ${submissions[key]}</div>`;
        submissionList.appendChild(ele.firstChild);
    }
}

async function roadmap() {
    document.querySelector('#roadmap').innerHTML='loading...'
    const apiUrl = `https://lc-companion-backend-api.vercel.app/roadmap/${encodeURIComponent(JSON.stringify(obj))}`;
    const response = await fetch(apiUrl);
    const html = await response.text();

    document.getElementById("roadmap-html").innerHTML = html;
    document.getElementById("roadmap-overlay").classList.remove("hidden");
    document.querySelector('#roadmap').innerHTML='Get Roadmap'
}

function closeRoadmap() {
    document.getElementById("roadmap-overlay").classList.add("hidden");
    document.getElementById("roadmap-html").innerHTML = "";
}
