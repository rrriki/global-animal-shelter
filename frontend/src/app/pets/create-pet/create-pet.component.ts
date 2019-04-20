import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { Location } from '../../typing/location.interface';
import PlaceResult = google.maps.places.PlaceResult;
import { PetService } from '../pet.service';


@Component({
    selector: 'app-create-pet',
    templateUrl: './create-pet.component.html',
    styleUrls: ['./create-pet.component.css']
})
export class CreatePetComponent implements OnInit {
    newPetForm: FormGroup;
    isLost: boolean;
    images: Array<{ name: string, url: string }> = [];
    // Initial coordinates for the map
    latitude = 37.4219999;
    longitude = -122.08405749999997;
    zoom = 13;


    constructor (
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private petService: PetService,
    ) {

        activatedRoute.data.subscribe((data) => {
            const { isLost } = data;
            this.isLost = isLost;
        });
    }

    @ViewChild('location')
    public locationSearchRef: ElementRef;

    async ngOnInit (): Promise<void> {

        this.newPetForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', [Validators.required, Validators.minLength(1)]],
            location: ['', Validators.required],
            files: this.formBuilder.array([], Validators.minLength(1))
        });

        this.setCurrentPosition();
        await this.setPlacesAutoComplete();
    }

    /**
     * Event handler for the Photos Input
     * @param event - Input change event, with new files
     */
    onPhotoInputChange (event) {
        const { files } = event.target;

        if (files.length === 0) {
            return;
        }

        const filesControl = this.newPetForm.get('files') as FormArray;

        for (const file of files) {
            const { name, type } = file;

            if (type.match(/image\/*/) == null) {
                alert('Only images are supported!');
                continue;
            }

            filesControl.push(new FormControl(file));

            // Show preview
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.images.push({ name, url: reader.result.toString() });
            };
        }
    }

    /**
     * If geolocation is enabled in browser, updates the map.
     */
    private setCurrentPosition () {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                this.latitude = latitude;
                this.longitude = longitude;
                this.zoom = 15;
            });
        }
    }

    /**
     * Starts Google Places AutoComplete on the Location Input
     * Adds onChange handler, to update map and location
     */
    private async setPlacesAutoComplete () {
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
                this.newPetForm.patchValue({ 'location': JSON.stringify(location) });
                this.latitude = location.latitude;
                this.longitude = location.longitude;
                this.zoom = 15;
            });
        });
    }

    /**
     * Extracts and formats useful information from a Google Places result
     * @param placeResult - A Google Place result
     */
    private extractLocation (placeResult: PlaceResult): Location {
        const location: Location = Object.create(null);

        location.latitude = placeResult.geometry.location.lat();
        location.longitude = placeResult.geometry.location.lng();
        location.address = placeResult.formatted_address;

        for (const component of placeResult.address_components) {
            if (component.types.includes('country')) {
                location['country'] = component.long_name;
                continue;
            }
            if (component.types.includes('administrative_area_level_1')) {
                location['state'] = component.long_name;
                continue;
            }
            if (component.types.includes('locality')) {
                location['city'] = component.long_name;
            }
        }

        return location;
    }


    savePet (formValues) {
        const data = new FormData();

        data.append('isLost', String(this.isLost));

        const fields = Object.keys(formValues);
        for (const field of fields) {
            if (field === 'files') {
                const files: File[] = formValues[field];
                files.forEach((file) => {data.append(field, file, file.name); });
            } else {
                data.append(field, formValues[field]);
            }
        }

        this.petService.createPet(data).subscribe((res) => {
            console.log('response', res);
        });
    }

    async cancel () {
        await this.router.navigate(['/pets']);
    }
}
