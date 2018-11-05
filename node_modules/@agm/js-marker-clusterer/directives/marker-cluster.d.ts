import { OnDestroy, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { ClusterManager } from '../services/managers/cluster-manager';
import { ClusterOptions, ClusterStyle } from '../services/google-clusterer-types';
/**
 * AgmMarkerCluster clusters map marker if they are near together
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-marker-cluster>
 *        <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        </agm-marker>
 *        <agm-marker [latitude]="lat2" [longitude]="lng2" [label]="'N'">
 *        </agm-marker>
 *      </agm-marker-cluster>
 *    </agm-map>
 *  `
 * })
 * ```
 */
export declare class AgmMarkerCluster implements OnDestroy, OnChanges, OnInit, ClusterOptions {
    private _clusterManager;
    /**
     * The grid size of a cluster in pixels
     */
    gridSize: number;
    /**
     * The maximum zoom level that a marker can be part of a cluster.
     */
    maxZoom: number;
    /**
     * Whether the default behaviour of clicking on a cluster is to zoom into it.
     */
    zoomOnClick: boolean;
    /**
     * Whether the center of each cluster should be the average of all markers in the cluster.
     */
    averageCenter: boolean;
    /**
     * The minimum number of markers to be in a cluster before the markers are hidden and a count is shown.
     */
    minimumClusterSize: number;
    /**
     * An object that has style properties.
     */
    styles: ClusterStyle;
    imagePath: string;
    imageExtension: string;
    constructor(_clusterManager: ClusterManager);
    /** @internal */
    ngOnDestroy(): void;
    /** @internal */
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    /** @internal */
    ngOnInit(): void;
}
