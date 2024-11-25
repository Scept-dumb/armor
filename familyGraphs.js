const graph = {
  nodes: [
    { id: "Boss???", color: "#FF5555", img: "path/to/icon1.png" },
    { id: "Wen-Mom", color: "#8888FF", img: "path/to/icon2.png" },
    { id: "Perry", color: "#A0D1D1", img: "path/to/icon3.png" },
    { id: "Mar Sr.", color: "#B399FF", img: "path/to/icon4.png" },
    { id: "Mira", color: "#FFAA55", img: "path/to/icon5.png" },
    { id: "Sorrel", color: "#888888", img: "path/to/icon6.png" },
    { id: "Leslie", color: "#AA99FF", img: "path/to/icon7.png" },
    { id: "Unnamed", color: "#88CC55", img: "path/to/icon8.png" },
    { id: "Sue", color: "#66AAFF", img: "path/to/icon9.png" },
    { id: "Arce", color: "#FF5555", img: "path/to/icon10.png" },
    { id: "Wendy", color: "#55AADD", img: "path/to/icon11.png" },
    { id: "Hoshi", color: "#88BB66", img: "path/to/icon12.pn" },
    { id: "Rhys", color: "#FF88CC", img: "path/to/icon13.png" },
    { id: "Sybil", color: "#FFFF88", img: "path/to/icon14.pn" },
    { id: "Melissa", color: "#8888FF", img: "path/to/icon15.pn" },
    { id: "Lucille", color: "#B399FF", img: "path/to/icon16.png" },
    { id: "Mar", color: "#583da8", img: "path/to/icon17.pn" },
  ],
  links: [
    { source: "Boss???", target: "Wen-Mom", type: "acquaintance" },
    { source: "Boss???", target: "Mar Sr.", type: "acquaintance" },
    { source: "Wen-Mom", target: "Wendy", type: "family" },
    { source: "Wen-Mom", target: "Mar Sr.", type: "acquaintance" },
    { source: "Perry", target: "Wendy", type: "family" },
    { source: "Perry", target: "Wen-Mom", type: "complicated" },
    { source: "Mar Sr.", target: "Mira", type: "family" },
    { source: "Sorrel", target: "Leslie", type: "friends" },
    { source: "Leslie", target: "Sue", type: "friends" },
    { source: "Leslie", target: "Unnamed", type: "friends" },
    { source: "Sue", target: "Unnamed", type: "friends" },
    { source: "Arce", target: "Wendy", type: "friends" },
    { source: "Arce", target: "Wen-Mom", type: "hates" },
    { source: "Arce", target: "Hoshi", type: "friends" },
    { source: "Arce", target: "Rhys", type: "friends" },
    { source: "Arce", target: "Sybil", type: "best_friends" },
    { source: "Wendy", target: "Rhys", type: "friends" },
    { source: "Wendy", target: "Melissa", type: "friends" },
    { source: "Wendy", target: "Lucille", type: "friends" },
     { source: "Wendy", target: "Sorrel", type: "family" },
    { source: "Wendy", target: "Hoshi", type: "friends" },
    { source: "Wendy", target: "Wen-Mom", type: "family" },
    { source: "Hoshi", target: "Lucille", type: "friends" },
    { source: "Rhys", target: "Sybil", type: "friends" },
    { source: "Sybil", target: "Melissa", type: "friends" },
    { source: "Sybil", target: "Melissa", type: "friends" },
    { source: "Sybil", target: "Lucille", type: "partners" },
  { source: "Hoshi", target: "Mira", type: "family" },
  { source: "Mar", target: "Mar Sr.", type: "family" },
  { source: "Mar", target: "Wendy", type: "friends" },
  { source: "Mar", target: "Hoshi", type: "friends" },
  { source: "Mar", target: "Lucille", type: "friends" },
  { source: "Mar", target: "Sybil", type: "friends" },
  { source: "Mar", target: "Melissa", type: "friends" },
  { source: "Mar", target: "Leslie", type: "complicated" },
  ],
};


const width = window.innerWidth;
const height = window.innerHeight;

// Zoom behavior
const zoom = d3.zoom()
               .scaleExtent([0.5, 5])
               .on("zoom", (event) => {
                 graphGroup.attr("transform", event.transform);  // Apply zoom to the graphGroup only
               });

// Create the SVG container and set its width and height
const svg = d3.select("#graph")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .call(zoom);  // Apply zoom behavior to the entire SVG

// Create a group element for the graph content (which will zoom/pan)
const graphGroup = svg.append("g");

// Create the legend data
const legendData = [
  { label: "Family", color: "pink" },
  { label: "Complicated", color: "orange" },
  { label: "Friends", color: "blue" },
  { label: "Rival", color: "yellow" },
  { label: "Partners", color: "green" },
  { label: "Best Friends", color: "purple" },
  { label: "Hates", color: "red" },
  { label: "Acquaintance", color: "gray" },
];
// Calculate the height needed for the legend
const legendHeight = legendData.length * 25 + 30;  // Adding space for the title and padding
const legendPadding = 10;  // Padding between items and the edge of the rectangle

