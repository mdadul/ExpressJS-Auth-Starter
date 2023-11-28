SKILLIBLY API DOCUMENTATION

**Table of Contents**
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Setup Environment Variables](#setup-environment-variables)
- [How to start new task:](#how-to-start-new-task)
  - [IMPORTANT: Before commiting anything, make sure `husky` is working properly. Do this before commit.](#important-before-commiting-anything-make-sure-husky-is-working-properly-do-this-before-commit)
- [Auth routes:](#auth-routes)


## Getting Started
### Prerequisites
Before you start integrating the SKILLIBLY API into your project, make sure you have the following prerequisites in place:
* Node.js v10.15.3 or higher
* MongoDB v4.0.10 or higher
* NPM v6.4.1 or higher
* Git v2.17.1 or higher
* Postman v7.1.1 or higher
* VS Code v1.33.1 or higher

### Installation
To start using the SKILLIBLY API in your Express.js application, follow these steps:


1. **Clone the Repository:**
Clone the SKILLIBLY API repository from GitHub using the following command:

    ```bash
    git clone https://github.com/Solvrz-com/skillibly-api.git
    ```

2. **Navigate to the Project Directory:**
Move to the cloned project directory:

    ```bash
    cd skillibly-api
    ```

3. **Install Dependencies:**
Install the required Node.js packages using npm:
    
    ```bash
    npm install
    ```
4. **Start the Server:**
    ```bash
    npm start
    ```
## Setup Environment Variables
Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE. For example:
```bash
PORT=5000

# mongoDB
MONGO_URI='mongodb connection string'

# jwt 
JWT_SECRET='jwtsecretkey'
JWT_EMAIL_SECRET='jwtsecretkeyforemail'
JWT_MAX_AGE= 3600 * 24 * 7 # 7 days 

# Google auth
GOOGLE_CLIENT_ID='Google client id'
GOOGLE_CLIENT_SECRET='Google client secret'
GOOGLE_CALLBACK_URL='http://localhost:5000/api/auth/google/callback'

# Github auth
GITHUB_CLIENT_ID='Github client id'
GITHUB_CLIENT_SECRET='Github client secret'
GITHUB_CALLBACK_URL='http://localhost:5000/api/auth/github/callback'

# Mailer
EMAIL_USER = 'mail@example.com'
EMAIL_PASSWORD = 'password'
EMAIL_HOST= 'mail.example.com'
EMAIL_PORT = 465
EMAIL_SECURE = True

# Client url
CLIENT_URL='Client url' 
CLIENT_RESET_URL='Client url for password reset'
CLIENT_OAUTH_REDIRECT_URL='Client url for oauth redirect'
CLIENT_CONFIRM_URL='client url for email confirmation' 

```
## How to start new task:
* Checkout to `develop` branch (`git checkout develop`).
* Pull from `develop` (`git pull origin develop`)
* Create new brach named as Trello story. (`git checkout -b <YOUR TRELLO STORY>`)
* **After finished, do the `IMPORTANT` task below.**
* Commit and make a PR with `develop`.
* If any conflicts happen, resolve locally.
* Once everything resolves, reviewer will approve and merge the PR with main.

### IMPORTANT: Before commiting anything, make sure `husky` is working properly. Do this before commit.
* Run `npm run fix-lint` in the root directory.
* Run `npm run pretty` in the root directory.

## Auth routes:

* POST `/api/auth/register` - Register new user
* POST `/api/auth/login `- Auth user & get token
* POST `/api/auth/password-reset/get-code `- Reset password of user
* POST `/api/auth/password-reset/verify/:token` - Verify and save new password of user
* GET `/api/auth/google` - Login with google
* GET `/api/auth/google/callback` - Callback route for google auth to redirect to
* GET `/api/auth/github` - Login with github
* GET `/api/auth/github/callback` - Callback route for github auth to redirect to
