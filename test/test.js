/* global QUnit */

QUnit.config.maxDepth = -1;
QUnit.config.noglobals = true;
QUnit.config.seed = true;

import { schema, } from "../lib/main.js";

QUnit.module("schema", () => {
    QUnit.test("schema is a map of strings", t => {
        t.true(schema instanceof Map);
        schema.forEach((k, v) => {
            t.equal(typeof k, "string");
            t.equal(typeof v, "string");
        },);
    },);
},);

import { வினயினத்துப்பெயர்கள், validவினயினத்துப்பெயர்கள், } from "../lib/vinayinam.js";

QUnit.module("வினயினத்துப்பெயர்கள்", () => {
    QUnit.test("வினயினத்துப்பெயர்கள் is an Array of strings", t => {
        t.true(Array.isArray(வினயினத்துப்பெயர்கள்));
        வினயினத்துப்பெயர்கள்.forEach(வினயினத்துப்பெயர் => {
            t.equal(typeof வினயினத்துப்பெயர், "string");
        },);
    },);
    QUnit.module("validவினயினத்துப்பெயர்கள்", () => {
        const assertValid = (t, வினயினம்,) => (வினய்,) => {
            t.true(validவினயினத்துப்பெயர்கள்(வினய்,).includes(வினயினம்,));
        };
        const assertInvalid = (t, வினயினம்,) => (வினய்,) => {
            t.false(validவினயினத்துப்பெயர்கள்(வினய்,).includes(வினயினம்,));
        };
        QUnit.test("வாங்கு", t => {
            ["ஊது",].forEach(assertValid(t, "வாங்கு",),);
            ["கல்", "கல", "தெரி", "போ",].forEach(assertInvalid(t, "வாங்கு",),);
        },);
        QUnit.test("பார்", t => { t.expect(0); },); // பார் is always a valid இனம்
        QUnit.test("உயர்", t => {
            ["ஈ", "அணி", "மிகு", "உயர்", "வீழ்", "குலய்",].forEach(assertValid(t, "உயர்",),);
            ["கல்", "கல",].forEach(assertInvalid(t, "உயர்",),);
        },);
        QUnit.test("இயல்", t => {
            ["உருள்", "மெல்", "இயல்", "கொள்",].forEach(assertValid(t, "இயல்",),);
            ["ஆ", "வாங்கு", "போ", "அணி",].forEach(assertInvalid(t, "இயல்",),);
        });
        QUnit.test("இரு", t => { t.expect(0); },); // இரு is always a valid இனம்
        QUnit.test("இடு", t => {
            ["போடு", "பெறு",].forEach(assertValid(t, "இடு",),);
            ["ஆ", "வாங்கு", "உயர்", "விழு", "கடி", "தின்", "உண்",].forEach(assertInvalid(t, "இடு",),);
        });
        QUnit.test("செய்", t => { t.expect(0); }); // செய் is always a valid இனம்
        QUnit.test("தின்", t => {
            ["உண்", "என்",].forEach(assertValid(t, "தின்",),);
            ["ஆ", "வாங்கு", "உயர்", "விழு", "கடி", "பெறு", "தொடு", "கல்", "கல",].forEach(assertInvalid(t, "தின்",),);
        },);
        QUnit.test("வா", t => {
            ["தா",].forEach(assertValid(t, "வா",),);
            ["கல்", "கல", "தெரி", "போ", "வாங்கு", "உயர்",].forEach(assertInvalid(t, "வா",),);
        },);
        QUnit.test("சொல்", t => {
            ["சொல்",].forEach(assertValid(t, "சொல்",),);
            ["ஆ", "வாங்கு", "போ", "அணி",].forEach(assertInvalid(t, "சொல்",),);
        },);
        QUnit.test("காண்", t => {
            ["காண்",].forEach(assertValid(t, "காண்",),);
            ["ஆ", "வாங்கு", "உயர்", "விழு", "கடி", "பெறு", "தொடு", "உண்", "கல்", "கல",].forEach(assertInvalid(t, "காண்",),);
        },);
        QUnit.test("போ", t => {
            ["போ", "ஆ", "சா",].forEach(assertValid(t, "போ",),);
            ["வாங்கு", "உயர்", "விழு", "கடி", "பெறு", "தொடு", "உண்", "கல்", "கல",].forEach(assertInvalid(t, "போ",),);
        },);
        QUnit.test("ஆ", t => {
            ["போ", "ஆ", "சா",].forEach(assertValid(t, "ஆ",),);
            ["வாங்கு", "உயர்", "விழு", "கடி", "பெறு", "தொடு", "உண்", "கல்", "கல",].forEach(assertInvalid(t, "ஆ",),);
        },);
        QUnit.test("நோ", t => {
            ["நோ",].forEach(assertValid(t, "நோ",),);
            ["வாங்கு", "உயர்", "விழு", "கடி", "பெறு", "தொடு", "உண்", "கல்", "கல", "சா",].forEach(assertInvalid(t, "நோ",),);
        },);
        QUnit.test("சா", t => {
            ["சா",].forEach(assertValid(t, "சா",),);
            ["வாங்கு", "உயர்", "விழு", "கடி", "பெறு", "தொடு", "உண்", "கல்", "கல", "நோ",].forEach(assertInvalid(t, "சா",),);
        },);
        QUnit.test("அல்", t => {
            ["அல்",].forEach(assertValid(t, "அல்",),);
            ["கல்", "கல", "தெரி", "போ",].forEach(assertInvalid(t, "அல்",),);
        },);
        QUnit.test("உள்", t => {
            ["உள்",].forEach(assertValid(t, "உள்",),);
            ["வாங்கு", "உயர்", "விழு", "கடி", "பெறு", "தொடு", "உண்", "கல்", "கல", "சா", "போ",].forEach(assertInvalid(t, "உள்",),);
        },);
        QUnit.test("இல்", t => {
            ["இல்",].forEach(assertValid(t, "இல்",),);
            ["வாங்கு", "உயர்", "விழு", "கடி", "பெறு", "தொடு", "உண்", "கல்", "கல", "சா", "போ",].forEach(assertInvalid(t, "இல்",),);
        },);
    },);
},);

