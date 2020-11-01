function returnHome(){
    window.location.href = "index.html";
}

var companies = ['GDIT', 'Accenture', 'Booz Allen Hamilton', 'CACI International', 'CGI Federal', 'Deloitte', 'Jacobs Technology',
    'Leidos', 'ManTech', 'Peraton', 'Perspecta', 'SAIC-Engility', 'Lockheed Martin']

$(document).ready(function () {
    loadResults();
});

function loadResults(){
    document.getElementById('result-count').innerHTML = '';
    document.getElementsByClassName("all-results")[0].innerHTML = '';
    let searchRes = localStorage.getItem("search-value")
    let resultClass = document.getElementsByClassName("all-results")[0]

    var totalSearch = []

    let totalPosts = 0;
    let allParsedBlogs = [];
    let allParsedNews = [];
    for (let i = 0; i < companies.length; i++){
        let company = companies[i];
        let paths = getFileNames(company);
        let blogData = pullData(paths[0]);
        let newsData = pullData(paths[1]);
        let parsedBlogData = parseData(blogData, searchRes);
        let parsedNewsData = parseData(newsData, searchRes);
        allParsedBlogs.push(parsedBlogData);
        allParsedNews.push(parsedNewsData);
    }

    let checkedValues = validateForm();
    if (localStorage.getItem("company-filter").length != 0){
        for (let i = 0; i < document.getElementsByClassName("checkBox").length; i++){
            if (document.getElementsByClassName("checkBox")[i].value !== localStorage.getItem("company-filter")){
                document.getElementsByClassName("checkBox")[i].checked = false
            }
        }
    }
    let selectedSort = document.getElementById("sort-type")
    let sortValue = selectedSort.options[selectedSort.selectedIndex].text;
    if (sortValue != "Default"){

        allParsedBlogs = allParsedBlogs.concat(allParsedNews);
        allParsedBlogs = sortData(allParsedBlogs, sortValue)
        for (let j = 0; j < allParsedBlogs.length; j++){
            let currData = allParsedBlogs[j];
            let sortedRow;
            try{
                sortedRow = currData.split("\t");
            }
            catch(Exception){
                continue;
            }
            let company = sortedRow[94]

            totalPosts += 1;

            let link = sortedRow[11];
            let blogName = sortedRow[91];
            let title = sortedRow[6];
            let contentSnippet = sortedRow[5];
            let date = sortedRow[1].split(" ")[0]

            let structureDiv = document.createElement("div")
            structureDiv.setAttribute("id", "resultStructure" + j.toString())
            resultClass.appendChild(structureDiv)

            let mountDiv = document.getElementById("resultStructure" + j.toString())

            let titleP = document.createElement("p")
            titleP.setAttribute("id", "resultTitle" + j.toString())
            titleP.innerHTML = title;
            mountDiv.appendChild(titleP)

            let contentP = document.createElement("p")
            contentP.setAttribute("id", "resultContent" + j.toString())
            contentP.innerHTML = contentSnippet;
            mountDiv.appendChild(contentP)

            let linkP = document.createElement("p")
            linkP.setAttribute("id", "resultLink" + j.toString())
            linkP.innerHTML = link;

            let linkA = document.createElement("a");
            linkA.setAttribute("id", "link" + j.toString())
            linkA.href = link;
            mountDiv.appendChild(linkA)
            document.getElementById("link" + j.toString()).appendChild(linkP)

            let dateP = document.createElement("p");
            dateP.setAttribute("id", "date" + j.toString())
            dateP.innerHTML = date;
            mountDiv.appendChild(dateP);

            let comp = document.createElement("p")
            comp.setAttribute("id", "compDetail" + j.toString())
            comp.innerHTML = company.toString().bold().italics()
            mountDiv.appendChild(comp)

            let pBreak = document.createElement("br")
            let pSep = document.createElement("hr")
            mountDiv.appendChild(pBreak)
            mountDiv.appendChild(pSep)


            let sDStyle = document.getElementById("resultStructure" + j.toString());
            sDStyle.style.position = "relative";
            sDStyle.style.top = "40%";
            sDStyle.style.marginLeft = "50px";

            let dP = document.getElementById("date" + j.toString());
            dP.style.fontSize = "15px";

            let tp = document.getElementById("resultTitle" + j.toString());
            tp.style.fontSize = "30px";

            let cp = document.getElementById("resultContent" + j.toString());
            cp.style.fontSize = "20px";

            let lp = document.getElementById("resultLink" + j.toString());
            lp.style.fontSize = "15px";


            let cD = document.getElementById("compDetail" + j.toString());
            cD.style.fontSize = "15px";
            let color = getCompanyColorsADV(company)[0].toString()
            cD.style.color = color;
        }

        if (totalPosts === 1){
            document.getElementById("result-count").innerHTML =
                totalPosts.toString().italics() + "  result for " + "\"" + localStorage.getItem("search-value").bold() + "\"";
        }
        else {
            document.getElementById("result-count").innerHTML =
                totalPosts.toString().italics() + "  results for " + "\"" + localStorage.getItem("search-value").bold() + "\"";
        }

        return;
    }

    let sum = 0;
    for (let i = 0; i < allParsedBlogs.length; i++){
        let companyData = allParsedBlogs[i];
        let company = companies[i];
        if (!checkedValues.includes(company)){
            continue;
        }
        if (companyData.length == 0){
            continue;
        }
        totalPosts += (companyData.length);
        for (let j = 0; j < companyData.length; j++){
            sum += 1;
            let currData = companyData[j];
            let sortedRow;
            try{
                sortedRow = currData.split("\t");
            }
            catch(Exception){
                continue;
            }
            let link = sortedRow[11];
            let blogName = sortedRow[91];
            let title = sortedRow[6];
            let contentSnippet = sortedRow[5];
            let date = sortedRow[1].split(" ")[0]

            let structureDiv = document.createElement("div")
            structureDiv.setAttribute("id", "resultStructure" + i.toString() + j.toString())
            resultClass.appendChild(structureDiv)

            let mountDiv = document.getElementById("resultStructure" + i.toString() + j.toString())

            let titleP = document.createElement("p")
            titleP.setAttribute("id", "resultTitle" + i.toString() + j.toString())
            titleP.innerHTML = title;
            mountDiv.appendChild(titleP)

            let contentP = document.createElement("p")
            contentP.setAttribute("id", "resultContent" + i.toString() + j.toString())
            contentP.innerHTML = contentSnippet;
            mountDiv.appendChild(contentP)

            let linkP = document.createElement("p")
            linkP.setAttribute("id", "resultLink" + i.toString() + j.toString())
            linkP.innerHTML = link;

            let linkA = document.createElement("a");
            linkA.setAttribute("id", "link" + i.toString() + j.toString())
            linkA.href = link;
            mountDiv.appendChild(linkA)
            document.getElementById("link" + i.toString() + j.toString()).appendChild(linkP)
            
            let dateP = document.createElement("p");
            dateP.setAttribute("id", "date" + i.toString() + j.toString())
            dateP.innerHTML = date;
            mountDiv.appendChild(dateP);


            let comp = document.createElement("p")
            comp.setAttribute("id", "compDetail" + i.toString() + j.toString())
            comp.innerHTML = companies[i].toString().bold().italics()
            mountDiv.appendChild(comp)

            let pBreak = document.createElement("br")
            let pSep = document.createElement("hr")
            mountDiv.appendChild(pBreak)
            mountDiv.appendChild(pSep)
            
            let dP = document.getElementById("date" + i.toString() + j.toString());
            dP.style.fontSize = "15px";


            let sDStyle = document.getElementById("resultStructure" + i.toString() + j.toString());
            sDStyle.style.position = "relative";
            sDStyle.style.top = "40%";
            sDStyle.style.marginLeft = "50px";

            let tp = document.getElementById("resultTitle" + i.toString() + j.toString());
            tp.style.fontSize = "30px";

            let cp = document.getElementById("resultContent" + i.toString() + j.toString());
            cp.style.fontSize = "20px";

            let lp = document.getElementById("resultLink" + i.toString() + j.toString());
            lp.style.fontSize = "15px";


            let cD = document.getElementById("compDetail" + i.toString() + j.toString());
            cD.style.fontSize = "15px";
            let color = getCompanyColorsADV(companies[i])[0].toString()
            cD.style.color = color;
        }

    }

    for (let i = 0; i < allParsedNews.length; i++){
        let companyData = allParsedNews[i];
        let company = companies[i];
        if (!checkedValues.includes(company)){
            continue;
        }
        if (companyData.length == 0){
            continue;
        }
        totalPosts += (companyData.length);
        for (let j = 0; j < companyData.length; j++){
            sum += 1;
            let currData = companyData[j];
            let sortedRow
            try{
                sortedRow = currData.split("\t");
            }
            catch(Exception){
                continue;
            }
            let link = sortedRow[11];
            let blogName = sortedRow[91];
            let title = sortedRow[6];
            let contentSnippet = sortedRow[5];
            let date = sortedRow[1].split(" ")[0]

            let structureDiv = document.createElement("div")
            structureDiv.setAttribute("id", "resultStructure" + (i + currData.length).toString() + (j + currData[j].length).toString())
            resultClass.appendChild(structureDiv)

            let mountDiv = document.getElementById("resultStructure" + (i + currData.length).toString() + (j + currData[j].length).toString())

            let titleP = document.createElement("p")
            titleP.setAttribute("id", "resultTitle" + (i + currData.length).toString() + (j + currData[j].length).toString())
            titleP.innerHTML = title;
            mountDiv.appendChild(titleP)

            let contentP = document.createElement("p")
            contentP.setAttribute("id", "resultContent" + (i + currData.length).toString() + (j + currData[j].length).toString())
            contentP.innerHTML = contentSnippet;
            mountDiv.appendChild(contentP)

            let linkP = document.createElement("p")
            linkP.setAttribute("id", "resultLink" + (i + currData.length).toString() + (j + currData[j].length).toString())
            linkP.innerHTML = link;

            let linkA = document.createElement("a");
            linkA.setAttribute("id", "link" + (i + currData.length).toString() + (j + currData[j].length).toString())
            linkA.href = link;
            mountDiv.appendChild(linkA)
            document.getElementById("link" + (i + currData.length).toString() + (j + currData[j].length).toString()).appendChild(linkP)

            let dateP = document.createElement("p");
            dateP.setAttribute("id", "date" + (i + currData.length).toString() + (j + currData[j].length).toString())
            dateP.innerHTML = date;
            mountDiv.appendChild(dateP);


            let comp = document.createElement("p")
            comp.setAttribute("id", "compDetail" + (i + currData.length).toString() + (j + currData[j].length).toString())
            comp.innerHTML = company.toString().bold().italics()
            mountDiv.appendChild(comp)

            let pBreak = document.createElement("br")
            let pSep = document.createElement("hr")
            mountDiv.appendChild(pBreak)
            mountDiv.appendChild(pSep)


            let sDStyle = document.getElementById("resultStructure" + (i + currData.length).toString() + (j + currData[j].length).toString())
            sDStyle.style.position = "relative";
            sDStyle.style.top = "40%";
            sDStyle.style.marginLeft = "50px";

            let dP = document.getElementById("date" + (i + currData.length).toString() + (j + currData[j].length).toString());
            dP.style.fontSize = "15px";

            let tp = document.getElementById("resultTitle" + (i + currData.length).toString() + (j + currData[j].length).toString())
            tp.style.fontSize = "30px";

            let cp = document.getElementById("resultContent" + (i + currData.length).toString() + (j + currData[j].length).toString())
            cp.style.fontSize = "20px";

            let lp = document.getElementById("resultLink" + (i + currData.length).toString() + (j + currData[j].length).toString())
            lp.style.fontSize = "15px";

            let cD = document.getElementById("compDetail" + (i + currData.length).toString() + (j + currData[j].length).toString());
            cD.style.fontSize = "15px";
            let color = getCompanyColorsADV(company)[0].toString()
            cD.style.color = color;

        }

    }


    if (totalPosts == 1){
        document.getElementById("result-count").innerHTML =
            totalPosts.toString().italics() + "  result for " + "\"" + localStorage.getItem("search-value").bold() + "\"";
    }
    else {
        document.getElementById("result-count").innerHTML =
            totalPosts.toString().italics() + "  results for " + "\"" + localStorage.getItem("search-value").bold() + "\"";
    }

}

