import * as React from "react";
import { MSGraphClientV3, MSGraphClientFactory,SPHttpClient,ISPHttpClientOptions } from "@microsoft/sp-http";
import * as mailparser from "mailparser";
import {fromBase64,toBase64,atob} from 'js-base64';
import { saveAs } from "file-saver";

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



  
function pdfContentToText(pdfData: { pdfTextContent: string, filename: string }): void {
    alert("the function convertBase64ToPdf is called:");
    try {
      const decodedPdfData = atob(pdfData.pdfTextContent);
      const uint8Array = new Uint8Array(decodedPdfData.length);

      for (let i = 0; i < decodedPdfData.length; i++) {
        uint8Array[i] = decodedPdfData.charCodeAt(i);
      }

      const blob = new Blob([uint8Array], { type: "application/pdf" });
      alert('now printing the value of blob is ');

      console.log('the value of blob is ', blob);

      //saveAs(blob, pdfData.filename);

      saveToSharePointList(blob, pdfData.filename);

    } catch (error) {
      console.error("Error converting base64 to PDF:", error);
    }
  }





function base64ToText(base64Data:string):string | null {
    console.log('the value of base64 before conversion is',base64Data);
    base64Data = base64Data.replace(/Content-Disposition: attachment; filename="[^"]+"\s*/g, '');
     alert("new value of base64 is ");
     console.log('the value of base64 after conversion is',base64Data);
     
  try {
    const decodedData = toBase64(base64Data);
    console.log('the data of decodedData is ',decodedData);

    return fromBase64(decodedData);
    //return decodedData
  } catch (error) {
    console.error("Error decoding base64 data:", error);
    return null;
  }
}




// function extractPDFBase64(emlContent: string): Array<{ filename: string, content: string }> {
//     console.log('the emlContetn is ',emlContent);
    
//     const pdfAttachments: Array<{ filename: string, content: string }> = [];
    
//    const pdfAttachmentRegex = /Content-Disposition: attachment; filename="([^"]+)"[\s\S]+?Content-Transfer-Encoding: base64\s*([\s\S]+?)\s*--/g;

//     let match;

//     while ((match = pdfAttachmentRegex.exec(emlContent)) !== null) {
//         alert("the value of match is ");
//         console.log('the match is ',match);
        
//         const filename = match[1];
//         const base64Content = match[2];
//         pdfAttachments.push({ filename, content: base64Content });
//     }
//      alert("the pdfAttachment array length is ");
//      console.log('array length is ',pdfAttachments.length)
//     if (pdfAttachments.length > 0) {
//         return pdfAttachments;
//     }

//     console.error("PDF attachments not found in emlContent");
//     return [];
// }


