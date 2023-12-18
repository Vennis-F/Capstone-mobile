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

export const timeSince = (date) => {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " năm trước";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " tháng trước";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " ngày trước";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " giờ trước";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " phút trước";
    }
    return Math.floor(seconds) + " giây trước";
};
// secondsToMinutesString(course.time)