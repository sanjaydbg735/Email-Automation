# Email Automation Tool

This project is an email automation tool that connects to Gmail and Outlook accounts using OAuth, reads incoming emails, categorizes them based on their content using OpenAI, and sends automated replies. The tool uses BullMQ for task scheduling and is built using Node.js and JavaScript.

## Features

- **OAuth Authentication**: Securely authenticate with Gmail and Outlook using OAuth.
- **Email Categorization**: Use OpenAI to analyze the content of emails and categorize them into predefined categories: Interested, Not Interested, and More Information.
- **Automated Replies**: Generate and send automated replies based on the categorized content of the emails.
- **Task Scheduling**: Use BullMQ to schedule and manage tasks related to email processing.

## Prerequisites

- **Node.js** (>=14.x)
- **npm** (>=6.x)
- **Google API credentials** for Gmail
- **Microsoft API credentials** for Outlook
- **OpenAI API key**

## Getting Started

### Clone the Repository

```sh
git clone <https://github.com/sanjaydbg735/Email-Automation>
cd Email-Automation
