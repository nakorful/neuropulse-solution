import React, {useEffect, useState} from 'react';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import './FirstPage.css'; // For custom styles
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {useLocation} from "react-router-dom";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Importance values
const importanceValues = {
    Depression: 0.25,
    Diabetes: 0.10,
    'High Cholesterol': 0.10,
    Hypertension: 0.10,
    Psychiatric: 0.20,
    Neurological: 0.25,
    Alcohol: 0.05,
    Smoke: 0.05
};

const calculateSelectedImportances = (conditions: Record<string, string>) => {
    const selectedImportances = Object.keys(conditions).reduce((acc, key) => {
        if (conditions[key] === 'Yes') {
            acc[key] = importanceValues[key as keyof typeof importanceValues];
        }
        return acc;
    }, {} as Record<string, number>);
    return selectedImportances;
};

const ResultPage = () => {
    const location = useLocation();
    const { preMedicalCondition, lifestyle } = location.state || {};

    // Combine all conditions
    const conditions = {
        Depression: preMedicalCondition.depression,
        Diabetes: preMedicalCondition.diabetes,
        'High Cholesterol': preMedicalCondition.highCholesterol,
        Hypertension: preMedicalCondition.hypertension,
        Psychiatric: preMedicalCondition.psychiatric,
        Neurological: preMedicalCondition.neurological,
        Alcohol: lifestyle.alcohol,
        Smoke: lifestyle.smoking
    };

    // Calculate selected importances based on the conditions
    const selectedImportances = calculateSelectedImportances(conditions);

    // Chart.js data for the bar chart
    const data = {
        labels: Object.keys(selectedImportances),
        datasets: [
            {
                label: 'Importance Value',
                data: Object.values(selectedImportances),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Contributing Factors to Alzheimer's Disease Prediction"
            }
        },
        scales: {
            x: {
                beginAtZero: true
            }
        }
    };

    // @ts-ignore
    return (
        <Container className="page-background">
            {/* Top-left positioning */}
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

                <div>
                    <Bar data={data} options={options}/>
                </div>

                <footer className="mt-5">
                    <a href="#">Learn</a> | <a href="#">Help</a> | <a href="#">Contact Us</a> | <a href="#">About Us</a>
                </footer>
            </Container>
        </Container>
    );
};

export default ResultPage;