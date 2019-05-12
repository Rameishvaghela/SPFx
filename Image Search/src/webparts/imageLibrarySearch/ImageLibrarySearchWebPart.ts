import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './ImageLibrarySearchWebPart.module.scss';
import * as strings from 'ImageLibrarySearchWebPartStrings';
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as sp from 'sp-pnp-js';
import 'jquery';
export interface IImageLibrarySearchWebPartProps {
  description: string;
}


export default class ImageLibrarySearchWebPart extends BaseClientSideWebPart<IImageLibrarySearchWebPartProps> {
  constructor() {
    super();
    SPComponentLoader.loadCss("https://appsforoffice.microsoft.com/fabric/2.2.0/fabric.components.min.css");
    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css');

}
  public render(): void {
    this.domElement.innerHTML = `
     <div id="dvProcess" class="loadersmall"></div>
      <div id="dvMain" class="${ styles.imageLibrarySearch}">
        <div class="${ styles.container}">
          <div class="${ styles.row}">
            <div>
              <div class="ms-TextField">
                <input class="ms-TextField-field" type="text" value="" placeholder="Search for images and videos by show name, client name, line of business or keyword
                " id="txtSearch">
              </div>
            <div id="dvSelectedFilter"></div>
            <div id="dvDownloadPanel" style="display:none;">
                  <a  id="btnDownload">
                  <i class="fa fa-download" aria-hidden="true">   Download</i>
                  </button>
              </div>
            <div class="${ styles.column90}">
              
              <div id="dvImages">
                
              </div>
            </div>
            <div class="${ styles.column10}">
                <button class="collapsible active">Line of Business <i class="fa fa-angle-up" aria-hidden="true"></i></button>
                <div class="content " id="dvLineOfBusiness" style="display:block;">
                </div>
                
                <button class="collapsible">Industry Type <i class="fa fa-angle-down" aria-hidden="true"></i></button>
                <div class="content" id="dvIndustryType">
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>`;

    require('../ImageSearch.css');
    require('../Search.js');
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

}
