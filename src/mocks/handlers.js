import { http, HttpResponse } from "msw";

let followingUsers = new Set();

export const handlers = [
  http.post("/register", async ({ request }) => {
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

  http.post("/login", async ({ request }) => {
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

  http.get("/users/search/:searchField", ({ params }) => {
    const { searchField } = params;

    if (searchField === "thisUser") {
      return HttpResponse.json({ username: searchField }, { status: 200 });
    }
    return HttpResponse.json({ error: "No user found" }, { status: 404 });
  }),

  http.get("/follows/", ({ request }) => {
    const url = new URL(request.url);
    const searchedUser = url.searchParams.get("searchedUser");

    if (followingUsers.has(searchedUser)) {
      return HttpResponse.json({ message: "following" }, { status: 200 });
    }
    return HttpResponse.json({ message: "not following" }, { status: 204 });
  }),

  http.post("/follows/", async ({ request }) => {
    const { following_user } = await request.json();
    followingUsers.add(following_user);
    return HttpResponse.json({
      message: `Following ${following_user}`,
    });
  }),

  http.delete("/follows/", async ({ request }) => {
    const { unfollowing_user } = await request.json();
    followingUsers.delete(unfollowing_user);
    return HttpResponse.json({
      message: `Unfollowed ${unfollowing_user}`,
    });
  }),

  http.get("/follows/count", () => {
    return HttpResponse.json([
      { followers: ["f1", "f2", "f3", "f4"] },
      {
        following: ["fA", "fB", "fC", "fD", "fF", "fG"],
      },
    ]);
  }),

  http.get(/\/lists$/, () => {
    return HttpResponse.json({
      wishlist: [{ pattern_id: 123, list: "wishlist" }],
      wip: [
        { pattern_id: "abc", list: "wip" },
        { pattern_id: "def", list: "wip" },
      ],
      completed: [],
    });
  }),

  http.get(/\/users\/$/, () => {
    return HttpResponse.text("thisUser");
  }),

  http.post(/\/feed$/, () => {
    return HttpResponse.json({ message: "Posted" }, { status: 201 });
  }),

  http.get("http://localhost:2501/patterns/filter/:patternID", ({ params }) => {
    const { patternID } = params;
    return HttpResponse.json({
      pattern: {
        id: patternID,
        name: "wooly hat",
        photos: [
          {
            url: "example.jpg",
          },
        ],
      },
    });
  }),

  http.get("http://localhost:2501/comments/:postID", ({ params }) => {
    const { postID } = params;
    return HttpResponse.json([
      { postID: postID, message: "c1", comment_username: "user" },
      { postID: postID, message: "c2", comment_username: "thisUser" },
    ]);
  }),

  http.post("http://localhost:2501/comments/:postID", ({ params }) => {
    const { postID } = params;
    return HttpResponse.json({ message: "comment success" }, { status: 201 });
  }),
];
