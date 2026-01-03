import { sequelize } from "../config/sequelize.js";
import "../app/models/app-user.model.js"

(async () => {
	try {
		console.log("Connecting to DB...");
		await sequelize.authenticate();

		console.log("Syncing database");
		await sequelize.sync({ force: true });
	
		console.log("\n✅ Database synced\n");
	} catch (error) {
		console.error("DB error:", error);
	} finally {
		await sequelize.close();
	}
})();