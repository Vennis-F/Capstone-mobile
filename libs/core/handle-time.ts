export const formatSecondToMinute = (second: number) => Math.floor(second / 60)

export const secondsToMinutesString = (seconds: number): string => {
    const minutes: number = Math.floor(seconds / 60)
    const remainingSeconds: number = seconds % 60

    const minutesString: string = minutes.toString().padStart(2, '0')
    const secondsString: string = remainingSeconds.toString().padStart(2, '0')

    return `${minutesString}:${secondsString}`
}


// secondsToMinutesString(course.time)