
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import UserBooks from './routes/userbooks';
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

dotenv.config();


const app = express();
const CLIENT_PATH = path.resolve(__dirname, '../client/build');
const PORT = 8080;
//Middleware
app.use(morgan('combined'));
app.use(express.static(CLIENT_PATH));
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Authentication
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

app.post("/signup", async (req, res) => {
  try {
    // console.log({ verified: verifyGoogleToken(req.body.credential) });
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      //this needs to be changed to add the user to the database
      // DB.push(profile);

      res.status(201).json({
        message: "Signup was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, "myScret", {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  }
});
app.post("/login", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      // const existsInDB = DB.find((person) => person?.email === profile?.email);

      // if (!existsInDB) {
      //   return res.status(400).json({
      //     message: "You are not registered. Please sign up",
      //   });
      // }

      res.status(201).json({
        message: "Login was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET as jwt.Secret, {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
});





app.use("/books", UserBooks);

//make sure this is the last route in our server
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`);
});
