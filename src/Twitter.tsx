import { LaunchProps, popToRoot } from "@raycast/api";
import {execFile} from "node:child_process";
import { promisify} from "node:util";

const execFilePromise = promisify(execFile);

export default async function Command(props: LaunchProps<{arguments: Arguments.Twitter}>): Promise<void> {
  const uncleanURL = props.arguments.URL;

  const buildURL = (input: string): string => {
    const reg = new RegExp(/^[a-zA-Z0-9-_.=&?/:]+$/);
    if (!input) return "";
    if(!(input.match(reg))){
      return "";
    }
    if (input.includes(" ")){
      return "";
    }
    if (input.includes("{")) return "";
    if (input.includes("[")) return "";
    if (input.includes('"')) return "";

    let url = input;
    if(url.includes(".com/")){
      const pos = url.indexOf(".com/");
      if(pos !== -1){
        url = url.substring(pos + 5);
      }
    }

    return `https://x.com/${url}`;
  };

  const url = buildURL(uncleanURL);

  if(url){
    try{
      await execFilePromise("open", [url]);
    } catch(err){
      console.error(err);
    }
  }

  await popToRoot();

}