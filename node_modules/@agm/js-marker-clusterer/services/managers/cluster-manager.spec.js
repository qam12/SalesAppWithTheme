import { NgZone } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { AgmMarker } from '../../../core/directives/marker';
import { GoogleMapsAPIWrapper } from '../../../core/services/google-maps-api-wrapper';
import { ClusterManager } from './cluster-manager';
describe('ClusterManager', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [
                { provide: NgZone, useFactory: function () { return new NgZone({ enableLongStackTrace: true }); } },
                ClusterManager, {
                    provide: GoogleMapsAPIWrapper,
                    useValue: jasmine.createSpyObj('GoogleMapsAPIWrapper', ['createMarker'])
                }
            ]
        });
    });
    describe('Create a new marker', function () {
        it('should call the mapsApiWrapper when creating a new marker', inject([ClusterManager, GoogleMapsAPIWrapper], function (clusterManager, apiWrapper) {
            var newMarker = new AgmMarker(clusterManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            clusterManager.addMarker(newMarker);
            expect(apiWrapper.createMarker).toHaveBeenCalledWith({
                position: { lat: 34.4, lng: 22.3 },
                label: 'A',
                draggable: false,
                icon: undefined,
                opacity: 1,
                visible: true,
                zIndex: 1,
                title: undefined,
                clickable: true
            }, false);
        }));
    });
    describe('Delete a marker', function () {
        it('should set the map to null when deleting a existing marker', inject([ClusterManager, GoogleMapsAPIWrapper], function (clusterManager, apiWrapper) {
            var newMarker = new AgmMarker(clusterManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            var markerInstance = jasmine.createSpyObj('Marker', ['setMap']);
            apiWrapper.createMarker.and.returnValue(Promise.resolve(markerInstance));
            clusterManager.addMarker(newMarker);
            clusterManager.deleteMarker(newMarker).then(function () { expect(markerInstance.setMap).toHaveBeenCalledWith(null); });
        }));
    });
    describe('set marker icon', function () {
        it('should update that marker via setIcon method when the markerUrl changes', async(inject([ClusterManager, GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
            var newMarker = new AgmMarker(markerManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            var markerInstance = jasmine.createSpyObj('Marker', ['setMap', 'setIcon']);
            apiWrapper.createMarker.and.returnValue(Promise.resolve(markerInstance));
            markerManager.addMarker(newMarker);
            expect(apiWrapper.createMarker).toHaveBeenCalledWith({
                position: { lat: 34.4, lng: 22.3 },
                label: 'A',
                draggable: false,
                icon: undefined,
                opacity: 1,
                visible: true,
                zIndex: 1,
                title: undefined,
                clickable: true
            }, false);
            var iconUrl = 'http://angular-maps.com/icon.png';
            newMarker.iconUrl = iconUrl;
            return markerManager.updateIcon(newMarker).then(function () { expect(markerInstance.setIcon).toHaveBeenCalledWith(iconUrl); });
        })));
    });
    describe('set marker opacity', function () {
        it('should update that marker via setOpacity method when the markerOpacity changes', async(inject([ClusterManager, GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
            var newMarker = new AgmMarker(markerManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            var markerInstance = jasmine.createSpyObj('Marker', ['setMap', 'setOpacity']);
            apiWrapper.createMarker.and.returnValue(Promise.resolve(markerInstance));
            markerManager.addMarker(newMarker);
            expect(apiWrapper.createMarker).toHaveBeenCalledWith({
                position: { lat: 34.4, lng: 22.3 },
                label: 'A',
                draggable: false,
                icon: undefined,
                visible: true,
                opacity: 1,
                zIndex: 1,
                title: undefined,
                clickable: true
            }, false);
            var opacity = 0.4;
            newMarker.opacity = opacity;
            return markerManager.updateOpacity(newMarker).then(function () { expect(markerInstance.setOpacity).toHaveBeenCalledWith(opacity); });
        })));
    });
    describe('set visible option', function () {
        it('should update that marker via setVisible method when the visible changes', async(inject([ClusterManager, GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
            var newMarker = new AgmMarker(markerManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            newMarker.visible = false;
            var markerInstance = jasmine.createSpyObj('Marker', ['setMap', 'setVisible']);
            apiWrapper.createMarker.and.returnValue(Promise.resolve(markerInstance));
            markerManager.addMarker(newMarker);
            expect(apiWrapper.createMarker).toHaveBeenCalledWith({
                position: { lat: 34.4, lng: 22.3 },
                label: 'A',
                draggable: false,
                icon: undefined,
                visible: false,
                opacity: 1,
                zIndex: 1,
                title: undefined,
                clickable: true
            }, false);
            newMarker.visible = true;
            return markerManager.updateVisible(newMarker).then(function () { expect(markerInstance.setVisible).toHaveBeenCalledWith(true); });
        })));
    });
    describe('set zIndex option', function () {
        it('should update that marker via setZIndex method when the zIndex changes', async(inject([ClusterManager, GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
            var newMarker = new AgmMarker(markerManager);
            newMarker.latitude = 34.4;
            newMarker.longitude = 22.3;
            newMarker.label = 'A';
            newMarker.visible = false;
            var markerInstance = jasmine.createSpyObj('Marker', ['setMap', 'setZIndex']);
            apiWrapper.createMarker.and.returnValue(Promise.resolve(markerInstance));
            markerManager.addMarker(newMarker);
            expect(apiWrapper.createMarker).toHaveBeenCalledWith({
                position: { lat: 34.4, lng: 22.3 },
                label: 'A',
                draggable: false,
                icon: undefined,
                visible: false,
                opacity: 1,
                zIndex: 1,
                title: undefined,
                clickable: true
            }, false);
            var zIndex = 10;
            newMarker.zIndex = zIndex;
            return markerManager.updateZIndex(newMarker).then(function () { expect(markerInstance.setZIndex).toHaveBeenCalledWith(zIndex); });
        })));
    });
});
//# sourceMappingURL=cluster-manager.spec.js.map