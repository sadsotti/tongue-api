const request = require('supertest');
const sinon = require('sinon');
const pool = require('../src/config/db');
const app = require('../src/app');
const { expect } = require('chai');

describe("POST /api/interactions", () => {
  it("should create an interaction", async () => {
    const stub = sinon.stub(pool, "execute").resolves([{ insertId: 99 }]);

    const res = await request(app)
      .post("/api/interactions")
      .send({
        type: "like",
        interactionTime: "2025-05-02 12:00:00",
        userId: 1,
        postId: 1
      });

    expect(res.status).to.equal(201);
    expect(res.body.id).to.equal(99);

    stub.restore();
  });
});

describe("PUT /api/interactions/:id", () => {
  it("should update an interaction", async () => {
    const stub = sinon.stub(pool, "execute").resolves();

    const res = await request(app)
      .put("/api/interactions/99")
      .send({
        type: "comment",
        interactionTime: "2025-05-02 13:00:00"
      });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Interaction updated");

    stub.restore();
  });
});

describe("DELETE /api/interactions/:id", () => {
  it("should delete an interaction", async () => {
    const stub = sinon.stub(pool, "execute").resolves();

    const res = await request(app)
      .delete("/api/interactions/99");

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Interaction deleted");

    stub.restore();
  });
});

describe("GET /api/interactions/filter", () => {
  it("should filter interactions by city and date", async () => {
    const mockRows = [
      { post_id: 1, title: "Some post", total_interactions: 4 }
    ];

    const stub = sinon.stub(pool, "execute").resolves([mockRows]);

    const res = await request(app)
      .get("/api/interactions/filter?city=Rome&date=2025-05-02");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");

    stub.restore();
  });
});
