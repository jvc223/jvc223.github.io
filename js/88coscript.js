/* script.js 
   Author: Joe Calabrese	
   Date: 8/20/2020
*/


$(document).ready(function(){ // begin document.ready block

	//jquery code here


////////////////////////////////////
////////////////////////////////////
////////////MAP LAYERS//////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

	//SETS THE VIEW OF THE MAP
	var mymap = L.map('mapid', { 
		scrollWheelZoom: false, 
		zoomControl: false})
		.setView([40.1045,-82.6963], 7);


	//GETS THE ACTUAL MAP TILES
	L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	attribution: 'Map by Joe Calabrese (WKYC) &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Contriubutors',
    	subdomains: ['a','b','c']
	}).addTo(mymap);

	//THIS GETS THE SHAPE DATA FROM THE OHCO VARIABLE 
	//I SET IN THE ./data/OHCOs.geoJSON
	L.geoJSON(OHCOs,{
		//ON EACH SHAPE I'VE ADDED SOMETHING
		//THROUGH THE POTATO FUNCTION BELOW

		onEachFeature: potato

	}).addTo(mymap);


}); //ends jQuery

////////////////////////////////////
////////////////////////////////////
///////////GOOGLE///////////////////
////////////DATA////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

var google = [];

function loaddata(data){

	// console.log(data.values);

	//WE HAVE TO REMOVE THE FIRST ITEM IN
	//THE SHEET ARRAY BECAUSE ITS ALL THE HEADERS
	data.values.shift();

	//console.log(data.values);

	let leng = data.values.length
	//console.log(leng);

	//TRYING TO SEE IF I GET THE NEW STUFF


	for (var i=0; i<leng; i++) {

		google[i] = {
			id: i,
			county: data.values[i][0],
			done: data.values[i][2],
            headline: data.values[i][3],
			desc: data.values[i][4],
			link: data.values[i][6],
			photo: data.values[i][5]
			// etc.
		};

	};

};//closes loaddata

console.log(google);



//GEOJSON STYLE COLORS

var geojson;
// ... our listeners

geojson = L.geoJson(OHCOs);

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
/////////you're getting this////////
/////////VVVVVVVVVVVVVVVVV//////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////





function potato (feature, layer) {

	//not entirely sure why i had to do this
	var container = $('<div />');
	var justCounty = $('<div />');

	//the coID is the identifier of the county
	var coID = feature.properties.idnum;

	//THIS CREATES WHAT'S GOING TO GO IN THE POPUP WHEN YOU CLICK ON THE COUNTY
	container.html("<h3 class = 'popupco'>" + google[coID].county + " County</h3><div id='popbox'><div id='leftbox'><img src='" + google[coID].photo + "'></div><div id='rightbox'><h4>" + google[coID].desc + "</h4><h5 class='story'><a href='" + google[coID].link +"' target='_blank'>Read The Full Story</a></h5></div>");

	//console.log(google[coID].photo);

	// layer.bindTooltip("<h3>" + google[coID].county + " County</h3>");


	if (google[coID].done === "y") {

        layer.bindPopup(container[0]);

        layer.setStyle({
        	weight: 5,
        	color: "#009DDC",
        	dashArray: '',
        	fillOpacity: 0.7
    	});

        layer.bringToFront();
    	
    } else {
    	layer.setStyle({
    		color: "#7a7a7a"
    	});

    }




	// layer.on({
 //        mouseover: tooltip,
 //        // mouseout: resetHighlight,
 //        // click: getID
 //    });
};

