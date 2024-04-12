import { authenticator } from "../service/auth.server";

export async function loader({ request }) {
  return authenticator.authenticate("google", request, {
    successRedirect: "/protected",
    failureRedirect: "/login"
  });
}
