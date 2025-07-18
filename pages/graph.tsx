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

            d3.select(ref.current).selectAll("*").remove();

            const width = window.innerWidth;
            const height = window.innerHeight - 100;

            const svg = d3
                .select<SVGSVGElement, unknown>(ref.current!)
                .attr("width", width)
                .attr("height", height)
                .style("background", "#111")
                .style("cursor", "grab");

            const colorMap: Record<string, string> = {
                Ancestor: "#D2B48C",
                Logic: "#FFD700",
                Database: "#8A2BE2",
                C: "skyblue",
                Java: "orange",
                Script: "purple",
                Functional: "green",
                Pascal: "pink",
                Legacy: "gray",
                Wave: "#5865F2",
            };

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

            // --- 추가/수정된 부분 시작 ---

            // 링크 컨테이너를 먼저 추가하여 노드 아래에 렌더링되도록 함
            const linkGroup = svg.append("g");
            const nodeGroup = svg.append("g");
            const labelGroup = svg.append("g");

            const link = linkGroup
                .attr("stroke", "#aaa")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(links)
                .join("line")
                .attr("stroke-width", 1.5);

            const node = nodeGroup
                .selectAll<SVGCircleElement, Node>("circle")
                .data(nodes)
                .join("circle")
                .attr("r", 10)
                .attr("fill", (d) => colorMap[d.family] || "lightgray")
                .style("cursor", "pointer") // 클릭 가능하도록 커서 변경
                .attr("stroke", "#fff") // 선택 시 테두리 효과를 위해 기본 테두리 추가
                .attr("stroke-width", 0); // 처음엔 테두리 안보이게

            // --- 추가/수정된 부분 끝 ---

            const dragBehavior = d3
                .drag<SVGCircleElement, Node>()
                .on("start", (event, d) => {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                    svg.style("cursor", "grabbing");
                })
                .on("drag", (event, d) => {
                    d.fx = event.x;
                    d.fy = event.y;
                })
                .on("end", (event, d) => {
                    if (!event.active) simulation.alphaTarget(0);
                    if (!event.subject.dragged) { // --- 추가/수정된 부분: 드래그가 아닌 클릭을 구분
                        nodeClick(event, d);
                    }
                    d.fx = null;
                    d.fy = null;
                    svg.style("cursor", "grab");
                });

            node.call(dragBehavior);

            const label = labelGroup
                .selectAll("text")
                .data(nodes)
                .join("text")
                .text((d) => d.id)
                .attr("fill", "#fff")
                .attr("font-size", "12px")
                .attr("text-anchor", "middle")
                .attr("dy", "-1.2em")
                .style("pointer-events", "none"); // 레이블이 클릭 이벤트를 가로채지 않도록 설정

            simulation.on("tick", () => {
                link
                    .attr("x1", (d) => (d.source as Node).x!)
                    .attr("y1", (d) => (d.source as Node).y!)
                    .attr("x2", (d) => (d.target as Node).x!)
                    .attr("y2", (d) => (d.target as Node).y!);

                node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);

                label.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
            });

            const zoomGroup = svg.append("g").attr("class", "zoom-container");
            zoomGroup.append(() => linkGroup.node());
            zoomGroup.append(() => nodeGroup.node());
            zoomGroup.append(() => labelGroup.node());

            svg.call(
                d3.zoom<SVGSVGElement, unknown>()
                    .scaleExtent([0.2, 4])
                    .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
                        zoomGroup.attr("transform", event.transform.toString());
                    })
            );

            // --- 추가/수정된 부분 시작 ---

            let selectedNode: Node | null = null;

            function nodeClick(
                _event: d3.D3DragEvent<SVGCircleElement, Node, Node>,
                d: Node
            ) {
                // 이미 선택된 노드를 다시 클릭하면 하이라이트 해제
                if (selectedNode && selectedNode.id === d.id) {
                    resetHighlight();
                    return;
                }

                selectedNode = d;

                const connectedNodes = new Set<string>();
                connectedNodes.add(d.id);

                // 직계 부모/자식 찾기
                links.forEach(l => {
                    const sourceId = (l.source as Node).id;
                    const targetId = (l.target as Node).id;

                    if (sourceId === d.id) {
                        connectedNodes.add(targetId);
                    }
                    if (targetId === d.id) {
                        connectedNodes.add(sourceId);
                    }
                });

                // 선택된 노드와 직계 노드만 하이라이트
                node
                    .attr("stroke-width", (n) => (n.id === d.id ? 2 : 0)) // 선택된 노드에만 테두리
                    .transition().duration(300)
                    .style("opacity", (n) => (connectedNodes.has(n.id) ? 1 : 0.1));

                label
                    .transition().duration(300)
                    .style("opacity", (l) => (connectedNodes.has(l.id) ? 1 : 0.1));

                link
                    .transition().duration(300)
                    .style("opacity", (l) => {
                        const sourceId = (l.source as Node).id;
                        const targetId = (l.target as Node).id;
                        return (sourceId === d.id || targetId === d.id) ? 1 : 0.1;
                    });
            }

            // 하이라이트 리셋 함수
            function resetHighlight() {
                selectedNode = null;
                node
                    .attr("stroke-width", 0)
                    .transition().duration(300)
                    .style("opacity", 1);
                label
                    .transition().duration(300)
                    .style("opacity", 1);
                link
                    .transition().duration(300)
                    .style("opacity", 0.6); // 원래 투명도로 복귀
            }

            // 배경 클릭 시 하이라이트 해제
            svg.on("click", (event) => {
                if (event.target === svg.node()) { // svg 배경을 직접 클릭했을 때만
                    resetHighlight();
                }
            });
            // --- 추가/수정된 부분 끝 ---
        }

        drawGraph();

        // 창 크기 변경 시 다시 그리기 (옵션)
        const handleResize = () => drawGraph();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

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