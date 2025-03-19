import { Detail, Text } from "@raycast/api";

export default function Command() {
	console.log("Running function");
	// return <Detail markdown="# Hello World" />;
	const result = <Detail markdown="# Hello World" />;
	console.log("Returning:", result);
	return <Text>Hello world</Text>;
}