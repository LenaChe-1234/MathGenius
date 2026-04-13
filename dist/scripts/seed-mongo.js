import { getConfig } from "../config/env.js";
import { seedGymiTracks, seedMockExams, seedTopics } from "../content/seed-content.js";
import { createMongoDatabase } from "../db/providers.js";
async function seedMongo() {
    const config = getConfig();
    if (config.dbProvider !== "mongo") {
        throw new Error("Set DB_PROVIDER=mongo before running the MongoDB seed script.");
    }
    const mongo = await createMongoDatabase();
    try {
        await mongo.db.collection("topics").deleteMany({});
        await mongo.db.collection("gymi_tracks").deleteMany({});
        await mongo.db.collection("mock_exams").deleteMany({});
        await mongo.db.collection("topics").insertMany(seedTopics);
        await mongo.db.collection("gymi_tracks").insertMany(seedGymiTracks);
        await mongo.db.collection("mock_exams").insertMany(seedMockExams);
        await mongo.db.collection("study_plans").createIndex({ student_id: 1 }, { unique: true });
        await mongo.db.collection("progress_entries").createIndex({ student_id: 1, completed_at: -1 });
        console.log(`MongoDB seed completed for database "${config.mongoDbName}".`);
    }
    finally {
        await mongo.client.close();
    }
}
seedMongo().catch((error) => {
    console.error("MongoDB seed failed:", error);
    process.exit(1);
});
