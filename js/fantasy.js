/* script.js 
   Author: Joe Calabrese
   Date: Feb. 14, 2023
*/




$(document).ready(function(){ // begin document.ready block


   // console.log(totalwins);

   const width = 1000;
   const height = 500;

   const svg = d3.select('.stats')
      .append('svg')
      .attr('id', 'winschart')
      .attr('viewBox', `0 0 1000 500`)
      .style('background-color', '#A5C9CA')
      .style('color', 'black');

   const margin = {top: 20, right: 20, bottom: 30, left: 50};
   const innerWidth = width - margin.left - margin.right;
   const innerHeight = height - margin.top - margin.bottom;

   const xValue = d => d.Manager;
   const yValue = d => d.wins;
   const zValue = d => d.id;

   const yScale = d3.scaleLinear()
      .domain([d3.max(totalwins, yValue), 0])
      .range([0, innerHeight]);

   console.log(yScale.domain());
   console.log(yScale.range());

   const xScale = d3.scaleBand()
      .domain(totalwins.map(xValue))
      .range([0, innerWidth])
      .padding(0.2);

   console.log(xScale.domain());
   console.log(xScale.range());

   const xAxis = d3.axisBottom(xScale);
   const yAxis = d3.axisLeft(yScale);

   const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

   g.append('g').call(yAxis)
      .classed('wins', true)
   
   const teamAxis = g.append('g').call(xAxis)
      .classed('teams', true)
      .attr('transform', `translate(0, ${innerHeight})`)
      .selectAll('text').attr('id', function(d,i) {return "teams" + i});

   
   
   const bars = g.selectAll('rect')
      .data(totalwins)
         .enter()
         .append('rect')
            .classed('bar', true)
            .attr('id', function(d, i) {return 'teams' + i})
            .attr('width', xScale.bandwidth())
            .attr('height', d => innerHeight - yScale(d.wins))
            .attr('y', d => yScale(d.wins))
            .attr('x', d => xScale(d.Manager))
            .attr('fill', 'steelblue');

   //trying to have the individual manager name fade in on Hover

   $('.bar').hover(function(){

      const whichBar = $(this).attr('id');

      console.log(whichBar);

      $('text#' + whichBar).fadeToggle();

   });





   //////////////////////////////////////////////////
   //////////////////////////////////////////////////
   ////////////////////ROSTERS///////////////////////
   //////////////////////////////////////////////////
   //////////////////////////////////////////////////


   //POPULATES THE DIV TO START
   let leng08 = roster08.length;

   for (let i = 0; i < leng08; i++) {

      $('.allRosters').append(`
      
         <div class='teamRoster'>
            <div class='rosterHeader'>
               <h2>${roster08[i].teamName}</h2>
               <h2>Managed by: ${roster08[i].manager}</h2>
               <h4>Place: ${roster08[i].place}</h4>
            </div>
            <ul class='rosterScroll team${i}'>
            </ul>
         </div>

      `);


      let rosterLeng = roster08[i].roster.length;

      for (let j = 0; j < rosterLeng; j++) {

         $('.team' + i).append(`

            <li class='player'>
            ${roster08[i].roster[j].pos} &mdash; ${roster08[i].roster[j].player}
            </li>

         `)

      }

   }

   //CLICK A YEAR TO CHANGE ROSTERS

   $('.year').click(function(){

      $('.allRosters').empty();

      $(this).css({
         "background-color": "var(--bg-primary)",
         "color": "var(--highlight)",
         "border-color": "var(--highlight)"
      });

      $('.year').not(this).css({
         "background-color": "var(--bg-tertiary)",
         'color': 'var(--text-primary)',
         'border-color': 'var(--text-primary)'
      });

      

      let year = eval($(this).attr('data-year'));


      let leng = year.length;

      for (let i = 0; i < leng; i++) {

         $('.allRosters').append(`
         
            <div class='teamRoster'>
               <div class='rosterHeader'>
                  <h2>${year[i].teamName}</h2>
                  <h2>Managed by: ${year[i].manager}</h2>
                  <h4>Place: ${year[i].place}</h4>
               </div>
               <ul class='rosterScroll team${i}'>
               </ul>
            </div>
   
         `);
   
   
         let rosterLeng = year[i].roster.length;
   
         for (let j = 0; j < rosterLeng; j++) {
   
            $('.team' + i).append(`
   
               <li class='player'>
               ${year[i].roster[j].pos} &mdash; ${year[i].roster[j].player}
               </li>
   
            `)
         }
   
      }


   });









}); //end document.ready block
