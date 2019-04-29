import { ClubsListItem, SubmissionListItem } from './ListsItems';
export interface IClubsListService {
    getClubsListItems(): Promise<Array<ClubsListItem>>;
}
// export interface IClubNumberListService {
//     getClubNumberListItems(): Promise<Array<ClubNumberListItem>>;
// }

// export interface IRegionListService {
//     getRegionListItems(): Promise<Array<RegionListItem>>;
// }

export interface ISubmissionListService {
    uploadDocument(SubmissionListItem, string): Promise<any>;
    // updateDataOfSubmission(item: SubmissionListItem): Promise<any>
}