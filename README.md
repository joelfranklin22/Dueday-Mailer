# DueDay Mailer

A simple web app that emails you a reminder on the day your task is due.
Add a task, pick the due date and enter your email. On that day, the reminder lands in your inbox.

Live demo:  [duedaymailer.netlify.app](https://duedaymailer.netlify.app/)<un netlify link></un>

## Features

- Add a task with type, name, due date, email and an optional note
- 8 task types with matching placeholders
- Past dates are blocked in the form
- Duplicate reminders are checked using Google Sheets
- Reminder email is sent on the due date through Gmail
- Message shown with contact info if the workflow is offline
- Responsive layout for desktop and mobile

## How it works

1. The form sends the task details to an n8n webhook.
2. The first workflow checks Google Sheets for a duplicate. If the task is new, it is saved in the sheet and a response is sent back to the website.
3. A second workflow, triggered by Cronlytic, runs on a schedule. It finds the tasks due that day and sends the reminder email with Gmail.

## Built with

- HTML5, CSS3, JavaScript
- n8n (Webhook, If, Code and Edit Fields nodes)
- Google Sheets
- Gmail
- Cronlytic

## Project structure

```
## Project structure
dueday-mailer/
├── assets/              (logo, favicon, screenshots)
├── n8n-workflows/       (n8n workflow JSON files)
├── styles/              (CSS files)
├── index.html
├── script.js
├── .gitignore
└── README.md
```


## Run it yourself

1. Clone the repo
   ```
   git clone https://github.com/<un-username>/dueday-mailer.git
   ```
2. Open `n8n-workflows/` and import both JSON files in n8n
   (Workflows > Import from file).
3. Connect your own Google Sheets and Gmail accounts in the nodes.
4. Copy your webhook URL from the Webhook node and replace `webhookURL` in `script.js`.
5. Activate both workflows.
6. Open `index.html` in your browser.

## Note

The demo uses my own n8n workflow. If it is switched off, the site shows my email so you can ask me to activate it.

## What I learned

- How webhooks connect a frontend to an automation workflow
- Using Google Sheets as a simple database in n8n
- Scheduled triggers and sending emails with Gmail
- Handling success and error states in a form

## Author

Joel Franklin
