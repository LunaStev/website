// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import Layout from "../components/Layout";

interface Node extends d3.SimulationNodeDatum {
    id: string;
    family: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
    source: string | Node;
    target: string | Node;
}

export default function GraphPage() {
    const ref = useRef<SVGSVGElement | null>(null);

    interface RawNode {
        name: string;
        family: string;
    }

    interface RawEdge extends Array<string> {
        0: string;
        1: string;
    }

    useEffect(() => {
        async function drawGraph() {
            const res = await fetch("/graph/languages.json");
            const data: { nodes: RawNode[]; edges: RawEdge[] } = await res.json();

            const nodes: Node[] = data.nodes.map((n) => ({
                id: n.name,
                family: n.family,
            }));

            const links: Link[] = data.edges.map((e) => ({
                source: e[0],
                target: e[1],
            }));

            // 기존 SVG 초기화
            d3.select(ref.current).selectAll("*").remove();

            const width = window.innerWidth;
            const height = window.innerHeight - 100;

            const svg = d3
                .select<SVGSVGElement, unknown>(ref.current!)
                .attr("width", width)
                .attr("height", height)
                .style("background", "#111")
                .style("cursor", "grab");

            // 패밀리별 색상
            const colorMap: Record<string, string> = {
                C: "skyblue",
                Java: "orange",
                Script: "purple",
                Functional: "green",
                Pascal: "pink",
                Legacy: "gray",
                Wave: "#5865F2", // ✅ Wave 대표색
            };

            // Force simulation
            const simulation = d3
                .forceSimulation<Node>(nodes)
                .force(
                    "link",
                    d3
                        .forceLink<Node, Link>(links)
                        .id((d) => d.id)
                        .distance(120)
                )
                .force("charge", d3.forceManyBody().strength(-300))
                .force("center", d3.forceCenter(width / 2, height / 2));

            // Draw links
            const link = svg
                .append("g")
                .attr("stroke", "#aaa")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(links)
                .join("line")
                .attr("stroke-width", 1.5);

            const node = svg
                .append("g")
                .selectAll<SVGCircleElement, Node>("circle")
                .data(nodes)
                .join("circle")
                .attr("r", 10)
                .attr("fill", (d) => colorMap[d.family] || "lightgray");

            const dragBehavior = d3
                .drag<SVGCircleElement, Node>()
                .on("start", (event, d) => {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                })
                .on("drag", (event, d) => {
                    d.fx = event.x;
                    d.fy = event.y;
                })
                .on("end", (event, d) => {
                    if (!event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                });

            node.call(dragBehavior);

            // Draw labels
            const label = svg
                .append("g")
                .selectAll("text")
                .data(nodes)
                .join("text")
                .text((d) => d.id)
                .attr("fill", "#fff")
                .attr("font-size", "12px")
                .attr("text-anchor", "middle")
                .attr("dy", "-1.2em");

            // Tick update
            simulation.on("tick", () => {
                link
                    .attr("x1", (d) => (d.source as Node).x!)
                    .attr("y1", (d) => (d.source as Node).y!)
                    .attr("x2", (d) => (d.target as Node).x!)
                    .attr("y2", (d) => (d.target as Node).y!);

                node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);

                label.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
            });

            // Zoom 기능
            svg.call(
                d3.zoom<SVGSVGElement, unknown>()
                    .scaleExtent([0.2, 4])
                    .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
                        svg.selectAll("g").attr("transform", event.transform);
                    })
            );
        }

        drawGraph();
    }, []);

    return (
        <>
            <Layout currentTheme="dark" onThemeChange={() => {}} />
            <main style={{ flex: 1, height: "100vh", overflow: "hidden" }}>
                <svg ref={ref}></svg>
            </main>
        </>
    );
}
