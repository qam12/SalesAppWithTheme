import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AgmMarkerCluster } from './directives/marker-cluster';
var AgmJsMarkerClustererModule = /** @class */ (function () {
    function AgmJsMarkerClustererModule() {
    }
    AgmJsMarkerClustererModule.decorators = [
        { type: NgModule, args: [{
                    imports: [AgmCoreModule],
                    declarations: [AgmMarkerCluster],
                    exports: [AgmMarkerCluster]
                },] },
    ];
    return AgmJsMarkerClustererModule;
}());
export { AgmJsMarkerClustererModule };
//# sourceMappingURL=js-marker-clusterer.module.js.map