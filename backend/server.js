import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import Stripe from "stripe";

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 5005;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/products", productRoutes);

app.post("/api/create-checkout-session", async (req, res) => {
	try {
		const { product } = req.body;
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: product.name,
							images: [product.image],
						},
						unit_amount: Math.round(product.price * 100),
					},
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: "http://localhost:5173?success=true",
			cancel_url: "http://localhost:5173?canceled=true",
		});
		res.json({ url: session.url });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});
