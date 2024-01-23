$(document).ready(function () {
  // Display current day at the top of the calendar
  var currentDay = dayjs().format('dddd, MMMM D');
  $("#currentDay").text(currentDay);

  // Function to color-code time blocks based on past, present, or future
  function updateColors() {
    var currentTime = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("data-hour"));

      if (blockHour < currentTime) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentTime) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Function to load saved events from local storage
  function loadEvents() {
    $(".time-block").each(function () {
      var blockHour = $(this).attr("data-hour");
      var savedEvent = localStorage.getItem(blockHour);

      if (savedEvent) {
        $(this).find("textarea").val(savedEvent);
      }
    });
  }

  // Function to save event to local storage
  $(".container").on("click", ".saveBtn", function () {
    var blockHour = $(this).parent().attr("data-hour");
    var eventText = $(this).siblings("textarea").val();
  
    localStorage.setItem(blockHour, eventText);
  });

// ...

// Create time blocks dynamically
var businessHours = 9; 
var totalHours = 12; 

for (var i = 0; i < totalHours; i++) {
  var hour = businessHours + i;
  var timeBlock = $("<div>").addClass("row time-block").attr("data-hour", hour);

  var hourCol = $("<div>").addClass("col-1 hour").text(dayjs().hour(hour).format('hA'));
  var textArea = $("<textarea>").addClass("col-10 description");

  var saveBtn = $("<button>").addClass("col-1 saveBtn").html('<i class="fas fa-save"></i>');

  timeBlock.append(hourCol, textArea, saveBtn);
  $(".container").append(timeBlock);
}

// Load events after creating time blocks
loadEvents();

// ...
updateColors();
 

  // Update colors every minute to reflect present time
  setInterval(updateColors, 60000);
});
