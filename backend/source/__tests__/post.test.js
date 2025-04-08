import supertest from "supertest";
import { app } from "../../server.js";

let token = "";

beforeAll(async () => {
    const response = await supertest(app).get("/user/loginUser").send({ login: "qwe", password: "qweqweqwe" });
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
                .send({ text: "trew" })
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


    describe("GET get post /getPost", () => {
        it("get post unauthorized code 401", async () => {
            await supertest(app)
                .get("/post/getPost")
                .expect(401);
        }, 10000);

        it("get post authorized no content code 400", async () => {
            await supertest(app)
                .get("/post/getPost")
                .set("Authorization", token)
                .send({})
                .expect(400);
        }, 10000);

        it("get post authorized content not exist code 204", async () => {
            await supertest(app)
                .get("/post/getPost")
                .set("Authorization", token)
                .send({ id_post: 4 })
                .expect(204);
        }, 10000);

        it("get post authorized content code 200", async () => {
            await supertest(app)
                .get("/post/getPost")
                .set("Authorization", token)
                .send({ id_post: 36 })
                .expect(200);
        }, 10000);
    });


    describe("POST create post /createPost", () => {
        describe("create post unauthorized", () => {
            it("create post no content code 401", async () => {
                await supertest(app)
                    .post("/post/createPost")
                    .expect(401);
            }, 10000);

            it("create post with content code 401", async () => {
                await supertest(app)
                    .post("/post/createPost")
                    .send({ title: "afsas", desc: "dsvcxb" })
                    .expect(401);
            }, 10000);
        });

        describe("create post authorized", () => {
            it("create post no content code 400", async () => {
                await supertest(app)
                    .post("/post/createPost")
                    .set("Authorization", token)
                    .expect(400);
            }, 10000);

            it("create post content with one required parametr code 400", async () => {
                await supertest(app)
                    .post("/post/createPost")
                    .set("Authorization", token)
                    .send({ title: "asfag" })
                    .expect(400);
            }, 10000);

            it("create post content with two and more parametr code 200", async () => {
                await supertest(app)
                    .post("/post/createPost")
                    .set("Authorization", token)
                    .send({ title: "Asmmmfdt", desc: "trew", tags: [1] })
                    .expect(200);
            }, 10000);
        });
    });


    describe("PUT change post /changePost", () => {
        describe("change post unauthorized", () => {
            it("change post no content code 401", async () => {
                await supertest(app)
                    .put("/post/changePost")
                    .expect(401);
            }, 10000);

            it("change post with content code 401", async () => {
                await supertest(app)
                    .put("/post/changePost")
                    .send({ title: "afsas", desc: "dsvcxb" })
                    .expect(401);
            }, 10000);
        });

        describe("change post authorized", () => {
            it("change post no content code 400", async () => {
                await supertest(app)
                    .put("/post/changePost")
                    .set("Authorization", token)
                    .expect(400);
            }, 10000);

            it("change post content with one required parametr code 200", async () => {
                await supertest(app)
                    .put("/post/changePost")
                    .set("Authorization", token)
                    .send({ id_post: Number(36) })
                    .expect(200);
            }, 10000);

            it("change post content with two and more parametr code 200", async () => {
                await supertest(app)
                    .put("/post/changePost")
                    .set("Authorization", token)
                    .send({ title: "Asmmmfdt", desc: "trew", tags: [1], id_post: Number(36) })
                    .expect(200);
            }, 10000);
        });
    });

    describe("DELETE delete post /deletePost", () => {
        it("delete post unauthorized code 401", async () => {
            await supertest(app)
                .delete("/post/deletePost")
                .expect(401);
        }, 10000);

        it("delete post without id post 400", async () => {
            await supertest(app)
                .delete("/post/deletePost")
                .set("Authorization", token)
                .expect(400);
        }, 10000);

        it("delete post with id post 200", async () => {
            await supertest(app)
                .delete("/post/deletePost")
                .set("Authorization", token)
                .send({ id_post: 55 })
                .expect(200);
        }, 10000);
    });
});

describe("tests /user router", () => {
    

    describe("POST create user /createUser", () => {
        it("create user without data code 400", async() => {
            await supertest(app).post("/user/createUser").expect(400);
        });

        it("create user with data not valid code 400", async() => {
            await supertest(app).post("/user/createUser").send({login: "Qwerty", password: [1,2,3,4], mail: "asfasfqe@gmail.com"}).expect(400);
        });

        it("create user with data code 200", async() => {
            await supertest(app).post("/user/createUser").send({login: "Qwerty", password: "Qwertyuiop", mail: "asfasfqe@gmail.com"}).expect(200);
        });
    });

    
    describe("GET login user /loginUser", () => {

        it("login user without data code 400", async() => {
            await supertest(app).get("/user/loginUser").expect(400);
        });

        it("login user with data not valid code 400", async() => {
            await supertest(app).get("/user/loginUser").send({login: "Qwerty", password: [1,2,3]}).expect(400);
        });

        it("login user with data code 200", async() => {
            await supertest(app).get("/user/loginUser").send({login: "Qwerty", password: "Qwertyuiop"}).expect(200);
        });
    });


    describe("GET check profile user /profileUser", () => {

        it("profile user unauthorized code 401", async() => {
            await supertest(app).get("/user/profileUser").expect(401);
        });

        it("profile user unauthorized code 200", async() => {
            await supertest(app).get("/user/profileUser").set("Authorization", token).expect(200);
        });

    });

});