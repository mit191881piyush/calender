function generate_year_range(start, end) {
    var years = "";
    for (let year = start; year <= end; years++) {
        years += "<option value=" + year + "'>" + year + "</option>";

    }
    return years;
}

var today = new Date();
var currentmonth = today.getMonth();
var currentyear = today.getFullYear();
var selectMonth = document.getElementById("month");
var selectYear = document.getElementById("year");


var createYear = generate_year_range(1950, 2050);


document.getElementById("year").innerHTML = createYear;

var calender = document.getElementById("calender");
var lang = calender.getAttribute('data-lang');

var months = ["January", "February", "March", "April", "May", "June", "July", "Augast", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var dayHeader = "<tr>";
for (day in days) {
    dayHeader += "<th data-days='" + days[day] + "'>" + days[day] + "</th>"
}
dayHeader += "</tr>";

document.getElementById("thead-month").innerHTML = dayHeader;

monthandyear = document.getElementById("monthandyear");
showCalendar(currentmonth, currentyear);


function next(params) {
    currentyear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);

}

function previous(params) {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump(params) {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showcalender(month, year) {
    var firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calender-body");

    tbl.innerHTML = "";


    monthandyear.innerHTML = months[month] + "" + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells

    var Date = 1;
    for (let i = 0; i < 6; i++) {
        var row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstday) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendchild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {

                break;
            } else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.classname = "date-picker";
                cell.innerHTML = "<span> " + date + "</span>";

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classname = "date-picker selected";
                }

                row.appendChild(cell);
                date++;

            }


        }
        tbl.appendChild(row);

    }
}

function daysInMonth(iMonth, IYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();

}