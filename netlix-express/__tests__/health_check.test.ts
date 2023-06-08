import request from "supertest";
import { setup_express } from "../src/lib/setup";

const app = setup_express();

describe("GET /health_check", function () {
  test("Server starts successfuly ", async function () {
    const response = await request(app).get("/health_check");
    expect(response.status).toEqual(200);
    expect(response.text).toEqual("OK");
  });
});
