// @ts-nocheck
const request = require("supertest");

const server = require("./server");
const db = require("../data/gamesDb");

describe("server", () => {
  it("sets the environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("GET: /", () => {
  it("should return 200 OK", async () => {
    const Res = await request(server).get("/");
    expect(Res.status).toBe(200);
  });
  it(`returns Content-Type: 'application/json'`, async () => {
    const Res = await request(server).get("/");
    expect(Res.type).toBe("application/json");
  });
  it(`returns body: {msg: 'hello'}`, async () => {
    const Res = await request(server).get("/");
    const expectRes = { msg: "hello" };
    expect(Res.body).toEqual(expectRes);
  });
});

describe("POST: /games", () => {
  it("returns status 422 when body is missing required fields", async () => {
    const Pacman = {
      title: "", // required
      genre: "", // required
      releaseYear: 1985 // not required
    };
    const Res = await request(server)
      .post("/games")
      .send(Pacman);
    expect(Res.status).toBe(422);
  });
  it("returns Content-Type: application/json", async () => {
    const fifa = {
      title: "FIFA2", // required
      genre: "Sports", // required
      releaseYear: 2005 // not required
    };
    const Res = await request(server)
      .post("/games")
      .send(fifa);
    expect(Res.type).toBe("application/json");
  });
  it("returns confirmation message", async () => {
    const madden = {
      title: "MADDEN", // required
      genre: "Sports", // required
      releaseYear: 1998 // not required
    };
    const Res = await request(server)
      .post("/games")
      .send(madden);
    expect(Res.body.msg).toBe("Game added");
  });
});

describe("Get: /games", () => {
  it("returns status 200", async () => {
    const res = await request(server).get("/games");
    expect(res.status).toBe(200);
  });
  it("returns returns Content-Type: application/json", async () => {
    const res = await request(server).get("/games");
    expect(res.type).toBe("application/json");
  });
  it("returns a list of games", async () => {
    const res = await request(server).get("/games");
    expect(res.body.games).toHaveLength(3);
  });
});
