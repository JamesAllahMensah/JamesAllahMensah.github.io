/**
 * Pulls the number of posts by competitor and loads into a 2D array
 * @returns {[]}
 */
function getGraphData() {
    let companies = ['Accenture', 'Booz Allen Hamilton', 'CACI International', 'CGI Federal', 'Deloitte', 'Jacobs Technology',
        'Leidos', 'ManTech', 'Peraton', 'Perspecta', 'SAIC-Engility', 'Lockheed Martin']


    let totalBlogs = [];
    let totalNews = [];
    let totalSocials = [];
    let allCategories = [];

    for (let i = 0; i < companies.length; i++) {
        let currentCompany = companies[i];
        let blogSize = getTotalPosts("Blog", currentCompany);
        let newsSize = getTotalPosts("News", currentCompany);
        totalBlogs.push(blogSize);
        totalNews.push(newsSize);
    }
    allCategories.push(totalBlogs);
    allCategories.push(totalNews);
    return allCategories;

}


/**
 * Reads into the CSV and returns the number of posts
 * @param type
 * @param companyName
 * @returns {number}
 */
function getTotalPosts(type, companyName) {
    let fileName = "IntelliHubBot/" + companyName + "_" + type + ".txt";
    let size = openCSV(fileName, type);
    return size;
}

function openCSV(fileName) {
    let size = 0;
    $.ajax({
        type: "GET",
        url: fileName,
        dataType: "text",
        async: false,
        success: function (data) {
            size = getNumPosts(data);
            console.log(size);
            return size;
        }

    });
    return size;
}

/**
 * Counts the number of posts per source
 */
function getNumPosts(csvInfo) {
    let entries = csvInfo.split("\n");
    let size = entries.length - 2;
    return size;
}

var companySelected = false;

function clickHandler() {
    companySelected = true;
}

/**
 * Stores the competitor name into local storage
 * to be retrieved in external pages
 * @param companyName
 */
function loadApp(companyName) {
    localStorage.setItem("companyName", companyName);
    window.location.href = "subPage.html";
}

/**
 * Creates a quicker route to navigate to the subPages
 */
function shortCutClickBlogs() {
    localStorage.setItem("companyName", this.id);
    window.location.href = "blogs.html";
}

function shortCutClickNews() {
    localStorage.setItem("companyName", this.id);
    window.location.href = "newsPosts.html";
}

function shortCutClickSocials() {
    localStorage.setItem("companyName", this.id);
    window.location.href = "all.html";
}


/**
 * Prompts the user to click on a competitor card for the shortcut
 * @param section
 */
function shortCut(section) {
    if (section === "blog") {
        window.scrollTo(0, document.body.scrollHeight);
        let cards = document.getElementsByClassName("card");
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.boxShadow = "0 5px 15px yellow";
            cards[i].removeAttribute("onclick");
            cards[i].addEventListener("click", shortCutClickBlogs);
            cards[i].addEventListener("click", clickHandler);
        }
        setTimeout(function () {
            document.getElementById("Warning").style.visibility = "Visible";
        }, 300);
    } else if (section === "social") {
        window.scrollTo(0, document.body.scrollHeight);
        let cards = document.getElementsByClassName("card");
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.boxShadow = "0 5px 15px yellow";
            cards[i].removeAttribute("onclick");
            cards[i].addEventListener("click", shortCutClickSocials);
        }
        setTimeout(function () {
            document.getElementById("Warning").style.visibility = "Visible";
        }, 300);
    } else if (section === "news") {
        window.scrollTo(0, document.body.scrollHeight);
        let cards = document.getElementsByClassName("card");
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.boxShadow = "0 5px 15px yellow";
            cards[i].removeAttribute("onclick");
            cards[i].addEventListener("click", shortCutClickNews);
        }
        setTimeout(function () {
            document.getElementById("Warning").style.visibility = "Visible";
        }, 300);
    } else if (section === "insight") {
        window.location.href = "insights.html";
    }
    else{
        window.location.href = "results.html";
    }
}

