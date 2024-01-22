declare module 'eml-format' {
    function readMessage(emlContent: string): any;
    export = readMessage;
  }
  
  