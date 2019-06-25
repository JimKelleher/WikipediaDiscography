function get_discog_JSON_string_hardcoded_live_albums(artist) {
    // Constants:
    var LIVE_SECTION = "Live albums";
    var artist_discography_JSON_string = ""; // init
    switch (artist) {
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        // case "": 
        // artist_discography_JSON_string += 
        // ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' + 
        // ' {"albumId":"", "year":}' + 
        // ' ,{"albumId":"", "year":}' + 
        // ' ]}'; 
        // break; 
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Aerosmith":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Live! Bootleg", "year":1978}' +
                    ' ,{"albumId":"Classics Live!", "year":1986}' +
                    ' ,{"albumId":"Classics Live! Vol. 2", "year":1987}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Alanis Morissette":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"MTV Unplugged", "year":1999}' +
                    ' ,{"albumId":"Live at Montreux 2012", "year":2013}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Alice Cooper":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"The Alice Cooper Show", "year":1977}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Barbra Streisand":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"A Happening in Central Park", "year":1968}' +
                    ' ,{"albumId":"Live Concert at the Forum", "year":1972}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Bee Gees":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Here at Last", "year":1977}' +
                    ' ,{"albumId":"One Night Only", "year":1998}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Blind Faith":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"London Hyde Park", "year":1969}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Bob Dylan":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Before the Flood", "year":1974}' +
                    ' ,{"albumId":"Hard Rain", "year":1976}' +
                    ' ,{"albumId":"Bob Dylan at Budokan", "year":1979}' +
                    ' ,{"albumId":"Real Live", "year":1984}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Bob Marley":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Live at the Roxy", "year":2003}' +
                    ' ,{"albumId":"Live Forever", "year":2011}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Bruce Springsteen":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Live 1975–85", "year":1984}' +
                    ' ,{"albumId":"In Concert/MTV Plugged", "year":1993}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Carole King":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"The Carnegie Hall Concert: June 18, 1971", "year":1996}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Cat Stevens":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Saturnight", "year":1974}' +
                    ' ,{"albumId":"Majikat", "year":2004}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Cheap Trick":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Cheap Trick at Budokan", "year":1979}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Coldplay":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Coldplay Live 2003", "year":2003}' +
                    ' ,{"albumId":"LeftRightLeftRightLeft", "year":2009}' +
                    ' ,{"albumId":"Coldplay Live 2012", "year":2012}' +
                    ' ,{"albumId":"Ghost Stories Live 2014", "year":2014}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Crosby, Stills, Nash & Young":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"4 Way Street", "year":1971}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "David Bowie":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"David Live", "year":1974}' +
                    ' ,{"albumId":"Stage", "year":1978}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Diana Ross":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Live at Caesars Palace", "year":1974}' +
                    ' ,{"albumId":"An Evening with Diana Ross", "year":1977}' +
                    ' ,{"albumId":"Greatest Hits Live", "year":1989}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Dido":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Live at Brixton Academy", "year":2005}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Dire Straits":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Alchemy", "year":1984}' +
                    ' ,{"albumId":"On the Night", "year":1993}' +
                    ' ,{"albumId":"Live at the BBC", "year":1995}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Donovan":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Donovan In Concert", "year":1968}' +
                    ' ,{"albumId":"Live in Japan: Spring Tour", "year":1973}' +
                    ' ,{"albumId":"Live in Tokyo \'73", "year":1973}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Eagles":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Eagles Live", "year":1980}' +
                    ' ,{"albumId":"Hell Freezes", "year":1994}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Electric Light Orchestra":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"The Night the Light Went On in Long Beach", "year":1974}' +
                    ' ,{"albumId":"Live at Wembley \'78", "year":1998}' +
                    ' ,{"albumId":"Live at Winterland \'76", "year":1998}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Elton John":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"17-11-70", "year":1971}' +
                    ' ,{"albumId":"Here and There", "year":1976}' +
                    ' ,{"albumId":"One Night Only – The Greatest Hits", "year":2000}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Emerson, Lake & Palmer":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Pictures at an Exhibition", "year":1971}' +
                    ' ,{"albumId":"Welcome Back, My Friends, to the Show That Never Ends", "year":1974}' +
                    ' ,{"albumId":"Emerson, Lake and Palmer in Concert", "year":1979}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Eric Clapton":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Eric Clapton\'s Rainbow Concert", "year":1973}' +
                    ' ,{"albumId":"Just One Night", "year":1980}' +
                    ' ,{"albumId":"Time Pieces", "year":1983}' +
                    ' ,{"albumId":"24 Nights", "year":1991}' +
                    ' ,{"albumId":"Unplugged", "year":1992}' +
                    ' ,{"albumId":"Live from Madison Square Garden", "year":2009}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Genesis":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Genesis Live", "year":1973}' +
                    ' ,{"albumId":"Seconds Out", "year":1977}' +
                    ' ,{"albumId":"Three Sides Live", "year":1982}' +
                    ' ,{"albumId":"The Way We Walk, Vol I: The Shorts", "year":1992}' +
                    ' ,{"albumId":"The Way We Walk, Vol II: The Longs", "year":1993}' +
                    ' ,{"albumId":"Live over Europe 2007", "year":2007}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "George Harrison":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"The Concert for Bangladesh", "year":1971}' +
                    ' ,{"albumId":"Live in Japan", "year":1992}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Jethro Tull":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Live - Bursting Out", "year":1978}' +
                    ' ,{"albumId":"Live at Hammersmith \'84", "year":1990}' +
                    ' ,{"albumId":"A Little Light Music", "year":1992}' +
                    ' ,{"albumId":"25th Anniversary Box Set", "year":1993}' +
                    ' ,{"albumId":"In Concert", "year":1995}' +
                    ' ,{"albumId":"Living with the Past", "year":2002}' +
                    ' ,{"albumId":"Nothing Is Easy", "year":2004}' +
                    ' ,{"albumId":"Aqualung Live", "year":2005}' +
                    ' ,{"albumId":"Live at Madison Square Garden 1978", "year":2009}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "John Lennon":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Live Peace in Toronto", "year":1969}' +
                    ' ,{"albumId":"Live in New York City", "year":1986}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Journey":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Captured", "year":1981}' +
                    ' ,{"albumId":"Greatest Hits Live", "year":1998}' +
                    ' ,{"albumId":"Live in Houston 1981: The Escape Tour", "year":2005}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Kate Bush":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Live at Hammersmith Odeon", "year":1994}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Led Zeppelin":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"The Song Remains the Same", "year":1976}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Lynyrd Skynyrd":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"One More From the Road", "year":1976}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Neil Young":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Live Rust", "year":1979}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "No Doubt":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Live in the Tragic Kingdom", "year":1997}' +
                    ' ,{"albumId":"Rock Steady Live", "year":2003}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Paul McCartney":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Wings Over America", "year":1976}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Pete Townshend":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Deep End Live!", "year":1986}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Pink Floyd":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Is There Anybody Out There? The Wall Live 1980–81", "year":2000}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Roxy Music":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Viva!", "year":1976}' +
                    ' ,{"albumId":"The High Road", "year":1983}' +
                    ' ,{"albumId":"Heart Still Beating", "year":1990}' +
                    ' ,{"albumId":"Concert Classics", "year":1998}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Simon & Garfunkel":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"The Concert in Central Park", "year":1982}' +
                    ' ,{"albumId":"Live from New York City, 1967", "year":2002}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Steve Miller Band":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Steve Miller Band Live!", "year":1983}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Talking Heads":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"The Name of This Band Is Talking Heads", "year":1982}' +
                    ' ,{"albumId":"Stop Making Sense", "year":1984}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "The Beach Boys":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Beach Boys Concert", "year":1964}' +
                    ' ,{"albumId":"Live in London", "year":1970}' +
                    ' ,{"albumId":"The Beach Boys in Concert", "year":1973}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "The Carpenters":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Live in Japan", "year":1975}' +
                    ' ,{"albumId":"Live at the Palladium", "year":1977}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "The Doors":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Absolutely Live", "year":1970}' +
                    ' ,{"albumId":"Alive, She Cried", "year":1983}' +
                    ' ,{"albumId":"Live at the Hollywood Bowl", "year":1987}' +
                    ' ,{"albumId":"In Concert", "year":1991}' +
                    ' ,{"albumId":"Message to Love", "year":1996}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "The Monkees":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Live 1967", "year":1987}' +
                    ' ,{"albumId":"20th Anniversary Tour 1986", "year":1987}' +
                    ' ,{"albumId":"1994 Live!", "year":1994}' +
                    ' ,{"albumId":"2001: Live in Las Vegas", "year":2001}' +
                    ' ,{"albumId":"Summer 1967: The Complete U.S. Concert Recordings", "year":2001}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "The Moody Blues":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Caught Live + 5", "year":1977}' +
                    ' ,{"albumId":"A Night at Red Rocks with the Colorado Symphony Orchestra", "year":1993}' +
                    ' ,{"albumId":"Hall of Fame", "year":2000}' +
                    ' ,{"albumId":"Lovely to See You: Live", "year":2005}' +
                    ' ,{"albumId":"Live at the BBC: 1967–1970", "year":2007}' +
                    ' ,{"albumId":"Live at the Isle of Wight Festival 1970", "year":2008}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Todd Rundgren":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Back to the Bars", "year":1978}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "U2":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Under a Blood Red Sky", "year":1983}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        case "Van Halen":
            artist_discography_JSON_string +=
                ' {"sectionId":"' + LIVE_SECTION + '", "style":0, "album":[' +
                    ' {"albumId":"Live: Right Here, Right Now", "year":1993}' +
                    ' ]}';
            break;
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        default:
    }
    return artist_discography_JSON_string;
}
//# sourceMappingURL=hardcoded_live_albums.js.map