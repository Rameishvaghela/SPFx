import{LineOfBusiness} from './Model';
export interface ISearchInterface{
    getLineOfBusiness():Promise<Array<LineOfBusiness>>;
}