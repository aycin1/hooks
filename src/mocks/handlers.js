import { http, HttpResponse } from "msw";

let followingUsers = new Set();

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

  http.get("http://localhost:2501/users/search/:searchField", ({ params }) => {
    const { searchField } = params;

    if (searchField === "thisUser") {
      return HttpResponse.json({ username: searchField }, { status: 200 });
    }
    return HttpResponse.json({ error: "No user found" }, { status: 404 });
  }),

  http.get("http://localhost:2501/follows/", ({ request }) => {
    const url = new URL(request.url);
    const searchedUser = url.searchParams.get("searchedUser");

    if (followingUsers.has(searchedUser)) {
      return HttpResponse.json({ message: "following" }, { status: 200 });
    }
    return HttpResponse.json({ message: "not following" }, { status: 204 });
  }),

  http.post("http://localhost:2501/follows/", async ({ request }) => {
    const { following_user } = await request.json();
    followingUsers.add(following_user);
    return HttpResponse.json({
      message: `Following ${following_user}`,
    });
  }),

  http.delete("http://localhost:2501/follows/", async ({ request }) => {
    const { unfollowing_user } = await request.json();
    followingUsers.delete(unfollowing_user);
    return HttpResponse.json({
      message: `Unfollowed ${unfollowing_user}`,
    });
  }),

  // http.get("http://localhost:2501/users/", () => {
  //   return HttpResponse.text("username");
  // }),
  // http.get("http://localhost:2501/lists/", () => {}),
  // http.get("http://localhost:2501/follows/count", () => {}),
  // http.get("http://localhost:2501/posts/", () => {}),
];
