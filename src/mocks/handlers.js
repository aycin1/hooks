import { http, HttpResponse } from "msw";

let followingUsers = new Set();
let likedUsers = new Set();

export const handlers = [
  http.post("*/register", async ({ request }) => {
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

  http.post("*/login", async ({ request }) => {
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

  http.get("*/users/", () => {
    return HttpResponse.text("thisUser");
  }),

  http.get("*/users/search/:searchField", ({ params }) => {
    const { searchField } = params;

    if (searchField === "thisUser") {
      return HttpResponse.json({ username: searchField }, { status: 200 });
    }
    return HttpResponse.json({ error: "No user found" }, { status: 404 });
  }),

  http.get("*/lists", () => {
    return HttpResponse.json({
      wishlist: [{ pattern_id: 123, list: "wishlist" }],
      wip: [
        { pattern_id: "abc", list: "wip" },
        { pattern_id: "def", list: "wip" },
      ],
      completed: [],
    });
  }),

  http.post("*/lists/", () => {
    return HttpResponse.json({
      message: "added",
    });
  }),

  http.patch("*/lists/", () => {
    return HttpResponse.json({
      message: "updated",
    });
  }),

  http.delete("*/lists/", () => {
    return HttpResponse.json({
      message: "removed",
    });
  }),

  http.get("*/patterns/filter/:patternID", ({ params }) => {
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

  http.get("*/patterns/refine/", ({ request }) => {
    const query = new URL(request.url).searchParams.get("query");

    return HttpResponse.json([
      { id: 1, name: `result 1 for ${query}` },
      { id: 2, name: `result 2 for ${query}` },
    ]);
  }),

  http.get("*/patterns/attributes", () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "size",
        pattern_attributes: [
          { id: "xs", name: "extra-small" },
          { id: "s", name: "small" },
        ],
      },
    ]);
  }),

  http.get("*/patterns/categories", () => {
    return HttpResponse.json([
      {
        name: "hats",
        permalink: "hats",
        children: [
          { name: "bucket", permalink: "bucket" },
          { name: "beanies", permalink: "beanies" },
        ],
      },
    ]);
  }),

  http.post("*/feed", () => {
    return HttpResponse.json({ message: "Posted" }, { status: 201 });
  }),

  http.put("*/feed/", async ({ request }) => {
    const { post_id, caption } = await request.json();
    return HttpResponse.json({ message: "caption edited" });
  }),

  http.delete("*/feed/", async ({ request }) => {
    const { post_id, caption } = await request.json();
    return HttpResponse.json({ message: "post deleted" });
  }),

  http.get("*/comments/:postID", ({ params }) => {
    const { postID } = params;
    return HttpResponse.json([
      { post_id: postID, message: "c1", comment_username: "user" },
      { post_id: postID, message: "c2", comment_username: "thisUser" },
    ]);
  }),

  http.get("*/likes/:postID", ({ params }) => {
    const { postID } = params;
    likedUsers.add("user");
    likedUsers.add("user2");
    likedUsers.add("user3");

    return HttpResponse.json({ likedUsers: [...likedUsers] });
  }),

  http.get("*/likes/user/:postID", ({ params }) => {
    const { postID } = params;
    const hasLiked =
      [...likedUsers].find((user) => user === "thisUser") === undefined
        ? false
        : true;

    return HttpResponse.json(hasLiked);
  }),

  http.post("*/likes", async ({ request }) => {
    const { post_id } = await request.json();
    likedUsers.add("thisUser");
    return HttpResponse.json({
      message: "liked",
    });
  }),

  http.delete("*/likes", async ({ request }) => {
    const { post_id } = await request.json();
    likedUsers.delete("thisUser");
    return HttpResponse.json({
      message: "like removed",
    });
  }),

  http.get("*/follows/", ({ request }) => {
    const url = new URL(request.url);
    const searchedUser = url.searchParams.get("searchedUser");

    if (followingUsers.has(searchedUser)) {
      return HttpResponse.json({ message: "following" }, { status: 200 });
    }
    return HttpResponse.json({ message: "not following" }, { status: 204 });
  }),

  http.post("*/follows/", async ({ request }) => {
    const { following_user } = await request.json();
    followingUsers.add(following_user);
    return HttpResponse.json({
      message: `Following ${following_user}`,
    });
  }),

  http.delete("*/follows/", async ({ request }) => {
    const { unfollowing_user } = await request.json();
    followingUsers.delete(unfollowing_user);
    return HttpResponse.json({
      message: `Unfollowed ${unfollowing_user}`,
    });
  }),

  http.get("*/follows/count", () => {
    return HttpResponse.json([
      { followers: ["f1", "f2", "f3", "f4"] },
      {
        following: ["fA", "fB", "fC", "fD", "fF", "fG"],
      },
    ]);
  }),
];
