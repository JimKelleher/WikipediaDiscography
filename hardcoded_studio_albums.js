function get_discog_JSON_string_hardcoded_studio_albums(artist) {
    var artist_discography_JSON_string = ""; // init
    switch (artist) {
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Bee Gees":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + "Soundtrack albums" + '", "style":0, "album":[' +
                    ' {"albumId":"Saturday Night Fever", "year":1977}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Yes":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + "Second 1971 album" + '", "style":0, "album":[' +
                    ' {"albumId":"Fragile", "year":1971}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        // NOTE: Donnie Iris's discography is polluted as follows: All of the years are surrounded by double brackets,
        // as links, and microhelp tells us it is, for eg., to "1980 in music". Wonderful.
        case "Donnie Iris":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + "As a member of the Jaggerz" + '", "style":0, "album":[' +
                    ' {"albumId":"Introducing the Jaggerz", "year":1969}' +
                    ' ,{"albumId":"We Went to Different Schools Together", "year":1970}' +
                    ' ,{"albumId":"Come Again", "year":1975}' +
                    ' ]}' +
                    ' ,{"sectionId":"As a member of Wild Cherry", "style":0, "album":[' +
                    ' {"albumId":"Only the Wild Survive", "year":1979}' +
                    ' ]}' +
                    ' ,{"sectionId":"Donnie Iris and the Cruisers", "style":0, "album":[' +
                    ' {"albumId":"Back on the Streets", "year":1980}' +
                    ' ,{"albumId":"King Cool", "year":1981}' +
                    ' ,{"albumId":"The High and the Mighty", "year":1982}' +
                    ' ,{"albumId":"Fortune 410", "year":1983}' +
                    ' ,{"albumId":"No Muss...No Fuss", "year":1985}' +
                    ' ,{"albumId":"Out of the Blue", "year":1992}' +
                    ' ,{"albumId":"Footsoldier in the Moonlight", "year":1993}' +
                    ' ,{"albumId":"Poletown", "year":1997}' +
                    ' ,{"albumId":"Together Alone", "year":1999}' +
                    ' ,{"albumId":"Ellwood City", "year":2006}' +
                    ' ,{"albumId":"Ah! Leluiah!", "year":2010}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        default:
    }
    return artist_discography_JSON_string;
}
//# sourceMappingURL=hardcoded_studio_albums.js.map