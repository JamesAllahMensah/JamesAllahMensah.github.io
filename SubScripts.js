var socialTable = [];

var Accenture = ["Accenture", "https://www.facebook.com/AccentureDigital/", "https://twitter.com/accenturetech?lang=en", "https://www.instagram.com/accenturetechnology/?hl=en", "https://www.linkedin.com/showcase/accenture-technology/?originalSubdomain=ie"];
var BoozAllenHamilton = ["Booz Allen Hamilton", "https://www.facebook.com/boozallen/", "https://twitter.com/boozallen?lang=en", "https://www.instagram.com/boozallen/?hl=en", "https://www.linkedin.com/company/booz-allen-hamilton/"];
var CACIInternational = ["CACI International", "https://www.facebook.com/CACIIntl/", "https://twitter.com/caciintl?lang=en", "", "https://www.linkedin.com/company/caci-international-inc/"];
var CGIFederal = ["CGI Federal", "https://www.facebook.com/CGIUnitedStates", "https://twitter.com/cgi_global", "", "https://www.linkedin.com/company/cgi/"];
var Deloitte = ["Deloitte", "https://www.facebook.com/DeloitteUS/?brand_redir=21474437688", "https://twitter.com/deloitte", "https://www.instagram.com/deloitte/?hl=en", "https://www.linkedin.com/company/deloitte/"];
var Jacobs = ["Jacobs Technology", "https://www.facebook.com/JacobsConnects/", "https://twitter.com/jacobsconnects?lang=en", "https://www.instagram.com/jacobsconnects/?hl=en", "https://www.linkedin.com/company/jacobs/"];
var Leidos = ["Leidos", "https://www.facebook.com/LeidosInc/", "https://twitter.com/leidosinc?lang=en", "https://www.instagram.com/leidosinc/?hl=en", "https://www.linkedin.com/company/leidos/"];
var ManTech = ["ManTech", "https://www.facebook.com/ManTechInternationalCorporation/", "https://twitter.com/mantech?lang=en", "https://www.instagram.com/mantechcareer/?hl=en", "https://www.linkedin.com/company/mantech/"];
var Peraton = ["Peraton", "https://www.facebook.com/PeratonCorp/", "https://twitter.com/peratoncorp?lang=en", "https://www.instagram.com/peratoncorp/?hl=en", "https://www.linkedin.com/company/peraton/"];
var Perspecta = ["Perspecta", "https://www.facebook.com/Perspecta/", "https://twitter.com/perspecta?lang=en", "https://www.instagram.com/perspectalife/?hl=en", "https://www.linkedin.com/company/perspecta/"];
var SAIC = ["SAIC-Engility", "https://www.facebook.com/SAICinc/", "https://twitter.com/saicinc?lang=en", "https://www.instagram.com/saicinc/?hl=en", "https://www.linkedin.com/company/saicinc/"];
var LockheedMartin = ["Lockheed Martin", "https://www.facebook.com/lockheedmartin/", "https://twitter.com/lockheedmartin?lang=en", "https://www.instagram.com/lockheedmartin/?hl=en", "https://www.linkedin.com/company/lockheed-martin/"];
var GDIT = ["GDIT", "https://www.facebook.com/GeneralDynamicsIT/", "https://twitter.com/GDIT?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor", "https://www.instagram.com/generaldynamicsit/?hl=en", "https://www.linkedin.com/company/gdit/mycompany/"];

socialTable.push(Accenture);
socialTable.push(BoozAllenHamilton);
socialTable.push(CACIInternational);
socialTable.push(CGIFederal);
socialTable.push(Deloitte);
socialTable.push(Jacobs);
socialTable.push(Leidos);
socialTable.push(ManTech);
socialTable.push(Peraton);
socialTable.push(Perspecta);
socialTable.push(SAIC);
socialTable.push(LockheedMartin);

/**
 * Functionality for the slider, switches between the logos
 * format and the latest post presentation
 */
document.addEventListener('DOMContentLoaded', function () {

    var checkbox = document.querySelectorAll('input[type="checkbox"]');

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            console.log("AHHHHH")
            let buttons = document.getElementsByClassName("socialButtons");
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].style.visibility = "visible";
            }

            let cardContents = document.getElementsByClassName("normalCard");
            for (let i = 0; i < cardContents.length; i++) {
                cardContents[i].style.visibility = "hidden";
            }
        } else {
            let cardContents = document.getElementsByClassName("normalCard");
            for (let i = 0; i < cardContents.length; i++) {
                cardContents[i].style.visibility = "visible";
            }

            let buttons = document.getElementsByClassName("socialButtons");
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].style.visibility = "hidden";
            }
        }
    });
});

/**
 * References the hardcoded datatable and assigns a link based on
 * company name and which social media platform
 * @param socialPlatform
 */
function navigateSelectedSocial(socialPlatform) {
    document.getElementById("socials").onclick = '';
    let companyName = localStorage.getItem("companyName");
    let companyIndex;
    for (let i = 0; i < socialTable.length; i++) {
        let tableCompanyName = socialTable[i][0];
        if (companyName === tableCompanyName) {
            companyIndex = i;
            break;
        }
    }

    let navigationLink;
    switch (socialPlatform) {
        case ("Facebook"):
            navigationLink = socialTable[companyIndex][1];
            break;

        case ("Twitter"):
            navigationLink = socialTable[companyIndex][2];
            break;

        case ("Instagram"):
            navigationLink = socialTable[companyIndex][3];
            break;

        case ("LinkedIn"):
            navigationLink = socialTable[companyIndex][4];
            break;
    }

    window.location.href = navigationLink;
}

/**
 * Returns the month index based on the string type month
 */