function sortData(parsedData, sortTerm){
    let checkedValues = validateForm();


    let totalPosts = [];
    for (let i = 0; i < parsedData.length; i++){
        let companyData, company;

        if (i > 12){
            companyData = parsedData[i];
            company = companies[i - 13];
        }
        else{
            companyData = parsedData[i];
            company = companies[i];
        }

        if (!checkedValues.includes(company)){
            continue;
        }
        for (let j = 0; j < companyData.length; j++){
            let specData = companyData[j] + "\t" + company;
            totalPosts.push(specData)
        }
    }

    switch (sortTerm){
        case ("Newest"):
            totalPosts = totalPosts.sort(compareNew);
            return totalPosts;

        case ("Oldest"):
            totalPosts = totalPosts.sort(compareNew)
            totalPosts = totalPosts.reverse();
            return totalPosts;

        case ("Most Viewed"):
            totalPosts = totalPosts.sort(comparePopularity)
            return totalPosts;

        case ("Least Viewed"):
            totalPosts = totalPosts.sort(comparePopularity)
            totalPosts = totalPosts.reverse();
            return totalPosts;

    }
}

function compareNew(a,b){
    a = a.split("\t");
    a = a[1].split(" ")[0];

    b = b.split("\t");
    b = b[1].split(" ")[0];

    if (a < b){
        return -1;
    }
    if (a > b){
        return 1;
    }
    return 0;
}

