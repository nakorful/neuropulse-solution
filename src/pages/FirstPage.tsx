import React from 'react';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import './FirstPage.css'; // For custom styles

const FirstPage = () => {
    // @ts-ignore
    return (
        <Container className="page-background position-relative">
            {/* Top-left positioned logo */}
            <div className="logo-container">
                <Image
                    src="/NEUR.png" // Replace with the actual file name and path
                    alt="NeuroPulse Logo"
                    className="logo-image"
                />
            </div>
            <Row className="h3 top-0 start-0 m-3">NeuroPulse Solution</Row>

            <Container className="text-center mt-5">
                <p className="row justify-content-center">Your loved one might be prone</p>
                {/* Add your rounded image */}
                {/*@ts-ignore*/}
                <div className="row align-items-center justify-content-between">
                    <Col md={4}>
                        <Image
                            src="/old-people.jpg" // Replace with the actual file name and path
                            className="circle-image"
                            alt="Description of the image"
                        />
                    </Col>
                    <Col md={6}>
                        <p>Are you a family member or caregiver?</p>
                    </Col>
                </div>

                <Button variant="primary" size="lg" href="/assessment">
                    Start Assessment
                </Button>
                <p className="mt-3">Assess your loved one today!</p>
                <p className="mt-3">Your loved one might be having Alzheimer's Disease and related dementia</p>

                <footer className="mt-5">
                    <a href="#">Learn</a> | <a href="#">Help</a> | <a href="#">Contact Us</a> | <a href="#">About Us</a>
                </footer>
            </Container>
        </Container>
    );
};

export default FirstPage;