function extractPDFBase64(emlContent: string): Array<{ filename: string, content: string }> {
    console.log('the emlContent is ', emlContent);

    const pdfAttachments: Array<{ filename: string, content: string }> = [];

    // Define a regex pattern to match the structure of each PDF attachment
    const attachmentRegex = /Content-Type: application\/pdf; name="([^"]+)"[\s\S]+?Content-Transfer-Encoding: base64\s*([\s\S]+?)\s*Content-Disposition: attachment; filename="([^"]+)"/g;

    let match =  attachmentRegex.exec(emlContent)
    while (match !== null) {
        const [, , base64Content, filename] = match;
        pdfAttachments.push({ filename, content: base64Content });
        match =  attachmentRegex.exec(emlContent)
    }

    console.log('array length is ', pdfAttachments.length);

    if (pdfAttachments.length > 0) {
        return pdfAttachments;
    }

    console.error("PDF attachments not found in emlContent");
    return [];
}






async function getEmailById(messageId: string): Promise<void> {
    try {
        const graphClient = await getGraphClient();
        const email = await graphClient
            .api(`/me/messages/${messageId}`)
            .expand("attachments")
            .get();

        const attachments = email.attachments[0];
        alert("the attachment is is given in console:");
        console.log('the value of attachemtn is ', attachments);

       
            if (attachments.contentType === "message/rfc822") {
                alert("content type for loop:");
                console.log('the attachemnt value is ', attachments);

                try {
                    alert("inside the try block:");
                    const attachmentContentBytes = await graphClient
                        .api(`/me/messages/${messageId}/attachments/${attachments.id}/$value`)
                        .get();
                    alert("the api is executed:");

                   
                    console.log("hello in attachment byte value:");
                    console.log('the value of attachementContetnBytes', attachmentContentBytes);
                    const emlContent = Buffer.from(attachmentContentBytes).toString("utf-8");
                    //const emlContent = attachmentContentBytes.toString("utf-8");
                    console.log('the eml content is ', emlContent);
    
                    const pdfAttachments = extractPDFBase64(emlContent);
                    console.log('the pdfAttchment is ', pdfAttachments);

                    alert("the value of pdfAttachemtns is given below:");
                    console.log('the value pdfAttachment', pdfAttachments);

                    for (const pdfAttachment of pdfAttachments) {
                        const pdfTextContent = base64ToText(pdfAttachment.content);

                        console.log(`Decoded PDF text content for ${pdfAttachment.filename}:`, pdfTextContent);

                        if (pdfTextContent !== null) {
                            pdfContentToText({ pdfTextContent, filename: pdfAttachment.filename });
                        }
                    }
                } catch (error) {
                    console.error("Error fetching attachment content:", error);
                }
            }
      
    } catch (error) {
        console.error("Error fetching email by ID:", error);
    }
}


  getEmailById("AAMkADkzN2YwMTA3LTM3ZWQtNDMxZS1iOTFkLTU5OGQ4NTAwNTUyNQBGAAAAAAA2cY2TI91zSbOAIYftgEJfBwA1z8n_QlJQT5ZWfiPj8DwpAAAAAAEMAAA1z8n_QlJQT5ZWfiPj8DwpAABqnj99AAA=")
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






// import * as React from "react";
// import { MSGraphClientV3, MSGraphClientFactory,SPHttpClient,ISPHttpClientOptions } from "@microsoft/sp-http";
// import * as mailparser from "mailparser";
// import {fromBase64,toBase64,atob} from 'js-base64';
// import { saveAs } from "file-saver";

// // type of props:-
// type proptType = {
//   msGraphClientFactory: MSGraphClientFactory;
//   sphttpClient:SPHttpClient
// };



// function GraphApi(props: proptType): React.ReactElement<HTMLDivElement> {



//   function getGraphClient(): Promise<MSGraphClientV3> {
//     return props.msGraphClientFactory.getClient("3");
//   }


//    function saveToSharePointList(blob:Blob, filename: string):void {
//        console.log('the value of filename is ',filename);
//        console.log('the value of file is ',blob);
       
//        alert("save to sahrepoint function is called:");
//     const siteUrl:string = "https://zehntechtechnologies.sharepoint.com/sites/SharepointSpfx";
//     const documentLibraryEndpoint: string = `${siteUrl}/_api/web/lists/getbytitle('Pdfs')/RootFolder/Files/add(url='${filename}', overwrite=true)`;

  
//     const config: ISPHttpClientOptions = {
//         body: blob,
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/octet-stream', // Set the content type as per your requirement
//         },
//       };
   
//       props.sphttpClient.post(documentLibraryEndpoint,SPHttpClient.configurations.v1,config)
//       .then((Response)=>{
//         console.log('the Response data is ',Response);

//         if(Response.ok){
//             alert("data is submitted:");
//         }
//         else{
//             alert("data is not submitted:");
//         }

//         return Response.json();
        
//       })
//       .then((data)=>{
//         console.log('the Resonse.json()  data is ',data);
        
//       })
//       .catch((error)=>{
//         alert("there is an error:");
//         console.log('the error is ',error);
        
//       })
    
    
//   }


//    function convertBase64ToPdf(base64String:string, filename:string):void {
//        alert("the function convetBase64ToPdf is called:");
//     try {
//         const decodedPdfData = atob(base64String);
//         const uint8Array = new Uint8Array(decodedPdfData.length);
  
//         for (let i = 0; i < decodedPdfData.length; i++) {
//           uint8Array[i] = decodedPdfData.charCodeAt(i);
//         }
  
//         const blob = new Blob([uint8Array], { type: "application/pdf" });
//        alert('now printing the value of blob is ');
        
//         console.log('the value of blob is ',blob);
        
//         saveAs(blob, filename);
      
       
//        saveToSharePointList(blob, filename);
      
//       } catch (error) {
//         console.error("Error converting base64 to PDF:", error);
//       }

//   }



//   function pdfContentToText(pdfAttachmentBase64: string): void {
//     const cleanedPdfAttachmentBase64 = pdfAttachmentBase64
//       .replace(/Content-ID: <f_lrgl9yg41>/g, '')
//       .replace(/X-Attachment-Id: f_lrgl9yg41/g, '')
//       .trim();
  
//     try {
//       const decodedPdfTextContent = fromBase64(toBase64(cleanedPdfAttachmentBase64));
//       console.log('teh value of decodepdftext is ',decodedPdfTextContent);
     
//       convertBase64ToPdf(decodedPdfTextContent,'email6.pdf');
//     } catch (error) {
//       console.error("Error decoding PDF content:", error);

//     }
//   }


  

// function base64ToText(base64Data:string):string | null {
   
//   try {
//     const decodedData = toBase64(base64Data);
//     console.log('the data of decodedData is ',decodedData);
    
//     return fromBase64(decodedData);
//   } catch (error) {
//     console.error("Error decoding base64 data:", error);
//     return null;
//   }
// }


// function extractPDFBase64(emlContent: string): string[] {
//     const pdfAttachmentRegex = /Content-Disposition: attachment; filename="([^"]+)".*?Content-Transfer-Encoding: base64\s*([\s\S]+?)\s*--/g;
  
//     const matches: string[] = [];
//     let match;
    
//     while ((match = pdfAttachmentRegex.exec(emlContent)) !== null) {
//       const filename = match[0];
//       const base64Data = match[1];
//       matches.push(base64Data);
//       console.log(`Found PDF attachment with filename: ${filename}`);
//     }
  
//     if (matches.length > 0) {
//       return matches;
//     } else {
//       console.error("No PDF attachments found in emlContent");
//       return [];
//     }
//   }
  


// //   function extractPDFBase64(emlContent: string): string {
  
// //     const pdfAttachmentRegex = /Content-Disposition: attachment; filename="testPDF.pdf"\s*Content-Transfer-Encoding: base64\s*([\s\S]+?)\s*--/;
  
// //     const match = emlContent.match(pdfAttachmentRegex);
  
// //     if (match && match[1]) {
// //       return match[1];
// //     }
  
// //     console.error("PDF attachment not found in emlContent");
// //     return "";
// //   }
  




//   async function getEmailById(messageId: string): Promise<void> {
//     try {
//       const graphClient = await getGraphClient();
  
//       const email = await graphClient
//         .api(`/me/messages/${messageId}`)
//         .expand("attachments")
//         .get();
     
     
//       const attachments = email.attachments;
//      console.log('the value of attachment is ',attachments);
     
     
//         if (attachments[0].contentType === "message/rfc822") {
//             alert("this attachments is called:");
//           try {
//             const attachmentContentBytes = await graphClient
//               .api(`/me/messages/${messageId}/attachments/${attachments[0].id}/$value`)
//               .get();
  
//             const emlContent = Buffer.from(attachmentContentBytes).toString("utf-8");
//             const pdfAttachmentBase64 = extractPDFBase64(emlContent);
//            alert("the pdfAttachement are shown below:");
//            console.log('the valeu of pdfattachemtn is ',pdfAttachmentBase64,pdfAttachmentBase64.length);
//            if(pdfAttachmentBase64.length === 0){
//             alert("array length is zero:");
//            }
//             if (pdfAttachmentBase64.length > 0) {
//                 pdfAttachmentBase64.forEach(pdfAttachment => {
//                   const pdfTextContent = base64ToText(pdfAttachment);
//                   console.log("Decoded PDF text content:", pdfTextContent);
              
//                   if (pdfTextContent !== null) {
//                     pdfContentToText(pdfTextContent);
//                   } else {
//                     alert("Not working for this file.");
//                   }
//                 });
//               } else {
//                 alert("No PDF attachments found in the email content.");
//               }
//           } catch (error) {
//             console.error("Error fetching attachment content:", error);
//           }
//         }
//         else{
//             alert("not executing this :");
//         }
      
//     } catch (error) {
//       console.error("Error fetching email by ID:", error);
//     }
//   }
  

//  //new id
//   //AAMkADkzN2YwMTA3LTM3ZWQtNDMxZS1iOTFkLTU5OGQ4NTAwNTUyNQBGAAAAAAA2cY2TI91zSbOAIYftgEJfBwA1z8n_QlJQT5ZWfiPj8DwpAAAAAAEMAAA1z8n_QlJQT5ZWfiPj8DwpAABpyaXfAAA=
// // previous id
// //AAMkADkzN2YwMTA3LTM3ZWQtNDMxZS1iOTFkLTU5OGQ4NTAwNTUyNQBGAAAAAAA2cY2TI91zSbOAIYftgEJfBwA1z8n_QlJQT5ZWfiPj8DwpAAAAAAEMAAA1z8n_QlJQT5ZWfiPj8DwpAABmmVUQAAA=

//   getEmailById("AAMkADkzN2YwMTA3LTM3ZWQtNDMxZS1iOTFkLTU5OGQ4NTAwNTUyNQBGAAAAAAA2cY2TI91zSbOAIYftgEJfBwA1z8n_QlJQT5ZWfiPj8DwpAAAAAAEMAAA1z8n_QlJQT5ZWfiPj8DwpAABpyaXfAAA=")
//   .catch((error) => {
//       console.log("there is an error:", error);
//   });

  





//   return (
//     <div>
//       <h1>hello world</h1>
//     </div>
//   );



// }

// export default GraphApi;
