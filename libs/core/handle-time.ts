export const formatSecondToMinute = (second: number) => Math.floor(second / 60);

export const secondsToMinutesString = (seconds: number): string => {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    const minutesString: string = minutes.toString().padStart(2, '0');
    const secondsString: string = remainingSeconds.toString().padStart(2, '0');

    return `${minutesString}:${secondsString}`;
};


export const formatStringtoDate = (wholeDate: string): string => {
    const date = new Date(wholeDate);
    const formatter = new Intl.DateTimeFormat('hi');
    const parts = formatter.formatToParts(date);
    const result = parts[0].value + parts[1].value + parts[2].value + parts[3].value + parts[4].value;

    return result;
};

// secondsToMinutesString(course.time)