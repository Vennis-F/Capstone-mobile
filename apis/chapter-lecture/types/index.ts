export type ChapterLecture = {
    id: string
    index: number
    title: string
    description: string
    insertedDate: string
    updatedDate: string
    status: string
    resource: string
    video: string | null
    totalContentLength: number
    isPreviewed: boolean
    active: boolean
}

export type ChapterLectureFilter = ChapterLecture & {
    isCompleted: boolean
}

export type ChangeIndexChapterLectureBodyRequest = {
    chapterLectureIds: string[]
}

export type CreateChapterLectureBodyRequest = {
    index: number
    title: string
    description: string
    courseId: string
}

export type UpdateChapterLectureBodyRequest = {
    title?: string
    description?: string
    chapterLectureId: string
    isPreviewed?: boolean
}
