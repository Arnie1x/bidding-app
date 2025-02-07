export function formatDateTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const options: Intl.DateTimeFormatOptions = {
    //   year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    //   timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    //   timeZoneName: "short",
    };
    // Convert date to user's system timezone
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const convertedDate = new Date(date.toLocaleString('en-US', { timeZone: userTimeZone }));
    return new Intl.DateTimeFormat(undefined, options).format(convertedDate);
  }