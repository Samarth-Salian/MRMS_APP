export class Meeting {
    public _id: string = '';

    private _name: string = '';

    private _date: string = '';

    private _location: string = '';

    private _slotFrom: number = -1;

    private _slotTo: number = -1;

    private _fromTime: string = '';

    private _toTime: string = '';

    private _roomId: string = '';

    private _userId: string = '';

    private _seats: number = 0;

    private _room: string = '';

    public get name(): string {
      return this._name;
    }

    public set name(name: string) {
      this._name = name;
    }

    public get date(): string {
      return this._date;
    }

    public set date(date: string) {
      this._date = date;
    }

    public get location(): string {
      return this._location;
    }

    public set location(location: string) {
      this._location = location;
    }

    public get slotFrom(): number {
      return this._slotFrom;
    }

    public set slotFrom(slotFrom: number) {
      this._slotFrom = slotFrom;
    }

    public get slotTo(): number {
      return this._slotTo;
    }

    public set slotTo(slotTo: number) {
      this._slotTo = slotTo;
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

    public get roomId(): string {
      return this._roomId;
    }

    public set roomId(roomId: string) {
      this._roomId = roomId;
    }

    public get userId(): string {
      return this._userId;
    }

    public set userId(userId: string) {
      this._userId = userId;
    }

    public get seats(): number {
      return this._seats;
    }

    public set seats(seats: number) {
      this._seats = seats;
    }

    public get room(): string {
      return this._room;
    }

    public set room(room: string) {
      this._room = room;
    }
}
