export class Room {
    private _location: string = "";
    private _date: string = "";
    private _fromTime: string = "";
    private _toTime: string = "";
    private _attendees: number = 0;
    private _voip: boolean = false;
    private _video: boolean = false;
    private _lan: boolean = false;
    private _whiteboard: boolean = false;

    constructor() { }

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

    public get attendees(): number {
        return this._attendees;
    }

    public set attendees(attendees: number) {
        this._attendees = attendees;
    }

    public get voip(): boolean {
        return this._voip;
    }

    public set voip(voip: boolean) {
        this._voip = voip;
    }

    public get video(): boolean {
        return this._video;
    }

    public set video(video: boolean) {
        this._video = video;
    }

    public get lan(): boolean {
        return this._lan;
    }

    public set lan(lan: boolean) {
        this._lan = lan;
    }

    public get whiteboard(): boolean {
        return this._whiteboard;
    }

    public set whiteboard(whiteboard: boolean) {
        this._whiteboard = whiteboard;
    }

}