import { getForms, } from "../lib/main.js";

QUnit.module("getForms", () => {
    QUnit.module("Normal", () => {
        QUnit.module("வாங்கு", () => {
            QUnit.test("நம்பு", (t) => {
                const expected = new Map([
                    ["இனம்", "வாங்கு",],
                    ["ஏவல்வினய்முற்று", "நம்பு",],
                    ["அல்வினய்முற்று", "நம்பார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "நம்பினார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "நம்புகின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "நம்புவார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "நம்ப",],
                    ["இறந்தகாலத்துவினயெச்சம்", "நம்பி",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "நம்பிய",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "நம்புகின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "நம்பும்",],
                    ["தொழிற்பெயர்", "நம்புதல்",],
                ],);
                t.deepEqual(getForms("நம்பு"), expected,);
            },);
        },);
        QUnit.module("பார்", () => {
            QUnit.test("எடு", (t) => {
                const expected = new Map([
                    ["இனம்", "பார்",],
                    ["ஏவல்வினய்முற்று", "எடு",],
                    ["அல்வினய்முற்று", "எடார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "எடுத்தார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "எடுக்கின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "எடுப்பார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "எடுக்க",],
                    ["இறந்தகாலத்துவினயெச்சம்", "எடுத்து",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "எடுத்த",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "எடுக்கின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "எடுக்கும்",],
                    ["தொழிற்பெயர்", "எடுத்தல்",],
                ],);
                t.deepEqual(getForms("எடு"), expected,);
            },);
            QUnit.test("கேள்", (t) => {
                const expected = new Map([
                    ["இனம்", "பார்",],
                    ["ஏவல்வினய்முற்று", "கேள்",],
                    ["அல்வினய்முற்று", "கேளார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "கேட்டார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "கேட்கின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "கேட்பார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "கேட்க",],
                    ["இறந்தகாலத்துவினயெச்சம்", "கேட்டு",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "கேட்ட",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "கேட்கின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "கேட்கும்",],
                    ["தொழிற்பெயர்", "கேட்டல்",],
                ],);
                t.deepEqual(getForms("கேள்"), expected,);
            },);
            QUnit.test("வில்", (t) => {
                const expected = new Map([
                    ["இனம்", "பார்",],
                    ["ஏவல்வினய்முற்று", "வில்",],
                    ["அல்வினய்முற்று", "வில்லார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "விற்றார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "விற்கின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "விற்பார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "விற்க",],
                    ["இறந்தகாலத்துவினயெச்சம்", "விற்று",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "விற்ற",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "விற்கின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "விற்கும்",],
                    ["தொழிற்பெயர்", "விற்றல்",],
                ],);
                t.deepEqual(getForms("வில்"), expected,);
            },);
        },);
        QUnit.module("உயர்", () => {
            QUnit.test("வாழ்", (t) => {
                const expected = new Map([
                    ["இனம்", "உயர்",],
                    ["ஏவல்வினய்முற்று", "வாழ்",],
                    ["அல்வினய்முற்று", "வாழார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "வாழ்ந்தார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "வாழ்கின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "வாழ்வார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "வாழ",],
                    ["இறந்தகாலத்துவினயெச்சம்", "வாழ்ந்து",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "வாழ்ந்த",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "வாழ்கின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "வாழும்",],
                    ["தொழிற்பெயர்", "வாழ்தல்",],
                ],);
                t.deepEqual(getForms("வாழ்"), expected,);
            },);
        },);
        QUnit.module("இயல்", () => {
            QUnit.test("பயில்", (t) => {
                const expected = new Map([
                    ["இனம்", "இயல்",],
                    ["ஏவல்வினய்முற்று", "பயில்",],
                    ["அல்வினய்முற்று", "பயிலார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "பயின்றார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "பயில்கின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "பயில்வார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "பயில",],
                    ["இறந்தகாலத்துவினயெச்சம்", "பயின்று",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "பயின்ற",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "பயில்கின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "பயிலும்",],
                    ["தொழிற்பெயர்", "பயிலுதல்",],
                ],);
                t.deepEqual(getForms("பயில்"), expected,);
            },);
            QUnit.test("ஆள்", (t) => {
                const expected = new Map([
                    ["இனம்", "இயல்",],
                    ["ஏவல்வினய்முற்று", "ஆள்",],
                    ["அல்வினய்முற்று", "ஆளார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "ஆண்டார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "ஆள்கின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "ஆள்வார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "ஆள",],
                    ["இறந்தகாலத்துவினயெச்சம்", "ஆண்டு",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "ஆண்ட",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "ஆள்கின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "ஆளும்",],
                    ["தொழிற்பெயர்", "ஆளுதல்",],
                ],);
                t.deepEqual(getForms("ஆள்"), expected,);
            },);
            QUnit.test("செல்", (t) => {
                const expected = new Map([
                    ["இனம்", "இயல்",],
                    ["ஏவல்வினய்முற்று", "செல்",],
                    ["அல்வினய்முற்று", "செல்லார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "சென்றார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "செல்கின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "செல்வார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "செல்ல",],
                    ["இறந்தகாலத்துவினயெச்சம்", "சென்று",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "சென்ற",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "செல்கின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "செல்லும்",],
                    ["தொழிற்பெயர்", "செல்லுதல்",],
                ],);
                t.deepEqual(getForms("செல்"), expected,);
            },);
            QUnit.test("கொள்", (t) => {
                const expected = new Map([
                    ["இனம்", "இயல்",],
                    ["ஏவல்வினய்முற்று", "கொள்",],
                    ["அல்வினய்முற்று", "கொள்ளார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "கொண்டார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "கொள்கின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "கொள்வார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "கொள்ள",],
                    ["இறந்தகாலத்துவினயெச்சம்", "கொண்டு",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "கொண்ட",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "கொள்கின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "கொள்ளும்",],
                    ["தொழிற்பெயர்", "கொள்ளுதல்",],
                ],);
                t.deepEqual(getForms("கொள்"), expected,);
            },);
        },);
        QUnit.module("சொல்", () => {
            QUnit.test("சொல்", (t) => {
                const expected = new Map([
                    ["இனம்", "சொல்",],
                    ["ஏவல்வினய்முற்று", "சொல்",],
                    ["அல்வினய்முற்று", "சொல்லார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "சொன்னார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "சொல்கின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "சொல்வார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "சொல்ல",],
                    ["இறந்தகாலத்துவினயெச்சம்", "சொல்லி",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", new Set(["சொன்ன", "சொல்லிய",],),],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "சொல்கின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "சொல்லும்",],
                    ["தொழிற்பெயர்", "சொல்லுதல்",],
                ],);
                t.deepEqual(getForms("சொல்"), expected,);
            },);
        },);
        QUnit.module("இரு", () => {
            QUnit.test("அள", (t) => {
                const expected = new Map([
                    ["இனம்", "இரு",],
                    ["ஏவல்வினய்முற்று", "அள",],
                    ["அல்வினய்முற்று", "அளவார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "அளந்தார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "அளக்கின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "அளப்பார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "அளக்க",],
                    ["இறந்தகாலத்துவினயெச்சம்", "அளந்து",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "அளந்த",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "அளக்கின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "அளக்கும்",],
                    ["தொழிற்பெயர்", "அளத்தல்",],
                ],);
                t.deepEqual(getForms("அள"), expected,);
            },);
            QUnit.test("நில்", (t) => {
                const expected = new Map([
                    ["இனம்", "இரு",],
                    ["ஏவல்வினய்முற்று", "நில்",],
                    ["அல்வினய்முற்று", "நில்லார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "நின்றார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "நிற்கின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "நிற்பார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "நிற்க",],
                    ["இறந்தகாலத்துவினயெச்சம்", "நின்று",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "நின்ற",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "நிற்கின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "நிற்கும்",],
                    ["தொழிற்பெயர்", "நிற்றல்",],
                ],);
                t.deepEqual(getForms("நில்"), expected,);
            },);
        },);
        QUnit.module("இடு", () => {
            QUnit.test("சுடு", (t) => {
                const expected = new Map([
                    ["இனம்", "இடு",],
                    ["ஏவல்வினய்முற்று", "சுடு",],
                    ["அல்வினய்முற்று", "சுடார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "சுட்டார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "சுடுகின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "சுடுவார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "சுட",],
                    ["இறந்தகாலத்துவினயெச்சம்", "சுட்டு",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "சுட்ட",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "சுடுகின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "சுடும்",],
                    ["தொழிற்பெயர்", "சுடுதல்",],
                ],);
                t.deepEqual(getForms("சுடு"), expected,);
            },);
            QUnit.test("பெறு", (t) => {
                const expected = new Map([
                    ["இனம்", "இடு",],
                    ["ஏவல்வினய்முற்று", "பெறு",],
                    ["அல்வினய்முற்று", "பெறார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "பெற்றார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "பெறுகின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "பெறுவார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "பெற",],
                    ["இறந்தகாலத்துவினயெச்சம்", "பெற்று",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "பெற்ற",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "பெறுகின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "பெறும்",],
                    ["தொழிற்பெயர்", "பெறுதல்",],
                ],);
                t.deepEqual(getForms("பெறு"), expected,);
            },);
        },);
        QUnit.module("செய்", () => {
            QUnit.test("அழு", (t) => {
                const expected = new Map([
                    ["இனம்", "செய்",],
                    ["ஏவல்வினய்முற்று", "அழு",],
                    ["அல்வினய்முற்று", "அழார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "அழுதார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "அழுகின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "அழுவார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "அழ",],
                    ["இறந்தகாலத்துவினயெச்சம்", "அழுது",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "அழுத",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "அழுகின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "அழும்",],
                    ["தொழிற்பெயர்", "அழுதல்",],
                ],);
                t.deepEqual(getForms("அழு"), expected,);
            },);
        },);
        QUnit.module("தின்", () => {
            QUnit.test("என்", (t) => {
                const expected = new Map([
                    ["இனம்", "தின்",],
                    ["ஏவல்வினய்முற்று", "என்",],
                    ["அல்வினய்முற்று", "என்னார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "என்றார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "என்கின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "என்பார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "என்ன",],
                    ["இறந்தகாலத்துவினயெச்சம்", "என்று",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "என்ற",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "என்கின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "என்னும்",],
                    ["தொழிற்பெயர்", "என்னுதல்",],
                ],);
                t.deepEqual(getForms("என்"), expected,);
            },);
            QUnit.test("உண்", (t) => {
                const expected = new Map([
                    ["இனம்", "தின்",],
                    ["ஏவல்வினய்முற்று", "உண்",],
                    ["அல்வினய்முற்று", "உண்ணார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "உண்டார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "உண்கின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "உண்பார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "உண்ண",],
                    ["இறந்தகாலத்துவினயெச்சம்", "உண்டு",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "உண்ட",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "உண்கின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "உண்ணும்",],
                    ["தொழிற்பெயர்", "உண்ணுதல்",],
                ],);
                t.deepEqual(getForms("உண்"), expected,);
            },);
        },);
        QUnit.module("காண்", () => {
            QUnit.test("காண்", (t) => {
                const expected = new Map([
                    ["இனம்", "காண்",],
                    ["ஏவல்வினய்முற்று", "காண்",],
                    ["அல்வினய்முற்று", "காணார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "கண்டார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "காண்கின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "காண்பார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "காண",],
                    ["இறந்தகாலத்துவினயெச்சம்", "கண்டு",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "கண்ட",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "காண்கின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "காணும்",],
                    ["தொழிற்பெயர்", "காணுதல்",],
                ],);
                t.deepEqual(getForms("காண்"), expected,);
            },);
        },);
        QUnit.module("வா", () => {
            QUnit.test("தா", (t) => {
                const expected = new Map([
                    ["இனம்", "வா",],
                    ["ஏவல்வினய்முற்று", "தா",],
                    ["அல்வினய்முற்று", "தரார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "தந்தார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "தருகின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "தருவார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "தர",],
                    ["இறந்தகாலத்துவினயெச்சம்", "தந்து",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "தந்த",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "தருகின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "தரும்",],
                    ["தொழிற்பெயர்", "தருதல்",],
                ],);
                t.deepEqual(getForms("தா"), expected,);
            },);
        },);
        QUnit.module("போ", () => {
            QUnit.test("போ", (t) => {
                const expected = new Map([
                    ["இனம்", "போ",],
                    ["ஏவல்வினய்முற்று", "போ",],
                    ["அல்வினய்முற்று", "போகார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "போனார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "போகின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "போவார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "போக",],
                    ["இறந்தகாலத்துவினயெச்சம்", "போய்",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "போன",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "போகின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "போகும்",],
                    ["தொழிற்பெயர்", "போதல்",],
                ],);
                t.deepEqual(getForms("போ"), expected,);
            },);
        },);
        QUnit.module("ஆ", () => {
            QUnit.test("ஆ", (t) => {
                const expected = new Map([
                    ["இனம்", "ஆ",],
                    ["ஏவல்வினய்முற்று", "ஆ",],
                    ["அல்வினய்முற்று", "ஆகார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "ஆனார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "ஆகின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "ஆவார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "ஆக",],
                    ["இறந்தகாலத்துவினயெச்சம்", new Set(["ஆய்", "ஆகி",],),],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", new Set(["ஆன","ஆகிய",]),],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "ஆகின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "ஆகும்",],
                    ["தொழிற்பெயர்", "ஆதல்",],
                ],);
                t.deepEqual(getForms("ஆ"), expected,);
            },);
        },);
        QUnit.module("நோ", () => {
            QUnit.test("நோ", (t) => {
                const expected = new Map([
                    ["இனம்", "நோ",],
                    ["ஏவல்வினய்முற்று", "நோ",],
                    ["அல்வினய்முற்று", "நோகார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "நொந்தார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "நோகின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "நோவார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "நோக",],
                    ["இறந்தகாலத்துவினயெச்சம்", "நொந்து",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "நொந்த",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "நோகின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "நோகும்",],
                    ["தொழிற்பெயர்", "நோதல்",],
                ],);
                t.deepEqual(getForms("நோ"), expected,);
            },);
        },);
        QUnit.module("சா", () => {
            QUnit.test("சா", (t) => {
                const expected = new Map([
                    ["இனம்", "சா",],
                    ["ஏவல்வினய்முற்று", "சா",],
                    ["அல்வினய்முற்று", "சாகார்",],
                    ["இறந்தகாலத்துவினய்முற்று", "செத்தார்",],
                    ["நிகழ்காலத்துவினய்முற்று", "சாகின்றார்",],
                    ["எதிர்காலத்துவினய்முற்று", "சாவார்",],
                    ["எதிர்காலத்துவினயெச்சம்", "சாக",],
                    ["இறந்தகாலத்துவினயெச்சம்", "செத்து",],
                    ["இறந்தகாலத்துப்பெயரெச்சம்", "செத்த",],
                    ["நிகழ்காலத்துப்பெயரெச்சம்", "சாகின்ற",],
                    ["எதிர்காலத்துப்பெயரெச்சம்", "சாகும்",],
                    ["தொழிற்பெயர்", "சாதல்",],
                ],);
                t.deepEqual(getForms("சா"), expected,);
            },);
        },);
    },);
},);