function comparePopularity(a,b){
    a = a.split("\t");
    a = parseInt(a[46]) + parseInt(a[35]) + parseInt(a[47]) + parseInt(a[38]);

    b = b.split("\t");
    b = parseInt(b[46]) + parseInt(b[35]) + parseInt(b[47]) + parseInt(b[38]);


    if (a > b){
        return -1;
    }
    if (a < b){
        return 1;
    }
    return 0;

}

function validateForm() {
    let filtered_company = localStorage.getItem("company-filter")
    if (filtered_company.length != 0){
        return [filtered_company]
    }
    var checks = $('input[type="checkbox"]:checked').map(function () {
        return $(this).val();
    }).get()
    return checks;
}

function selectAll(){
    let buttons = document.getElementsByClassName("checkBox");
    for (let i = 0; i < buttons.length; i++){
        if (buttons[i].value === "Deselect All"){
            buttons[i].checked = false;
            continue;
        }

        if (buttons[i].checked == false){
            buttons[i].checked = true;
        }
    }
}

function deselectAll(){
    let buttons = document.getElementsByClassName("checkBox");
    for (let i = 0; i < buttons.length; i++){
        if (buttons[i].checked == true && buttons[i].value != "Deselect All"){
            buttons[i].checked = false;
        }
    }
}

