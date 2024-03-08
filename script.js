function refreshContent() {
    const verbElement = document.getElementById('verb',);
    if (! verbElement.checkValidity()) {
        return false;
    }

    const verb = verbElement.value;

    var formsTable = document.getElementById("forms",);

    const formsCount = formsTable.rows[0].cells.length;
    if (formsTable.rows.length > 2) {
        throw new Error(`Unexpected state with more than one data row in the table.`,);
    }

    if (formsTable.rows.length === 2) {
        formsTable.deleteRow(1,);
    }

    let newRow = formsTable.insertRow();

    const newForms = getForms(verb,);

    if (newForms.length !== formsCount) {
        throw new Error(`Algorithm generated an unexpected number of forms for verb: ${verb}.`,);
    }

    newForms.forEach(form => {
        let newCell = newRow.insertCell();
        newCell.appendChild(document.createTextNode(form,),);
    });
}

const schema = [
    "அல் வினய்முற்று",
    "இறந்தகாலத்து வினய்முற்று",
    "நிகழ்காலத்து வினய்முற்று",
    "எதிர்காலத்து வினய்முற்று",
    "எதிர்காலத்து வினயெச்சம்",
    "இறந்தகாலத்து வினயெச்சம்",
    "இறந்தகாலத்துப் பெயரெச்சம்",
    "நிகழ்காலத்துப் பெயரெச்சம்",
    "எதிர்காலத்துப் பெயரெச்சம்",
    "தொழிற்பெயர்",
];

function getForms(verb,) {
    const formsCount = document.getElementById("forms",).rows[0].cells.length;

    let ret = new Array();
    const verbClass = verbsToClasses.get(verb,);
    if (verbClass === undefined) {
        return new Array(formsCount,);
    }

    ret.push(verbClass,);

    const rules = verbClassesToRules[verbClass];

    if (rules === undefined) {
        return new Array(formsCount,).fill("TBD",);
    }

    // TODO: use reduce
    Array.from(rules.values(),).forEach(rule => {
        ret.push(sandhis.reduce((acc, val) => val(acc), rule(verb,),),)
    },);

    return ret;
}

