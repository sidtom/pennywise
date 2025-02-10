// import {
//     Typography
//   } from "@mui/material";
import "./analyticsDashboard.css";
export default function AnalyticsDashboard() {
    return (
<div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
    <div className="box" style={{ flex: "1 1 45%", border: "1px solid black", padding: "10px" }}>Box1</div>
    <div className="box" style={{ flex: "1 1 45%", border: "1px solid black", padding: "10px" }}>Box2</div>
    <div className="box" style={{ flex: "1 1 45%", border: "1px solid black", padding: "10px" }}>Box3</div>
    <div className="box" style={{ flex: "1 1 45%", border: "1px solid black", padding: "10px" }}>Box4</div>
</div>
    );
}