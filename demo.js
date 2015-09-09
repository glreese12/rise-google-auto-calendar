var DemoPlaylist = function () {
  "use strict";


  // provide the playback functions that control this content which rise-playlist will call
  function _play() {
    console.log("DemoContent play!");
    // ...
  }
  function _pause() {
    console.log("DemoContent pause!");
    // ...
  }
  function _stop() {
    console.log("DemoContent stop!");
    // ...
  }

  function _ready() {
    // construct the "rise-component-ready" event
    var readyEvent = new CustomEvent("rise-component-ready", {
      "detail": {
        "play": _play,
        "pause": _pause,
        "stop": _stop,
        "done": false
      },
      "bubbles": true
    });

    // dispatch the event for rise-playlist to receive
    document.querySelector("#googleCalendar").dispatchEvent(readyEvent);
  }

  function _getRow(event) {
   // var fragment = document.createDocumentFragment(),
     // tr = document.createElement("tr"),
      var day, strTmp, dateCell, summaryCell, date, dateObj,
      dayString, datetext;
      //rowCount = 1;

    if (event.end && event.end.date) {

      // This is an All Day event

      // The API is returning a date range that is one day too many for "All
      // day" events. Set the correct end date.
      event.end.date = moment(event.end.date).add(-1, "days").format("YYYY-MM-DD");

      dateObj = new Date(event.end.date)


      // for demonstration purposes, just displaying the end date
      date = moment(event.end.date).format("MMMM Do YYYY");
    } else {
      // This is a time based event

      // for demonstration purposes, just displaying the start date/time
      date = moment(event.start.dateTime).format("MMMM Do YYYY, h:mm:ss a");

      dateObj = new Date(event.start.dateTime)
    }

    //dateCell = document.createElement("td");
    //strTmp = date;
    //strTmp += '</br>'
    //strTmp += event.summary 
    //dateCell.innerHTML = strTmp;

    dateObj = new Date(event.start.dateTime)

    day = dateObj.getDay()
    dayString =  dateObj.getDate("dd");
    
    datetext = moment(dateObj).format('hh:mm:ss a');


   // alert(day);


    switch(day) {
      case 3:
           //Wednesday
           if (event.summary == "None") {
            dateCell = document.createElement("td");
            dateCell.classList.add("day");
            strTmp = '<div class="day_num">' + dayString + '</div>';
            dateCell.innerHTML = strTmp;
           }  else {
              dateCell = document.createElement("td");
              dateCell.classList.add("day");
              strTmp = '<div class="day_num">' + dayString + '</div>'
              strTmp += '</br>'
              strTmp += '<div class="wed_day">' +  event.summary + '</div>' 
              strTmp += '</br>'
              strTmp += '<div class="time">' + datetext + '</div>'
              dateCell.innerHTML = strTmp;
            }

          break;
      case 4:
          //Thursday
            if (event.summary == 'None') {
              dateCell = document.createElement("td");
              dateCell.classList.add("day");
              strTmp = '<div class="day_num">' + dayString + '</div>';
              dateCell.innerHTML = strTmp;
              console.log("None!");

            }  else {
              dateCell = document.createElement("td");
              dateCell.classList.add("day");
              strTmp = '<div class="day_num">' + dayString + '</div>';
              strTmp +=  '</br>'
              strTmp += '<div class="thur_day">' +  event.summary + '</div>' 
              strTmp += '</br>'
              strTmp += '<div class="time">' + datetext + '</div>'
              dateCell.innerHTML = strTmp;
              console.log("None!");
            }

          break;
      case 5:
          //Friday 
          if (event.summary == "None") {
            dateCell = document.createElement("td");
            dateCell.classList.add("day");
            strTmp = '<div class="day_num">' + dayString + '</div>';
            dateCell.innerHTML = strTmp;
          }  else {
            dateCell = document.createElement("td");
            dateCell.classList.add("day");
            strTmp = '<div class="day_num">' + dayString + '</div>';
            strTmp +=  '</br>'
            strTmp += '<div class="fri_day">' +  event.summary + '</div>' 
            strTmp += '</br>'
            strTmp += '<div class="time">' + datetext + '</div>'
            dateCell.innerHTML = strTmp;
        }

          
          break;
      case 6:
          //Saturdays
          if (event.summary == "None") {
            dateCell = document.createElement("td");
            dateCell.classList.add("day");
            strTmp = '<div class="day_num">' + dayString + '</div>';
            dateCell.innerHTML = strTmp;
          }  else {
            dateCell = document.createElement("td");
            dateCell.classList.add("day");
            strTmp = '<div class="day_num">' + dayString + '</div>';
            strTmp +=  '</br>'
            strTmp += '<div class="sat_day">' +  event.summary + '</div>' 
            strTmp += '</br>'
            strTmp += '<div class="time">' + datetext + '</div>'
            dateCell.innerHTML = strTmp;
          }
          break;    
      default:
          break; 
     }


    //summaryCell = document.createElement("td");
    //summaryCell.innerHTML = event.summary;

    //tr.appendChild(dateCell);
    //tr.appendChild(summaryCell);

   // tr.appendChild(dateCell);
    //fragment.appendChild(tr);

   // return fragment;
   return dateCell; 
  }

  function _build(items) {
    var tbody = document.getElementsByTagName("tbody"),
      fragment = document.createDocumentFragment(),
      trfragment = document.createDocumentFragment(),
      tr = document.createElement("tr"),
      rows = [],
      row = [],
      cell,
      colCount;

      colCount = 1; 

    items.forEach(function (item) {

     // row[colCount] = _getRow(item);
       cell = _getRow(item);
       tr.appendChild(cell);
       colCount += 1;
    
      if (colCount > 4) {
        trfragment.appendChild(tr);
        rows.push(trfragment);

        //renew the row
        tr = document.createElement("tr")
        colCount = 1
      }      

    });

    rows.forEach(function (r) {
      fragment.appendChild(r);
     // tbody[0].appendChild(r)
    });



    tbody[0].appendChild(fragment);

    // content is Ready
    _ready();
  }

  function init() {
    // reference to rise-google-calendar element
    var googleCalendar = document.querySelector("#googleCalendar");

    // register for the "rise-google-calendar-response" event that rise-google-calendar fires
    googleCalendar.addEventListener("rise-google-calendar-response", function(e) {


      console.log(e.detail.items)


      // build the Calendar content with the feed data
      _build(e.detail.items);

    });

    // execute making a request for the Google Calendar data
    googleCalendar.go();
  }

  return {
    "init": init
  };
};