const verbsToClasses = new Map([
    ["அகல்", "முயல்",],
    ["அசய்", "உயர்",],
    ["அஞ்சு", "வாங்கு",],
    ["அடங்கு", "வாங்கு",],
    ["அடய்", "உயர்",],
    ["அடி", "பார்",],
    ["அடு", "பார்",],
    ["அணய்", "பார்",],
    ["அணி", "உயர்",],
    ["அணுகு", "வாங்கு",],
    ["அமய்", "உயர்",],
    ["அமர்", "உயர்",],
    ["அமிழ்", "உயர்",],
    ["அமுங்கு", "வாங்கு",],
    ["அரய்", "உயர்",],
    ["அருகு", "வாங்கு",],
    ["அலய்", "உயர்",],
    ["அவி", "உயர்",],
    ["அவிழ்", "உயர்",],
    ["அழய்", "பார்",],
    ["அழி", "உயர்",],
    ["அழு", "வா",],
    ["அள்ளு", "வாங்கு",],
    ["அறி", "உயர்",],
    ["அனுப்பு", "வாங்கு",],
    ["ஆ", "வா",],
    ["ஆகு", "வாங்கு",],
    ["ஆடு", "வாங்கு",],
    ["ஆய்", "உயர்",],
    ["ஆழ்", "உயர்",],
    ["ஆள்", "ஆள்",],
    ["இசய்", "உயர்",],
    ["இடு", "இடு",],
    ["இயல்", "முயல்",],
    ["இரு", "இரு",],
    ["இழ", "இரு",],
    ["இழய்", "பார்",],
    ["இழு", "பார்",],
    ["இளகு", "வாங்கு",],
    ["இறங்கு", "வாங்கு",],
    ["இறு", "பெறு",],
    ["ஈ", "உயர்",],
    ["ஈர்", "பார்",],
    ["உடய்", "உயர்",],
    ["உடு", "பார்",],
    ["உணர்", "உயர்",],
    ["உண்", "உண்",],
    ["உதய்", "பார்",],
    ["உயர்", "உயர்",],
    ["உரய்", "பார்",],
    ["உருகு", "வாங்கு",],
    ["உள்", "வா",],
    ["உறங்கு", "வாங்கு",],
    ["உறய்", "உயர்",],
    ["உறி", "உயர்",],
    ["உறு", "பெறு",],
    ["ஊடு", "வாங்கு",],
    ["எஞ்சு", "வாங்கு",],
    ["எடு", "பார்",],
    ["எண்ணு", "வாங்கு",],
    ["எழு", "உயர்",],
    ["எழுது", "வாங்கு",],
    ["எழும்பு", "வாங்கு",],
    ["என்", "தின்",],
    ["ஏந்து", "வாங்கு",],
    ["ஏல்", "கல்",],
    ["ஏறு", "வாங்கு",],
    ["ஒடுங்கு", "வாங்கு",],
    ["ஒதுங்கு", "வாங்கு",],
    ["ஒலி", "பார்",],
    ["ஒழி", "உயர்",],
    ["ஒழுகு", "வாங்கு",],
    ["ஒளி", "உயர்",],
    ["ஒறு", "பார்",],
    ["ஓங்கு", "வாங்கு",],
    ["ஓடு", "வாங்கு",],
    ["ஓது", "வாங்கு",],
    ["ஓய்", "உயர்",],
    ["கட", "இரு",],
    ["கடவு", "வாங்கு",],
    ["கடி", "பார்",],
    ["கடு", "பார்",],
    ["கட்டு", "வாங்கு",],
    ["கத்து", "வாங்கு",],
    ["கருது", "வாங்கு",],
    ["கல", "இரு",],
    ["கல்", "கல்",],
    ["கவிழ்", "உயர்",],
    ["கழுவு", "வாங்கு",],
    ["களய்", "உயர்",],
    ["களி", "பார்",],
    ["கறு", "பார்",],
    ["கா", "பார்",],
    ["காண்", "வா",],
    ["காண்", "வா",],
    ["காய்", "உயர்",],
    ["கிட", "இரு",],
    ["கிளம்பு", "வாங்கு",],
    ["கிள்ளு", "வாங்கு",],
    ["கீறு", "வாங்கு",],
    ["குடி", "பார்",],
    ["குதி", "பார்",],
    ["குத்து", "வாங்கு",],
    ["குந்து", "வாங்கு",],
    ["குலய்", "உயர்",],
    ["குலுங்கு", "வாங்கு",],
    ["குவி", "உயர்",],
    ["குளி", "பார்",],
    ["குளிர்", "உயர்",],
    ["குறய்", "உயர்",],
    ["கூசு", "வாங்கு",],
    ["கூடு", "வாங்கு",],
    ["கூம்பு", "வாங்கு",],
    ["கூறு", "வாங்கு",],
    ["கெஞ்சு", "வாங்கு",],
    ["கெடு", "பார்",],
    ["கேள்", "கேள்",],
    ["கொஞ்சு", "வாங்கு",],
    ["கொடு", "பார்",],
    ["கொட்டு", "வாங்கு",],
    ["கொத்து", "வாங்கு",],
    ["கொல்", "முயல்",],
    ["கொள்", "ஆள்",],
    ["சமய்", "பார்",],
    ["சா", "வா",],
    ["சாத்து", "வாங்கு",],
    ["சாய்", "உயர்",],
    ["சிரி", "பார்",],
    ["சிலிர்", "பார்",],
    ["சிவ", "இரு",],
    ["சீர்", "பார்",],
    ["சுட்டு", "வாங்கு",],
    ["சுண்டு", "வாங்கு",],
    ["சுருங்கு", "வாங்கு",],
    ["சுற்று", "வாங்கு",],
    ["சூட்டு", "வாங்கு",],
    ["செய்", "உயர்",],
    ["செல்", "முயர்",],
    ["சேர்", "உயர்",],
    ["சொல்", "வா",],
    ["சொறி", "உயர்",],
    ["தகு", "உயர்",],
    ["தடு", "பார்",],
    ["தட்டு", "வாங்கு",],
    ["ததும்பு", "வாங்கு",],
    ["தப்பு", "வாங்கு",],
    ["தய்", "பார்",],
    ["தவறு", "வாங்கு",],
    ["தவிர்", "பார்",],
    ["தழுவு", "வாங்கு",],
    ["தளர்", "உயர்",],
    ["தள்ளு", "வாங்கு",],
    ["தா", "வா",],
    ["தாங்கு", "வாங்கு",],
    ["தாண்டு", "வாங்கு",],
    ["தாவு", "வாங்கு",],
    ["திரள்", "ஆள்",],
    ["திரி", "உயர்",],
    ["திருடு", "வாங்கு",],
    ["திரும்பு", "வாங்கு",],
    ["திற", "இரு",],
    ["தின்", "தின்",],
    ["தீண்டு", "வாங்கு",],
    ["தீர்", "உயர்",],
    ["துடய்", "பார்",],
    ["துடி", "பார்",],
    ["துணி", "உயர்",],
    ["துவய்", "உயர்",],
    ["துற", "இரு",],
    ["தூக்கு", "வாங்கு",],
    ["தூங்கு", "வாங்கு",],
    ["தூண்டு", "வாங்கு",],
    ["தெரி", "உயர்",],
    ["தெறி", "பார்",],
    ["தொடங்கு", "வாங்கு",],
    ["தொடர்", "உயர்",],
    ["தொடு", "இடு",],
    ["தொலய்", "உயர்",],
    ["தொழு", "வா",],
    ["தோல்", "கல்",],
    ["தோன்று", "வாங்கு",],
    ["நட", "இரு",],
    ["நடு", "இடு",],
    ["நம்பு", "வாங்கு",],
    ["நனய்", "உயர்",],
    ["நாடு", "வாங்கு",],
    ["நாட்டு", "வாங்கு",],
    ["நாணு", "வாங்கு",],
    ["நிமிர்", "உயர்",],
    ["நிரம்பு", "வாங்கு",],
    ["நிலவு", "வாங்கு",],
    ["நில்", "வா",],
    ["நிறய்", "உயர்",],
    ["நினய்", "பார்",],
    ["நீள்", "ஆள்",],
    ["நுழய்", "உயர்",],
    ["நோக்கு", "வாங்கு",],
    ["பசி", "பார்",],
    ["படய்", "பார்",],
    ["படு", "இடு",],
    ["படு", "பார்",],
    ["பண்ணு", "வாங்கு",],
    ["பதய்", "பார்",],
    ["பயில்", "முயல்",],
    ["பரிமாறு", "வாங்கு",],
    ["பறி", "பார்",],
    ["பற்று", "வாங்கு",],
    ["பாடு", "வாங்கு",],
    ["பார்", "பார்",],
    ["பாழ்", "பார்",],
    ["பிடி", "பார்",],
    ["பிரி", "உயர்",],
    ["பிழய்", "பார்",],
    ["பிழி", "உயர்",],
    ["பிற", "இரு",],
    ["புகழ்", "உயர்",],
    ["புகு", "உயர்",],
    ["புதய்", "உயர்",],
    ["புரி", "உயர்",],
    ["பெய்", "உயர்",],
    ["பெறு", "பெறு",],
    ["பேசு", "வாங்கு",],
    ["பேணு", "வாங்கு",],
    ["பொங்கு", "வாங்கு",],
    ["பொத்து", "வாங்கு",],
    ["பொரி", "உயர்",],
    ["பொருந்து", "வாங்கு",],
    ["பொறு", "பார்",],
    ["போ", "வா",],
    ["போடு", "வா",],
    ["மகிழ்", "உயர்",],
    ["மசி", "உயர்",],
    ["மடங்கு", "வாங்கு",],
    ["மடி", "உயர்",],
    ["மயங்கு", "வாங்கு",],
    ["மலய்", "பார்",],
    ["மற", "இரு",],
    ["மறய்", "உயர்",],
    ["மறு", "பார்",],
    ["மன்னி", "பார்",],
    ["மாறு", "வாங்கு",],
    ["மிகு", "உயர்",],
    ["மிஞ்சு", "வாங்கு",],
    ["மிதி", "பார்",],
    ["மீள்", "கேள்",],
    ["முக", "வா",],
    ["முடி", "உயர்",],
    ["முயங்கு", "வாங்கு",],
    ["முயல்", "முயல்",],
    ["முழங்கு", "வாங்கு",],
    ["முறய்", "பார்",],
    ["மூடு", "வாங்கு",],
    ["மூழ்கு", "வாங்கு",],
    ["மெச்சு", "வாங்கு",],
    ["மெல்", "முயல்",],
    ["யா", "பார்",],
    ["வடி", "உயர்",],
    ["வணங்கு", "வாங்கு",],
    ["வதங்கு", "வாங்கு",],
    ["வய்", "உயர்",],
    ["வய்", "பார்",],
    ["வருந்து", "வாங்கு",],
    ["வலி", "பார்",],
    ["வளர்", "உயர்",],
    ["வறள்", "ஆள்",],
    ["வறு", "உயர்",],
    ["வற்று", "வாங்கு",],
    ["வா", "வா",],
    ["வாங்கு", "வாங்கு",],
    ["வாரு", "வாங்கு",],
    ["வாழ்", "உயர்",],
    ["விடி", "உயர்",],
    ["விடு", "இடு",],
    ["விரள்", "ஆள்",],
    ["விரி", "உயர்",],
    ["விலகு", "வாங்கு",],
    ["வில்", "வா",],
    ["விழி", "பார்",],
    ["விழு", "உயர்",],
    ["விளங்கு", "வாங்கு",],
    ["விளி", "பார்",],
    ["விள்", "ஆள்",],
    ["வீசு", "வாங்கு",],
    ["வீழ்", "உயர்",],
    ["வெடி", "பார்",],
    ["வெட்டு", "வாங்கு",],
    ["வெல்", "முயல்",],
    ["வெளு", "பார்",],
    ["வேண்டு", "வாங்கு",],
]);

