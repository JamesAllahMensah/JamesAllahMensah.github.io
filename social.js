function returnHome() {
    window.location.href = "index.html";
}

/**
 * Returns the filename of the CSV used for text extraction
 * @param type
 * @returns {string}
 */
function getCSVFileName(type) {
    let fileName = "IntelliHubBot/" + localStorage.getItem("companyName") + "_" + type + ".txt";
    return fileName;

}

/**
 * Sends an ajax request to the file for data retrieval
 */
$(document).ready(function () {
    let todaysDate = new Date().toString();
    let dateData = todaysDate.split(" ");
    let month = getFullMonth(dateData[1]);
    let monthIndex = getNumericMonthFromFull(localStorage.getItem("month"));
    if (month != localStorage.getItem("month")){
        let storageData = pullFromStorage();
        loadSocialData(storageData[monthIndex][2]);
        return;
    }

    $.ajax({
        type: "GET",
        url: getCSVFileName("Social"),
        dataType: "text",
        success: function (data) {
            loadSocialData(data);
        }

    });
});

/**
 * Parses CSV file for metrics and content info
 * Dynamically updates the html page with content
 * info in different borders w/styling
 * @param csvInfo
 */
function loadSocialData(csvInfo) {
    let socialName, retweets, shares, likes, comments, content, user, date, link, imgSrc;
    let socialClass = document.getElementsByClassName("socialRows")[0];

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
        for (let i = 0; i < currentEntry[0].length - 1; i++) {
            let currRow = entries[0][i];
            allRows.push(currRow);
        }
    }

    allRows = reformatRows(allRows);

    for (let i = 0; i < allRows.length; i++) {
        let currRow = allRows[i];
        console.log(currRow);
        let sortedRow = currRow.split("\t");
        sortedRow = inFieldParser(sortedRow);
        if (sortedRow[0] === "Twitter") {
            socialName = "Twitter";
            imgSrc = "logos/twitter.png";
            user = sortedRow[1];
            date = formatPublishedDate(sortedRow[2]);
            link = sortedRow[3];
            content = sortedRow[4];
            let totalMetrics = sortedRow[6].split(",");

            retweets = totalMetrics[0].trim();
            let separationIndex = separateMetrics(retweets);
            let numMetrics = retweets.substring(0, separationIndex);
            retweets = numMetrics;
            retweets = retweets.substring(1, retweets.length);

            likes = totalMetrics[1];
            separationIndex = separateMetrics(likes);
            numMetrics = likes.substring(0, separationIndex);
            likes = numMetrics
            likes = likes.substring(0, likes.length);

            let socialDiv = document.createElement("div");
            socialDiv.setAttribute("id", "socialRow" + i.toString());
            socialClass.appendChild(socialDiv);

            let imageLink = document.createElement("a");
            imageLink.setAttribute("id", "imageLink" + i.toString());
            imageLink.href = link;
            socialDiv.appendChild(imageLink);

            let img = new Image();
            img.src = imgSrc;
            img.setAttribute("class", "postPicture");
            img.setAttribute("id", "socialPic" + i.toString());
            document.getElementById("imageLink" + i.toString()).appendChild(img);

            let SocialName = document.createElement("h1");
            SocialName.setAttribute("class", "socialName");
            SocialName.setAttribute("id", "NameBlog" + i.toString());
            SocialName.innerHTML = user;
            socialDiv.append(SocialName);

            let postCont = document.createElement("p");
            postCont.setAttribute("class", "postContent");
            postCont.setAttribute("id", "socialSnippet" + i.toString());
            postCont.innerHTML = content;
            socialDiv.append(postCont);

            let twitterLikes = document.createElement("m1");
            twitterLikes.setAttribute("class", "metric1");
            twitterLikes.setAttribute("id", "socialEngagement" + i.toString());
            twitterLikes.innerHTML = "Likes: " + likes;
            socialDiv.appendChild(twitterLikes);

            let twitterRetweets = document.createElement("m2");
            twitterRetweets.setAttribute("class", "metric2");
            twitterRetweets.setAttribute("id", "socialReach" + i.toString());
            twitterRetweets.innerHTML = "Retweets: " + retweets;
            socialDiv.appendChild(twitterRetweets);

            let twitterDate = document.createElement("m3");
            twitterDate.setAttribute("class", "metric3");
            twitterDate.setAttribute("id", "socialShare" + i.toString());
            twitterDate.innerHTML = date;
            socialDiv.appendChild(twitterDate);

            let bDStyle = document.getElementById("socialRow" + i.toString());
            bDStyle.style.borderTop = "1px solid black";
            bDStyle.style.borderBottom = "1px solid black";
            bDStyle.style.height = "250px";

            let bgNStyle = document.getElementById("NameBlog" + i.toString());
            bgNStyle.style.position = "relative";
            bgNStyle.style.left = "40px";
            bgNStyle.style.top = "20px";
            bgNStyle.style.color = "#474A4C";
            bgNStyle.style.fontSize = "14px";

            let poStyle = document.getElementById("socialSnippet" + i.toString());
            poStyle.style.position = "relative";
            poStyle.style.left = "300px";
            poStyle.style.fontSize = "18px";
            poStyle.style.bottom = "25px";
            poStyle.style.width = "800px";
            poStyle.style.height = "100px";
            poStyle.style.top = "25px";

            let engage = document.getElementById("socialEngagement" + i.toString());
            engage.style.position = "relative";
            engage.style.top = "30px";
            engage.style.marginLeft = "40px";

            let pageReach = document.getElementById("socialReach" + i.toString());
            pageReach.style.position = "relative";
            pageReach.style.top = "30px";
            pageReach.style.marginLeft = "50px";

            let pageShare = document.getElementById("socialShare" + i.toString());
            pageShare.style.position = "relative";
            pageShare.style.top = "30px";
            pageShare.style.marginLeft = "50px";

            let iLStyle = document.getElementById("socialPic" + i.toString());
            iLStyle.style.width = "200px";
            iLStyle.style.height = "120px";
            iLStyle.style.position = "absolute";
            iLStyle.style.marginTop = "60px";
            iLStyle.style.marginLeft = "40px";

        } else {
            socialName = "Facebook";
            imgSrc = "logos/facebook.png";
            user = sortedRow[1];
            date = formatPublishedDate(sortedRow[2]);
            link = sortedRow[3];
            content = sortedRow[4];
            let totalMetrics = sortedRow[6].split(",");

            shares = totalMetrics[0].trim();
            let separationIndex = separateMetrics(shares);
            let numMetrics = shares.substring(0, separationIndex);
            shares = numMetrics;
            shares = shares.substring(1, shares.length);

            likes = totalMetrics[1];
            separationIndex = separateMetrics(likes);
            numMetrics = likes.substring(0, separationIndex);
            likes = numMetrics
            likes = likes.substring(0, likes.length);

            comments = totalMetrics[2];
            separationIndex = separateMetrics(comments);
            numMetrics = comments.substring(0, separationIndex);
            comments = numMetrics;
            comments = comments.substring(0, comments.length);

            let socialDiv = document.createElement("div");
            socialDiv.setAttribute("id", "socialRow" + i.toString());
            socialClass.appendChild(socialDiv);

            let imageLink = document.createElement("a");
            imageLink.setAttribute("id", "imageLink" + i.toString());
            imageLink.href = link;
            socialDiv.appendChild(imageLink);

            let img = new Image();
            img.src = imgSrc;
            img.setAttribute("class", "postPicture");
            img.setAttribute("id", "socialPic" + i.toString());
            document.getElementById("imageLink" + i.toString()).appendChild(img);

            let SocialName = document.createElement("h1");
            SocialName.setAttribute("class", "socialName");
            SocialName.setAttribute("id", "NameBlog" + i.toString());
            SocialName.innerHTML = user;
            socialDiv.append(SocialName);

            let postCont = document.createElement("p");
            postCont.setAttribute("class", "postContent");
            postCont.setAttribute("id", "socialSnippet" + i.toString());
            postCont.innerHTML = content;
            socialDiv.append(postCont);

            let twitterLikes = document.createElement("m1");
            twitterLikes.setAttribute("class", "metric1");
            twitterLikes.setAttribute("id", "socialEngagement" + i.toString());
            twitterLikes.innerHTML = "Likes: " + likes;
            socialDiv.appendChild(twitterLikes);

            let twitterRetweets = document.createElement("m2");
            twitterRetweets.setAttribute("class", "metric2");
            twitterRetweets.setAttribute("id", "socialReach" + i.toString());
            twitterRetweets.innerHTML = "Shares: " + shares;
            socialDiv.appendChild(twitterRetweets);

            let twitterDate = document.createElement("m3");
            twitterDate.setAttribute("class", "metric3");
            twitterDate.setAttribute("id", "socialShare" + i.toString());
            twitterDate.innerHTML = date;
            socialDiv.appendChild(twitterDate);

            let bDStyle = document.getElementById("socialRow" + i.toString());
            bDStyle.style.borderTop = "1px solid black";
            bDStyle.style.borderBottom = "1px solid black";
            bDStyle.style.height = "250px";

            let bgNStyle = document.getElementById("NameBlog" + i.toString());
            bgNStyle.style.position = "relative";
            bgNStyle.style.left = "40px";
            bgNStyle.style.top = "20px";
            bgNStyle.style.color = "#474A4C";
            bgNStyle.style.fontSize = "14px";

            let poStyle = document.getElementById("socialSnippet" + i.toString());
            poStyle.style.position = "relative";
            poStyle.style.left = "300px";
            poStyle.style.fontSize = "18px";
            poStyle.style.bottom = "25px";
            poStyle.style.width = "800px";
            poStyle.style.height = "100px";
            poStyle.style.top = "25px";

            let engage = document.getElementById("socialEngagement" + i.toString());
            engage.style.position = "relative";
            engage.style.top = "30px";
            engage.style.marginLeft = "40px";

            let pageReach = document.getElementById("socialReach" + i.toString());
            pageReach.style.position = "relative";
            pageReach.style.top = "30px";
            pageReach.style.marginLeft = "50px";

            let pageShare = document.getElementById("socialShare" + i.toString());
            pageShare.style.position = "relative";
            pageShare.style.top = "30px";
            pageShare.style.marginLeft = "50px";

            let iLStyle = document.getElementById("socialPic" + i.toString());
            iLStyle.style.width = "200px";
            iLStyle.style.height = "120px";
            iLStyle.style.position = "absolute";
            iLStyle.style.marginTop = "60px";
            iLStyle.style.marginLeft = "40px";

        }
    }
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

