export function getLink(linksObject: { [key: string]: string }, choice: string): string {
    if (linksObject.hasOwnProperty(choice)) {
      return linksObject[choice];
    } else {
      console.error('Invalid choice provided:', choice);
      return '';
    }
  }