const request = require('supertest');
const sinon = require('sinon');
const pool = require('../src/config/db');
const app = require('../src/app');
const { expect } = require('chai');

describe("POST /api/users", () => {
  it("should create a user", async () => {
    const stub = sinon.stub(pool, "execute").resolves([{ insertId: 10 }]);

    const res = await request(app)
      .post("/api/users")
      .send({ nickname: "Lorenzo", age: 30, city: "Milan" });

    expect(res.status).to.equal(201);
    expect(res.body.id).to.equal(10);

    stub.restore();
  });
});

describe("PUT /api/users/:id", () => {
  it("should update a user", async () => {
    const stub = sinon.stub(pool, "execute").resolves();

    const res = await request(app)
      .put("/api/users/10")
      .send({ nickname: "Lore", age: 31, city: "Rome" });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("User updated");

    stub.restore();
  });
});

describe("DELETE /api/users/:id", () => {
  it("should delete a user", async () => {
    const stub = sinon.stub(pool, "execute").resolves();

    const res = await request(app)
      .delete("/api/users/10");

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("User deleted");

    stub.restore();
  });
});
