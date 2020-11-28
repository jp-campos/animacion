import React, {useEffect, useState, useRef} from 'react'
import * as d3 from 'd3';

const width = 700;
const height = 500;
const margin = { top:10, left:100, bottom: 40, right: 10};
const iwidth = width - margin.left - margin.right;
const iheight = height - margin.top -margin.bottom;

const data = [
    { name: "Medellín", index2005: 3, index2006: 33 },
    { name: "Cali", index2005: 39, index2006: 45 },
    { name: "Bogotá", index2005: 7, index2006: 31 },
    { name: "Pereira", index2005: 35, index2006: 36 },
    { name: "Bucaramanga", index2005: 16, index2006: 23 },
    { name: "Cúcuta", index2005: 45, index2006: 45 },
    { name: "Armenia", index2005: 6, index2006: 16 }
];




function maximos(data){
    let maxPoder = 0
    let maxExpec = 0 
    let maxPop = 0 
  
    data.forEach(element => {
        let actualE = Number(element.lifeexpectancy)
        let actualP = Number(element.purchasingpower)
        let actualPop = Number(element.population)
  
        if(maxPoder< actualP){
            maxPoder = actualP
        }
        if(maxExpec < actualE){
            maxExpec = actualE
        }
        if(maxPop < actualPop){
            maxPop = actualPop
        }
    });
    return{"maxPoder":maxPoder,"maxExpec": maxExpec, "maxPop": maxPop}
  }



const Animacion = () => {

    const canvasR = useRef(null);
    const botonR = useRef(null);
    const [barras,setBarras] = useState(null)


    function draw(data){
        let max = 0 
             data.forEach(element => {
            let actual = Number(element.index2005)
            if(max< actual){
                max = actual
            }
        });

        const canvas = d3.select(canvasR.current)
        const svg = canvas.append("svg");
        svg.attr("width", width);
        svg.attr("height", height);

        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear() 
        .domain([0, max])
        .range([0, iwidth]);
    
        const y = d3.scaleBand()
        .domain(data.map(d => d.name) ) 
        .range([0,iheight])
        .padding(0.1); 

        const bars = g.selectAll("rect").data(data);

        bars.enter().append("rect")
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("y", d => y(d.name))
        .attr("x", d => 0)
        .attr("height", y.bandwidth())
        .attr("width", d => x(d.index2005))  

        g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);  

        g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));

        setBarras(bars)
        return bars
    }
    

    useEffect(()=>{

      let barras = draw(data)
      d3.select(botonR.current).on("click", ()=> {

        let max = 0 
             data.forEach(element => {
            let actual = Number(element.index2006)
            if(max< actual){
                max = actual
            }
        });

        const x = d3.scaleLinear() 
        .domain([0, max])
        .range([0, iwidth]);
        
        const y = d3.scaleBand()
        .domain(data.map(d => d.name) ) 
        .range([0,iheight])
        .padding(0.1);

        d3.selectAll("rect")
        .transition()
        .duration(1000)
        .style("fill", "red")
        .attr("height", y.bandwidth())
        .attr("width", d => x(d.index2006))  
      })

    }, [])



    return (
    <div style={{padding:"20px"}}>
    <div ref={canvasR}></div>
    <button ref={botonR}>Cambiar </button>
    </div>
    )




}

export default Animacion;