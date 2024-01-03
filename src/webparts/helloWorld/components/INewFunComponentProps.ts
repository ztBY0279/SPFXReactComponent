import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface NewFunComponentProps{

    name:string;
    surname:string;
    Context:WebPartContext;
    abosoluteUrl:string;
}