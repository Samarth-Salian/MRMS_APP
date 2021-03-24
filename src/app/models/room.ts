export class Room {
    private _name: string = '';

    private _location: string = '';

    private _date: string = '';

    private _fromTime: string = '';

    private _toTime: string = '';

    private _seats: number = 0;

    private _phoneNo: string = '';

    private _floor : number = -99;

    private _buildingId: string = '';

    private _voipAvailable: boolean = false;

    private _videoAvailable: boolean = false;

    private _lanAvailable: boolean = false;

    private _whiteBoardAvailable: boolean = false;

    public get name(): string {
      return this._name;
    }

    public set name(name: string) {
      this._name = name;
    }

    public get location(): string {
      return this._location;
    }

    public set location(location: string) {
      this._location = location;
    }

    public get date(): string {
      return this._date;
    }

    public set date(date: string) {
      this._date = date;
    }

    public get fromTime(): string {
      return this._fromTime;
    }

    public set fromTime(fromTime: string) {
      this._fromTime = fromTime;
    }

    public get toTime(): string {
      return this._toTime;
    }

    public set toTime(toTime: string) {
      this._toTime = toTime;
    }

    public get seats(): number {
      return this._seats;
    }

    public set seats(seats: number) {
      this._seats = seats;
    }

    public get phoneNo(): string {
      return this._phoneNo;
    }

    public set phoneNo(phoneNo: string) {
      this._phoneNo = phoneNo;
    }

    public get floor(): number {
      return this._floor;
    }

    public set floor(floor: number) {
      this._floor = floor;
    }

    public get buildingId(): string {
      return this._buildingId;
    }

    public set buildingId(buildingId: string) {
      this._buildingId = buildingId;
    }

    public get voipAvailable(): boolean {
      return this._voipAvailable;
    }

    public set voipAvailable(voipAvailable: boolean) {
      this._voipAvailable = voipAvailable;
    }

    public get videoAvailable(): boolean {
      return this._videoAvailable;
    }

    public set videoAvailable(videoAvailable: boolean) {
      this._videoAvailable = videoAvailable;
    }

    public get lanAvailable(): boolean {
      return this._lanAvailable;
    }

    public set lanAvailable(lanAvailable: boolean) {
      this._lanAvailable = lanAvailable;
    }

    public get whiteBoardAvailable(): boolean {
      return this._whiteBoardAvailable;
    }

    public set whiteBoardAvailable(whiteBoardAvailable: boolean) {
      this._whiteBoardAvailable = whiteBoardAvailable;
    }
}
