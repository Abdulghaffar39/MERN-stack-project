// const { json } = require("body-parser");
// const { parse } = require("cli");

// ----------------------------- SignUp started ----------------------------
async function signUp(e) {

    try {

        e.preventDefault();

        let fullName = document.getElementById("fullName").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (fullName === "" || email === "" || password === "") {

            alert("⚠️ Please fill in all fields before submitting!")
            return;

        } else if (email.indexOf("@gmail.com") === -1) {

            alert("Please enter a valid email address!");
            return;

        }

        const res = await axios.post("http://localhost:3000/api/signUp",

            { fullName, email, password }
        )

        const data = res.data;
        console.log(res);

        if (data.status === 505) {

            alert(data.message);
            return;
        }


        if (data.status === 200) {

            alert(data.message);
            window.location.href = "login.html";
        }

    }
    catch (err) {

        console.log(err);
        alert("Not working")

    }


}
// ----------------------------- SignUp ended ----------------------------


// ----------------------------- Login started ----------------------------

async function login(e) {

    e.preventDefault()

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("⚠️ Please fill in all fields before submitting!");
        return;
    }

    try {

        const res = await axios.post("http://localhost:3000/api/login", {
            email,
            password
        });

        const data = res.data;
        console.log("LOGIN RESPONSE:", data);

        if (data.status === 404 || data.status === 401) {
            alert(data.message);
            return;
        }

        if (data.status === 200) {

            alert(data.message);
            localStorage.setItem("token", data.token);
            console.log("Token saved:", localStorage.getItem("token"));
            window.location.href = "home.html";
        }


    } catch (err) {

        console.log(err);
        alert("Not working");
    }


}

// ----------------------------- Login ended ----------------------------


// ----------------------------- Home stared ----------------------------
async function home(e) {

    e.preventDefault();

    try {
        // ✅ 1. Token ko pehle get karo
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Token missing! Please login again.");
            window.location.href = "login.html";
            return;
        }
        console.log("Token:", token);

        // ✅ 2. Axios request me token bhejo
        const res = await axios.post("http://localhost:3000/api/home",
            { withCredentials: true }
        );

        let data = res.data;
        console.log("Home data:", data);

    } catch (err) {
        console.log(err);
        alert("Not working")
    }
}

// ----------------------------- Home ended ----------------------------


// ----------------------------- PostJob started ----------------------------

var company = document.getElementById("company").value;
var fName = document.getElementById("fName").value;
var lName = document.getElementById("lName").value;
var number = document.getElementById("number").value;


async function conti(e) {


    try {

        var company = document.getElementById("company").value;
        var fName = document.getElementById("fName").value;
        var lName = document.getElementById("lName").value;
        var number = document.getElementById("number").value;
        e.preventDefault();


        if (company === '' || fName === '' || lName === '' || number === '') {


            alert("⚠️ Please fill in all fields before submitting!");
            return;

        }


        if (company.length <= 4 || fName.length <= 4 || lName.length <= 4) {

            alert("The value provided is incomplete. Please correct it. at least 4 word!");
            return;
        }

        if (number.length <= 7 || number.length > 15) {

            alert("Please enter a valid phone number to continue.");
            return;
        }

        
        const res = await axios.post("http://localhost:3000/api/company",

            {
                company,
                fName,
                lName,
                number,
            }
        );


        if (res.status === 200) {

            window.location.href = "addJob.html";
        }


    }
    catch (err) {

        console.log(err);
        alert("Not working")

    }


}
// ----------------------------- PostJob ended ----------------------------


// ----------------------------- AddJob started ----------------------------

var jobTilte = document.getElementById("tilte").value;
var jobLocation = document.getElementById("jobLocation").value;
var jobTimeline = document.getElementById("jobTimeline").value;
var jobType = document.getElementById("jobType").value;
var jobPay = document.getElementById("jobPay").value;
var quantityInput = document.getElementById("quantityInput").value;
var description = document.getElementById("description").value;


async function addJobConfirm(e) {

    try {
        e.preventDefault();


        let jobTilte = document.getElementById("tilte").value;
        let jobLocation = document.getElementById("jobLocation").value;
        let jobTimeline = document.getElementById("jobTimeline").value;
        let jobType = document.getElementById("jobType").value;
        let jobPay = document.getElementById("jobPay").value;
        let quantityInput = document.getElementById("quantityInput").value;
        let description = document.getElementById("description").value;

        if (jobTilte === '' || jobLocation === '' || jobTimeline === '' || jobType === '' || jobPay === '' || description === '') {


            alert("⚠️ Please fill in all fields before submitting!");
            return;

        }

        if (jobLocation === 'Select' || jobTimeline === 'selectTime' || jobType === 'selectType' || quantityInput === "0" || jobPay === 'selectPay') {


            alert("!Please select an option");
            return;
        }

        

        const res = await axios.post("http://localhost:3000/api/jobData",

            {
                jobTilte,
                jobLocation,
                jobTimeline,
                jobType,
                quantityInput,
                jobPay,
                description
            },

            { headers: { Authorization: `Bearer ${token}` } }
        );


        if (res.status === 200) {

            window.location.href = "home.html"
        }


    }
    catch (err) {

        console.log(err);
        alert("Not working")

    }


}

