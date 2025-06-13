import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import { useToast } from "@chakra-ui/react";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();
	const location = useLocation();
	const toast = useToast();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	// Show toast based on Stripe redirect
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		if (params.get("success")) {
			toast({
				title: "Payment Successful!",
				description: "Thank you for your purchase.",
				status: "success",
				duration: 4000,
				isClosable: true,
			});
		} else if (params.get("canceled")) {
			toast({
				title: "Payment Cancelled",
				description: "Your payment was not completed.",
				status: "error",
				duration: 4000,
				isClosable: true,
			});
		}
	}, [location.search, toast]);

	console.log("products", products);

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Products 
				</Text>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</SimpleGrid>

				{products.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No products found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a product
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};
export default HomePage;
