declare module 'emailjs-mime-parser' {
    interface ParsedEmail {
      subject?: string;
      from?: { text?: string };
      to?: { text?: string };
      date?: string;
      html?: string;
      text?: string;
      // Add more properties as needed based on your usage
    }
  
    function parse(input: string): ParsedEmail;
  
    export = parse;
  }
  