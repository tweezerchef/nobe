//Authentication
const { PrismaClient } = require('@prisma/client');
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

dotenv.config();
const prisma = new PrismaClient();
const Auth = express.Router(); const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
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

Auth.post("/signup", async (req, res) => {
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

      if (!profile) {
        return res.status(400).json({
          message: "Unable to retrieve user profile",
        });
      }

      //this needs to be changed to add the user to the database
      // DB.push(profile);
      const createdUser = await prisma.user.create({
        data: {
          firstName: profile.given_name ?? "",
          lastName: profile.family_name ?? "",
          email: profile.email ?? "",
          googleId: profile.sub,
          picture: profile.picture ?? "",
        },
      });


      let unique_id = createdUser.id;

      res.status(201).json({
        message: "Signup was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          id: unique_id,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, "mySecret", {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    console.error(error),
      res.status(500).json({
        message: "An error occurred. Registration failed.",
      });
  }
});

// Auth.get("/Login", async (req, res) => {
//   const email = req.query.email as string;
//   const profile = await prisma.user.findFirst({
//     where: {
//       email: email,
//     },
//   });


//   if (profile) {
//     res.status(200).json({
//       message: "Login was successful",
//       user: {
//         firstName: profile.firstName,
//         googleId: profile.googleId,
//         id: profile.id,
//         email: profile.email,
//         // token: jwt.sign({ email: profile.email }, process.env.JWT_SECRET as jwt.Secret, {
//         //   expiresIn: "1d",
//         // }),
//       },
//     });
//   } else {
//     res.status(404).json({
//       message: "User not found",
//     });
//   }
// });


Auth.post("/login", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        console.error(verificationResponse.error);
        return res.status(400).json({
          message: verificationResponse.error,

        });
      }
      const profile = verificationResponse?.payload;

      if (!profile) {
        return res.status(400).json({
          message: "Unable to retrieve user profile",
        });
      }
      const email = profile.email
      const getUser = await axios.get(`http://localhost:8080/user?email=${email}`)
      const userData = getUser.data
      // const existsInDB = DB.find((person) => person?.email === profile?.email);
      //console.log(userData)
      if (!userData) {
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        });
      }
      userData.token = jwt.sign({ email: profile?.email }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: "1d",
      }),

        res.status(201).json({
          message: "Login was successful",
          user: {

            userData
          },
        });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
});

export default Auth