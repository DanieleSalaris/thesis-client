import parse from 'date-fns/parse';

export class InstanceModel {
  _id: string;
  surveyId: string;
  date: Date;

  constructor({_id, surveyId, date}) {
    this._id = _id;
    this.surveyId = surveyId;
    this.date = parse(date, 'dd-MM-yyyy', new Date());
  }
}
