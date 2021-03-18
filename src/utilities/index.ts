export function hashCode(targetString: string): string {
  var hash = 0, i, chr;
  if (targetString.length === 0) return hash.toString();
  for (i = 0; i < targetString.length; i++) {
    chr   = targetString.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
};

export function timeDifference(current: any, previous: any) {

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed/1000) + ' sec';   
  }

  else if (elapsed < msPerHour) {
    return Math.round(elapsed/msPerMinute) + ' min';   
  }

  else if (elapsed < msPerDay ) {
    return Math.round(elapsed/msPerHour ) + ' hr';   
  }

  const d = new Date(previous);
  let dd: any = d.getDate();
  let mm: any = d.getMonth()+1; 
  let yyyy = d.getFullYear();

  if(dd < 10) dd='0'+dd;
  if(mm < 10) mm='0'+mm;

  return dd+'/'+mm+'/'+yyyy;
}
export { StorageManager } from "./StorageManager";