function getNumericMonth(month){
    switch (month){
        case "Jan":
            return 0;
        case "Feb":
            return 1;
        case "Mar":
            return 2;
        case "Apr":
            return 3;
        case "May":
            return 4;
        case "Jun":
            return 5;
        case "Jul":
            return 6;
        case "Aug":
            return 7;
        case "Sep":
            return 8;
        case "Oct":
            return 9;
        case "Nov":
            return 10;
        case "Dec":
            return 11;
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
 * Takes in an abbreviation of a month and returns
 * the fully spelled out month
 */
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

/**
 * Takes in a string indexed month value and returns an
 * abbreviation of the month
 */
function getMonth(month) {
    switch (month) {
        case "1" :
            return "Jan";
        case "2" :
            return "Feb";
        case "3" :
            return "Mar";
        case "4" :
            return "Apr";
        case "5" :
            return "May";
        case "6" :
            return "Jun";
        case "7" :
            return "Jul";
        case "8" :
            return "Aug";
        case "9" :
            return "Sep";
        case "10" :
            return "Oct";
        case "11" :
            return "Nov";
        case "12" :
            return "Dec";
    }
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
        case "12" :
            return "Dec";
    }
}

/**
 * Extracts an array of company colors based on the competitor name
 */
function getCompanyColors(companyName) {
    switch (companyName) {
        case "Accenture":
            return ['rgba(172, 11, 51, 0.2)', 'black'];
        case "Booz Allen Hamilton":
            return ['rgba(4, 159, 157, 0.2)', 'rgba(4, 159, 157, 1)'];
        case "CACI International":
            return ['rgba(240, 16, 24, 0.2)', 'black'];
        case "CGI Federal":
            return ['rgba(220, 20, 52, 0.2)', 'rgba(220, 20, 52, 1)'];
        case "Deloitte":
            return ['rgba(124, 196, 68, 0.2)', 'black'];
        case "Jacobs Technology":
            return ['rgba(0, 82, 156, 0.2)', 'rgba(0, 82, 156, 1)'];
        case "Leidos":
            return ['rgba(133, 15, 137, 0.2)', 'rgba(133, 15, 137, 1)'];
        case "ManTech":
            return ['rgba(223, 35, 39, 0.2)', 'rgba(223, 35, 39, 1)'];
        case "Peraton":
            return ['rgba(49, 94, 171, 0.2)', 'rgba(137, 202, 130, 1)'];
        case "Perspecta":
            return ['rgba(15, 69, 255, 0.2)', 'black'];
        case "SAIC-Engility":
            return ['rgba(0, 107, 183, 0.2)', 'rgba(0, 107, 183, 1)'];
        case "Lockheed Martin":
            return ['rgba(128, 130, 131, 0.2)', 'rgba(0, 93, 169, 1)'];
        case "GDIT":
            return ['grey', 'grey'];
    }
}

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


function getUndefinedImage() {
    let companyName = localStorage.getItem("companyName");
    let imageSrc = "logos/";
    switch (companyName) {
        case "Accenture":
            imageSrc += "accenture";
            break;
        case "Booz Allen Hamilton":
            imageSrc += "boozallen";
            break;
        case "CACI International":
            imageSrc += "CACI";
            break;
        case "CGI Federal":
            imageSrc += "CGI";
            break;
        case "Deloitte":
            imageSrc += "deloitte";
            break;
        case "Jacobs Technology":
            imageSrc += "jacobs";
            break;
        case "Leidos":
            imageSrc += "leidos";
            break;
        case "ManTech":
            imageSrc += "mantech";
            break;
        case "Peraton":
            imageSrc += "peraton";
            break;
        case "Perspecta":
            imageSrc += "perspecta";
            break;
        case "SAIC-Engility":
            imageSrc += "SAIC";
            break;
        case "Lockheed Martin":
            imageSrc += "lockheed";
            break;
        case "GDIT":
            imageSrc += "GDIT";
            break;
    }
    return imageSrc + ".png";
}

/**
 * Returns the current month
 */
function getCurrentMonth(){
    let todaysDate = new Date().toString();
    let dateData = todaysDate.split(" ");
    let month = dateData[1];
    return month;
}

/**
 * Returns the backup image source of any competitor with an
 * un presentable logo
 */
function sensorImages(companyName, imgSource){
    let bigImages = ["CGI Federal", "CACI International", "ManTech", "Perspecta", "SAIC-Engility"];
    if (!bigImages.includes(companyName)){
        return imgSource;
    }
    else{
        imgSource = "logos/"
        switch (companyName){
            case ("CGI Federal"):
                imgSource += "tempCGI.jpeg";
                break;

            case ("CACI International"):
                imgSource += "tempCACI.png";
                break;

            case ("ManTech"):
                imgSource += "tempmantech.jpg";
                break;

            case ("Perspecta"):
                imgSource += "tempperspecta.jpg";
                break;

            case ("SAIC-Engility"):
                imgSource += "tempSAIC.jpeg";
                break;
        }
        return imgSource;
    }
}

/**
 * Returns the correct styling, in pixels, of the twitter
 * shares metric for the latest post pages
 */
function getLeftStyling(shares){
    let length = shares.length;
    if (length == 1 || length == 2){
        return "86%";
    }
    else{
        let adjLength = shares.length - 2;
        let multFactor = 2 * adjLength;
        adjLength = 86 + multFactor;
        return adjLength.toString() + "%";
    }

}

function getGDIT(type){
    let fileName = "IntelliHubBot/" + "GDIT_" + type + ".txt";
    var outputLength = 0;
    $.ajax({
        type: "GET",
        url: fileName,
        dataType: "text",
        crossOrigin: null,
        async: false,
        success: function (data) {
            data = data.split("\n")
            outputLength = data.length - 2;
        }
    });
    return outputLength;
}