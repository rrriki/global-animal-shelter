import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { Pet } from '../../typing/pet.interface';
import { Location } from '../../typing/location.interface'; // TODO: use barrels
import PlaceResult = google.maps.places.PlaceResult;


@Component({
    selector: 'app-create-pet',
    templateUrl: './create-pet.component.html',
    styleUrls: ['./create-pet.component.css']
})
export class CreatePetComponent implements OnInit {

    newPet: Pet = Object.create(null);
    latitude: number;
    longitude: number;
    zoom: number;
    isLost: boolean;

    constructor (
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {

        activatedRoute.data.subscribe((data) => {
            const { isLost } = data;
            this.isLost = isLost;
        });
    }

    @ViewChild('location')
    public locationSearchRef: ElementRef;

    async ngOnInit (): Promise<void> {
        // Initial coordinates.
        this.zoom = 5;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        this.setCurrentPosition();

        // Start Places AutoComplete
        await this.mapsAPILoader.load();
        const autoComplete = new google.maps.places.Autocomplete(this.locationSearchRef.nativeElement);
        autoComplete.addListener('place_changed', () => {
            this.ngZone.run(() => {
                const place = autoComplete.getPlace();

                // Verify that result contains coordinates
                if (place.geometry === undefined || place.geometry === null) {
                    return;
                }

                // Extract location info
                const location = this.extractLocation(place);
                console.log(location);
                this.newPet.location = location;
                // Set latitude, longitude and zoom for map.
                this.latitude = location.latitude;
                this.longitude = location.longitude;
                this.zoom = 15;
            });
        });
    }

    savePet (formValues) {
        console.log(formValues);
        console.log(this.newPet);
    }

    cancel () {
        this.router.navigate(['/pets']);
    }

    private extractLocation (placeResult: PlaceResult): Location {
        const location: Location = Object.create(null);
        location.address = placeResult.formatted_address;
        location.latitude = placeResult.geometry.location.lat();
        location.longitude = placeResult.geometry.location.lng();

        for (const component of placeResult.address_components) {
            if (component.types.includes('country')) {
                location['country'] = component.long_name;
                continue;
            }
            if (component.types.includes('administrative_area_level_1')) {
                location['state'] = component.long_name;
                continue;
            }
            if (component.types.includes('administrative_area_level_2')) {
                location['city'] = component.long_name;
            }
        }

        return location;

    }

    private setCurrentPosition () {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }
}