let plus = document.getElementById("plus");
let minus = document.getElementById("minus");

plus.addEventListener("click", () => {

    let currentValue = parseInt(quantityInput.value)

    if (!isNaN(currentValue)) {

        quantityInput.value = currentValue + 1
    }

});

minus.addEventListener("click", () => {

    let currentValue = parseInt(quantityInput.value)

    if (!isNaN(currentValue) && currentValue > parseInt(quantityInput.min)) {

        quantityInput.value = currentValue - 1
    }

});


function addJob(e) {

    e.preventDefault();

    window.location.href = "postJob.html"
}
// ----------------------------- AddJob ended ----------------------------


// ----------------------------- Find Job started ----------------------------

async function jobFinder(e) {

    e.preventDefault();

    try {

        let findJob = document.getElementById("findJob");

        

        // console.log(token);


        const res1 = await axios.get("http://localhost:3000/api/companiesData",

            {
                company,
                fName,
                lName,
                number
            }

        );


        const res2 = await axios.get("http://localhost:3000/api/jobDataPost",

            { jobLocation },
        );

        const response1 = res1.data.data;
        const response2 = res2.data.jobPost;


        const values = Math.min(response1.length, response2.length);

        if (values) {

            console.log(values);
            for (let i = 0; i < values; i++) {


                findJob.innerHTML += `<div class="container_1">

                    <div class="parent_1" onclick="newJobData()">

                        <div class="child_1">
                            <h1 id="findJob_head">${response1[i].company}</h1>
                        </div>

                        <div class="child_2">
                            <p id="findJob_paraOne">${response1[i].fName + " " + response1[i].lName}</p>
                            <p id="findJob_paraTwo">${response2[i].jobLocation}</p>
                        </div>

                    </div>

                </div>`

            }
        }

    } catch (err) {
        console.log("Error:", err);
    }
}


// ----------------------------- Find Job ended ----------------------------


// ----------------------------- new Job Data started ----------------------------
function newJobData() {

    window.location.href = "newJobData.html"

}


function backFile(e) {

    e.preventDefault();

    window.location.href = "findJob.html"
}
// ----------------------------- new Job Data ended ----------------------------


// ----------------------------- new Job Detais started ----------------------------
async function newJobDetais(e) {

    e.preventDefault()

    try {

        let title = document.getElementById("newJobHead");
        let location = document.getElementById("newJobLocation");
        let location2 = document.getElementById("newJobLocation2");
        let pay1 = document.getElementById("newJobSalary1");
        let pay = document.getElementById("newJobPayment");
        let typejob = document.getElementById("newJobType");
        let descrip = document.getElementById("newJobDesPara");


        const res1 = await axios.get("http://localhost:3000/api/companiesData",

            {
                company,
                fName,
                lName,
                number
            }
        );

        const res2 = await axios.get("http://localhost:3000/api/jobDataPost",

            {
                jobTilte,
                jobLocation,
                jobTimeline,
                jobType,
                jobPay,
                quantityInput,
                description
            }

        );

        const data1 = res1.data.data;
        const data2 = res2.data.jobPost;
        console.log(data1, data2);


        const values = Math.min(data1.length, data2.length);

        if (values) {

            for (let i = 0; i < values; i++) {

                console.log(data2[i].description);
                if (data1[i].company) {

                    title.innerHTML = data2[i].jobTilte;
                    location.innerHTML = data2[i].jobLocation;
                    location2.innerHTML = data2[i].jobLocation;
                    pay1.innerHTML = data2[i].jobPay;
                    pay.innerHTML = data2[i].jobPay;
                    typejob.innerHTML = data2[i].jobType;
                    descrip.innerHTML = data2[i].description;

                }

            }
        }

    }
    catch (err) {

        console.log("Error:", err);
    }

}
// ----------------------------- new Job Detais ended ----------------------------




// ----------------------------- employer started ----------------------------
function apply(e) {

    e.preventDefault();

    window.location.href = "employerData.html"

}

function applyBack(e) {

    e.preventDefault();

    window.location.href = "newJobData.html"

}
// ----------------------------- employer ended ----------------------------


// ----------------------------- resume started ----------------------------
document.querySelector(".checkResult").style.display = "block";

