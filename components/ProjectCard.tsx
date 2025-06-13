import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export function ProjectCard({ name, description, links }: {
    name: string,
    description: string,
    links: { label: string, url: string }[]
}) {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className="card">
                <h3>{name}</h3>
                <p>{description}</p>
                <Button size="sm" variant="outline-secondary" onClick={() => setShow(true)}>더보기</Button>
            </div>

            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {links.map((link, idx) => (
                        <Button
                            key={idx}
                            variant="outline-primary"
                            href={link.url}
                            target="_blank"
                            className="mb-2 me-2"
                        >
                            {link.label}
                        </Button>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>닫기</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
