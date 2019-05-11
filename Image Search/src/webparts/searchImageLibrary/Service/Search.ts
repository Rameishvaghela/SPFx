import { LineOfBusiness } from './Model';
import{ ISearchInterface } from './SearchInterface';
import { sp, Web, ListEnsureResult } from 'sp-pnp-js';

export class SearchImageLibraray implements ISearchInterface {
    public getLineOfBusiness(): Promise<Array<LineOfBusiness>> {
        return new Promise<Array<LineOfBusiness>>((resolve: any, reject) => {
            let oWeb = sp.web;
            oWeb.get().then(web => {
                let webRetativeUrl = web.ServerRelativeUrl;
                if (webRetativeUrl === '/') {
                    webRetativeUrl = '';
                }
                return webRetativeUrl;
            }).then((webRetativeUrl) => {
                oWeb.getList(webRetativeUrl + '/Lists/LOB').items.getAll().then((data: LineOfBusiness[]) => {
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
