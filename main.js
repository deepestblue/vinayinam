import { புணர்ச்சி, } from "./punarcci.js";
import { வினய், } from "./vinay.js";

const schema = new Map([
    ["ஏவல்வினய்முற்று", "ஏவல் வினய்முற்று (ஒருமய்)",],
    ["அல்வினய்முற்று", "அல் வினய்முற்று (பலர்பாலில்)",],
    ["இறந்தகாலத்துவினய்முற்று", "இறந்தகாலத்து வினய்முற்று (பலர்பாலில்)",],
    ["நிகழ்காலத்துவினய்முற்று", "நிகழ்காலத்து வினய்முற்று (பலர்பாலில்)",],
    ["எதிர்காலத்துவினய்முற்று", "எதிர்காலத்து வினய்முற்று (பலர்பாலில்)",],
    ["எதிர்காலத்துவினயெச்சம்", "எதிர்காலத்து வினயெச்சம்",],
    ["இறந்தகாலத்துவினயெச்சம்", "இறந்தகாலத்து வினயெச்சம்",],
    ["இறந்தகாலத்துப்பெயரெச்சம்", "இறந்தகாலத்துப் பெயரெச்சம்",],
    ["நிகழ்காலத்துப்பெயரெச்சம்", "நிகழ்காலத்துப் பெயரெச்சம்",],
    ["எதிர்காலத்துப்பெயரெச்சம்", "எதிர்காலத்துப் பெயரெச்சம்",],
    ["தொழிற்பெயர்", "தொழிற்பெயர்",],
],);

function getForms(வினய்ப்பெயர், இனத்துப்பெயர்,) {
    if (! வினய்ப்பெயர்) {
        return new Map();
    }

    return (function(வினய்) {
        return Array.from(schema.keys(),).reduce(
            (forms, item,) => forms.set(
                item,
                புணர்ச்சி.reduce(
                    function(acc, val,) {
                        if (! Array.isArray(acc,)) {
                            return val(acc,);
                        }
                        return acc.map(val,);
                    },
                    வினய்[item](),
                ),
            ),
            new Map([["இனம்", வினய்.வினயினம்.இனத்துப்பெயர்,],]),
        );
    })(new வினய்(வினய்ப்பெயர், இனத்துப்பெயர்,),);
}

export { schema, getForms, };
