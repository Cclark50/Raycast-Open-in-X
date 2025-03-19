// import { showHUD, Clipboard } from "@raycast/api";
import { Action, ActionPanel, Alert, Detail, Form, showToast, Toast} from "@raycast/api";
import { useForm, FormValidation } from "@raycast/utils";

interface URLBox {
	URLFormBox: string;
}

export default function Command(){
	// return <Detail markdown="# Hello World" />;
	const { handleSubmit, itemProps } = useForm<URLBox>({
		onSubmit(values) {
			showToast({
				style: Toast.Style.Success,
				title: "Test123",
				message: '${values.URLFormBox} is URL to be downloaded from',
			});
		},
			validation: {
				URLFormBox: FormValidation.Required,
					}
	});
	return (
		<Form
			actions={
		<ActionPanel>
			<Action.SubmitForm title="Submit" onSubmit = {handleSubmit} />
		</ActionPanel>
	}
	>
	<Form.TextField title="URL" placeholder="https://x.com/"  {...itemProps.URLFormBox} />
	</Form>
	);
}
