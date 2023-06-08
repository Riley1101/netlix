import request from "supertest";
import { setup_express } from "../src/lib/setup";

const app = setup_express();

describe("File Upload", function () {
  test.skip("Upload a movie", async function () {
    const response = await request(app)
      .post("/upload/")
      .attach("file", "./fixtures/test.txt");

    expect(response.status).toEqual(200);
    expect(response.body.movie).toBeDefined();
  });
});
