export class ClubsListItem {
    public Id: number;
    public Title: string;
    public Number: number;
    public Region: string;
}
// export class ClubNumberListItem {
//     public Id: number;
//     public Title: string;
//     public ClubName: string;
// }
// export class RegionListItem {
//     public Id: number;
//     public Title: string;
//     public ClubName: string;
// }

export interface SubmissionListItem {
    file: File,
    Id: number,
    ClubName: number,
    ClubNumber: string,
    ClubRegion: string,
    DocumentType: string,
    Comments: string
}
