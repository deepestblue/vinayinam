import { punarcci, } from "./punarcci.js";
import { vinayData, } from "./vinayData.js";
import { Vinay, } from "./vinay.js";

const schema = new Map([
    ["ஏவல்வினய்வினய்முற்று", "ஏவல் வினய்வினய்முற்று (ஒருமய்)",],
    ["அல்வினய்முற்று", "அல் வினய்முற்று (பலர்பாலில்)",],
    ["இறந்தகாலத்துவினய்முற்று", "இறந்தகாலத்து வினய்முற்று (பலர்பாலில்)",],
    ["நிகழ்காலத்துவினய்முற்று", "நிகழ்காலத்து வினய்முற்று (பலர்பாலில்)",],
    ["எதிர்காலத்துவினய்முற்று", "எதிர்காலத்து வினய்முற்று (பலர்பாலில்)",],
    ["எதிர்காலத்துவினயெச்சம்", "எதிர்காலத்து வினயெச்சம்",],
    ["இறந்தகாலத்துவினயெச்சம்", "இறந்தகாலத்து வினயெச்சம்",],
    ["இறந்தகாலத்துப்பெயரெச்சம்", "இறந்தகாலத்துப் பெயரெச்சம்",],
    ["நிகழ்காலத்துப்பெயரெச்சம்", "நிகழ்காலத்துப் பெயரெச்சம்",],
    ["எதிர்காலத்துப்பெயரெச்சம்", "எதிர்காலத்துப் பெயரெச்சம்",],
],);

const vinayinangal = new Set(Array.from(vinayData.values(),).flat(),) ;

function getInvalidVinayinattuppeyargal(vinay,) {
    return Array.from(vinayinangal,).filter(function(vinayinam,) {
        return ! vinayinam.valid(vinay,);
    }).map((vinayinam) => vinayinam.இனத்துப்பெயர்,);
}

function getForms(வினய்ப்பெயர், இனத்துப்பெயர்,) {
    if (! வினய்ப்பெயர்) {
        return new Map();
    }

    const vinay = new Vinay(வினய்ப்பெயர், இனத்துப்பெயர்,);

    return Array.from(schema.keys(),).reduce(
        (forms, item,) => forms.set(
            item,
            punarcci.reduce(
                function(acc, val,) {
                    if (! Array.isArray(acc,)) {
                        return val(acc,);
                    }
                    return acc.map(val,);
                },
                vinay[item](),
            ),
        ),
        new Map([["இனம்", vinay.வினயினம்.இனத்துப்பெயர்,],]),
    );
}

export { schema, getForms, vinayinangal, getInvalidVinayinattuppeyargal, };
