import { ClubsListItem, SubmissionListItem } from './ListsItems';
import { IClubsListService, ISubmissionListService } from './ListsServices';
import { sp, Web, ListEnsureResult } from '@pnp/sp';

export class ClubsListData implements IClubsListService {
    public getClubsListItems(): Promise<Array<ClubsListItem>> {
        return new Promise<Array<ClubsListItem>>((resolve: any, reject) => {
            let oWeb = sp.web;
            oWeb.get().then(web => {
                let webRetativeUrl = web.ServerRelativeUrl;
                if (webRetativeUrl === '/') {
                    webRetativeUrl = '';
                }
                return webRetativeUrl;
            }).then((webRetativeUrl) => {
                oWeb.getList(webRetativeUrl + '/Lists/Clubs').items.getAll().then((data: ClubsListItem[]) => {
                    resolve(data);
                }).catch((error) => {
                    console.log("Error while getting Clubs info list items ", error);
                    reject(error);
                });
            }).catch((error) => {
                console.log("Error while getting Web ", error);
                reject(error);
            });
        });
    }
}

export class SubmissionListData implements ISubmissionListService {
    public uploadDocument(itemData: SubmissionListItem, libraryUrl: string): Promise<any> {
        return new Promise<Array<any>>((resolve: any, reject) => {
            if (libraryUrl.indexOf('/') == 0) {
                libraryUrl = libraryUrl.substr(1, libraryUrl.length);
            }
            let oWeb = sp.web;
            oWeb.get().then(web => {
                let webRetativeUrl = web.ServerRelativeUrl;
                if (webRetativeUrl === '/') {
                    webRetativeUrl = '';
                }
                return webRetativeUrl;
            }).then((webRetativeUrl) => {
                oWeb.getList(webRetativeUrl + '/' + libraryUrl.trim()).get().then((listInfo: any) => {
                    console.log(listInfo);
                    oWeb.getFolderByServerRelativeUrl(webRetativeUrl + '/' + libraryUrl.trim()).files.add(itemData.file.name, itemData.file, true).then(f => {
                        f.file.getItem().then(item => {
                            item.update({
                                //Title: itemData.,
                                ClubNameId: itemData.ClubName,
                                Comments: itemData.Comments,
                                DocumentType: itemData.DocumentType
                            }).then((updatDate: any) => {
                                resolve(updatDate);
                            }).catch((error) => {
                                console.log("Error while updating metadata of file " + itemData.file.name, error);
                                reject(error);
                            });
                        }).catch((error) => {
                            console.log("Error while getting file " + itemData.file.name + " from library", error);
                            reject(error);
                        });
                    }).catch((error) => {
                        console.log("Error while adding file " + itemData.file.name + " to library", error);
                        reject(error);
                    });
                }).catch((error) => {
                    console.log("Error while getting list by " + webRetativeUrl + '/' + libraryUrl.trim() + "url", error);
                    reject(error);
                });
            }).catch((error) => {
                console.log("Error while getting Web ", error);
                reject(error);
            });
        });
    }
}
// export class ClubNumberListData implements IClubNumberListService {
//     public getClubNumberListItems(): Promise<Array<ClubNumberListItem>> {
//         return new Promise<Array<ClubNumberListItem>>((resolve: any, reject) => {
//             let oWeb = sp.web;
//             oWeb.get().then(web => {
//                 let webRetativeUrl = web.ServerRelativeUrl;
//                 if (webRetativeUrl === '/') {
//                     webRetativeUrl = '';
//                 }
//                 return webRetativeUrl;
//             }).then((webRetativeUrl) => {
//                 oWeb.getList(webRetativeUrl + '/Lists/Club Number').items.getAll().then((data: ClubNumberListItem[]) => {
//                     resolve(data);
//                 }).catch((error) => {
//                     console.log("Error while getting ClubNumber info list items ", error);
//                     reject(error);
//                 });
//             }).catch((error) => {
//                 console.log("Error while getting Web ", error);
//                 reject(error);
//             });
//         });
//     }
// }
// export class RegionListData implements IRegionListService {
//     public getRegionListItems(): Promise<Array<RegionListItem>> {
//         return new Promise<Array<RegionListItem>>((resolve: any, reject) => {
//             let oWeb = sp.web;
//             oWeb.get().then(web => {
//                 let webRetativeUrl = web.ServerRelativeUrl;
//                 if (webRetativeUrl === '/') {
//                     webRetativeUrl = '';
//                 }
//                 return webRetativeUrl;
//             }).then((webRetativeUrl) => {
//                 oWeb.getList(webRetativeUrl + '/Lists/Region').items.getAll().then((data: RegionListItem[]) => {
//                     resolve(data);
//                 }).catch((error) => {
//                     console.log("Error while getting Region info list items ", error);
//                     reject(error);
//                 });
//             }).catch((error) => {
//                 console.log("Error while getting Web ", error);
//                 reject(error);
//             });
//         });
//     }
// }