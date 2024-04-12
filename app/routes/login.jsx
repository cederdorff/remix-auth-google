import { Form } from "@remix-run/react";
export default function Login() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Login</h1>
      <Form action="/auth/google" method="post">
        <button>Login with Google</button>
      </Form>
    </div>
  );
}
