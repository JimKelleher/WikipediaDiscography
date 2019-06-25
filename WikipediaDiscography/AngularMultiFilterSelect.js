//-----------------------------------------------------------------------------------------
// ANGULAR Multi Filter Select
//---------------------------------------------------------------------------------------------------------------------------------------------
// Developer:       Nirmal Kumar (nirmalkumar_86)
// Stack Overflow:  http://stackoverflow.com/questions/15868248/how-to-filter-multiple-values-or-operation-in-angularjs/21169596#21169596
// JS Fiddle:       http://jsfiddle.net/nirmalkumar_86/9F89Q/5/
//---------------------------------------------------------------------------------------------------------------------------------------------
// Developer:       Jim Kelleher
// Bug Fix #1       A lack of proper unit testing by Nirmal resulted in the original version containing a major bug.  Filter 2 of 2, when
//                  used exclusively, worked fine to handle the "no match" scenario, it filtered out all items.  However when filter 2 of 2
//                  was paired with filter 1 of 2 the "no match" scenario failed.  My fix did not attempt to "rewire" the original process.
//                  I simply "grafted" on a solution to the one mishandled scenario.
// Known Bug #1     Bug Fix #1, above, introduced an unhappy side-effect, namely, that when filter 1 of 2 was first "set" (selected) and later
//                  "unset" (unselected), in conjunction with filter 2 of 2, the results became wildly unreliable.  However, I have traded
//                  a "first line" bug (original selection) for a "second line" bug (subsequent selection) and I can live with that as I can
//                  no longer spend time on these problems.
//---------------------------------------------------------------------------------------------------------------------------------------------

// My homemade Angular Multi Filter Select process Part A, the Angular definition:

// Init the Angular application:
var myApp = angular.module("myApp", []);

myApp.filter("filterMultiple", ["$filter", function ($filter) {
    return function (items, keyObj) {

        //---------------------
        // Bug fix #1, 1 of 3:
        var emptyData;
        //---------------------

        var filterObj = {
            data: items,
            filteredData: [],
            applyFilter: function (obj, key) {
                var fData = [];
                if (this.filteredData.length == 0)
                    this.filteredData = this.data;
                if (obj) {
                    var fObj = {};
                    if (!angular.isArray(obj)) {
                        fObj[key] = obj;
                        fData = fData.concat($filter("filter")(this.filteredData, fObj));
                    } else if (angular.isArray(obj)) {
                        if (obj.length > 0) {
                            for (var i = 0; i < obj.length; i++) {
                                if (angular.isDefined(obj[i])) {
                                    fObj[key] = obj[i];
                                    fData = fData.concat($filter("filter")(this.filteredData, fObj));
                                }
                            }
                        }
                    }

                    //-------------------------------
                    // Bug fix #1, 2 of 3:
                    //if (fData.length > 0) {
                    //    this.filteredData = fData;
                    //}
                    //-------------------------------
                    if (fData.length == 0) {
                        emptyData = fData;
                    } else {
                        this.filteredData = fData;
                    }
                    //-------------------------------
                }
            }
        };

        if (keyObj) {
            angular.forEach(keyObj, function (obj, key) {
                filterObj.applyFilter(obj, key);
            });
        }

        //---------------------------------
        // Bug fix #1, 3 of 3:
        //return filterObj.filteredData;
        //---------------------------------
        if (emptyData) {
            return emptyData;
        } else {
            return filterObj.filteredData;
        }
        //---------------------------------

    }
}]);

myApp.filter("unique", function () {
    return function (input, key) {
        var unique = {};
        var uniqueList = [];
        for (var i = 0; i < input.length; i++) {
            if (typeof unique[input[i][key]] == "undefined") {
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };

});

//---------------------------------------------------------------------------------------------------------------------------------------------
// My homemade Angular Multi Filter Select object Part B, the class definition/constructor:

function angular_multi_filter_select() {
}

//---------------------------------------------------------------------------------------------------------------------------------------------
// My homemade Angular Multi Filter Select object Part C, utility functions:

angular_multi_filter_select.prototype.get_filter = function (filter_array) {

    // | filterMultiple:{' + reference_column1 + ':selected' + reference_column1 + ', ' + reference_column2 + ':selected' + reference_column2 + '}"

    // NOTE: "filterMultiple" will work with only one filter:

    // Assemble the main information:
    var filter_string = " | filterMultiple:{"

    for (i = 0; i < filter_array.length; i++) {

        if (i > 0) {
            filter_string += ", ";
        }

        // Append multiple (potentially) filters:
        filter_string += filter_array[i] + ':selected' + filter_array[i];

    }

    // Complete the filter string:
    filter_string += "}";

    // Return the result:
    return filter_string;

}

angular_multi_filter_select.prototype.get_master_repeat = function (master_table, master_column, filter_array) {

    // Eg: artist in artistList | orderBy:'artist' | filterMultiple:{decade:selecteddecade, genre:selectedgenre, artist:selectedartist}

    // '<tr ng-repeat="' + master_table + ' in ' + master_table + 'List | orderBy:\'' + master_table + '\' | filterMultiple:{' + reference_column1 + ':selected' + reference_column1 + ', ' + reference_column2 + ':selected' + reference_column2 + ', ' + reference_column3 + ':selected' + reference_column3 + '}">
    //      <td>{{' + master_table + '.' + master_table +     '}}</td>
    //      <td>{{' + master_table + '.' + reference_column1 + '}}</td>
    //      <td>{{' + master_table + '.' + reference_column2 + '}}</td>
    // </tr>';

    // Assemble the main information:
    var master_repeat = master_table + " in " + master_table + "List | orderBy:'" + master_column + "'";

    if (filter_array.length > 0) {

        // Append multiple (potentially) filters:
        master_repeat += this.get_filter(filter_array);
    }

    // Return the result:
    return master_repeat;

}

angular_multi_filter_select.prototype.get_reference_selectbox = function (reference_column, reference_column_alias, master_table, unique_filter, filter_array) {

    // Eg: artist.decade as artist.decade for artist in artistList | orderBy:'decade' | unique:'decade'
    //     artist.genre  as artist.genre  for artist in artistList | orderBy:'genre'  | unique:'genre'

    // Assemble the main information:
    var reference_selectbox = '<div class="selectBoxTitle">' + capitalize(reference_column_alias == "" ? reference_column : reference_column_alias) + '</div><select class="selectBox" multiple="multiple" ng-model="selected' + reference_column + '" ng-options="' + master_table + '.' + reference_column + ' as ' + master_table + '.' + reference_column + ' for ' + master_table + ' in ' + master_table + 'List | orderBy:\'' + reference_column + '\'';

    if (unique_filter == true) {

        // Append a unique filter:
        reference_selectbox += ' | unique:' + '\'' + reference_column + '\'';
    }

    if (filter_array.length > 0) {

        // Append multiple (potentially) filters:
        reference_selectbox += this.get_filter(filter_array);
    }

    // Complete the Select Box:
    reference_selectbox += '"></select>';

    // Return the result:
    return reference_selectbox;

}
