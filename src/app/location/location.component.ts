import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';
import { LocationItem } from '../models/location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  access_token_user: string;

  locationItems: LocationItem[];

  currentLocationItem: LocationItem = null;

  // location info
  locationData: any;


  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() { 
    this.get_location();

  }

  onSelect(location: LocationItem){
    this.currentLocationItem = location;
  }

  isActive(location: LocationItem) {
    if(this.currentLocationItem != null) {
      return this.currentLocationItem.name == location.name;
    }
    else {
      return false;
    }
  }

  onSubmit(){
    if(this.currentLocationItem == null){
      console.log("Please select a location");
    }
    else {
      this.appService.reviewItem.location = this.currentLocationItem;

      this.appService.endpoint = "http://127.0.0.1:5002/treatments";

      // this.appService.reviewItem.location = this.currentLocationItem;
      this.router.navigate(['/services']);
      //this.appService.onPostLocation(jsonData);
    }
  }

  get_location() {
    this.appService.endpoint = "http://127.0.0.1:5002/location";
    this.appService.postlocation().subscribe(responseData => {
      console.log(responseData);
      this.locationData = responseData;
      if (this.locationData.IsSuccess) {
        this.appService.locationItems.push(
          new LocationItem(this.locationData.AccountName,
            this.locationData.Address.Street1,
            this.locationData.LogoUrl,
            this.locationData.ID));
      } else {
        // TODO: get location unsuccessful add popup windows
      }
    },
      error => { console.log(error); },
      () => { this.locationItems = this.appService.locationItems; });
  }
}
