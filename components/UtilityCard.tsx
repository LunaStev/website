// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { Card } from 'react-bootstrap';

interface UtilityCardProps {
    title: string;
    description: string;
    icon: string;
    children: React.ReactNode;
}

export function UtilityCard({ title, description, icon, children }: UtilityCardProps) {
    return (
        <Card className="utility-card h-100">
            <Card.Header className="d-flex align-items-center gap-2">
                <span className="utility-icon">{icon}</span>
                <h3 className="mb-0">{title}</h3>
            </Card.Header>
            <Card.Body>
                <p className="text-muted mb-3">{description}</p>
                {children}
            </Card.Body>
        </Card>
    );
}