function getFileNames(companyName){
    let filepaths = []
    let pathBlog = "IntelliHubBot/" + companyName + "_Blog.txt";
    let pathNews = "IntelliHubBot/" + companyName + "_News.txt";
    // let pathSocials = "IntelliHubBot/" + companyName + "_Socials.txt";
    filepaths.push(pathBlog)
    filepaths.push(pathNews)
    // filepaths.push(pathSocials)
    return filepaths;
}

function pullData(filePath){
    var results = []
    $.ajax({
        type: "GET",
        url: filePath,
        dataType: "text",
        crossOrigin: null,
        async: false,
        success: function (data) {
            results = loadData(data);
        }

    });
    return results;
}

function loadData(csvInfo){
    let entries;
    let allRows = [];
    let currentEntry;

    try {
        entries = csvInfo.split("\n");
        entries.shift();
        for (let i = 0; i < entries.length - 1; i++) {
            let currRow = entries[i];
            allRows.push(currRow);
        }
    }
    catch (exception){
        entries = new Array(csvInfo);
        currentEntry = new Array(entries[0]);
        for (let i = 1; i < currentEntry[0].length - 1; i++) {
            let currRow = entries[0][i];
            allRows.push(currRow);
        }
    }

    return allRows;
}

// function parseSocialDataForWord(data, word){
//     let parsedResults = []
//     for (let i = 0; i < data.length; i++){
//         let line = data[i].toLowerCase();
//         let word = word.toLowerCase();
//         if (line.includes(word)){
//             parsedResults.push(line)
//         }
//     }
// }


