import * as React from "react";
import { MSGraphClientV3, MSGraphClientFactory,SPHttpClient,ISPHttpClientOptions } from "@microsoft/sp-http";
import * as mailparser from "mailparser";
//import fs from "fs"
import {fromBase64,toBase64,atob} from 'js-base64';
import { saveAs } from "file-saver";
//import { Document, Page } from "react-pdf";
//import pdfParse from 'pdf-parse';
//import PdfParse from "pdf-parse";
//import pdfjs from 'pdfjs-dist';
type proptType = {
  msGraphClientFactory: MSGraphClientFactory;
  sphttpClient:SPHttpClient
};



function GraphApi(props: proptType): React.ReactElement<HTMLDivElement> {

//console.log('the value of ',mailparser);

  function getGraphClient(): Promise<MSGraphClientV3> {
    
    return props.msGraphClientFactory.getClient("3");
  }


   function saveToSharePointList(blob:Blob, filename: string):void {
       console.log('the value of filename is ',filename);
       console.log('the value of file is ',blob);
       
       alert("save to sahrepoint function is called:");
    const siteUrl:string = "https://zehntechtechnologies.sharepoint.com/sites/SharepointSpfx";
    const documentLibraryEndpoint: string = `${siteUrl}/_api/web/lists/getbytitle('Pdfs')/RootFolder/Files/add(url='${filename}', overwrite=true)`;

  
    const config: ISPHttpClientOptions = {
        body: blob,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/octet-stream', // Set the content type as per your requirement
        },
      };
   
      props.sphttpClient.post(documentLibraryEndpoint,SPHttpClient.configurations.v1,config)
      .then((Response)=>{
        console.log('the Response data is ',Response);

        if(Response.ok){
            alert("data is submitted:");
        }
        else{
            alert("data is not submitted:");
        }

        return Response.json();
        
      })
      .then((data)=>{
        console.log('the Resonse.json()  data is ',data);
        
      })
      .catch((error)=>{
        alert("there is an error:");
        console.log('the error is ',error);
        
      })
    
    
  }


   function convertBase64ToPdf(base64String:string, filename:string):void {
       alert("the function convetBase64ToPdf is called:");
    try {
        const decodedPdfData = atob(base64String);
        const uint8Array = new Uint8Array(decodedPdfData.length);
  
        for (let i = 0; i < decodedPdfData.length; i++) {
          uint8Array[i] = decodedPdfData.charCodeAt(i);
        }
  
        const blob = new Blob([uint8Array], { type: "application/pdf" });
       alert('now printing the value of blob is ');
        
        console.log('the value of blob is ',blob);
        
        saveAs(blob, filename);
      
       
       saveToSharePointList(blob, filename);
      
      } catch (error) {
        console.error("Error converting base64 to PDF:", error);
      }

  }



  function pdfContentToText(pdfAttachmentBase64: string): void {
    const cleanedPdfAttachmentBase64 = pdfAttachmentBase64
      .replace(/Content-ID: <f_lrgl9yg41>/g, '')
      .replace(/X-Attachment-Id: f_lrgl9yg41/g, '')
      .trim();
  
    try {
      const decodedPdfTextContent = fromBase64(toBase64(cleanedPdfAttachmentBase64));
      console.log('teh value of decodepdftext is ',decodedPdfTextContent);
     
      convertBase64ToPdf(decodedPdfTextContent,'email6.pdf');
      
      
    } catch (error) {
      console.error("Error decoding PDF content:", error);
    
      
    }
  }


  

function base64ToText(base64Data:string):string | null {
   
  try {
    const decodedData = toBase64(base64Data);
    console.log('the data of decodedData is ',decodedData);
    
    return fromBase64(decodedData);
  } catch (error) {
    console.error("Error decoding base64 data:", error);
    return null;
  }
}


  


  function extractPDFBase64(emlContent: string): string {
   // const cleanedContent = cleanEmlContent(emlContent);
  
    const pdfAttachmentRegex = /Content-Disposition: attachment; filename="testPDF.pdf"\s*Content-Transfer-Encoding: base64\s*([\s\S]+?)\s*--/;
  
    const match = emlContent.match(pdfAttachmentRegex);
  
    if (match && match[1]) {
      return match[1];
    }
  
    console.error("PDF attachment not found in emlContent");
    return "";
  }
  




  async function getEmailById(messageId: string): Promise<void> {

    try {
      const graphClient = await getGraphClient();
    
      const email = await graphClient
        .api(`/me/messages/${messageId}`)
        .expand("attachments")
        .get();
       // console.log('email value is ',email);
        
      const attachment = email.attachments[0];
      
      if (attachment.contentType === "message/rfc822") {
       
        try {
          // Get the attachment content bytes
          const attachmentContentBytes = await graphClient
            .api(
              `/me/messages/${messageId}/attachments/${attachment.id}/$value`
            )
            .get();
       
          
          const emlContent = Buffer.from(attachmentContentBytes).toString("utf-8");
          const pdfAttachmentBase64 = extractPDFBase64(emlContent);
         

    if (pdfAttachmentBase64) {
       // const pdfAttachmentBase641 = toBase64(emlContent);
      const pdfTextContent = base64ToText(pdfAttachmentBase64);
      
      console.log("Decoded PDF text content:", pdfTextContent);
      if(pdfTextContent !== null){
        pdfContentToText(pdfTextContent);
      }
     
    }
    else{
        alert("not workign it:");
    }
          
    } 
    catch (error) {
          console.error("Error fetching attachment content:", error);
    }


    }

   
    }catch (error) {
      console.error("Error fetching email by ID:", error);
    }


  }


  getEmailById("AAMkADkzN2YwMTA3LTM3ZWQtNDMxZS1iOTFkLTU5OGQ4NTAwNTUyNQBGAAAAAAA2cY2TI91zSbOAIYftgEJfBwA1z8n_QlJQT5ZWfiPj8DwpAAAAAAEMAAA1z8n_QlJQT5ZWfiPj8DwpAABmmVUQAAA=")
  .catch((error) => {
      console.log("there is an error:", error);
  });

  





  return (
    <div>
      <h1>hello world</h1>
    </div>
  );



}

export default GraphApi;
