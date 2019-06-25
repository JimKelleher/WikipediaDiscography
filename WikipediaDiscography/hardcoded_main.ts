function get_discog_JSON_string_hardcoded_main(artist) {

    // Constants:

    // NOTE: All artists use the following default section title. This artist
    // also has a second section:
    // - Neon Heights Compilations

    var DEFAULT_SECTION = "album";

    var artist_discography_JSON_string = ""; // init

    switch (artist) {

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        // NOTE: For demonstration purposes, this "overrides" a valid, 
        // existing Wikipedia discography: 

        // case "The Cars": 

        // artist_discography_JSON_string += 
        // '{"id":"' + artist + '", "wikipedia":"",' + 
        // ' "section":[' + 
        // ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' + 
        // ' {"albumId":"The Cars", "year":1978}' + 
        // ' ,{"albumId":"Candy-O", "year":1979}' + 
        // ' ,{"albumId":"Move Like This", "year":2011}' + 
        // ' ]}' + 
        // ' ]' + 
        // '}'; 

        // break; 

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Balligomingo":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Beneath the Surface", "year":2002}' +
                ' ,{"albumId":"Under an Endless Sky", "year":2009}' +
                ' ,{"albumId":"Remix, Vol. 1", "year":2011}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Elvin Bishop":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"The Elvin Bishop Group", "year":1969}' +
                ' ,{"albumId":"Feel It!", "year":1970}' +
                ' ,{"yeaChicago Blues Buddiesr":1972, "albumId":"Rock My Soul"}' +
                ' ,{"albumId":"Let It Flow", "year":1974}' +
                ' ,{"albumId":"Juke Joint Jump", "year":1975}' +
                ' ,{"albumId":"Struttin\' My Stuff", "year":1975}' +
                ' ,{"albumId":"Hometown Boy Makes Good!", "year":1976}' +
                ' ,{"albumId":"Hog Heaven", "year":1978}' +
                ' ,{"albumId":"Is You Is or Is You Ain\'t My Baby", "year":1981}' +
                ' ,{"albumId":"Big Fun", "year":1988}' +
                ' ,{"albumId":"Don\'t Let the Bossman Get You Down!", "year":1991}' +
                ' ,{"albumId":"Ace in the Hole", "year":1995}' +
                ' ,{"albumId":"The Skin I\'m In", "year":1998}' +
                ' ,{"albumId":"Party Till the Cows Come Home", "year":2004}' +
                ' ,{"albumId":"Gettin\' My Groove Back", "year":2005}' +
                ' ,{"albumId":"The Blues Rolls On", "year":2008}' +
                ' ,{"albumId":"Chicago Blues Buddies", "year":2009}' +
                ' ,{"albumId":"Red Dog Speaks", "year":2010}' +
                ' ,{"albumId":"Can\'t Even Do Wrong Right", "year":2014}' +
                ' ,{"albumId":"The Elvin Bishop Group", "year":1969}' +
                ' ,{"albumId":"Feel It!", "year":1970}' +
                ' ,{"albumId":"Rock My Soul", "year":1972}' +
                ' ,{"albumId":"Let It Flow", "year":1974}' +
                ' ,{"albumId":"Juke Joint Jump", "year":1975}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Tom Middleton":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Live From The Big Chill", "year":2004}' +
                ' ,{"albumId":"Tom Middleton Presents Amba - Lifetracks", "year":2007}' +
                ' ,{"albumId":"Glasstracks", "year":2011}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Sol Seppy":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"The Bells Of 1 2", "year":2006}' +
                ' ,{"albumId":"Pssscheeow", "year":2006}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Romare":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Projections", "year":2015}' +
                ' ,{"albumId":"Love Songs: Part Two", "year":2016}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Marilyn McCoo & Billy Davis, Jr":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"I Hope We Get To Love In Time", "year":1976}' +
                ' ,{"albumId":"The Two Of Us", "year":1977}' +
                ' ,{"albumId":"Marilyn & Billy", "year":1978}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Bobby Rydell":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Bobby Sings, Bobby Swings", "year":1959}' +
                ' ,{"albumId":"We Got Love", "year":1959}' +
                ' ,{"albumId":"Bobby Rydell Salutes The Great Ones", "year":1961}' +
                ' ,{"albumId":"Bobby Rydell & Chubby Checker", "year":1961}' +
                ' ,{"albumId":"Wild[wood] Days", "year":1963}' +
                ' ,{"albumId":"Forget Him", "year":1964}' +
                ' ,{"albumId":"Somebody Loves You", "year":1965}' +
                ' ,{"albumId":"Born With A Smile", "year":1976}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Lobo":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Introducing Lobo", "year":1971}' +
                ' ,{"albumId":"Closeup", "year":1972}' +
                ' ,{"albumId":"Of a Simple Man", "year":1972}' +
                ' ,{"albumId":"Introducing Lobo", "year":1973}' +
                ' ,{"albumId":"Calumet", "year":1973}' +
                ' ,{"albumId":"Just a Singer", "year":1974}' +
                ' ,{"albumId":"A Cowboy Afraid of Horses", "year":1975}' +
                ' ,{"albumId":"Come with Me", "year":1976}' +
                ' ,{"albumId":"Lobo", "year":1979}' +
                ' ,{"albumId":"Am I Going Crazy", "year":1989}' +
                ' ,{"albumId":"Asian Moon", "year":1994}' +
                ' ,{"albumId":"Classic Hits", "year":1995}' +
                ' ,{"albumId":"Sometimes", "year":1996}' +
                ' ,{"albumId":"You Must Remember This", "year":1997}' +
                ' ,{"albumId":"Out of Time", "year":2008}' +
                ' ,{"albumId":"Propinquity", "year":2010}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Bobby Hebb":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Sunny", "year":1966}' +
                ' ,{"albumId":"Love Games", "year":1970}' +
                ' ,{"albumId":"That\'s All I Wanna Know", "year":2005}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Peter and Gordon":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"A World Without Love", "year":1964}' +
                ' ,{"albumId":"I Don\'t Want to", "year":1964}' +
                ' ,{"albumId":"I Go to Pieces", "year":1965}' +
                ' ,{"albumId":"True Love Ways", "year":1965}' +
                ' ,{"albumId":"Sing and Play Hits of Nashville", "year":1966}' +
                ' ,{"albumId":"Woman", "year":1966}' +
                ' ,{"albumId":"Best of", "year":1966}' +
                ' ,{"albumId":"Lady Godiva", "year":1967}' +
                ' ,{"albumId":"Knight in Rusty Armour", "year":1967}' +
                ' ,{"albumId":"In London for Tea", "year":1967}' +
                ' ,{"albumId":"Hot, Cold & Custard", "year":1967}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "The Tremeloes":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + "as Brian Poole and the Tremeloes" + '", "style":0, "album":[' +
                ' {"albumId":"Big Hits of \'62", "year":1963}' +
                ' ,{"albumId":"Twist and Shout", "year":1963}' +
                ' ,{"albumId":"Brian Poole Is Here!", "year":1965}' +
                ' ,{"albumId":"It\'s About Time", "year":1965}' +
                ' ]}' +
                ' ,{"sectionId":"as The Tremeloes", "style":0, "album":[' +
                ' {"albumId":"Here Comes My Baby", "year":1967}' +
                ' ,{"albumId":"Even the Bad Times Are Good/Silence Is Golden", "year":1967}' +
                ' ,{"albumId":"Alan, Dave, Rick and Chip", "year":1967}' +
                ' ,{"albumId":"World Explosion!", "year":1968}' +
                ' ,{"albumId":"Suddenly You Love Me", "year":1968}' +
                ' ,{"albumId":"Master", "year":1970}' +
                ' ,{"albumId":"Shiner", "year":1974}' +
                ' ,{"albumId":"Don\'t Let the Music Die", "year":1975}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "The Fortunes":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"The Fortunes", "year":1965}' +
                ' ,{"albumId":"Seasons in the Sun", "year":1969}' +
                ' ,{"albumId":"That Same Old Feeling", "year":1970}' +
                ' ,{"albumId":"Here Comes That Rainy Day Feeling Again", "year":1971}' +
                ' ,{"albumId":"Storm in a Teacup", "year":1972}' +
                ' ,{"albumId":"Fortunes", "year":1972}' +
                ' ,{"albumId":"You\'ve Got Your Troubles", "year":1974}' +
                ' ]}' +

                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Five Stairsteps":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"The Five Stairsteps", "year":1967}' +
                ' ,{"albumId":"Our Family Portrait", "year":1968}' +
                ' ,{"albumId":"Love\'s Happening", "year":1969}' +
                ' ,{"albumId":"Step by Step by Step", "year":1970}' +
                ' ,{"albumId":"Stairsteps", "year":1970}' +
                ' ,{"albumId":"The Stairsteps", "year":1971}' +
                ' ,{"albumId":"2nd Resurrection", "year":1976}' +
                ' ]}' +
                ' ,{"sectionId":"As the Invisible Man\'s Band", "style":0, "album":[' +
                ' {"albumId":"Invisible Man\'s Band", "year":1980}' +
                ' ,{"albumId":"Really Wanna See You", "year":1981}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Carl Perkins":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Dance Album", "year":1957}' +
                ' ,{"albumId":"Lotta Shakin\'", "year":1958}' +
                ' ,{"albumId":"On Top", "year":1969}' +
                ' ,{"albumId":"My Kind of Country", "year":1973}' +
                ' ,{"albumId":"Ol\' Blue Suede\'s Back", "year":1978}' +
                ' ,{"albumId":"Country Soul", "year":1979}' +
                ' ,{"albumId":"Disciple in Blue Suede Shoes", "year":1984}' +
                ' ,{"albumId":"Born to Rock", "year":1989}' +
                ' ]}' +
                ' ,{"sectionId":"Collaborative albums", "style":0, "album":[' +
                ' {"albumId":"Boppin\' the Blues", "year":1970}' +
                ' ,{"albumId":"The Survivors", "year":1982}' +
                ' ,{"albumId":"Class of \'55", "year":1986}' +
                ' ,{"albumId":"The Million Dollar Quartet", "year":1990}' +
                ' ,{"albumId":"706 Re-Union", "year":1990}' +
                ' ,{"albumId":"Carl Perkins & Sons", "year":1993}' +
                ' ,{"albumId":"Go Cat Go!", "year":1996}' +
                ' ]}' +
                ' ,{"sectionId":"Live albums", "style":0, "album":[' +
                ' {"albumId":"The Carl Perkins Show", "year":1976}' +
                ' ,{"albumId":"Live at Austin City Limits", "year":1981}' +
                ' ,{"albumId":"The Silver Eagle Cross Country: Carl Perkins Live", "year":1997}' +
                ' ,{"albumId":"Live", "year":2000}' +
                ' ,{"albumId":"Blue Suede Shoes: A Rockabilly Session", "year":2006}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Lou Christie":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Lou Christie", "year":1963}' +
                ' ,{"albumId":"Lou Christie", "year":1964}' +
                ' ,{"albumId":"Lightning Strikes", "year":1965}' +
                ' ,{"albumId":"Painter of Hits", "year":1966}' +
                ' ,{"albumId":"I\'m Gonna Make You Mine", "year":1969}' +
                ' ,{"albumId":"Paint America Love", "year":1971}' +
                ' ,{"albumId":"Lou Christie", "year":1974}' +
                ' ,{"albumId":"Lou Christie", "year":1982}' +
                ' ,{"albumId":"Pledging My Love", "year":1997}' +
                ' ,{"albumId":"Greatest Hits Live from the Bottom Line", "year":2004}' +
                ' ,{"albumId":"The Turquoise Trail", "year":2012}' +
                ' ,{"albumId":"Summer In Malibu", "year":2015}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Dobie Gray":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Look", "year":1963}' +
                ' ,{"albumId":"Dobie Gray Sings", "year":1965}' +
                ' ,{"albumId":"Pollution", "year":1970}' +
                ' ,{"albumId":"Pollution II", "year":1971}' +
                ' ,{"albumId":"Drift Away", "year":1973}' +
                ' ,{"albumId":"Loving Arms", "year":1973}' +
                ' ,{"albumId":"Hey Dixie", "year":1975}' +
                ' ,{"albumId":"New Ray Of Sunshine", "year":1976}' +
                ' ,{"albumId":"Let Go", "year":1977}' +
                ' ,{"albumId":"The Best Of Dobie Gray", "year":1978}' +
                ' ,{"albumId":"Dobie Gray & Mary Wells", "year":1978}' +
                ' ,{"albumId":"Mellow Man", "year":1978}' +
                ' ,{"albumId":"Midnight Diamond", "year":1978}' +
                ' ,{"albumId":"Dobie Gray", "year":1979}' +
                ' ,{"albumId":"Welcome Home", "year":1981}' +
                ' ,{"albumId":"From Where I Stand", "year":1986}' +
                ' ,{"albumId":"Love\’s Talkin\’", "year":1987}' +
                ' ,{"albumId":"Dobie Gray: His Very Best", "year":1996}' +
                ' ,{"albumId":"Diamond Cuts", "year":1998}' +
                ' ,{"albumId":"Soul Days", "year":2001}' +
                ' ,{"albumId":"Dobie Gray: The Ultimate", "year":2001}' +
                ' ,{"albumId":"Songs Of The Season", "year":2001}' +
                ' ,{"albumId":"Dobie Gray: A Decade of Dobie", "year":2005}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Norman Greenbaum":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Spirit in the Sky", "year":1969}' +
                ' ,{"albumId":"Norman Greenbaum with Dr. West\'s Medicine Show and Junk Band", "year":1969}' +
                ' ,{"albumId":"Back Home Again", "year":1970}' +
                ' ,{"albumId":"Petaluma", "year":1972}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "The Middle East":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"The Middle East", "year":2006}' +
                ' ,{"albumId":"The Recordings of the Middle East", "year":2008}' +
                ' ,{"albumId":"The Recordings of the Middle East", "year":2009}' +
                ' ,{"albumId":"Jesus Came to My Birthday Party", "year":2010}' +
                ' ,{"albumId":"I Want That You Are Always Happy", "year":2011}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "The Coasters":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"The Coasters", "year":1957}' +
                ' ,{"albumId":"The Coasters\' Greatest Hits", "year":1959}' +
                ' ,{"albumId":"The Coasters One By One", "year":1960}' +
                ' ,{"albumId":"Coast Along with The Coasters", "year":1962}' +
                ' ,{"albumId":"That Is Rock & Roll", "year":1965}' +
                ' ,{"albumId":"Their Greatest Recordings: The Early Years", "year":1971}' +
                ' ,{"albumId":"The Coasters On Broadway", "year":1972}' +
                ' ,{"albumId":"16 Greatest Hits", "year":1975}' +
                ' ,{"albumId":"Young Blood", "year":1982}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Tony Orlando and Dawn":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Candida", "year":1970}' +
                ' ,{"albumId":"Dawn Featuring Tony Orlando", "year":1971}' +
                ' ,{"albumId":"Tie a Yellow Ribbon", "year":1973}' +
                ' ,{"albumId":"Tuneweaving", "year":1973}' +
                ' ,{"albumId":"Dawn\'s New Ragtime Follies", "year":1973}' +
                ' ,{"albumId":"Prime Time", "year":1974}' +
                ' ,{"albumId":"Candida & Knock Three Times", "year":1974}' +
                ' ,{"albumId":"Tony Orlando & Dawn II", "year":1974}' +
                ' ,{"albumId":"Golden Ribbons", "year":1974}' +
                ' ,{"albumId":"Greatest Hits", "year":1975}' +
                ' ,{"albumId":"He Don\'t Love You (Like I Love You)", "year":1975}' +
                ' ,{"albumId":"Skybird", "year":1975}' +
                ' ,{"albumId":"To Be With You", "year":1976}' +
                ' ,{"albumId":"The World of Tony Orlando & Dawn", "year":1976}' +
                ' ,{"albumId":"Christmas Reunion", "year":2005}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Mitch Ryder":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + "Mitch Ryder & the Detroit Wheels" + '", "style":0, "album":[' +
                ' {"albumId":"Take A Ride", "year":1966}' +
                ' ,{"albumId":"Breakout!", "year":1966}' +
                ' ,{"albumId":"Sock It To Me", "year":1967}' +
                ' ,{"albumId":"All Mitch Ryder Hits", "year":1967}' +
                ' ,{"albumId":"All The Heavy Hits", "year":1967}' +
                ' ,{"albumId":"Mitch Ryder Sings The Hits", "year":1968}' +
                ' ]}' +
                ' ,{"sectionId":"Mitch Ryder", "style":0, "album":[' +
                ' {"albumId":" What Now My Love", "year":1967}' +
                ' ,{"albumId":"The Detroit/Memphis Experiment", "year":1969}' +
                ' ,{"albumId":"How I Spent My Vacation", "year":1979}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "The Moments":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Not on the Outside, But on the Inside, Strong!", "year":1969}' +
                ' ,{"albumId":"A Moment with the Moments", "year":1970}' +
                ' ,{"albumId":"On Top", "year":1971}' +
                ' ,{"albumId":"The Other Side of the Moments", "year":1972}' +
                ' ,{"albumId":"My Thing", "year":1973}' +
                ' ,{"albumId":"Those Sexy Moments", "year":1974}' +
                ' ,{"albumId":"O\'Jays Meet the Moments", "year":1974}' +
                ' ,{"albumId":"Look at Me", "year":1975}' +
                ' ,{"albumId":"Moments with You", "year":1976}' +
                ' ,{"albumId":"Sharp", "year":1978}' +
                ' ]}' +
                ' ,{"sectionId":"As Ray, Goodman & Brown", "style":0, "album":[' +
                ' {"albumId":"Ray, Goodman & Brown", "year":1979}' +
                ' ,{"albumId":"Ray, Goodman & Brown II", "year":1980}' +
                ' ,{"albumId":"Stay", "year":1981}' +
                ' ,{"albumId":"Open Up", "year":1982}' +
                ' ,{"albumId":"All About Love, Who\'s Gonna Make the First Move?", "year":1984}' +
                ' ,{"albumId":"Take It to the Limit", "year":1986}' +
                ' ,{"albumId":"Mood for Lovin\'", "year":1988}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Sam the Sham":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + "Sam the Sham and the Pharaohs" + '", "style":0, "album":[' +
                ' {"albumId":"Wooly Bully", "year":1965}' +
                ' ,{"albumId":"Their Second Album", "year":1965}' +
                ' ,{"albumId":"On Tour", "year":1965}' +
                ' ,{"albumId":"Li\'l Red Riding Hood", "year":1966}' +
                ' ,{"albumId":"The Sam the Sham Revue", "year":1966}' +
                ' ,{"albumId":"Ten of Pentacles", "year":1967}' +
                ' ]}' +
                ' ,{"sectionId":"As Sam Samudio", "style":0, "album":[' +
                ' {"albumId":"Sam, Hard And Heavy", "year":1971}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Del Shannon":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"1,661 Seconds With Del Shannon", "year":1965}' +
                ' ,{"albumId":"This is My Bag", "year":1966}' +
                ' ,{"albumId":"Total Commitment", "year":1966}' +
                ' ,{"albumId":"The Further Adventures of Charles Westover", "year":1968}' +
                ' ,{"albumId":"Live in England", "year":1972}' +
                ' ,{"albumId":"And The Music Plays On", "year":1978}' +
                ' ,{"albumId":"Drop Down and Get Me", "year":1982}' +
                ' ,{"albumId":"Runaway Hits", "year":1986}' +
                ' ,{"albumId":"Greatest Hits", "year":1990}' +
                ' ,{"albumId":"Rock On", "year":1991}' +
                ' ,{"albumId":"Home and Away", "year":2006}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "The Platters":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"The Platters", "year":1954}' +
                ' ,{"albumId":"The Flying Platters", "year":1957}' +
                ' ,{"albumId":"The Flying Platters Around The World", "year":1958}' +
                ' ,{"albumId":"Remember When?", "year":1959}' +
                ' ,{"albumId":"Reflections", "year":1960}' +
                ' ,{"albumId":"Life Is Just A Bowl Of Cherries", "year":1961}' +
                ' ,{"albumId":"Song For The Lonely", "year":1962}' +
                ' ,{"albumId":"The Platters Sing of Your Moonlight Memories", "year":1963}' +
                ' ,{"albumId":"I Love You 1,000 Times", "year":1966}' +
                ' ,{"albumId":"The Platters Have The Magic Touch", "year":1966}' +
                ' ,{"albumId":"Going Back To Detroit", "year":1967}' +
                ' ,{"albumId":"Sweet, Sweet Lovin\'", "year":1968}' +
                ' ,{"albumId":"I Get The Sweetest Feeling", "year":1968}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "The Mamas & the Papas":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"If You Can Believe Your Eyes and Ears", "year":1966}' +
                ' ,{"albumId":"The Mamas & the Papas", "year":1966}' +
                ' ,{"albumId":"The Mamas & The Papas Deliver", "year":1967}' +
                ' ,{"albumId":"The Papas & the Mamas", "year":1968}' +
                ' ,{"albumId":"People Like Us", "year":1971}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Ambrosia":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Ambrosia", "year":1975}' +
                ' ,{"albumId":"Somewhere I\'ve Never Travelled", "year":1976}' +
                ' ,{"albumId":"Life Beyond L.A.", "year":1978}' +
                ' ,{"albumId":"One Eighty", "year":1980}' +
                ' ,{"albumId":"Road Island", "year":1982}' +
                ' ,{"albumId":"Anthology", "year":1997}' +
                ' ,{"albumId":"Ambrosia Live", "year":2002}' +
                ' ,{"albumId":"The Essential", "year":2002}' +
                ' ,{"albumId":"How Much I Feel and Other Hits", "year":2003}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Dave Mason":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Alone Together", "year":1970}' +
                ' ,{"albumId":"Welcome To The Canteen", "year":1971}' +
                ' ,{"albumId":"Dave Mason & Cass Elliot", "year":1971}' +
                ' ,{"albumId":"Headkeeper", "year":1972}' +
                ' ,{"albumId":"Scrapbook", "year":1972}' +
                ' ,{"albumId":"Dave Mason Is Alive", "year":1973}' +
                ' ,{"albumId":"It\'s Like You Never Left", "year":1973}' +
                ' ,{"albumId":"Dave Mason", "year":1974}' +
                ' ,{"albumId":"Split Coconut", "year":1975}' +
                ' ,{"albumId":"Certified Live", "year":1976}' +
                ' ,{"albumId":"Let It Flow", "year":1977}' +
                ' ,{"albumId":"Mariposa De Oro", "year":1978}' +
                ' ,{"albumId":"In Concert", "year":1978}' +
                ' ,{"albumId":"Old Crest On A New Wave", "year":1980}' +
                ' ,{"albumId":"Two Heart", "year":1987}' +
                ' ,{"albumId":"Some Assembly Required", "year":1987}' +
                ' ,{"albumId":"Live - The 40.000 Headmen Tour", "year":1999}' +
                ' ,{"albumId":"Live At Perkins Palace", "year":2002}' +
                ' ,{"albumId":"XM Radio", "year":2004}' +
                ' ,{"albumId":"Future\'s Past", "year":2014}' +
                ' ,{"albumId":"Alone Together", "year":2016}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Frankie Valli":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"The 4 Seasons Present Frankie Valli Solo", "year":1967}' +
                ' ,{"albumId":"Timeless", "year":1968}' +
                ' ,{"albumId":"Closeup", "year":1975}' +
                ' ,{"albumId":"Inside You", "year":1975}' +
                ' ,{"albumId":"Our Day Will Come", "year":1975}' +
                ' ,{"albumId":"Valli", "year":1976}' +
                ' ,{"albumId":"Lady Put the Light Out", "year":1977}' +
                ' ,{"albumId":"Frankie Valli... Is the Word", "year":1978}' +
                ' ,{"albumId":"Heaven Above Me", "year":1980}' +
                ' ,{"albumId":"Romancing the \'60s", "year":2007}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Neon Heights":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Neon Heights And Zed J - A View From The Heights", "year":2000}' +
                ' ,{"albumId":"A Hot Trip To Heaven", "year":2005}' +
                ' ,{"albumId":"You Make Love To Robots & You Wonder What People Are For", "year":2007}' +
                ' ]}' +
                ' ,{"sectionId":"Compilations", "style":0, "album":[' +
                ' {"albumId":"Neon Heights & Friends", "year":2004}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Sleepthief":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"The Dawnseeker", "year":2006}' +
                ' ,{"albumId":"Labyrinthine Heart", "year":2009}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Zoe Johnston":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Happenstances", "year":2006}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "The Cowsills":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"The Cowsills", "year":1967}' +
                ' ,{"albumId":"The Cowsills plus The Lincoln Park Zoo", "year":1968}' +
                ' ,{"albumId":"We Can Fly", "year":1968}' +
                ' ,{"albumId":"Captain Sad and his Ship of Fools", "year":1968}' +
                ' ,{"albumId":"The Best of The Cowsills", "year":1968}' +
                ' ,{"albumId":"The Cowsills", "year":1968}' +
                ' ,{"albumId":"The Cowsills in Concert", "year":1969}' +
                ' ,{"albumId":"The Cowsills Collectors Record", "year":1969}' +
                ' ,{"albumId":"II x II", "year":1970}' +
                ' ,{"albumId":"On My Side", "year":1971}' +
                ' ,{"albumId":"All-Time Hits", "year":1971}' +
                ' ,{"albumId":"Global", "year":1998}' +
                ' ,{"albumId":"The Best Of The Cowsills", "year":2001}' +
                ' ,{"albumId":"Painting The Day: The Angelic Psychedelia of The Cowsills", "year":2006}' +
                ' ,{"albumId":"Cocaine Drain", "year":2008}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Mozez":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"So Still", "year":2005}' +
                ' ,{"albumId":"Time Out", "year":2011}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Patrick Simmons":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Arcade", "year":1983}' +
                ' ,{"albumId":"Take Me to the Highway", "year":1995}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Robin Lane":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + "With The Chartbusters" + '", "style":0, "album":[' +
                ' {"albumId":"Robin Lane & The Chartbusters", "year":1980}' +
                ' ,{"albumId":"5 Live", "year":1980}' +
                ' ,{"albumId":"Imitation Life", "year":1981}' +
                ' ,{"albumId":"Piece of Mind", "year":2003}' +
                ' ]}' +
                ' ,{"sectionId":"Robin Lane", "style":0, "album":[' +
                ' {"albumId":"Heart Connection", "year":1984}' +
                ' ,{"albumId":"In Concert", "year":1989}' +
                ' ,{"albumId":"Catbird Seat", "year":1995}' +
                ' ,{"albumId":"Out of the Ashes", "year":2011}' +
                ' ,{"albumId":"The Sweet Candy Collection", "year":2011}' +
                ' ,{"albumId":"A Woman\'s Voice", "year":2013}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Henry Mancini":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Touch Of Evil", "year":1958}' +
                ' ,{"albumId":"Summer Love", "year":1958}' +
                ' ,{"albumId":"The Music From Peter Gunn", "year":1959}' +
                ' ,{"albumId":"The Versatile Henry Mancini", "year":1959}' +
                ' ,{"albumId":"More Music From Peter Gunn", "year":1959}' +
                ' ,{"albumId":"Mr. Lucky", "year":1960}' +
                ' ,{"albumId":"High Time", "year":1960}' +
                ' ,{"albumId":"The Blues And The Beat", "year":1960}' +
                ' ,{"albumId":"The Mancini Touch", "year":1960}' +
                ' ,{"albumId":"Breakfast At Tiffany\'s", "year":1961}' +
                ' ,{"albumId":"Sousa In Stereo", "year":1961}' +
                ' ,{"albumId":"Combo!", "year":1961}' +
                ' ,{"albumId":"Mr. Lucky Goes Latin", "year":1961}' +
                ' ,{"albumId":"March Step", "year":1961}' +
                ' ,{"albumId":"Experiment In Terror", "year":1962}' +
                ' ,{"albumId":"Hatari!", "year":1962}' +
                ' ,{"albumId":"Our Man In Hollywood", "year":1963}' +
                ' ,{"albumId":"Mancini Marches", "year":1963}' +
                ' ,{"albumId":"Uniquely Mancini", "year":1963}' +
                ' ,{"albumId":"The Pink Panther", "year":1963}' +
                ' ,{"albumId":"Charade", "year":1963}' +
                ' ,{"albumId":"The Great Academy Award Songs", "year":1964}' +
                ' ,{"albumId":"The Concert Sound Of Henry Mancini", "year":1964}' +
                ' ,{"albumId":"Academy Award Songs, Vol. 2", "year":1964}' +
                ' ,{"albumId":"Henry Mancini Favorites", "year":1964}' +
                ' ,{"albumId":"Dear Heart", "year":1965}' +
                ' ,{"albumId":"The Great Race", "year":1965}' +
                ' ,{"albumId":"The Latin Sound Of Henry Mancini", "year":1965}' +
                ' ,{"albumId":"12 Great Oscar Winners", "year":1965}' +
                ' ,{"albumId":"Arabesque", "year":1966}' +
                ' ,{"albumId":"The Sounds & Voices Of Henry Mancini", "year":1966}' +
                ' ,{"albumId":"The Second Time Around And Others", "year":1964}' +
                ' ,{"albumId":"Two For The Road", "year":1967}' +
                ' ,{"albumId":"Gunn ...Number One!", "year":1967}' +
                ' ,{"albumId":"Encore! More Of The Concert Sound Of Henry Mancini", "year":1967}' +
                ' ,{"albumId":"The Party", "year":1968}' +
                ' ,{"albumId":"The Big Latin Band Of Henry Mancini", "year":1968}' +
                ' ,{"albumId":"The Mancini Sound", "year":1968}' +
                ' ,{"albumId":"Me, Natalie", "year":1969}' +
                ' ,{"albumId":"Conducting The First Recording Of Philadelphia Orchestra Pops", "year":1969}' +
                ' ,{"albumId":"A Warm Shade Of Ivory", "year":1969}' +
                ' ,{"albumId":"His Sound Is His Signature", "year":1969}' +
                ' ,{"albumId":"Gaily, Gaily", "year":1969}' +
                ' ,{"albumId":"Sunflower", "year":1970}' +
                ' ,{"albumId":"The Molly Maguires", "year":1970}' +
                ' ,{"albumId":"Darling Lili", "year":1970}' +
                ' ,{"albumId":"The Theme From Love Story", "year":1970}' +
                ' ,{"albumId":"The Hawaiians", "year":1970}' +
                ' ,{"albumId":"Sample Mancini", "year":1970}' +
                ' ,{"albumId":"Never Give An Inch", "year":1971}' +
                ' ,{"albumId":"Brass On Ivory", "year":1972}' +
                ' ,{"albumId":"Henry Mancini", "year":1972}' +
                ' ,{"albumId":"Oklahoma Crude", "year":1973}' +
                ' ,{"albumId":"Visions Of Eight", "year":1973}' +
                ' ,{"albumId":"The Thief Who Came To Dinner", "year":1973}' +
                ' ,{"albumId":"Film Music By Mancini", "year":1973}' +
                ' ,{"albumId":"Brass, Ivory And Strings", "year":1973}' +
                ' ,{"albumId":"Mancini Salutes Sousa", "year":1973}' +
                ' ,{"albumId":"Hangin\' Out", "year":1974}' +
                ' ,{"albumId":"The Pink Panther", "year":1974}' +
                ' ,{"albumId":"Temas De Películas Y Series De Televisión", "year":1974}' +
                ' ,{"albumId":"The Great Waldo Pepper", "year":1975}' +
                ' ,{"albumId":"Blake Edwards The Return Of The Pink Panther", "year":1975}' +
                ' ,{"albumId":"Symphonic Soul", "year":1975}' +
                ' ,{"albumId":"The Pink Panther Strikes Again", "year":1976}' +
                ' ,{"albumId":"The Cop Show Themes", "year":1976}' +
                ' ,{"albumId":"A Concert Of Film Music", "year":1976}' +
                ' ,{"albumId":"Mancini Moods At Christmastime", "year":1976}' +
                ' ,{"albumId":"Mancini\'s Angels", "year":1977}' +
                ' ,{"albumId":"Just You And Me Together Love", "year":1977}' +
                ' ,{"albumId":"Revenge Of The Pink Panther", "year":1978}' +
                ' ,{"albumId":"Who Is Killing The Great Chefs Of Europe?", "year":1978}' +
                ' ,{"albumId":"The Theme Scene", "year":1978}' +
                ' ,{"albumId":"10", "year":1979}' +
                ' ,{"albumId":"The Hits Of The 70s", "year":1981}' +
                ' ,{"albumId":"The Trail Of The Pink Panther And Other Pink Panther Films", "year":1982}' +
                ' ,{"albumId":"A Lover\'s Concerto", "year":1982}' +
                ' ,{"albumId":"Those Classic Evergreens", "year":1981}' +
                ' ,{"albumId":"James Galway & Henry Mancini - In The Pink", "year":1984}' +
                ' ,{"albumId":"Mamma", "year":1984}' +
                ' ,{"albumId":"Santa Claus", "year":1985}' +
                ' ,{"albumId":"Lifeforce", "year":1985}' +
                ' ,{"albumId":"That\'s Dancing!", "year":1985}' +
                ' ,{"albumId":"The Hollywood Musicals", "year":1986}' +
                ' ,{"albumId":"The Glass Menagerie", "year":1987}' +
                ' ,{"albumId":"Great Favorites Of The 60 & 70", "year":1989}' +
                ' ,{"albumId":"Mancini Rocks The Pops", "year":1989}' +
                ' ,{"albumId":"The Music of Henry Mancini", "year":1991}' +
                ' ,{"albumId":"Switch", "year":1991}' +
                ' ,{"albumId":"Tom And Jerry", "year":1992}' +
                ' ,{"albumId":"The Adventures Of The Great Mouse Detective", "year":1992}' +
                ' ,{"albumId":"Son Of The Pink Panther", "year":1993}' +
                ' ,{"albumId":"Gunn", "year":1993}' +
                ' ,{"albumId":"Victor/Victoria", "year":1994}' +
                ' ,{"albumId":"Midas Run And The House/The Night Visitor", "year":1995}' +
                ' ,{"albumId":"Hatari!", "year":1998}' +
                ' ,{"albumId":"Silver Streak", "year":2002}' +
                ' ,{"albumId":"One Martini With Mancini", "year":2003}' +
                ' ,{"albumId":"Mr. Hobbs Takes A Vacation", "year":2003}' +
                ' ,{"albumId":"Peter Gunn", "year":2003}' +
                ' ,{"albumId":"Wait Until Dark", "year":2007}' +
                ' ,{"albumId":"Without A Clue", "year":2007}' +
                ' ,{"albumId":"Nightwing", "year":2009}' +
                ' ,{"albumId":"99 44/100% Dead!", "year":2010}' +
                ' ,{"albumId":"The Moneychangers", "year":2011}' +
                ' ,{"albumId":"Trail Of The Pink Panther", "year":2011}' +
                ' ,{"albumId":"Condorman", "year":2012}' +
                ' ,{"albumId":"Mommie Dearest", "year":2012}' +
                ' ,{"albumId":"Fear", "year":2013}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "The Fools":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + DEFAULT_SECTION + '", "style":0, "album":[' +
                ' {"albumId":"Sold Out", "year":1980}' +
                ' ,{"albumId":"April Fools Day Live Bootleg", "year":1980}' +
                ' ,{"albumId":"Heavy Mental", "year":1981}' +
                ' ,{"albumId":"World Dance Party", "year":1985}' +
                ' ,{"albumId":"4 Song Film", "year":1985}' +
                ' ,{"albumId":"Wake Up It\'s Alive", "year":1988}' +
                ' ,{"albumId":"Rated XXX", "year":1990}' +
                ' ,{"albumId":"World Dance Party Too", "year":1990}' +
                ' ,{"albumId":"Show \'Em You\'re Nuts", "year":1991}' +
                ' ,{"albumId":"Christmas Toons", "year":1992}' +
                ' ,{"albumId":"Wake Up It\'s Alive Again", "year":1993}' +
                ' ,{"albumId":"Y2K", "year":1999}' +
                ' ,{"albumId":"Coors Light Six Pack", "year":2000}' +
                ' ,{"albumId":"World Dance Party 2003", "year":2003}' +
                ' ,{"albumId":"The F in Beach", "year":2003}' +
                ' ,{"albumId":"10", "year":2007}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "The Spencer Davis Group":

            artist_discography_JSON_string +=
                '{"id":"' + artist + '", "wikipedia":"",' +
                ' "section":[' +
                ' {"sectionId":"' + "UK albums" + '", "style":0, "album":[' +
                ' {"albumId":"Their First LP", "year":1965}' +
                ' ,{"albumId":"The Second Album", "year":1966}' +
                ' ,{"albumId":"Autumn \'66", "year":1966}' +
                ' ,{"albumId":"The Best of the Spencer Davis Group featuring Steve Winwood", "year":1967}' +
                ' ,{"albumId":"Funky", "year":1969}' +
                ' ,{"albumId":"Gluggo", "year":1973}' +
                ' ,{"albumId":"Living In A Back Street", "year":1974}' +

                ' ]}' +
                ' ,{"sectionId":"US albums", "style":0, "album":[' +
                ' {"albumId":"Gimme Some Lovin\'", "year":1967}' +
                ' ,{"albumId":"I\'m a Man", "year":1967}' +
                ' ,{"albumId":"With Their New Face On", "year":1968}' +
                ' ,{"albumId":"Greatest Hits", "year":1968}' +
                ' ]}' +
                ' ,{"sectionId":"Special recordings", "style":0, "album":[' +
                ' {"albumId":"The Somebody Help Me Project", "year":1993}' +
                ' ]}' +
                ' ,{"sectionId":"Anthologies", "style":0, "album":[' +
                ' {"albumId":"Eight Gigs a Week: The Steve Winwood Years", "year":1996}' +
                ' ,{"albumId":"Spencer Davis Keep on Running: 40th Anniversary", "year":2004}' +
                ' ]}' +
                ' ]' +
                '}';

            break;

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

        default:
    }

    return artist_discography_JSON_string;

}