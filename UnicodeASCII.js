
// This file contains Unicode/ASCII lookup services

// NOTE: The following high level functions are shown in hierarchical, usage order:

// My homemade Unicode/ASCII object Part A, the class definition/constructor:
function unicode_ASCII() {

    // CONSTANTS:

    this.EXAMPLE_LOCATION = "http://r12a.github.io/c";
    this.EXAMPLE_FILE_EXTENSION = "png";

    this.BASIC_LATIN   = "Basic_Latin";
    this.CYRILLIC      = "Cyrillic";
    this.GENERAL_PUNCT = "General_Punctuation";
    this.GREEK_COPTIC  = "Greek_and_Coptic";
    this.LATIN_1_SUP   = "Latin-1_Supplement";
    this.LATIN_EXTEND  = "Latin_Extended-A";
    this.MATH_OPERATOR = "Mathematical_Operators";

    // Load the object array:

    this.unicode_ASCII_array = new Array; // init

    //                                      Unicode
    //                                        Hex                  ASCII
    //                                      -------                -----
    this.add_unicode_ASCII(this.BASIC_LATIN, "0020", "SPACE",       " ");

    this.add_unicode_ASCII(this.BASIC_LATIN, "0030", "DIGIT ZERO",  "0");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0031", "DIGIT ONE",   "1");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0032", "DIGIT TWO",   "2");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0033", "DIGIT THREE", "3");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0034", "DIGIT FOUR",  "4");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0035", "DIGIT FIVE",  "5");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0036", "DIGIT SIX",   "6");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0037", "DIGIT SEVEN", "7");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0038", "DIGIT EIGHT", "8");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0039", "DIGIT NINE",  "9");

    this.add_unicode_ASCII(this.BASIC_LATIN, "0041", "LATIN CAPITAL LETTER A", "A");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0042", "LATIN CAPITAL LETTER B", "B");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0043", "LATIN CAPITAL LETTER C", "C");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0044", "LATIN CAPITAL LETTER D", "D");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0045", "LATIN CAPITAL LETTER E", "E");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0046", "LATIN CAPITAL LETTER F", "F");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0047", "LATIN CAPITAL LETTER G", "G");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0048", "LATIN CAPITAL LETTER H", "H");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0049", "LATIN CAPITAL LETTER I", "I");
    this.add_unicode_ASCII(this.BASIC_LATIN, "004A", "LATIN CAPITAL LETTER J", "J");
    this.add_unicode_ASCII(this.BASIC_LATIN, "004B", "LATIN CAPITAL LETTER K", "K");
    this.add_unicode_ASCII(this.BASIC_LATIN, "004C", "LATIN CAPITAL LETTER L", "L");
    this.add_unicode_ASCII(this.BASIC_LATIN, "004D", "LATIN CAPITAL LETTER M", "M");
    this.add_unicode_ASCII(this.BASIC_LATIN, "004E", "LATIN CAPITAL LETTER N", "N");
    this.add_unicode_ASCII(this.BASIC_LATIN, "004F", "LATIN CAPITAL LETTER O", "O");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0050", "LATIN CAPITAL LETTER P", "P");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0051", "LATIN CAPITAL LETTER Q", "Q");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0052", "LATIN CAPITAL LETTER R", "R");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0053", "LATIN CAPITAL LETTER S", "S");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0054", "LATIN CAPITAL LETTER T", "T");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0055", "LATIN CAPITAL LETTER U", "U");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0056", "LATIN CAPITAL LETTER V", "V");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0057", "LATIN CAPITAL LETTER W", "W");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0058", "LATIN CAPITAL LETTER X", "X");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0059", "LATIN CAPITAL LETTER Y", "Y");
    this.add_unicode_ASCII(this.BASIC_LATIN, "005A", "LATIN CAPITAL LETTER Z", "Z");

    this.add_unicode_ASCII(this.BASIC_LATIN, "0061", "LATIN SMALL LETTER A", "a");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0062", "LATIN SMALL LETTER B", "b");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0063", "LATIN SMALL LETTER C", "c");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0064", "LATIN SMALL LETTER D", "d");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0065", "LATIN SMALL LETTER E", "e");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0066", "LATIN SMALL LETTER F", "f");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0067", "LATIN SMALL LETTER G", "g");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0068", "LATIN SMALL LETTER H", "h");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0069", "LATIN SMALL LETTER I", "i");
    this.add_unicode_ASCII(this.BASIC_LATIN, "006A", "LATIN SMALL LETTER J", "j");
    this.add_unicode_ASCII(this.BASIC_LATIN, "006B", "LATIN SMALL LETTER K", "k");
    this.add_unicode_ASCII(this.BASIC_LATIN, "006C", "LATIN SMALL LETTER L", "l");
    this.add_unicode_ASCII(this.BASIC_LATIN, "006D", "LATIN SMALL LETTER M", "m");
    this.add_unicode_ASCII(this.BASIC_LATIN, "006E", "LATIN SMALL LETTER N", "n");
    this.add_unicode_ASCII(this.BASIC_LATIN, "006F", "LATIN SMALL LETTER O", "o");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0070", "LATIN SMALL LETTER P", "p");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0071", "LATIN SMALL LETTER Q", "q");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0072", "LATIN SMALL LETTER R", "r");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0073", "LATIN SMALL LETTER S", "s");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0074", "LATIN SMALL LETTER T", "t");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0075", "LATIN SMALL LETTER U", "u");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0076", "LATIN SMALL LETTER V", "v");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0077", "LATIN SMALL LETTER W", "w");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0078", "LATIN SMALL LETTER X", "x");
    this.add_unicode_ASCII(this.BASIC_LATIN, "0079", "LATIN SMALL LETTER Y", "y");
    this.add_unicode_ASCII(this.BASIC_LATIN, "007A", "LATIN SMALL LETTER Z", "z");

    this.add_unicode_ASCII(this.CYRILLIC, "041D", "CYRILLIC CAPITAL LETTER EN",                  "H");
    this.add_unicode_ASCII(this.CYRILLIC, "0430", "CYRILLIC SMALL LETTER A",                     "a");
    this.add_unicode_ASCII(this.CYRILLIC, "0435", "CYRILLIC SMALL LETTER IE",                    "e");
    this.add_unicode_ASCII(this.CYRILLIC, "043A", "CYRILLIC SMALL LETTER KA",                    "K"); // CYRILLIC SMALL = ASCII CAPITAL
    this.add_unicode_ASCII(this.CYRILLIC, "043C", "CYRILLIC SMALL LETTER EM",                    "M"); // CYRILLIC SMALL = ASCII CAPITAL
    this.add_unicode_ASCII(this.CYRILLIC, "043D", "CYRILLIC SMALL LETTER EN",                    "H"); // CYRILLIC SMALL = ASCII CAPITAL
    this.add_unicode_ASCII(this.CYRILLIC, "043E", "CYRILLIC SMALL LETTER O",                     "o");
    this.add_unicode_ASCII(this.CYRILLIC, "04F2", "CYRILLIC CAPITAL LETTER U WITH DOUBLE ACUTE", "y"); // CYRILLIC CAPITAL = ASCII SMALL

    this.add_unicode_ASCII(this.GENERAL_PUNCT, "2013", "EN DASH",                       "-");
    this.add_unicode_ASCII(this.GENERAL_PUNCT, "2014", "EM DASH",                       "-");
    this.add_unicode_ASCII(this.GENERAL_PUNCT, "2018", "LEFT SINGLE QUOTATION MARK",    "'");
    this.add_unicode_ASCII(this.GENERAL_PUNCT, "2019", "RIGHT SINGLE QUOTATION MARK",   "'");
    this.add_unicode_ASCII(this.GENERAL_PUNCT, "201C", "LEFT DOUBLE QUOTATION MARK",    '"');
    this.add_unicode_ASCII(this.GENERAL_PUNCT, "201D", "RIGHT DOUBLE QUOTATION MARK",   '"');
    this.add_unicode_ASCII(this.GENERAL_PUNCT, "2033", "DOUBLE PRIME",                  '"');

    this.add_unicode_ASCII(this.GREEK_COPTIC, "03A7", "GREEK CAPITAL LETTER CHI",               "X");
    this.add_unicode_ASCII(this.GREEK_COPTIC, "03B1", "GREEK SMALL LETTER ALPHA",               "a");
    this.add_unicode_ASCII(this.GREEK_COPTIC, "03B5", "GREEK SMALL LETTER EPSILON",             "e");
    this.add_unicode_ASCII(this.GREEK_COPTIC, "03BC", "GREEK SMALL LETTER MU",                  "u");
    this.add_unicode_ASCII(this.GREEK_COPTIC, "03BD", "GREEK SMALL LETTER NU",                  "v");
    this.add_unicode_ASCII(this.GREEK_COPTIC, "03BF", "GREEK SMALL LETTER OMICRON",             "o");
    this.add_unicode_ASCII(this.GREEK_COPTIC, "03C4", "GREEK SMALL LETTER TAU",                 "t");
    this.add_unicode_ASCII(this.GREEK_COPTIC, "03C5", "GREEK SMALL LETTER UPSILON",             "u");
    this.add_unicode_ASCII(this.GREEK_COPTIC, "03CC", "GREEK SMALL LETTER OMICRON WITH TONOS",  "o");
    this.add_unicode_ASCII(this.GREEK_COPTIC, "03CD", "GREEK SMALL LETTER UPSILON WITH TONOS",  "u");

    this.add_unicode_ASCII(this.LATIN_1_SUP, "00C0", "LATIN CAPITAL LETTER A WITH GRAVE",       "A");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00C1", "LATIN CAPITAL LETTER A WITH ACUTE",       "A");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00C5", "LATIN CAPITAL LETTER A WITH RING ABOVE",  "A");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00C7", "LATIN CAPITAL LETTER C WITH CEDILLA",     "C");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00D1", "LATIN CAPITAL LETTER N WITH TILDE",       "N");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00D3", "LATIN CAPITAL LETTER O WITH ACUTE",       "O");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00D6", "LATIN CAPITAL LETTER O WITH DIAERESIS",   "O");

    this.add_unicode_ASCII(this.LATIN_1_SUP, "00D7", "MULTIPLICATION SIGN",                     "X");

    this.add_unicode_ASCII(this.LATIN_1_SUP, "00D8", "LATIN CAPITAL LETTER O WITH STROKE",      "O");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00E0", "LATIN SMALL LETTER A WITH GRAVE",         "a");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00E2", "LATIN SMALL LETTER A WITH CIRCUMFLEX",    "a");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00E3", "LATIN SMALL LETTER A WITH TILDE",         "a");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00E4", "LATIN SMALL LETTER A WITH DIAERESIS",     "a");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00E5", "LATIN SMALL LETTER A WITH RING ABOVE",    "a");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00E6", "LATIN SMALL LETTER AE",                   "a");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00E7", "LATIN SMALL LETTER C WITH CEDILLA",       "c");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00E8", "LATIN SMALL LETTER E WITH GRAVE",         "e");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00E9", "LATIN SMALL LETTER E WITH ACUTE",         "e");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00EB", "LATIN SMALL LETTER E WITH DIAERESIS",     "e");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00ED", "LATIN SMALL LETTER I WITH ACUTE",         "i");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00EF", "LATIN SMALL LETTER I WITH DIAERESIS",     "i");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00F2", "LATIN SMALL LETTER O WITH GRAVE",         "o");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00F3", "LATIN SMALL LETTER O WITH ACUTE",         "o");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00F4", "LATIN SMALL LETTER O WITH CIRCUMFLEX",    "o");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00F5", "LATIN SMALL LETTER O WITH TILDE",         "o");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00F6", "LATIN SMALL LETTER O WITH DIAERESIS",     "o");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00F8", "LATIN SMALL LETTER O WITH STROKE",        "o");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00F9", "LATIN SMALL LETTER U WITH GRAVE",         "u");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00FA", "LATIN SMALL LETTER U WITH ACUTE",         "u");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00FB", "LATIN SMALL LETTER U WITH CIRCUMFLEX",    "u");
    this.add_unicode_ASCII(this.LATIN_1_SUP, "00FC", "LATIN SMALL LETTER U WITH DIAERESIS",     "u");

    this.add_unicode_ASCII(this.LATIN_EXTEND, "0105", "LATIN SMALL LETTER A WITH OGONEK",       "a");
    this.add_unicode_ASCII(this.LATIN_EXTEND, "0115", "LATIN SMALL LETTER E WITH ACUTE",        "e");
    this.add_unicode_ASCII(this.LATIN_EXTEND, "0142", "LATIN SMALL LETTER L WITH STROKE",       "l");
    this.add_unicode_ASCII(this.LATIN_EXTEND, "0151", "LATIN SMALL LETTER O WITH DOUBLE ACUTE", "o");
    this.add_unicode_ASCII(this.LATIN_EXTEND, "015F", "LATIN SMALL LETTER S WITH CEDILLA",      "s");
    this.add_unicode_ASCII(this.LATIN_EXTEND, "0171", "LATIN SMALL LETTER U WITH DOUBLE ACUTE", "u");
    this.add_unicode_ASCII(this.LATIN_EXTEND, "0172", "LATIN CAPITAL LETTER U WITH OGONEK",     "U");
    this.add_unicode_ASCII(this.LATIN_EXTEND, "017C", "LATIN SMALL LETTER Z WITH DOT ABOVE",    "z");

    this.add_unicode_ASCII(this.MATH_OPERATOR, "2212", "MINUS SIGN",                            "-");

}

