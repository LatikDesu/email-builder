import { EMPTY_EMAIL_TEMPLATE } from '../config'

export default function getConfiguration(template: string) {
  if (template.startsWith('#code/')) {
    const encodedString = template.replace('#code/', '');
    const configurationString = decodeURIComponent(atob(encodedString));
    try {
      return JSON.parse(configurationString);
    } catch {
      console.error(`Couldn't load configuration from hash.`);
    }
  }

  return EMPTY_EMAIL_TEMPLATE;
}
