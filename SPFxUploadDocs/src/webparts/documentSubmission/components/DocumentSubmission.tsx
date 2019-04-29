import * as React from 'react';
import styles from './DocumentSubmission.module.scss';
import { IDocumentSubmissionProps } from './IDocumentSubmissionProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/components/TextField';
import { DefaultButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ClubsListItem, SubmissionListItem } from '../services/ListsItems';
import { ClubsListData, SubmissionListData } from '../services/ListsData';
import { sp, Web } from '@pnp/sp';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration, Dialog } from '@microsoft/sp-dialog';

// import { IconButton, Callout, DirectionalHint } from 'office-ui-fabric-react';


export interface ISubmissionState {
  file: File,
  Id: number,
  ClubName: number,
  ClubNumber: string,
  ClubRegion: string,
  DocumentType: string,
  Comments: string
}
const submData: SubmissionListItem = {
  file: null,
  Id: 0,
  ClubName: 0,
  ClubNumber: "",
  ClubRegion: "",
  DocumentType: "",
  Comments: ""
};
let libraryUrl: string = "";

export default class DocumentSubmission extends React.Component<IDocumentSubmissionProps, ISubmissionState> {
  constructor(props: IDocumentSubmissionProps, state: ISubmissionState) {
    super(props);
    this.state = {
      file: null,
      Id: 0,
      ClubName: 0,
      ClubNumber: "",
      ClubRegion: "",
      DocumentType: "",
      Comments: ""
    };
    libraryUrl = props.LibraryUrl;
    console.log('Web Part Property', props);
  }
  private culbsData: ClubsListItem[] = [];
  setValue(field: string, event) {
    //If the input fields were directly within this
    //this component, we could use this.refs.[FIELD].value
    //Instead, we want to save the data for when the form is submitted
    let object = {};
    if (field === "file") {
      object[field] = event.target.files[0];
    }
    else {
      object[field] = event.key ? event.key : event;
    }
    if (field == "ClubName") {
      this.culbsData.forEach(item => {
        if (item.Id === object[field]) {
          // document.getElementById("clubNumber").Value = item.Number.toString();
          // this.refs["clubRegion"].value = item.Number.toString();
          // ReactDOM.findDOMNode(this.refs.clubNumber).nodeValue = item.Number.toString()
          // document.getElementById("clubRegion").nodeValue = item.Region;
          this.setState({
            ClubNumber: item.Number.toString(),
            ClubRegion: item.Region,
          });
        }
      });
    }
    this.setState(object);
    submData[field] = object[field];
  }
  private DocumentTypes: IDropdownOption[] = [
    { key: 'Payroll', text: 'Payroll' },
    { key: 'Invoices', text: 'Invoices' },
    { key: 'Balance Sheet', text: 'Balance Sheet' },
    { key: 'HR Documents', text: 'HR Documents' }
  ]
  private count: Number = 0;
  private clubsOpations: IDropdownOption[] = [];
  private clubNumberOpations: IDropdownOption[] = [];
  private regionOpations: IDropdownOption[] = [];
  public async componentDidMount(): Promise<void> {
    //   if (this.props.LibraryUrl) {
    //     console.log("Document Library ULR", this.props.LibraryUrl)
    //   }
    let clubsListData = new ClubsListData();
    clubsListData.getClubsListItems().then((result: Array<ClubsListItem>) => {
      console.log("Clubs List Data", result);
      this.culbsData = result;
      result.forEach(item => {
        this.clubsOpations.push({
          key: item.Id,
          text: item.Title
        });
      });
      this.render();
    });
    // let clubNumberListData = new ClubNumberListData();
    // clubNumberListData.getClubNumberListItems().then((result: Array<ClubNumberListItem>) => {
    //   console.log("Clubs List Data", result);
    //   result.forEach(item => {
    //     this.clubNumberOpations.push({
    //       key: item.Id,
    //       text: item.Title
    //     });
    //   });
    //   this.count = +this.count + +1;
    //   if (this.count === 3) {
    //     this.render()
    //   }
    // });
    // let regionListData = new RegionListData();
    // regionListData.getRegionListItems().then((result: Array<RegionListItem>) => {
    //   console.log("Clubs List Data", result);
    //   result.forEach(item => {
    //     this.regionOpations.push({
    //       key: item.Id,
    //       text: item.Title
    //     });
    //   });
    //   this.count = +this.count + +1;
    //   if (this.count === 3) {
    //     this.render()
    //   }
    // });
  }
  public componentDidUpdate(prevProps): void {
    if (this.props.LibraryUrl !== prevProps.libraryUrl) {
      libraryUrl = this.props.LibraryUrl;
    }
  }
  public render(): React.ReactElement<IDocumentSubmissionProps> {

    return (
      <div className={styles.documentSubmission} >

        {/* <div>
          <TextField label="Name" required />
        </div> */}
        < div >
          <Dropdown placeholder="Select an option" label="Club Name" onChanged={this.setValue.bind(this, 'ClubName')} errorMessage={false ? "Please select Club Name" : ""} options={this.clubsOpations} required />
        </div>
        <div>
          <TextField ref="clubRegion" value={this.state.ClubRegion} componentId="clubRegion" label="Club Region" errorMessage={false ? "Please select Club Region" : ""} required />
        </div>
        <div>
          <TextField componentId="clubNumber" value={this.state.ClubNumber} label="Club Number" errorMessage={false ? "Please select Club Number" : ""} required />
        </div>
        <div>
          <Dropdown placeholder="Select an option" label="Document Type" onChanged={this.setValue.bind(this, 'DocumentType')} errorMessage={false ? "Please select Document Type" : ""} options={this.DocumentTypes} required />
        </div>
        <div>
          <TextField label="Comments" onChanged={this.setValue.bind(this, 'Comments')} multiline rows={3} />
        </div>
        <div>
          <Label>Upload Document</Label>
          <input type="file" onChange={this.setValue.bind(this, 'file')} />
        </div>
        <div>
          <PrimaryButton
            data-automation-id="test"
            text="Submit"
            className={styles.btnSave}
            onClick={this.SaveData}
          />
          <DefaultButton
            data-automation-id="test"
            text="Clear"
            className={styles.btnClear}
          />
        </div>
      </div >
    );
  }
  SaveData() {
    
    if (libraryUrl) {
      console.log(submData);
      let submissionListData = new SubmissionListData();
      
      submissionListData.uploadDocument(submData, libraryUrl).then((data) => {
        //Dialog.alert("Your document has been submitted successfully");
        Dialog.alert('Your document has been submitted successfully')
          .then(() => window.location.reload())
      });
    }
    else {
      alert("Please set library url in webpart property");
    }
    
  }
}
