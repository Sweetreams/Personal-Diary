import supertest from "supertest";
import { app } from "../../server.js";

let token = "";

beforeAll(async () => {
    const response = await supertest(app).get("/user/loginUser").send({login: "qwe", password: "qweqweqwe"});
    token = response.body.token;
});

describe("tests /post router", () => {


    describe("GET search post /searchPost", () => {
        it("search post with no content code 204", async () => {
            await supertest(app)
                .get("/post/searchPost")
                .expect(204);
        }, 10000);
        it("search post with content code 200", async () => {
            await supertest(app)
                .get("/post/searchPost")
                .send({ text: "1234" })
                .expect(200);
        }, 10000);
    });


    describe("GET get posts /getPosts", () => {
        it("get posts unauthorized code 401", async () => {
            await supertest(app)
                .get("/post/getPosts")
                .expect(401);
        }, 10000);

        it("get posts authorized code 200", async () => {
            await supertest(app)
                .get("/post/getPosts")
                .set("Authorization", token)
                .expect(200);
        }, 10000);
    });


});