async function resume() {

    let fileInput = document.getElementById("fileResume");
    let jobDes = document.getElementById("jobDes");

    
    
    if (!fileInput.files.length) {
        alert("Please select a PDF file");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("jobDescription", jobDes.value);

    try {
        const res = await axios.post("http://localhost:3000/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        
        
        document.querySelector(".checkResult").style.display = "block";

        let data = res.data.aiAnalysis;
        let clean = data.replace(/```json|```/g, "").trim();
        let parsed = JSON.parse(clean);
        
        console.log(parsed);
        // Score Boxes
        document.getElementById("resumeScore").innerText = parsed["resumeScore"];
        document.getElementById("atsScore").innerText = parsed["atsScore"];

        // Missing Skills
        const skillsList = document.getElementById("missSkills");
        skillsList.innerHTML = "";
        parsed["missingSkills"].forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        // require Skills
        const requireSkills = document.getElementById("requireSkills");
        requireSkills.innerHTML = "";
        parsed["recommendedSkillsToAdd"].forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            requireSkills.appendChild(li);
        });

        // Suggestions
        const suggestionsContainer = document.getElementById("suggestionsContainer");
        suggestionsContainer.innerHTML = "";
        parsed["suggestions"].forEach(txt => {
            const div = document.createElement("div");
            div.style.padding = "10px";
            div.style.margin = "10px 0";
            div.style.borderRadius = "8px";
            div.innerText = txt;
            suggestionsContainer.appendChild(div);
        });

        // Improved Resume
        const improvedResume = document.getElementById("resumeContainer");
        improvedResume.innerHTML = "";
        let resumeText = parsed["improvedResumeText"];
        let sections = resumeText.split('---');
        sections.forEach(section => {
            const div = document.createElement("div");
            div.style.border = "1px solid #ddd";
            div.style.padding = "12px";
            div.style.margin = "10px 0";
            div.style.borderRadius = "8px";
            div.style.whiteSpace = "pre-wrap";
            div.innerText = section.trim();
            improvedResume.appendChild(div);
        });
        const objDiv = document.getElementById("checkResult");
        objDiv.scrollTop = objDiv.scrollHeight;

    } catch (err) {
        console.error("Upload error:", err);
        alert("Upload failed! See console.");
    }
}

let resumeText = document.getElementById("resumeContainer").innerText;

async function saveCVData() {

    let resumeText = document.getElementById("resumeContainer").innerText;

    if (!resumeText) {
        alert("⚠️ Resume is empty!");
        return;
    }

    try {

        const response = await axios.post("http://localhost:3000/api/saveResume",

            { resumeText }

        );

        console.log(response.data.details);
        window.location.href = "template.html"

    }
    catch (error) {

        console.error("Error saving resume:", error);
        alert("Error: Could not save resume.");
    }
}

async function templates(e) {

    e.preventDefault();


    try {

        const res = await axios.get("http://localhost:3000/api/getResumeData", {

            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(res.data.getDataRes[0]);
        console.log(res.data.getDataRes);



    }
    catch (error) {

        console.error("Error saving resume:", error);
    }
}


// ----------------------------- resume ended ----------------------------


function resumeBack() {

    window.location.href = "findJob.html";
}

function resumeCheck() {

    window.location.href = "resume.html";
}

// ----------------------------- resume ended ----------------------------


// ----------------------------- Dashboard started ----------------------------



async function getDashboardData(e) {

    e.preventDefault();

    try {

        const token = localStorage.getItem("token");

        console.log("Token from localStorage:", token);

        if (!token) {
            console.log("❌ Token nahi mila");
            return;
        }

        const res = await axios.get("http://localhost:3000/api/dashboard", {

            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const res2 = await axios.get("http://localhost:3000/api/companiesData",

            {
                company,
                fName,
                lName,
                number
            }
        );

        const res3 = await axios.get("http://localhost:3000/api/jobDataPost",

            {
                jobTilte,
                jobLocation,
                jobTimeline,
                jobType,
                jobPay,
                quantityInput,
                description
            }
        );

        if (values) {

            console.log(values);
            for (let i = 0; i < values; i++) {


                findJob.innerHTML += `<div class="container_1">
    
                    <div class="parent_1" onclick="newJobData()">
    
                        <div class="child_1">
                            <h1 id="findJob_head">${response1[i].company}</h1>
                        </div>
    
                        <div class="child_2">
                            <p id="findJob_paraOne">${response1[i].fName + " " + response1[i].lName}</p>
                            <p id="findJob_paraTwo">${response2[i].jobLocation}</p>
                        </div>
    
                    </div>
    
                </div>`

            }
        }

    } catch (err) {
        console.log("Error:", err);
    }

}

// ----------------------------- Dashboard ended ----------------------------


function goLogin(e) {

    e.preventDefault();

    window.location.href = "login.html"

}

function goSignUP(e) {

    e.preventDefault();

    window.location.href = "index.html"

}

function logout(e) {

    e.preventDefault();

    window.location.href = "login.html"

}

function postJob(e) {

    e.preventDefault();

    window.location.href = "postJob.html"

}

function dashboard() {

    window.location.href = "dashboard.html"
}

function findJob(e) {

    e.preventDefault();

    window.location.href = "findJob.html"
}

function backPost(e) {

    e.preventDefault();

    window.location.href = "home.html"
}