function parseData(data, word){
    let parsedResults = [];
    for (let i = 0; i < data.length; i++){
        let currRow = data[i];
        let sortedRow = currRow.split("\t");
        let imgSource = sortedRow[25].toLowerCase();
        let link = sortedRow[11].toLowerCase();
        let Name = sortedRow[91].toLowerCase();
        let title = sortedRow[6].toLowerCase();
        let content = sortedRow[7].toLowerCase();
        let contentSnippet = sortedRow[5].toLowerCase();
        let titleSnippet = sortedRow[4].toLowerCase();

        word = word.toLowerCase();

        if (localStorage.getItem("company-filter").length != 0){
            if (title.includes(word) || content.includes(word)){
                parsedResults.push(currRow);
            }
        }
        else{
            if (imgSource.includes(word) || link.includes(word) || Name.includes(word)
                || title.includes(word) || content.includes(word) || contentSnippet.includes(word)
                || titleSnippet.includes(word)){
                parsedResults.push(currRow);
            }
        }
    }
    return parsedResults;
}

/**
 * Helper method used to parse a single string of
 * social media (Twitter/Facebook) page metrics
 * @param metric
 * @returns {number}
 */
function separateMetrics(metric) {
    for (let i = 1; i < metric.length; i++) {
        let character = metric[i];
        if (!isCharDigit(character)) {
            return i;
        }
    }
    return -1;
}

/**
 * Helper method used to check if character is a digit
 * @param n
 * @returns {boolean|boolean}
 */
function isCharDigit(n) {
    return !!n.trim() && n > -1;
}

function reformatRows(csvRows) {
    let newArr = [];
    try {
        let i = 0;
        while (i < csvRows.length) {
            let currentRow = csvRows[i];
            let separateData = currentRow.split("\t");
            let socialPlatform = separateData[0];
            if (socialPlatform === "Twitter") {
                let nextRow = csvRows[i + 1] + ",";
                let succRow = csvRows[i + 2];
                let combinedRow = currentRow + "," + nextRow + succRow;
                newArr.push(combinedRow);
                i += 3;
            } else {
                let nextRow = csvRows[i + 1] + ",";
                let succRow = csvRows[i + 2] + ",";
                let finalRow = csvRows[i + 3];
                let combinedRow = currentRow + "," + nextRow + succRow + finalRow;
                newArr.push(combinedRow);
                i += 4;
            }
        }
        return newArr;
    } catch (err) {
        return newArr;
    }
}

function inFieldParser(csvRows) {
    let finalArr = [];
    let quoteCnt = 0;
    for (let i = 0; i < csvRows.length; i++) {
        let currRow = csvRows[i];
        currRow = currRow.trim();
        let combinedArr = [];
        if (countOccurences(currRow) % 2 == 0) {
            finalArr.push(currRow);
            continue;
        }
        if (currRow[0] === "\"") {
            quoteCnt = countOccurences(currRow);
            while (quoteChecker(currRow, quoteCnt)) {
                combinedArr.push(currRow);
                i += 1;
                currRow = csvRows[i];
                quoteCnt += countOccurences(currRow);
                if (quoteCnt % 2 == 0) {
                    combinedArr.push(currRow);
                }
            }
            let fulLStatement = "";
            for (let i = 0; i < combinedArr.length; i++) {
                fulLStatement += " " + combinedArr[i];
            }
            finalArr.push(fulLStatement);
        } else {
            finalArr.push(currRow);
        }
    }
    return finalArr;
}

/**
 * Helper method, detects whether the post content is done
 * being collected based on whether the quotes are still opened
 * @param row
 * @param count
 * @returns {boolean}
 */
function quoteChecker(row, count) {
    if (count % 2 != 0) {
        if ((countOccurences(row) + count % 2 != 0)) {
            return true;
        }
    }
    return false
}

/**
 * Counts the number of quotation marks in an extracted row
 * Helper Method
 * @param row
 * @returns {number}
 */
