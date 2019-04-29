import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'DocumentSubmissionWebPartStrings';
import DocumentSubmission from './components/DocumentSubmission';
import { IDocumentSubmissionProps } from './components/IDocumentSubmissionProps';
import { sp } from '@pnp/sp';

export interface IDocumentSubmissionWebPartProps {
  LibraryUrl: string;
}

export default class DocumentSubmissionWebPart extends BaseClientSideWebPart<IDocumentSubmissionWebPartProps> {
  public onInit(): Promise<void> {

    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });

    });
  }

  public render(): void {
    const element: React.ReactElement<IDocumentSubmissionProps> = React.createElement(
      DocumentSubmission,
      {
        LibraryUrl: this.properties.LibraryUrl
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
                PropertyPaneTextField('LibraryUrl', {
                  label: strings.LibraryUrlFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
