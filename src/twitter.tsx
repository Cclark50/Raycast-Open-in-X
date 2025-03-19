import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
import { useState } from "react";


export default function Command(){
	const [url123, setURL] = useState("");

	const BuildURL = (newValue: string) => {
		if(newValue === ""){
			showToast({style:Toast.Style.Failure, title:"URL Empty", message:"Please enter a valid URL"});
			return "URL cannot be empty";
		}
		if(newValue.includes(" ")){
			showToast({style:Toast.Style.Failure, title:"URL has Spaces", message:"Please enter a valid URL"});
			return "URL cannot have spaces";
		}

		if(newValue.includes(".com")){
			let pos = newValue.indexOf(".com/");
			pos += 5;
			newValue = newValue.substring(pos);
		}

		const newURL = `https://x.com/${newValue}`;
		setURL(newURL);
	}


	return (
		<Form
			actions={
		<ActionPanel>
			{url123 ? (
				<Action.OpenInBrowser url={url123} title={"Open in X"}/>
			) : (
				<Action title={"No URL"} onAction={() => console.log("no url")}/>
			)}
		</ActionPanel>
	}
	>
			<Form.TextField
				id={"URL"}
				title="URL"
				placeholder="Enter URL"
				onChange={BuildURL}
			/>
	</Form>
	);
}