// Create the legend group
const legend = svg.append("g")
                  .attr("class", "legend");

// Function to update legend position based on screen size
function updateLegendPosition() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Adjust legend position based on screen size
  if (width <= 768) {  // Mobile view (smaller screens)
    legend.attr("transform", `translate(${width - 240}, ${height - legendHeight - 20})`); // Bottom-right
  } else {  // Desktop view (larger screens)
    legend.attr("transform", `translate(${width - 240}, ${(height - legendHeight) / 2})`); // Middle-right
  }

  // Reset legend box size
  legend.select("rect")
        .attr("width", 220)  // Standard width for larger screens
        .attr("height", legendHeight);  // Standard height

  // Reset text size and layout for desktop view
  legend.selectAll("text")
        .style("font-size", "14px");  // Standard font size for desktop
}

// Initial positioning of the legend based on screen size
updateLegendPosition();

// Resize event to adjust legend position dynamically
window.addEventListener("resize", updateLegendPosition);

// Create a background rectangle behind the legend with rounded corners
legend.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 220)  // Width of the legend box
      .attr("height", legendHeight)  // Height of the rectangle (with title and legend items)
      .attr("rx", 15)  // Rounded corners
      .attr("ry", 15)  // Rounded corners
      .attr("fill", "rgba(0, 0, 0, 0.2)");  // Semi-transparent black background

// Add the title text "Legend"
legend.append("text")
      .attr("x", 110)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("fill", "#333")
      .text("Legend");

// Add legend items (colored rectangles and labels)
legend.selectAll("g")
      .data(legendData)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(0, ${i * 25 + 30})`) // Space the legend items, offset by 30px to account for the title
      .each(function(d) {
        // Add colored rectangle with padding
        d3.select(this).append("rect")
                       .attr("width", 20)
                       .attr("height", 20)
                       .style("fill", d.color)
                       .attr("x", legendPadding);  // Apply padding on the left side

        // Add label text with padding
        d3.select(this).append("text")
                       .attr("x", 30 + legendPadding)  // Apply padding between the color box and text
                       .attr("y", 15)
                       .style("font-size", "14px")
                       .style("fill", "#333")
                       .text(d.label);
      });


// Force-directed layout
const simulation = d3.forceSimulation(graph.nodes)
                     .force("link", d3.forceLink(graph.links).id(d => d.id).distance(250))  // Increase the distance between links
                     .force("charge", d3.forceManyBody().strength(-500))  // Increase repulsion force for more spacing
                     .force("center", d3.forceCenter(width / 2, height / 2))  // Keep the graph centered
                     .force("collide", d3.forceCollide().radius(70));  // Increase radius for more space between nodes


// Add links
const link = graphGroup.append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(graph.links)
                .enter()
                .append("line")
                .attr("class", "link")
                .style("stroke-width", 4)
                .style("stroke", d => getLinkColor(d.type));

// Add nodes
const node = graphGroup.append("g")
                .attr("class", "nodes")
                .selectAll("g")
                .data(graph.nodes)
                .enter()
                .append("g")
                .attr("class", "node")
                .on("dblclick", (event, d) => {
                  svg.transition()
                     .duration(750)
                     .call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(3).translate(-d.x, -d.y));
                });

node.append("circle")
    .attr("r", 40)  // Increase circle size for icons
    .style("fill", d => d.color);

node.append("image")
    .attr("xlink:href", d => d.img)  // Set image URL
    .attr("x", -20)  // Position image in center
    .attr("y", -20)
    .attr("width", 40)
    .attr("height", 40);

node.append("text")
    .attr("dy", 55)  // Position text below the circle
    .attr("text-anchor", "middle")
    .text(d => d.id);

simulation.on("tick", () => {
  link.attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

  node.attr("transform", d => `translate(${d.x},${d.y})`);
});

// Initial zoom-out and center
svg.transition()
   .duration(0)
   .call(zoom.transform, d3.zoomIdentity);

// Helper function to color links based on type
function getLinkColor(type) {
  switch (type) {
    case "family": return "pink";
    case "complicated": return "orange";
    case "friends": return "blue";
    case "rival": return "yellow";
    case "partners": return "green";
    case "best_friends": return "purple";
    case "hates": return "red";
    case "acquaintance": return "gray";
    default: return "black";
  }
}


// Resize event to keep full-screen view and adjust legend position
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  d3.select("svg").attr("width", width).attr("height", height);
  simulation.force("center", d3.forceCenter(width / 2, height / 2)).alpha(0.3).restart();

  // Adjust legend position based on screen size
  if (width <= 768) {  // Mobile view (smaller screens)
    legend.attr("transform", `translate(${width - 240}, ${height - legendHeight - 20})`); // Bottom-right
  } else {  // Desktop view (larger screens)
    legend.attr("transform", `translate(${width - 240}, ${(height - legendHeight) / 2})`); // Middle-right
  }

  // Reset legend box size
  legend.select("rect")
        .attr("width", 220)  // Standard width for larger screens
        .attr("height", legendHeight);  // Standard height

  // Reset text size and layout for desktop view
  legend.selectAll("text")
        .style("font-size", "14px");  // Standard font size for desktop
});