// My homemade Unicode/ASCII object Part B, utility functions:

unicode_ASCII.prototype.add_unicode_ASCII = function (language, unicode_hex, description, ASCII) {

    var unicode_ASCII = new Object(); // init

    // Save the arguments in an object:
    unicode_ASCII.language    = language;
    unicode_ASCII.unicode_hex = unicode_hex;
    unicode_ASCII.description = description;
    unicode_ASCII.ASCII       = ASCII;

    // Load the object to an object array:
    this.unicode_ASCII_array.push(unicode_ASCII);

}

unicode_ASCII.prototype.get_ASCII = function (unicode_hex) {

    var ASCII = "" // init

    // Search the object array for the desired unicode hex value:
    for (var i = 0; i < this.unicode_ASCII_array.length; i++) {

        if (this.unicode_ASCII_array[i].unicode_hex.toLowerCase() == unicode_hex.toLowerCase()) {

            ASCII = this.unicode_ASCII_array[i].ASCII;
            break;
        }

    }

    // Return its ASCII equivalent, if one is found, or the empty string:
    return ASCII;

}

unicode_ASCII.prototype.get_HTML_report = function () {

    var HTML_report = ""; // init

    // Header:
  //HTML_report += "<table align='center' border='1'>";
    HTML_report += "<table>";

    HTML_report += "<tr>";
        HTML_report += "<th></th>";
        HTML_report += "<th>Unicode</th>";
        HTML_report += "<th></th>";
        HTML_report += "<th></th>";
        HTML_report += "<th>ASCII</th>";
    HTML_report += "</tr>";

   // Detail, one for each table row:
    for (var i = 0; i < this.unicode_ASCII_array.length; i++) {

        HTML_report += "<tr>";
            
            HTML_report += "<td>";
        
                // Column 1, language:
                HTML_report += this.unicode_ASCII_array[i].language;

                // Column 2, image:
                HTML_report += "</td><td>";
                HTML_report += this.unicode_ASCII_array[i].unicode_hex;

                // Column 3, image:
                HTML_report += "</td><td>";
                HTML_report +=
                    "<img src='" +
                        this.EXAMPLE_LOCATION + "/" +
                        this.unicode_ASCII_array[i].language + "/" +
                        this.unicode_ASCII_array[i].unicode_hex + "." +
                        this.EXAMPLE_FILE_EXTENSION +
                    "'>";

                // Column 4, description:
                HTML_report += "</td><td class='table_text'>";
                HTML_report += this.unicode_ASCII_array[i].description;

                // Column 5, ASCII:
                HTML_report += "</td><td>";
                HTML_report += this.unicode_ASCII_array[i].ASCII;

            HTML_report += "</td>";
        
        HTML_report += "</tr>";

   }

    // Footer:
    HTML_report += "</table>";

    // Return the fully assembled report:
    return HTML_report;

}
