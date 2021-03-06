import { LocationItem } from './location.model';
import { ServiceItem } from './service.model';
import { StaffItem } from './staff.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PeopleItem } from './people.model';

export class ReviewItem {
    location: LocationItem;
    service: ServiceItem[];
    serviceAddOns: string [];
    staff: PeopleItem;
    date: NgbDate;
    time: string;

    constructor(location: LocationItem, service: ServiceItem[], serviceAddOns: string [], staff: PeopleItem, date: NgbDate, time: string) {
        this.location = location;
        this.service = service;
        this.serviceAddOns = serviceAddOns;
        this.staff = staff;
        this.date = date;
        this.time = time;
    }
}