function countOccurences(row) {
    try {
        let cnt = 0;
        for (let i = 0; i < row.length; i++) {
            let character = row[i];
            if (character === "\"") {
                cnt++;
            }
        }
        return cnt;
    } catch (Exception) {
        return 1;
    }
}

/**
 * Reformats the date from the extracted file into a
 * neater format with better readability
 * @param date
 * @returns {string|*}
 */
function formatPublishedDate(date) {
    if (date.includes("ago")) {
        return date;
    }
    let parsedDate = date.split(" ");
    let origTime = parsedDate[4] + " " + parsedDate[5];
    let origDate = parsedDate[2] + "20 " + origTime.substring(0, origTime.length - 3);
    origDate = convertDate(origDate);
    return origDate + " " + origTime;
}

/**
 * Converts the date into an additional format
 * These dates are loaded into the line graph
 * @param date
 * @returns {string}
 */
function convertDate(date) {
    let correctDate = "";
    let numData = date.split("/");
    let month = getMonth(numData[0]);
    let day = numData[1];
    let splitYear = numData[2].split(" ");
    let year = splitYear[0];
    correctDate = month + " " + day + ", " + year;
    return correctDate;
}

/**
 * Returns a short version of the month based on
 * the month number
 * @param month
 * @returns {string}
 */
function getMonth(month) {
    switch (month) {
        case "01" :
            return "Jan";
        case "02" :
            return "Feb";
        case "03" :
            return "Mar";
        case "04" :
            return "Apr";
        case "05" :
            return "May";
        case "06" :
            return "Jun";
        case "07" :
            return "Jul";
        case "08" :
            return "Aug";
        case "09" :
            return "Sep";
        case "10" :
            return "Oct";
        case "11" :
            return "Nov";
        case "10" :
            return "Dec";
    }
}

function getFullMonth(month){
    switch (month){
        case "Jan":
            return "January";
        case "Feb":
            return "February";
        case "Mar":
            return "March";
        case "Apr":
            return "April";
        case "May":
            return "May";
        case "Jun":
            return "June";
        case "Jul":
            return "July";
        case "Aug":
            return "August";
        case "Sep":
            return "September";
        case "Oct":
            return "October";
        case "Nov":
            return "November";
        case "Dec":
            return "December";
    }
}

function getNumericMonthFromFull(month){
    switch (month){
        case "January":
            return 0;
        case "February":
            return 1;
        case "March":
            return 2;
        case "April":
            return 3;
        case "May":
            return 4;
        case "June":
            return 5;
        case "July":
            return 6;
        case "August":
            return 7;
        case "September":
            return 8;
        case "October":
            return 9;
        case "November":
            return 10;
        case "December":
            return 11;
    }
}
/**
 * Extracts an array of company colors based on the competitor name
 */
function getCompanyColorsADV(companyName) {
    switch (companyName) {
        case "Accenture":
            return ['rgba(172, 11, 51, 1)', 'black'];
        case "Booz Allen Hamilton":
            return ['rgba(4, 159, 157, 1)', 'rgba(4, 159, 157, 1)'];
        case "CACI International":
            return ['rgba(240, 16, 24, 1)', 'black'];
        case "CGI Federal":
            return ['rgba(220, 20, 52, 1)', 'rgba(220, 20, 52, 1)'];
        case "Deloitte":
            return ['rgba(124, 196, 68, 1)', 'black'];
        case "Jacobs Technology":
            return ['rgba(0, 82, 156, 1)', 'rgba(0, 82, 156, 1)'];
        case "Leidos":
            return ['rgba(133, 15, 137, 1)', 'rgba(133, 15, 137, 1)'];
        case "ManTech":
            return ['rgba(223, 35, 39, 1)', 'rgba(223, 35, 39, 1)'];
        case "Peraton":
            return ['rgba(49, 94, 171, 1)', 'rgba(137, 202, 130, 1)'];
        case "Perspecta":
            return ['rgba(15, 69, 255, 1)', 'black'];
        case "SAIC-Engility":
            return ['rgba(0, 107, 183, 1)', 'rgba(0, 107, 183, 1)'];
        case "Lockheed Martin":
            return ['rgba(128, 130, 131, 1)', 'rgba(0, 93, 169, 1)'];
        case "GDIT":
            return ['grey', 'grey'];
    }
}

