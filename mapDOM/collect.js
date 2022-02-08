/* **************************************************** */
     //https://gomakethings.com/how-to-simulate-a-click-event-with-javascript/
     // How to simulate a click event with vanilla JavaScript
     /**
      * Simulate a click event.
      * @public
      * @param {Element} elem  the element to simulate a click on
      */
     var simulateClick = function (elem) {
          // Create our event (with options)
          var evt = new MouseEvent('click', {
               bubbles: true,
               cancelable: true,
               view: window
          });
          // If cancelled, don't dispatch our event
          var canceled = !elem.dispatchEvent(evt);
     };
     /*
     //To use it, call the function, passing in the element you want to simulate the click on.
     var someLink = document.querySelector('a');
     simulateClick(someLink);
     */

/******************************************************************************
/******************************************************************************
 * **************************************************** */
     
/* **************************************************** */