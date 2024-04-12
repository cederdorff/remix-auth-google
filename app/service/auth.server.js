import { GitHubStrategy } from "remix-auth-github";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";

const gitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  async ({ accessToken, extraParams, profile }) => {
    console.log("accessToken:", accessToken);
    console.log("extraParams:", extraParams);
    console.log("profile:", profile);
    // Save/Get the user data from your DB or API using the tokens and profile
    return profile;
  }
);

export const authenticator = new Authenticator(sessionStorage);
authenticator.use(gitHubStrategy);
