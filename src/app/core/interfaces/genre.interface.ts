export type DateStringOrNull = Date | string | null;

export interface IGenre {
    genreId: number;
    genreShortname: string;
    genreName: string;
    createdAt: DateStringOrNull;
    deletedAt: DateStringOrNull;
    updatedAt: DateStringOrNull;
}

export interface IGenreCreateRequest {
    shortName: string;
    name: string;
}