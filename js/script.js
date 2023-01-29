/* script.js 
   Author:
   Date:
*/

console.log(losangeles);

$(document).ready(function(){ // begin document.ready block

	var mymap = L.map('mymap', { 
		scrollWheelZoom: true, 
		zoomControl: true})
		.setView([34.4609886,-117.7471356], 7);

   L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: 'Map by Joe Calabrese &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Contriubutors',
         subdomains: ['a','b','c']})
   .addTo(mymap);

   var thedata = L.geoJSON(socalcounties).addTo(mymap);

}); //end document.ready block

   