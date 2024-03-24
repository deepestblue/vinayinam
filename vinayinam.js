import { pulli, I_letter_i_I_markers, u_marker, ya_ra_zha, kutTil, consonants, } from "./ezuttu.js";
import { anyOfArray, } from "./utils.js";

class Vinayinam {
    constructor(இனத்துப்பெயர்) {
        this.இனத்துப்பெயர் = இனத்துப்பெயர்;
    }
}

const vinayinamPrototype = {
    வினய்(vinay) {
        return vinay;
    },
    valid(_unused) {
        return true;
    },
    அல்வினய்முற்று(vinay) {
        return monosyllabicShortTerminalDoubler(vinay) + "ஆர்";
    },
    இறந்தகாலத்துவினயெச்சம்(_unused) {
        throw new Error("Abstract method!");
    },
    இறந்தகாலத்துப்பெயரெச்சம்(vinay) {
        return this.இறந்தகாலத்துவினயெச்சம்(vinay) + "அ";
    },
    இறந்தகாலத்துவினய்முற்று(vinay) {
        return this.இறந்தகாலத்துப்பெயரெச்சம்(vinay) + "ார்";
    },
    நிகழ்காலத்துப்பெயரெச்சம்(vinay) {
        return vinay + "கின்ற";
    },
    நிகழ்காலத்துவினய்முற்று(vinay) {
        return this.நிகழ்காலத்துப்பெயரெச்சம்(vinay) + "ார்";
    },
    எதிர்காலத்துவினயெச்சம்(vinay) {
        return monosyllabicShortTerminalDoubler(vinay) + "அ";
    },
    எதிர்காலத்துப்பெயரெச்சம்(vinay) {
        return this.எதிர்காலத்துவினயெச்சம்(vinay) + "ும்";
    },
    எதிர்காலத்துவினய்முற்று(vinay) {
        return vinay + "வார்";
    },
    தொழிற்பெயர்(vinay) {
        return vinay + "தல்";
    },
};

Object.assign(Vinayinam.prototype, vinayinamPrototype);

const வாங்கு = new Vinayinam("வாங்கு");
வாங்கு.valid = (vinay) => vinay.endsWith(u_marker);
வாங்கு.இறந்தகாலத்துவினயெச்சம் = (vinay) => monosyllabicShortTerminalDoubler(vinay) + "இ";
வாங்கு.இறந்தகாலத்துவினய்முற்று = (vinay) => vinay + "இனார்";

const பார் = new Vinayinam("பார்");
பார்.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay + "த்து";
பார்.நிகழ்காலத்துப்பெயரெச்சம் = (vinay) => vinay + "க்கின்ற";
பார்.எதிர்காலத்துவினயெச்சம் = (vinay) => vinay + "க்க";
பார்.எதிர்காலத்துவினய்முற்று = (vinay) => vinay + "ப்பார்";
பார்.தொழிற்பெயர் = (vinay) => vinay + "த்தல்";

const உயர் = new Vinayinam("உயர்");
உயர்.valid = function(vinay) {
    const lastCharacter = vinay[vinay.length - 1];
    if (I_letter_i_I_markers.includes(lastCharacter)) {
        return true;
    }
    if (u_marker === lastCharacter) {
        return true;
    }
    if (pulli !== lastCharacter) {
        return false;
    }
    if (! ya_ra_zha.includes(vinay[vinay.length - 2])) {
        return false;
    }
    return true;
};
உயர்.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay + "ந்து";

const இயல் = {
    __proto__: உயர்,
    இனத்துப்பெயர்: "இயல்",
};
இயல்.valid = function(vinay) {
    const match = vinay.match(/..$/);
    if (! match) {
        return false;
    }
    return ['ள்','ல்',].includes(match[0]);
};
இயல்.தொழிற்பெயர் = (vinay) => monosyllabicShortTerminalDoubler(vinay) + "உதல்";

const இரு = {
    __proto__: பார்,
    இனத்துப்பெயர்: "இரு",
};
இரு.இறந்தகாலத்துவினயெச்சம் = உயர்.இறந்தகாலத்துவினயெச்சம்;

const இடு = new Vinayinam("இடு");
இடு.valid = function(vinay) {
    const match = vinay.match(/..$/);
    if (! match) {
        return false;
    }
    return ['டு','று',].includes(match[0]);
};
இடு.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay.replace(
    RegExp(`(.)${u_marker}$`, "v",),
    `$1${pulli}$1${u_marker}`,
);

const செய் = new Vinayinam("செய்");
செய்.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay + "து";

const தின் =  {
    __proto__: செய்,
    இனத்துப்பெயர்: "தின்",
};
தின்.valid = function(vinay) {
    const match = vinay.match(/..$/);
    if (! match) {
        return false;
    }
    return ['ண்','ன்',].includes(match[0]);
};
தின்.தொழிற்பெயர் = இயல்.தொழிற்பெயர்;

const சொல் = { __proto__: இயல், இனத்துப்பெயர்: "சொல்", };
சொல்.இறந்தகாலத்துவினயெச்சம் = வாங்கு.இறந்தகாலத்துவினயெச்சம்;
சொல்.சிறப்பிறந்தகாலத்துப்பெயரெச்சம் = (vinay) => monosyllabicShortTerminalDoubler(vinay) + "ந";
சொல்.இறந்தகாலத்துப்பெயரெச்சம் = (vinay) => [சொல்.இறந்தகாலத்துவினயெச்சம்(vinay) + "அ", சொல்.சிறப்பிறந்தகாலத்துப்பெயரெச்சம்(vinay),];
சொல்.இறந்தகாலத்துவினய்முற்று = (vinay) => சொல்.சிறப்பிறந்தகாலத்துப்பெயரெச்சம்(vinay) + "ார்";

const TBD = new Proxy(new Vinayinam("TBD"), {
    get(_unused, prop) {
        if (prop === "இனத்துப்பெயர்") {
            return "TBD";
        }
        return () => "TBD";
    },
});

const monosyllabicShortTerminalDoubler = (vinay) => vinay.replace(
    RegExp(`^(${anyOfArray(consonants)}?${anyOfArray(kutTil)}?)(.)${pulli}$`, "v",),
    `$1$2${pulli}$2${pulli}`,
);

export {வாங்கு, பார், உயர், இயல், இரு, இடு, செய், தின், சொல், TBD, };