const verbClassesToRules = {
    வாங்கு: new Map([
        ["வினய்", (verb) => {
            if (! verb.endsWith(u_marker)) {
                throw new Error(`Verb form ${verb} isn't valid for verb class.`,);
            }
            return verb;
        }],
        ["அல் வினய்முற்று", (verb) => verb + "ஆர்"],
        ["இறந்தகாலத்து வினய்முற்று", (verb) => verb + "இனார்"],
        ["நிகழ்காலத்து வினய்முற்று", (verb) => verb + "கின்றார்"],
        ["எதிர்காலத்து வினய்முற்று", (verb) => verb + "வார்"],
        ["எதிர்காலத்து வினயெச்சம்", (verb) => verb + "அ"],
        ["இறந்தகாலத்து வினயெச்சம்", (verb) => verb + "இ"],
        ["இறந்தகாலத்துப் பெயரெச்சம்", (verb) => verb + "இய"],
        ["நிகழ்காலத்துப் பெயரெச்சம்", (verb) => verb + "கின்ற"],
        ["எதிர்காலத்துப் பெயரெச்சம்", (verb) => verb + "உம்"],
        ["தொழிற்பெயர்", (verb) => verb + "தல்"],
    ]),
    பார்: new Map([
        ["வினய்", (verb) => verb],
        ["அல் வினய்முற்று", (verb) => verb + "ஆர்"],
        ["இறந்தகாலத்து வினய்முற்று", (verb) => verb + "த்தார்"],
        ["நிகழ்காலத்து வினய்முற்று", (verb) => verb + "க்கின்றார்"],
        ["எதிர்காலத்து வினய்முற்று", (verb) => verb + "ப்பார்"],
        ["எதிர்காலத்து வினயெச்சம்", (verb) => verb + "க்க"],
        ["இறந்தகாலத்து வினயெச்சம்", (verb) => verb + "த்து"],
        ["இறந்தகாலத்துப் பெயரெச்சம்", (verb) => verb + "த்த"],
        ["நிகழ்காலத்துப் பெயரெச்சம்", (verb) => verb + "க்கின்ற"],
        ["எதிர்காலத்துப் பெயரெச்சம்", (verb) => verb + "க்கும்"],
        ["தொழிற்பெயர்", (verb) => verb + "த்தல்"],
    ]),
    இரு: new Map([
        ["வினய்", (verb) => {
            if (verb.endsWith(pulli)) {
                throw new Error(`Verb form ${verb} isn't valid for verb class.`,);
            }
            return verb;
        }],
        ["அல் வினய்முற்று", (verb) => verb + "ஆர்"],
        ["இறந்தகாலத்து வினய்முற்று", (verb) => verb + "ந்தார்"],
        ["நிகழ்காலத்து வினய்முற்று", (verb) => verb + "க்கின்றார்"],
        ["எதிர்காலத்து வினய்முற்று", (verb) => verb + "ப்பார்"],
        ["எதிர்காலத்து வினயெச்சம்", (verb) => verb + "க்க"],
        ["இறந்தகாலத்து வினயெச்சம்", (verb) => verb + "ந்து"],
        ["இறந்தகாலத்துப் பெயரெச்சம்", (verb) => verb + "ந்த"],
        ["நிகழ்காலத்துப் பெயரெச்சம்", (verb) => verb + "க்கின்ற"],
        ["எதிர்காலத்துப் பெயரெச்சம்", (verb) => verb + "க்கும்"],
        ["தொழிற்பெயர்", (verb) => verb + "த்தல்"],
    ]),
    உயர்: new Map([
        ["வினய்", (verb) => {
            (function() {
                const lastCharacter = verb[verb.length - 1];
                if (i_ii_markers_ii_letter.includes(lastCharacter)) {
                    return;
                }
                if (u_marker === lastCharacter) {
                    return;
                }
                if (pulli !== lastCharacter) {
                    throw new Error(`Verb form ${verb} isn't valid for verb class.`,);
                }
                if (! ya_ra_zha.includes(verb[verb.length - 2])) {
                    throw new Error(`Verb form ${verb} isn't valid for verb class.`,);
                }
            })();
            return verb;
        }],
        ["அல் வினய்முற்று", (verb) => verb + "ஆர்"],
        ["இறந்தகாலத்து வினய்முற்று", (verb) => verb + "ந்தார்"],
        ["நிகழ்காலத்து வினய்முற்று", (verb) => verb + "கின்றார்"],
        ["எதிர்காலத்து வினய்முற்று", (verb) => verb + "வார்"],
        ["எதிர்காலத்து வினயெச்சம்", (verb) => verb + "அ"],
        ["இறந்தகாலத்து வினயெச்சம்", (verb) => verb + "ந்து"],
        ["இறந்தகாலத்துப் பெயரெச்சம்", (verb) => verb + "ந்த"],
        ["நிகழ்காலத்துப் பெயரெச்சம்", (verb) => verb + "கின்ற"],
        ["எதிர்காலத்துப் பெயரெச்சம்", (verb) => verb + "உம்"],
        ["தொழிற்பெயர்", (verb) => verb + "தல்"],
    ]),
};

