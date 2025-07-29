import { dateParser } from 'src/utils/helpers/dateParser';

export const isMutedDifference = (date?: string) => !!date && dateParser.diffFromToday(date) <= 0;
