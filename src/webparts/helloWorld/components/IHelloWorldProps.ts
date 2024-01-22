import {SPHttpClient,MSGraphClientFactory} from "@microsoft/sp-http"

export  interface IHelloWorldProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context:object;
  absoluteUrl:string;
  sphttpClinet:SPHttpClient
  msGraph:MSGraphClientFactory
}
