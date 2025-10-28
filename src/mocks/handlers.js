import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:2501/register", async ({ request }) => {
    const body = await request.json();
    const { email, username, password } = body;

    if (email === "already-exists@example.com") {
      return HttpResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }
    if (email && username && password) {
      return HttpResponse.json({ message: "Success" }, { status: 201 });
    }
    return HttpResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }),
  http.post("http://localhost:2501/login", async ({ request }) => {
    const body = await request.json();

    if (body.username === "example" && body.password === "MyPwd123!") {
      return HttpResponse.json(
        { accessToken: "mockToken123" },
        { status: 200 }
      );
    }
    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }),

  // http.get("http://localhost:2501/users/", () => {
  //   return HttpResponse.text("username");
  // }),
  // http.get("http://localhost:2501/lists/", () => {}),
  // http.get("http://localhost:2501/follows/count", () => {}),
  // http.get("http://localhost:2501/posts/", () => {}),
];
