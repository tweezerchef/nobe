# NOBE
![NOBE LOGO](https://nobe.s3.us-east-2.amazonaws.com/Banner+Small+.png)

## Description
NOBE is a web application that allows users to connect with books and fellow book lovers. Users can search for books, add books to their personal library, and connect with other users who have the same interests. The principle idea is creating a collective library and facilitate peer-to-peer lending, and through that process, and the discussion of books, create a community of readers, virtual and "IRL". Please note that this is a large project with many dependencies and requires active users, a populated database, and a lot of set up to run.  It is not meant to be cloned and operated locally; it is only for code demonstration.  I may refactor this in order to create a newer deployed. 

## Technologies Used
* React
* TypeScript
* Node.js
* Express
* PostgreSQL
* Prisma
* MUI
* AWS S3
* AWS EC2
* AWS RDS
* Google Books API
* Google OAuth
* Google Maps API
* OpenAI API
## Set Up

1. Clone the repository:

```bash
git clone https://github.com/tweezerchef/nobe.git
```

2. Install the dependencies:

```bash
cd nobe
npm install
```

3. Set up the database:

NOBE uses PostgreSQL as its database. You can set up a local PostgreSQL server or use a cloud-based service like AWS RDS. Once you have a database set up, create a `.env` file in the root directory of the project with the following contents:

```
DATABASE_URL="postgresql://user:password@host:port/database"
```

Replace `user`, `password`, `host`, `port`, and `database` with the appropriate values for your database.

Then, run the following command to create the database schema:

```bash
npx prisma migrate dev
```

4. Set up Google OAuth:

NOBE uses Google OAuth for user authentication. To set this up, you'll need to create a new project in the [Google Cloud Console](https://console.cloud.google.com/), enable the Google Books API and Google Maps API, and create OAuth credentials for your project. Once you have the credentials, add to the  `.env` file in the root directory of the project with the following contents:

```
GOOGLE_CLIENT_ID="your_client_id"
GOOGLE_CLIENT_SECRET="your_client_secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"
```

Replace `your_client_id` and `your_client_secret` with the appropriate values for your OAuth credentials.

5: Remaining Credentials
Refer to the example.env file for the remaining credentials needed to run the app.  You will need an googleAPI key for maps and books, the New York Times API for "Trending",  as well as an OPENAI key for the AI feature.


6. Start the server:

```bash
npm run server
```

The server should now be running on `http://localhost:8080`. You can access the web application by opening a web browser and navigating to `http://localhost:8080`.
