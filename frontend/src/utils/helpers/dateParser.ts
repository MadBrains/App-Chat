import dayjs from 'dayjs';

export enum EnumDateFormat {
  'DayMouthYear' = 'DD.MM.YYYY',
  'HourMinute' = 'HH:mm',
  'NumberFormat' = 'MMDYYYYhmm'
}

const toUtcFormat = (serverDate?: string) => (serverDate ? `${serverDate}Z` : undefined);

export const dateParser = {
  currentDate: () => dayjs(),
  toView: (date?: string, format?: EnumDateFormat) => dayjs(toUtcFormat(date)).format(format),
  toFormat: (dateJs: dayjs.Dayjs, format: EnumDateFormat) => dateJs.format(format),
  toDayjs: (date: string) => dayjs(toUtcFormat(date)),
  getDay: (date: string) => dayjs(toUtcFormat(date)).day(),
  isToday: (date: dayjs.Dayjs | string) =>
    typeof date === 'string' ? dayjs(date).isToday() : date.isToday(),
  diffFromToday: (date: string) => dayjs().tz('Etc/Greenwich').diff(date),
  toUTC: (date?: string) => dayjs(date).utc().format('YYYY-MM-DDTHH:mm:ss')
};
