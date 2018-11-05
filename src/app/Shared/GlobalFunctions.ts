import { MyNewInterface } from "../Interfaces/my-new-interface";
import { PjpNewInterface } from "../Interfaces/pjp-new-interface";
import { PjpWiseInterface } from "../Interfaces/pjp-wise-interface";

export class GlobalResources {

    public static _MainDataArray: MyNewInterface[];
    public static _MainPJPDataArray: PjpNewInterface[];
    public static _MainPJPWiseDataArray: PjpWiseInterface[];


    // date formater by simple Date
    public static StringFormat(value: Date): string {

        if (value !== null) {

            let stringDate = '';
            const d = value;
            const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
            ];

            // if (d.getDate() === 1 || d.getDate() === 21 || d.getDate() === 31) {
            //     stringDate += d.getDate() + 'st ';
            // } else if (d.getDate() === 2 || d.getDate() === 22) {
            //     stringDate += d.getDate() + 'nd ';
            // } else if (d.getDate() === 3 || d.getDate() === 23) {
            //     stringDate += d.getDate() + 'rd ';
            // } else {
            //     stringDate += d.getDate() + 'th ';
            // }
            stringDate += d.getDate() + ' '
            stringDate += MONTH_NAMES[d.getMonth()] + ', ';
            stringDate += d.getFullYear();

            // this.searchCriteria.pickupDate = d.month + '/' + d.day + '/' + d.year;

            return stringDate;

        } else {
            return '';
        }
    }

    public static removeDuplicatesValues(myArr, prop) {

        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }

    public static getDistinctObjectList(sourceArray, distinctFieldName, targetObjecttoFill) {

        const tmpDist = this.removeDuplicatesValues(sourceArray, distinctFieldName);

        tmpDist.map(val => {
          return {
            distName: val.DistributorTitle
            };
        });

    }

    public static ApplySorting(){
        var stringArray: string[] = ['AB', 'Z', 'A', 'AC'];
        var p: string[] = stringArray.sort((n1,n2) => {
            if (n1 > n2) {
                return 1;
            }
        
            if (n1 < n2) {
                return -1;
            }
        
            return 0;
        });
    }

    public static compareValues(key: string, order = 'asc') {
        return function (a: any, b: any) {
            if (!a.hasOwnProperty(key) ||
                !b.hasOwnProperty(key)) {
                return 0;
            }

            const varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ?
                b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order == 'desc') ?
                    (comparison * -1) : comparison
            );
        };
    }

    public static ApplyDateFormat(dtVal : Date, DateFormat: String) : String {
    
        if(dtVal == null)
        {
          return '';
        }else
        {
    
          if(DateFormat=='yyyy-MM-dd')
          {
            //console.log(dtVal.toDateString());
            let intDay = dtVal.getDate();
            //console.log('Day = ' + intDay.toString());
            let intMonth = dtVal.getMonth() + 1;
            //console.log('Month = ' + intMonth.toString());
            let intYear = dtVal.getFullYear();
            //console.log('Year = ' + intYear.toString());
    
            let strFinalDate = intYear.toString() + '-' + intMonth.toString() + '-' + intDay.toString();
            return strFinalDate;
          }
        }
      }
    
}