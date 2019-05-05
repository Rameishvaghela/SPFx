import * as React from 'react';
import styles from './SearchImageLibrary.module.scss';
import { ISearchImageLibraryProps } from './ISearchImageLibraryProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { LineOfBusiness } from '../Service/Model';
import { SearchImageLibraray } from '../Service/Search'
import { Dropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/components/TextField';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { List } from 'office-ui-fabric-react/lib/List';






export default class SearchImageLibrary extends React.Component<ISearchImageLibraryProps, {}> {


  private arrLineOfBusiness: IDropdownOption[] = [];
  public async componentDidMount(): Promise<void> {
    //   if (this.props.LibraryUrl) {
    //     console.log("Document Library ULR", this.props.LibraryUrl)
    //   }
    let searchImage = new SearchImageLibraray();
    searchImage.getLineOfBusiness().then((result: Array<LineOfBusiness>) => {
      console.log("Clubs List Data", result);
      result.forEach(item => {
        this.arrLineOfBusiness.push({
          key: item.Id,
          text: item.Title
        });
      });
      
      this.render();
    });
  }
 

  public render(): React.ReactElement<ISearchImageLibraryProps> {
   
    const eventElement = this.arrLineOfBusiness.map(event => {
             return <Checkbox key={event.key} label={event.text}> </Checkbox>
    });

    return (
      <div className={ styles.searchImageLibrary }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div>
              <TextField componentId="txtSearch"  label="Search for images and videos by show name, client name, line of business or keyword" errorMessage={false ? "Please select Club Number" : ""} required />
            </div>
            <div>
           return( {eventElement} )
            
            {/* return this.arrLineOfBusiness.map((item, index) => (
                <span className="indent" key={index}>
                    {index}
                </span>
            )); */}

                  {/* this.arrLineOfBusiness.forEach(element => {
                    <Checkbox label="Test">
                      
                    </Checkbox>
                  }) */}
                
               
                
            </div>
          </div>
          <div className={ styles.row }>
            <div>
               
                <div className={ styles.column90 }>
                     <div>
                       <Image className={ styles.msListGridExampleimage } src="http://placehold.it/100x100" alt="Image"/>
                       <Image className={ styles.msListGridExampleimage }  src="http://placehold.it/100x100" alt="Image"/>
                       <Image className={ styles.msListGridExampleimage }  src="http://placehold.it/100x100" alt="Image"/>
                     </div>
                </div>
                <div className={ styles.column10 }>

                    Line OF business
                    <Checkbox label="Exhibition" ></Checkbox>
                    <Checkbox label="Exhibits"></Checkbox>
                    <Checkbox label="Events"></Checkbox>
                    <Checkbox label="Audio Visuals"></Checkbox>
           
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    
  }

  
}
