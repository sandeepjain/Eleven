/* Eleven main */

// Base function.
var Eleven = (function() {
  // Add functionality here.

    // default configuration
    var defaultOptions = {
        rupeeText: 'rupee',
        paiseText: 'paise',
        moneySuffix: 'only'
    };

    // all in small case
    var ones = ['zero','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '],
        tens = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];


    // Proudly borrowed from http://stackoverflow.com/questions/14766951/convert-digits-into-words-with-javascript
    // Convert number to words
    // @param num Integer number
    // @param noAdd If true, string 'and' will no be appended
    function numberToWords (num, noAnd) {
        var n,
            str = '';

        if (ones[num]) {
            return ones[num].trim();
        }
        if ((num = num.toString()).length > 9) {
            return '[ overflow ]';
        }
        n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) {
            return;
        }
        str += (parseInt(n[1], 10) !== 0) ? (ones[Number(n[1])] || tens[n[1][0]] + ' ' + ones[n[1][1]]) + 'crore ' : '';
        str += (parseInt(n[2], 10) !== 0) ? (ones[Number(n[2])] || tens[n[2][0]] + ' ' + ones[n[2][1]]) + 'lakh ' : '';
        str += (parseInt(n[3], 10) !== 0) ? (ones[Number(n[3])] || tens[n[3][0]] + ' ' + ones[n[3][1]]) + 'thousand ' : '';
        str += (parseInt(n[4], 10) !== 0) ? (ones[Number(n[4])] || tens[n[4][0]] + ' ' + ones[n[4][1]]) + 'hundred ' : '';
        str += (parseInt(n[5], 10) !== 0) ? ((str !== '' && noAnd !== true) ? 'and ' : '') + (ones[Number(n[5])] || (tens[n[5][0]] + ' ' + ones[n[5][1]])) : '';
        return str.trim();
    }

    function moneyToWords(num, options) {
        options = options || {};
        if (isInt(num)) {
            return toTitleCase(numberToWords(num) + ' ' + (options.rupeeText || defaultOptions.rupeeText) + 's ' + (options.moneySuffix || defaultOptions.moneySuffix));
        } else {
            // this is float
            var intNum = parseInt(num, 10),
                strNum = num + '',
                decimalValue = parseInt(strNum.substr(strNum.indexOf('.') + 1), 10),
                intWord = numberToWords(intNum, true),
                decimalWord = numberToWords(decimalValue, true);

            return toTitleCase([
                intWord ,
                ' ',
                (options.rupeeText || defaultOptions.rupeeText),
                's And ',
                decimalWord,
                ' ',
                (options.paiseText || defaultOptions.paiseText),
                defaultOptions.moneySuffix || options.moneySuffix ? ' Only' : ''
            ].join(''));

        }
    }

    function isInt(n) {
       return n % 1 === 0;
    }

    function toTitleCase(str)
    {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    // Override default config globally
    function setConfig(options) {
        for (var attrname in options) {
            defaultOptions[attrname] = options[attrname];
        }
    }

    return {
        moneyToWords: moneyToWords,
        numberToWords: numberToWords,
        setConfig: setConfig
    };
})();


// Version.
Eleven.VERSION = '0.1.0';


// some AMD build optimizers like r.js check for condition patterns like the following:
if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define(function() {
        return Eleven;
    });
} else if (typeof freeExports !== 'undefined' && typeof freeModule !== 'undefined') {
    // check for `exports` after `define` in case a build optimizer adds an `exports` object
    // in Node.js or RingoJS
    if (moduleExports) {
      (freeModule.exports = Eleven).Eleven = Eleven;
    }
    // in Narwhal or Rhino -require
    else {
      freeExports.Eleven = Eleven;
    }
} else {
    // in a browser or Rhino
    root.Eleven = Eleven;
}
