import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";

describe("Watchlist API (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let authToken: string;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    // Очистка БД після тестів
    await prisma.watchlistItem.deleteMany();
    await prisma.user.deleteMany();
    await app.close();
  });

  describe("Authentication", () => {
    it("should register a new user", async () => {
      const response = await request(app.getHttpServer())
        .post("/auth/register")
        .send({
          email: "test@example.com",
          password: "password123",
          name: "Test User",
        })
        .expect(201);

      expect(response.body).toHaveProperty("accessToken");
      expect(response.body.user).toHaveProperty("id");
      expect(response.body.user.email).toBe("test@example.com");

      authToken = response.body.accessToken;
      userId = response.body.user.id;
    });

    it("should login with valid credentials", async () => {
      const response = await request(app.getHttpServer())
        .post("/auth/login")
        .send({
          email: "test@example.com",
          password: "password123",
        })
        .expect(201);

      expect(response.body).toHaveProperty("accessToken");
    });
  });

  describe("Watchlist CRUD", () => {
    let watchlistItemId: string;

    it("should add item to watchlist", async () => {
      const response = await request(app.getHttpServer())
        .post("/watchlist")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          tmdbId: 27205,
          mediaType: "movie",
          status: "plan_to_watch",
        })
        .expect(201);

      console.log("Created item:", response.body);

      expect(response.body).toHaveProperty("id");
      expect(response.body.tmdbId).toBe(27205);
      expect(response.body.status).toBe("plan_to_watch");

      watchlistItemId = response.body.id;
    });

    it("should get watchlist stats", async () => {
      const response = await request(app.getHttpServer())
        .get("/watchlist/stats")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      console.log("Stats:", response.body);

      expect(response.body).toEqual({
        total: 1,
        plan_to_watch: 0,
        watching: 0,
        watched: 0,
        dropped: 0,
      });
    });

    it("should delete watchlist item", async () => {
      await request(app.getHttpServer())
        .delete(`/watchlist/${watchlistItemId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      const response = await request(app.getHttpServer())
        .get("/watchlist")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.length).toBe(0);
    });

    it("should return 401 without auth token", async () => {
      await request(app.getHttpServer()).get("/watchlist").expect(401);
    });
  });
});
