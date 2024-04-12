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

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome {user.displayName}</h1>
      <img src={user._json.avatar_url} alt="" />
      <h2>{user._json.name}</h2>
      <p>{user._json.bio}</p>
      <p>
        Mail: <a href={`mailto:${user._json.email}`}>{user._json.email}</a>
      </p>
      <p>
        GitHub:{" "}
        <a href={user._json.html_url} target="_blank" rel="noreferrer">
          {user._json.html_url}
        </a>
      </p>
      <p>
        Website:{" "}
        <a href={user._json.blog} target="_blank" rel="noreferrer">
          {user._json.blog}
        </a>
      </p>
      <ul>
        <li>You have {user._json.followers} followers</li>
        <li>You&apos;re following {user._json.following} people</li>
        <li>Public Repositories: {user._json.public_repos}</li>
      </ul>
      <Form action="/logout" method="post">
        <button>Logout</button>
      </Form>
    </div>
  );
}
