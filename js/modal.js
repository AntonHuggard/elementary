const alkali_metals_colour = "rgb(223, 0, 0)";
const alkaline_earth_metals_clour = "rgb(219, 66, 6)";
const metaux_pauvres_colour = "rgb(5, 148, 5)";
const metalloid_colour = "rgb(0, 179, 90)";
const nonmetal_colour = "#7c4cdb";
const lanthanoid_colour = "#5900b3";
const actinoid_colour = "#000099";
const noble_gas_colour = "rgb(99, 0, 124)";
const unknown_colour = "rgb(34, 34, 34)";
const transition_metal_colour = "rgb(21, 49, 85)";

function show_modal(obj) {
    // getting information about the element to populate the modal
    var elmnt_nm, atmc_mss, atmc_num, mp, bp, elc_ngty, radioactivity, discvry, etym, descr, ohana;
    const elmt_code = obj.innerText;
    elements.forEach(element => {
        if (element.symbol == elmt_code) {
            elmnt_nm = element.name;
            atmc_mss = element.atomic_mass;
            atmc_num = element.atomic_number;
            mp = element.melting_point;
            bp = element.boiling_point;
            elc_ngty = element.electronegativity;
            radioactivity = element.radioactive;
            discvry = element.discovery_details;
            etym = element.etymology;
            descr = element.description;
            // getting the class of the element so that the svg matches the html button
            const some_code = document.getElementById(element.name).classList;
            ohana = some_code.item(some_code.length-1);
        }
    });
    var fill_colour = "red";
    const text_colour = "white";
    switch (ohana) {
        case 'alkali_metals':
            fill_colour = alkali_metals_colour;
            break;
        case 'noble':
            fill_colour = noble_gas_colour;
            break;
        case 'alkaline_earth_metals':
            fill_colour = alkaline_earth_metals_clour;
            break;
        case 'metalloid':
            fill_colour = metalloid_colour;
            break;
        case 'non-metals':
            fill_colour = nonmetal_colour;
            break;
        case 'metaux_pauvres':
            fill_colour = metaux_pauvres_colour;
            break;
        case 'lanthanoid':
            fill_colour = lanthanoid_colour;
            break;
        case 'actinoid':
            fill_colour = actinoid_colour;
            break;
        case 'unknown':
            fill_colour = unknown_colour;
            break;
        default:
            fill_colour = transition_metal_colour;
    }
    
    // drawing the svg to appear in the modal
    const svg_code = `
    <svg class = "item3" width="100%" height="300">
        <style>
            .chemical_symbol { 
                font: bold 90px sans-serif;
                fill: ${text_colour};
            }
            .number {
                font: bold 40px sans-serif;
                fill: ${text_colour};
            }
        </style>
        <rect width = "100%" height = "100%" style = "fill: white" />
        <rect x = "5%" y = "3%" width = "90%" height = "94%" style = "fill: ${fill_colour}" />
        <text x="75%" y="15%" dominant-baseline="middle" text-anchor="middle" class="number">${atmc_num}</text>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="chemical_symbol">${elmt_code}</text>
        <text x="50%" y="80%" dominant-baseline="middle" text-anchor="middle" class="number">${atmc_mss}</text>
    </svg>`;

    var radioact_visibility = "none";
    if (radioactivity) {
        radioact_visibility = "block";
    }
    if (mp == 9999) {
        mp = "<em>je ne sais pas</em>"
    } else {
        mp = mp + " &#176;C";
    }
    if (bp == 9999) {
        bp = "<em>je ne sais pas</em>"
    } else {
        bp = bp + " &#176;C";
    }

    // html for the modal pop-up
    const modal_code = 
    `<div class = "modal_content">
        <div class = "grid-container">
                <div class = "item1">${elmnt_nm}</div>
            <button class = "item2" onclick = \"document.getElementById('element_pop-up').style.display='none'\">&times</button>
            ${svg_code}
            <div class = "item4">
                Atomic Number: ${atmc_num} <br> Relative Atomic Mass: ${atmc_mss} <br> 
                Melting Point: ${mp} <br>
                Boiling Point: ${bp} <br> Electronegativity: ${elc_ngty} <br>
                <div class="mobile_radioactive_indictaion">Radioactive: ${radioactivity}</div>
                Discovered: ${discvry} <br> Etymology: ${etym} <br> <br>
            </div>
            <img class = "item5" src ="radioactv.png" style = "display:${radioact_visibility}">
            <div class = "item7">
                ${descr}
            </div>
        </div>
    </div>`;

    document.getElementById('element_pop-up').innerHTML = modal_code ;
    document.getElementById('element_pop-up').style.display = "block" ;
}


// close the element modal when the esc key is pressed
document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 27:
            document.getElementById('element_pop-up').style.display='none'
            break;
    }
});