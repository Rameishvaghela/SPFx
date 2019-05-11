import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { sp, Web } from 'sp-pnp-js';
import * as ReactDOM from 'react-dom';


import * as strings from 'SearchImageLibraryWebPartStrings';
import SearchImageLibrary from './components/SearchImageLibrary';
import { LineOfBusiness } from './Service/Model';
import { SearchImageLibraray } from './Service/Search'
import { ISearchImageLibraryProps } from './components/ISearchImageLibraryProps';
import { Dropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';

export interface ISearchImageLibraryWebPartProps {
  description: string;
}

export default class SearchImageLibraryWebPart extends BaseClientSideWebPart<ISearchImageLibraryWebPartProps> {
  private arrLineOfBusiness: IDropdownOption[] = [];
  public async componentDidMount(): Promise<void> {
    let searchImage = new SearchImageLibraray();
    searchImage.getLineOfBusiness().then((result: Array<LineOfBusiness>) => {
      console.log("Clubs List Data", result);
      result.forEach(item => {
        this.arrLineOfBusiness.push({
          key: item.Id,
          text: item.Title
        });
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<ISearchImageLibraryProps > = React.createElement(
      SearchImageLibrary,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
    require('./SearchImages.js');
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

 
}
