import { Action, ActionPanel, List, popToRoot} from "@raycast/api";
import { useState} from "react";

export default function Command(){
  const [searchText, setSearchText] = useState("");

  const buildURL = (text: string) => {
    if (!text) return "";

    let url = text;
    if(url.includes(".com/")){
      const pos = url.indexOf(".com/");
      if(pos !== -1){
        url = url.substring(pos + 5);
      }
    }

    return `https://x.com/${url}`;
  }

  const url : string = buildURL(searchText);

  return (
    <List
      searchBarPlaceholder={"Enter non standard X URL"}
      onSearchTextChange={() => setSearchText}
    >
      {
        searchText && (
          <List.Item
            title={`Open ${searchText} on X`}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser
                  url={url}
                  title={"Open in X"}
                  onOpen={async () => {
                    await popToRoot();
                  }}
                />
              </ActionPanel>
            }
          />
        )
      }
    </List>
  );
}