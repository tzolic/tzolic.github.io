# Responsive Portfolio Website

## A straightforward and scalable responsive portfolio website to showcase my projects

## Live Demo

### Click here:  [tzolic.github.io](https://tzolic.github.io/)

## Visual Overview

![home](readme%20visuals/01/home.png)
![projects](readme%20visuals/01/projects.png)
![contact](readme%20visuals/01/contact.png)

## Tools Used

- **Frontend:** CSS, HTML, JavaScript
- **Data Handling:** Google Apps Script, Google Sheets, JSON

## Key Features

- Integrated a JSON file with HTML using Javascript to load projects, ensuring scalability and simplicity for project updates
- Integrated the contact form with Google Sheets using Google Apps Script to collect and store real-time data during contact form submissions
- Incorporated a matrix rain animation effect using JavaScript to visually enhance the landing page UX design

## Goals

1. Establish a professional online presence
2. Showcase my skills and experience in computer science
3. Make it easy for potential employers and clients to contact me

## Target Audience

1. Prospective employers and clients in the computer science industry
2. Developers looking to build a portfolio website for themselves
3. Developers who already have a portfolio and are looking for some design inspiration or code snippets
4. People interested in my work
   
## Installation

1. Clone the repository
2. Open `index.html` in your browser

## Usage

1. Modify `index.html` and `style.css` to reflect your personal branding
2. Update `projects.json` with your own projects
3. Connect a Google Sheet to the portfolio website for realtime data storage when user sends contact form

- Create a Google Sheet
- Rename the sheet (not the title) to 'portfolio contact'
- Name the header of your sheets by filling up the first row with names that matches the 'name' identifier in `index.html` 

```html
<input type="text" name="name" placeholder="Name" required>
<textarea name="message" rows="4" placeholder="Message" required style="resize: none;"></textarea>
<input type="tel" name="phone" placeholder="Phone Number" pattern="^\+?\d{1,15}$" required>
<input type="email" name="email" placeholder="Email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" required>
```

For example here my name attributes are:

- name
- message
- phone
- email

So they must be the name of the headers of my google sheet.

- Go to Extensions > Google Apps Script
- Copy and paste this code

```javascript
var sheetName = 'portfolio contact'
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}
```

- Click on Deploy > New Deployment
- Go on Who has access and choose Anyone
- Click on Deploy and copy the web app URL
- Paste the web app URL in `script.js`

```javascript
const scriptURL = 'your script url'
```

- Test submitting a contact form on the portfolio website and see if it fills up a row. If it does, you're done!

## License

- This project is licensed under the [MIT License](LICENSE)