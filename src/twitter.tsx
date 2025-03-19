import { Action, ActionPanel,  Form } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { useEffect, useState } from "react";

interface URLBox {
	URLFormBox: string;
}


export default function Command(){
	const [url123, setURL] = useState("https://google.com");

	// const { handleSubmit, itemProps } = useForm<URLBox>({
	// 	onSubmit(values : URLBox) {
	// 		const newURL = `https://x.com/${values.URLFormBox}`;
	// 		setURL(newURL);
	// 		console.log({url123});
	// 	},
	// });

	useEffect(()=>{
		console.log("URL state updated", url123);
		if(url123){
			console.log("Attempting to render Action.OpenInBrowser with URL:", url123);
		}
	}, [url123]);

	const { handleSubmit, itemProps } = useForm<URLBox>({
		onSubmit: (values: URLBox) => {
			console.log("Submitted values:", values);

			const newURL = `https://x.com/${values.URLFormBox}`;
			console.log("constructed URL:", newURL);

			if(!newURL || !newURL.startsWith("https://x.com/")){
				console.error("Invalid URL format:", newURL);
				return;
			}

			setURL(newURL);

			values.URLFormBox = "";
	},
		validation:{
			URLFormBox: (value) => {
				if(!value) return "URL path cannot be empty";
				if(value.includes(" ")) return "URL path cannot contain spaces";
				return null;
			}
		}
	});

	return (
		<Form
			actions={
		<ActionPanel>
			<Action.SubmitForm title="Submit" onSubmit = {handleSubmit} />
			{url123 ? (
				<>
					<Action.OpenInBrowser url={url123} title="Open in Browser" onOpen={() => console.log("opened successfully")} />
					<Action title={"Debut: URL Rendered"} onAction={() => console.log("URL rendered:", url123)}/>
				</>
			) : (
				<Action title={"no URL yet"} onAction={() => console.log("No url in state")}/>
			)}
		</ActionPanel>
	}
	>
	{/*<Form.TextField title="URL" placeholder="https://x.com/"  {...itemProps.URLFormBox} />*/}
			<Form.TextField
				title="URL"
				placeholder={"https://google.com"}
				{...itemProps.URLFormBox}/>
	</Form>
	);
}