const regex = s => new RegExp(s, 'gu',);

// Regex pattern that matches any of the elements of the passed‐in array.
const anyOfArray = arr => `[${arr.join('')}]`;

// Regex pattern that matches any of the elements obtainable from the passed‐in iterable.
const anyOfIterable = it => anyOfArray(Array.from(it));

const sandhis = [
    // க் + இ = கி, etc.
    (s) => s.replace(
        regex(`${pulli}(${anyOfIterable(vowelsToMarks.keys())})`),
        (_unused, p1,) => throwingGet(vowelsToMarks, p1,)
    ),
    // அழிய, அழியும், etc.
    (s) => s.replace(
        regex(`(${anyOfArray(i_ii_markers_ii_letter)})(${anyOfIterable(vowelsToMarks.keys())})`),
        (_unused, p1, p2,) => p1 + ya + throwingGet(vowelsToMarks, p2,)
    ),
    // பாடி, பாட, etc.
    (s) => s.replace(
        regex(`${u_marker}(${anyOfIterable(vowelsToMarks.keys())})`),
        (_unused, p1,) => throwingGet(vowelsToMarks, p1,)
    ),
    // யாவார், கடவார், etc.
    (s) => s.replace(
        regex(`(${anyOfArray(consonants)}|${aa_marker}|${aa_letter})(${anyOfIterable(vowelsToMarks.keys())})`),
        (_unused, p1, p2,) => p1 + va + throwingGet(vowelsToMarks, p2,)
    ),
];

const throwingGet = (map, key,) => {
    const val = map.get(key,);
    if (val === undefined) {
        throw new Error(`No key ${key}`,)
    }
    return val;
};

const pulli = '்';
const aa_letter = 'ஆ';
const aa_marker = 'ா';
const i_ii_markers_ii_letter = ['ி', 'ீ', 'ஈ',];
const u_marker = 'ு';
const ya = 'ய';
const va = 'வ';
const ya_ra_zha = ['ய', 'ர', 'ழ',]

const vowelsToMarks = new Map([
    ['அ', ''],
    ['ஆ', 'ா'],
    ['இ', 'ி'],
    ['ஈ', 'ீ'],
    ['உ', 'ு'],
    ['ஊ', 'ூ'],
    ['எ', 'ெ'],
    ['ஏ', 'ே'],
    ['ஒ', 'ொ'],
    ['ஓ', 'ோ'],
]);

const consonants = [
    'க',
    'ங',
    'ச',
    'ஞ',
    'ட',
    'ண',
    'ற',
    'ன',
    'த',
    'ந',
    'ப',
    'ம',
    'ய',
    'ர',
    'ல',
    'வ',
    'ழ',
    'ள',
];
