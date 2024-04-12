import { json } from "@remix-run/node";
import { authenticator } from "../service/auth.server";
import { useLoaderData, Form } from "@remix-run/react";

export async function loader({ request }) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login"
  });

  return json({ user });
}

export default function Index() {
  const { user } = useLoaderData();
  console.log(user);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome {user.displayName}</h1>
      <img src={user._json.picture} alt={user.displayName} />
      <h2>{user._json.name}</h2>
      <p>{user._json.bio}</p>
      <p>
        Mail: <a href={`mailto:${user._json.email}`}>{user._json.email}</a>
      </p>
      <Form action="/logout" method="post">
        <button>Logout</button>
      </Form>
    </div>
  );
}
