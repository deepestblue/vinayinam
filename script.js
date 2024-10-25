import { schema, causativeFormsKey, getForms, } from "./lib/main.js";
import { வினயினத்துப்பெயர்கள், validவினயினத்துப்பெயர்கள், } from "./lib/vinayinam.js";

const serialise = (map, key,) => {
    // TODO: Once https://github.com/tc39/proposal-throw-expressions is in, replace with ?? throw
    const val = map.get(key,);
    if (val === undefined) {
        throw new Error(`No key ${key}`,);
    }
    if (! (val instanceof Set)) {
        return val;
    }

    return [...val,].join(", ");
};

const fillTable = (table, material,) => {
    table.deleteTHead();
    Array.from(table.getElementsByTagName("tbody",),).forEach(tbody => tbody.remove(),);

    const headRow = table.createTHead().insertRow();
    headRow.insertCell().appendChild(document.createTextNode("இனம்",),);
    Array.from(schema.keys(),).forEach(schemaItem => {
        headRow.insertCell().appendChild(document.createTextNode(schema.get(schemaItem,),),);
    });

    const fillRow = material => {
        const bodyRow = table.createTBody().insertRow();
        bodyRow.insertCell().appendChild(document.createTextNode(
            serialise(material, "இனம்",),
        ),);
        Array.from(schema.keys(),).forEach(schemaItem => {
            bodyRow.insertCell().appendChild(document.createTextNode(
                serialise(material, schemaItem,),
            ),);
        },);
    };

    if (! Array.isArray(material,)) {
        fillRow(material,);
        return;
    }

    material.map(e => fillRow(e,),);
};

const refreshContent = () => {
    const verbElement = document.getElementById('verb',);
    if (! verbElement.checkValidity()) {
        return;
    }

    const verb = verbElement.value;

    const formsTable = document.getElementById("forms",);
    formsTable.style.display = "none";

    const causativeFormsTable = document.getElementById("causativeForms",);
    causativeFormsTable.style.display = "none";

    if (! verb.length) {
        // For the initial pageload case, …
        return;
    }

    const verbClass = (document.getElementById("verbClass",).selectedIndex === 0) ? undefined : document.getElementById("verbClass",).value;

    try {
        const forms = getForms(verb, verbClass,);

        fillTable(formsTable, forms,);
        formsTable.style.display = "table";

        const causativeForms = forms.get(causativeFormsKey,);
        if (! causativeForms) {
            return;
        }

        fillTable(causativeFormsTable, causativeForms,);
        causativeFormsTable.style.display = "table";

    } catch (e) {
        window.alert(e.message,);
    }
};

(select => வினயினத்துப்பெயர்கள்.sort().forEach(வினயினத்துப்பெயர் => {
    const option = document.createElement("option");
    option.text = வினயினத்துப்பெயர்;
    select.appendChild(option);
},))(document.getElementById("verbClass",),);

const verbElement = document.getElementById('verb');
const button = document.getElementById("submit",);

button.addEventListener("click", refreshContent,);

verbElement.addEventListener("focus", () => {
    Array.from(document.getElementById("verbClass").options).forEach(option => {
        option.disabled = false;
    });
});

verbElement.addEventListener("blur", event => {
    if (! event.target.checkValidity()) {
        return;
    }

    const verbClassSelect = document.getElementById("verbClass",);
    const validVerbClassNames = validவினயினத்துப்பெயர்கள்(event.target.value);
    Array.from(verbClassSelect.options).forEach(option => {
        if (option.index === 0) {
            // தேர்ந்த வினயது இனத்து label
            return;
        }
        if (! validVerbClassNames.includes(option.value)) {
            option.disabled = true;
        }
    });

    if (verbClassSelect.options[verbClassSelect.selectedIndex].disabled) {
        verbClassSelect.selectedIndex = 0;
    }
});

verbElement.addEventListener("keypress", event => {
    if (event.key !== "Enter") {
        return;
    }
    event.preventDefault();
    button.click();
},);

button.click();
