const coll = collection;
const mainDiv = document.querySelector('#main');

let genre_list =[];
coll.forEach(song => genre_list.push(song.genre));
let genre_list_u = [new Set(genre_list)];
/* let bpm_list =[];
coll.forEach(song => bpm_list.push(song.bpm));
let bpm_list_u = [new Set(bpm_list)];
 */

let artist_list =[];
coll.forEach(song => artist_list.push(song.artist));
let artist_list_u = [new Set(artist_list)];

let album_list =[];
coll.forEach(song => album_list.push(song.album));
let album_list_u = [new Set(album_list)];

let key_list =[];
coll.forEach(song => key_list.push(song.key));
let key_list_u = [new Set(key_list)];

let key_name_list =[];
coll.forEach(song => key_name_list.push(song.key_name));
let key_name_list_u = [new Set(key_name_list)];


let genre_list_trim = [];
//let bpm_list_trim = [];
let artist_list_trim = [];
let album_list_trim = [];
let key_list_trim = [];
let key_name_list_trim = [];


genre_list_u[0].forEach(value => genre_list_trim.push(value));
//bpm_list_u[0].forEach(value => bpm_list_trim.push(value));
artist_list_u[0].forEach(value => artist_list_trim.push(value));
album_list_u[0].forEach(value => album_list_trim.push(value));

key_list_u[0].forEach(value => key_list_trim.push(value));
key_name_list_u[0].forEach(value => key_name_list_trim.push(value));

//console.log("-->"+ genre_list_trim.sort((a, b) => a < b));

const g_select = document.getElementById("genre_select");
//const b_select = document.getElementById("bpm_select");
const a_select = document.getElementById("artist_select");
const al_select = document.getElementById("album_select");
const k_select = document.getElementById("key_select");
const kn_select = document.getElementById("key_name_select");

for(genre in genre_list_trim.sort()) {
    g_select.options[g_select.options.length] = new Option(genre_list_trim[genre], genre_list_trim[genre]);
    }
/* for(bpm in bpm_list_trim.sort()) {
    b_select.options[b_select.options.length] = new Option(bpm_list_trim[bpm], bpm_list_trim[bpm]);
    } */
for(artist in artist_list_trim.sort()) {
    a_select.options[a_select.options.length] = new Option(artist_list_trim[artist], artist_list_trim[artist]);
    }

for(album in album_list_trim.sort()) {
    al_select.options[al_select.options.length] = new Option(album_list_trim[album], album_list_trim[album]);
    }


for(key in key_list_trim.sort()) {
    k_select.options[k_select.options.length] = new Option(key_list_trim[key], key_list_trim[key]);
    }
for(key_name in key_name_list_trim.sort()) {
    kn_select.options[kn_select.options.length] = new Option(key_name_list_trim[key_name], key_name_list_trim[key_name]);
    }

function clean_results(){
    var results_div = document.getElementById('results');
    results_div.innerHTML="";
}

const head= ['index','artist','title','album','no_track','bpm','key','key_name','genre','playcount','import_date'];

function name_select(name){
    switch(name){
        case 'genre_select':
            return ["g_select","genre"];
            break;
        case 'bpm_select':
            return ["b_select","bpm"];
            break;
        case 'artist_select':
            return ["a_select","artist"];
            break;
        case 'album_select':
            return ["al_select","album"];
            break;
        case 'key_select':
            return ["k_select","key"];
            break;
        case 'key_name_select':
            return ["kn_select","key_name"];
            break;
        default:
            break;
    }
}

function generar_tabla(name) {
    if(name == "bpm_input"){
        let menor = document.querySelector('#bpm_menor').value;
        let mayor = document.querySelector('#bpm_mayor').value;
        var t0 = performance.now();
        //let selectoo = name+".value";
        coll_filtered =coll.filter(song => song.bpm  >= eval(menor) & song.bpm  <= eval(mayor)  ).sort((a, b) => a.bpm - b.bpm);
    }else
    if(!name){
        var t0 = performance.now();
        coll_filtered =coll.filter(song => song.genre != "neverever");
    }
    else {
    let [nombre,filt] = name_select(name);
    //console.log(nombre,filt);
    let filteroo = "song."+filt;
    let selectoo = nombre+".value";
    //console.log(selectoo+"<------");
    var t0 = performance.now();
    var g_filter = eval(selectoo);
    coll_filtered =coll.filter(song => eval(filteroo) == g_filter);
    }
    var results_div = document.getElementById('results');
    results_div.innerHTML="";
  
    // Crea un elemento <table> y un elemento <tbody>
    var tabla   = document.createElement("table");
    var tblhead = document.createElement("thead");
    var header = tabla.createTHead();
    var row = header.insertRow(0);
    for (let i = head.length; i > 0; i--) {
        const element = head[i];
        var cell = row.insertCell(0);
        cell.innerHTML = head[i-1];
        }
    
    var tblBody = document.createElement("tbody");
    // Crea las celdas
    for (var i = 0; i < coll_filtered.length; i++) {
      
        const element = coll_filtered[i];
        const {artist,title,album,no_track,bpm,key,key_name,genre,playcount,import_date} = element;
        const trim_array = {i,artist,title,album,no_track,bpm,key,key_name,genre,playcount,import_date};
        const array_vals = Object.values(trim_array);
        var hilera = document.createElement("tr");
        
        for (var j = 0; j < 11; j++) {
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode( array_vals[j] );
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }

        tblBody.appendChild(hilera);
        //console.log(i);
    }
  
    tabla.appendChild(tblhead);
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);

    var t1 = performance.now();
    results_div.innerHTML= "<div class='performance'>" + i+": canciones en:  "+ (t1 - t0) + " millisegundos.</div>";
    // appends <table> into <body>
    results_div.appendChild(tabla);
    
    //tabla.setAttribute("border", "1");
    console.log("genera_tabla took " + (t1 - t0) + " milliseconds."); 
    }
    function mimic_colors(){
        let P_bg_c = getComputedStyle(parent.document.documentElement).getPropertyValue('--bg_color');
        document.documentElement.style.setProperty('--bg_color', P_bg_c );
        bg_c = getComputedStyle(document.documentElement).getPropertyValue('--bg_color');

        let P_dark_c = getComputedStyle(parent.document.documentElement).getPropertyValue('--dark_color');
        document.documentElement.style.setProperty('--dark_color',P_dark_c );
        dark_c = getComputedStyle(document.documentElement).getPropertyValue('--dark_color');

        let P_text_c = getComputedStyle(parent.document.documentElement).getPropertyValue('--txt_color');
        document.documentElement.style.setProperty('--txt_color',P_text_c );
        text_c = getComputedStyle(document.documentElement).getPropertyValue('--txt_color');
        
        let P_comp_c = getComputedStyle(parent.document.documentElement).getPropertyValue('--complementary_color');
        document.documentElement.style.setProperty('--complementary_color',P_comp_c );
        comp_c = getComputedStyle(document.documentElement).getPropertyValue('--complementary_color');
        
        let P_accent_c = getComputedStyle(parent.document.documentElement).getPropertyValue('--accent_color');
        document.documentElement.style.setProperty('--accent_color',P_accent_c );
        accent_c = getComputedStyle(document.documentElement).getPropertyValue('--accent_color');
   }