/**
 * Multiline parser, combines same data separated by newlines
 * and places onto the first line of the initial 3/4 lines
 * @param csvRows
 * @returns {[]}
 */
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

/**
 * Parses the oddly formatted tab delimited CSV with
 * random new lines, commas, and in field tabs
 * @param csvRows
 * @returns {[]}
 */
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

/**
 * Sends user back to the previous competitor page
 */
function returnSub() {
    window.location.href = "subPage.html";
}

/**
 * Looks into the storage to detect the current competitor
 * and dynamically updates the page title to match it
 */
function getCompanyHeading() {
    let companyName = localStorage.getItem("companyName");
    document.getElementsByClassName("mainHeading")[0].innerHTML = companyName + " - All Social Platform Posts";
}

function pullFromStorage(){
    let fileName = "IntelliHubBot/" + localStorage.getItem("companyName") + "_" + "Storage.txt";
    var totalMonthlyData = []
    $.ajax({
        type: "GET",
        url: fileName,
        async: false,
        dataType: "text",
        crossOrigin: null,
        success: function (data) {
            totalMonthlyData = loadMonthlyFromStorage(data);
        }, error: function (jqXHR, exception){
            totalMonthlyData = null;
        }
    });
    return totalMonthlyData;
}

function correlateDataByMonth(data, fullMonth){
    let entries = data.split("\n");
    let startIndex = 0, stopIndex = 0;
    for (let i = 0; i < entries.length; i++){
        let line = entries[i];
        if (line.trim() == fullMonth){
            startIndex = i;
            continue;
        }
        if (line.trim() == fullMonth + " FINISHED"){
            stopIndex = i;
            break;
        }
    }
    if (startIndex == 0 && stopIndex == 0){
        return [[],[],[]];
    }
    let blogs = [];
    let news = [];
    let socials = [];

    let j = startIndex + 1;
    let line = entries[j];
    for (let i = j; i < entries.length; i++){
        if (entries[i].trim() === "NEWS"){
            startIndex = i;
            break;
        }
        blogs.push(entries[i]);

    }

    j = startIndex + 1;
    line = entries[j];
    for (let i = j; i < entries.length; i++){
        if (entries[i].trim() === "SOCIAL"){
            startIndex = i;
            break;
        }
        news.push(entries[i]);
    }

    j = startIndex + 1;
    line = entries[j];
    for (let i = j; i < entries.length; i++){
        if (entries[i].trim() === fullMonth + " FINISHED"){
            startIndex = i;
            break;
        }
        socials.push(entries[i]);
    }

    let monthData = [blogs, news, socials];
    return monthData;
}

function loadMonthlyFromStorage(data){
    let totalMonthData = [];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'];

    for (let i = 0; i < months.length; i++){
        let monthData = correlateDataByMonth(data, months[i]);
        if (monthData[0].length == 0){
            totalMonthData.push([]);
            continue;
        }
        totalMonthData.push(monthData);
    }
    return totalMonthData;
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

getCompanyHeading();