const request = require('supertest');
const sinon = require('sinon');
const pool = require('../src/config/db');
const app = require('../src/app');
const { expect } = require('chai');

describe("POST /api/posts", () => {
  it("should create a post", async () => {
    const stub = sinon.stub(pool, "execute").resolves([{ insertId: 1 }]);

    const res = await request(app)
      .post("/api/posts")
      .send({ title: "Test post", createdAt: "2025-01-10" });

    expect(res.status).to.equal(201);
    expect(res.body.id).to.equal(1);

    stub.restore();
  });
});

describe("PUT /api/posts/:id", () => {
  it("should update a post", async () => {
    const stub = sinon.stub(pool, "execute").resolves();

    const res = await request(app)
      .put("/api/posts/1")
      .send({ title: "Updated title", createdAt: "2025-02-01" });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Post updated");

    stub.restore();
  });
});

describe("DELETE /api/posts/:id", () => {
  it("should delete a post", async () => {
    const stub = sinon.stub(pool, "execute").resolves();

    const res = await request(app)
      .delete("/api/posts/1");

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Post deleted");

    stub.restore();
  });
});

describe("GET /api/posts", () => {
  it("should return all posts with aggregates", async () => {
    const mockRows = [
      { id: 1, title: "Test", created_at: "2025-01-10", likes: 3, comments: 1 }
    ];

    const stub = sinon.stub(pool, "execute").resolves([mockRows]);

    const res = await request(app).get("/api/posts");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");

    stub.restore();
  });
});
