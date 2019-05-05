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
import { ISearchImageLibraryProps } from './components/ISearchImageLibraryProps';

export interface ISearchImageLibraryWebPartProps {
  description: string;
}

export default class SearchImageLibraryWebPart extends BaseClientSideWebPart<ISearchImageLibraryWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISearchImageLibraryProps > = React.createElement(
      SearchImageLibrary,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
