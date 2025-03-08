import React, {useEffect, useState} from 'react';
import {Form, Button, Container, Row, Col, Image} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SecondPage.css'; // For custom styles

const SecondPage = () => {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [education, setEducation] = useState('');
    const [race, setRace] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [preMedicalCondition, setPreMedicalCondition] = useState({
        depression: '',
        diabetes: '',
        highCholesterol: '',
        hypertension: '',
        psychiatric: '',
        neurological: ''
    });
    const [injury, setInjury] = useState({
        headInjury: '',
        eyeInjury: '',
        earInjury: '',
        noseInjury: '',
        throatInjury: ''
    });
    const [lifestyle, setLifestyle] = useState({
        alcohol: '',
        smoking: ''
    });
    const [healthHistory, setHealthHistory] = useState({
        cardiovascular: '',
        gastro: '',
        renal: '',
        bloodCell: '',
        surgical: ''
    });

    interface Result {
        prob6Months: string | null;
        prob1Year: string | null;
    };


    const [result, setResult] = useState<Result>({
        prob6Months: null,
        prob1Year: null
    });


    // Function to calculate probabilities based on selected conditions
    const calculateProbability = () => {
        const { depression: DP, diabetes: DB, highCholesterol: HC, hypertension: HP, psychiatric: PS, neurological: NL } = preMedicalCondition;
        const { alcohol: AC, smoking: SK } = lifestyle;

        let probability_6_months, probability_1_year;
        if (DP === "Yes" && DB === "Yes" && HC === "Yes" && HP === "Yes" && PS === "Yes" && NL === "Yes" && AC === "Yes" && SK === "Yes") {
            probability_6_months = Math.random() * (96 - 92) + 92;
            probability_1_year = Math.random() * (99 - 95) + 95;
        } else if (DP === "Yes" && PS === "Yes" && NL === "Yes") {
            probability_6_months = Math.random() * (90 - 85) + 85;
            probability_1_year = Math.random() * (94 - 88) + 88;
        } else if (DP === "Yes" && NL === "Yes") {
            probability_6_months = Math.random() * (85 - 80) + 80;
            probability_1_year = Math.random() * (90 - 85) + 85;
        } else if (DP === "Yes" && PS === "Yes") {
            probability_6_months = Math.random() * (80 - 75) + 75;
            probability_1_year = Math.random() * (85 - 80) + 80;
        } else if (PS === "Yes" && NL === "Yes") {
            probability_6_months = Math.random() * (83 - 78) + 78;
            probability_1_year = Math.random() * (88 - 82) + 82;
        } else if (DP === "Yes" && (DB === "Yes" || HC === "Yes" || HP === "Yes" || AC === "Yes" || SK === "Yes")) {
            probability_6_months = Math.random() * (78 - 70) + 70;
            probability_1_year = Math.random() * (83 - 75) + 75;
        } else if (PS === "Yes" && (DB === "Yes" || HC === "Yes" || HP === "Yes" || AC === "Yes" || SK === "Yes")) {
            probability_6_months = Math.random() * (79 - 72) + 72;
            probability_1_year = Math.random() * (84 - 77) + 77;
        } else if (NL === "Yes" && (DB === "Yes" || HC === "Yes" || HP === "Yes" || AC === "Yes" || SK === "Yes")) {
            probability_6_months = Math.random() * (82 - 74) + 74;
            probability_1_year = Math.random() * (87 - 80) + 80;
        } else if (DB === "Yes" && HC === "Yes" && HP === "Yes" && DP === "No" && PS === "No" && NL === "No") {
            probability_6_months = Math.random() * (70 - 60) + 60;
            probability_1_year = Math.random() * (75 - 65) + 65;
        } else if (DB === "Yes" || HC === "Yes" || HP === "Yes") {
            probability_6_months = Math.random() * (65 - 50) + 50;
            probability_1_year = Math.random() * (70 - 55) + 55;
        } else if (AC === "Yes" || SK === "Yes") {
            probability_6_months = Math.random() * (60 - 40) + 40;
            probability_1_year = Math.random() * (65 - 45) + 45;
        } else {
            probability_6_months = 0;
            probability_1_year = 0;
        }

        // Update the result state
        setResult({
            prob6Months: probability_6_months.toFixed(2),
            prob1Year: probability_1_year.toFixed(2)
        });

        return probability_6_months.toFixed(2);
    };


    useEffect(() => {
        console.log(preMedicalCondition)
        console.log(lifestyle)
    }, [preMedicalCondition, lifestyle]);


    const navigate = useNavigate();

    const handleSubmit = (e:any) => {
        e.preventDefault();
        // You can validate and process the form here

        console.log('handling submit. pre medical condition:', preMedicalCondition, 'lifestyle:', lifestyle)

        if (preMedicalCondition && lifestyle) {  // Make sure they are defined
            const prob6Months = calculateProbability();
            console.log('percentage:', prob6Months)

            navigate('/results', { state: { preMedicalCondition, lifestyle, percentage: prob6Months } });
        } else {
            console.log('preMedicalCondition or lifestyle is undefined');
        }
    };

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
            {/* Top-left positioning */}
            <Row className="h3 top-0 start-0 m-3">NeuroPulse Solution</Row>

            <Container className="mt-5">
                <form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Trans">Transgender</option>
                                    <option value="Non-binary">Non-binary</option>
                                    <option value="PNTS">Prefer not to share</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formEducation">
                                <Form.Label>Education Level</Form.Label>
                                <Form.Select
                                    value={education}
                                    onChange={(e) => setEducation(e.target.value)}
                                >
                                    <option value="">Select Education Level</option>
                                    <option value="High School">High School</option>
                                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                                    <option value="Master's Degree">Master's Degree</option>
                                    <option value="PhD">PhD</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formRace">
                                <Form.Label>Race</Form.Label>
                                <Form.Select
                                    value={race}
                                    onChange={(e) => setRace(e.target.value)}
                                >
                                    <option value="">Select Race</option>
                                    <option value="White">White</option>
                                    <option value="American-Indian">American Indian or Alaska Native</option>
                                    <option value="Asian">Asian</option>
                                    <option value="Black">Black or African American</option>
                                    <option value="Hispanic">Hispanic or Latino</option>
                                    <option value="Hawaiian">Native Hawaiian or Other Pacific</option>
                                    <option value="Islander">Islander</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formMaritalStatus">
                                <Form.Label>Marital Status</Form.Label>
                                <Form.Select
                                    value={maritalStatus}
                                    onChange={(e) => setMaritalStatus(e.target.value)}
                                >
                                    <option value="">Select Marital Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Container className="mt-5">
                        <Row className="text-start">
                            <div className="pre-medical-condition col">
                                <h3>Pre-Medical Condition</h3>
                                <Form.Group controlId="formDepression">
                                    <Form.Label>Depression</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={preMedicalCondition.depression === 'Yes'}
                                            onChange={(e) =>
                                                setPreMedicalCondition({
                                                    ...preMedicalCondition,
                                                    depression: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={preMedicalCondition.depression === 'No'}
                                            onChange={(e) =>
                                                setPreMedicalCondition({
                                                    ...preMedicalCondition,
                                                    depression: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formDiabetes">
                                    <Form.Label>Diabetes</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={preMedicalCondition.diabetes === 'Yes'}
                                            onChange={(e) =>
                                                setPreMedicalCondition({
                                                    ...preMedicalCondition,
                                                    diabetes: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={preMedicalCondition.diabetes === 'No'}
                                            onChange={(e) =>
                                                setPreMedicalCondition({
                                                    ...preMedicalCondition,
                                                    diabetes: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formHighCholesterol">
                                    <Form.Label>High Cholesterol</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={preMedicalCondition.highCholesterol === 'Yes'}
                                            onChange={(e) =>
                                                setPreMedicalCondition({
                                                    ...preMedicalCondition,
                                                    highCholesterol: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={preMedicalCondition.highCholesterol === 'No'}
                                            onChange={(e) =>
                                                setPreMedicalCondition({
                                                    ...preMedicalCondition,
                                                    highCholesterol: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formHypertension">
                                    <Form.Label>Hypertension</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={preMedicalCondition.hypertension === 'Yes'}
                                            onChange={(e) =>
                                                setPreMedicalCondition({
                                                    ...preMedicalCondition,
                                                    hypertension: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={preMedicalCondition.hypertension === 'No'}
                                            onChange={(e) =>
                                                setPreMedicalCondition({
                                                    ...preMedicalCondition,
                                                    hypertension: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formPsychiatric">
                                    <Form.Label>Psychiatric</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={preMedicalCondition.psychiatric === 'Yes'}
                                            onChange={(e) =>
                                                setPreMedicalCondition({
                                                    ...preMedicalCondition,
                                                    psychiatric: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={preMedicalCondition.psychiatric === 'No'}
                                            onChange={(e) =>
                                                setPreMedicalCondition({
                                                    ...preMedicalCondition,
                                                    psychiatric: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formNeuro">
                                    <Form.Label>Neurological</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={preMedicalCondition.neurological === 'Yes'}
                                            onChange={(e) =>
                                                setPreMedicalCondition({
                                                    ...preMedicalCondition,
                                                    neurological: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={preMedicalCondition.neurological === 'No'}
                                            onChange={(e) =>
                                                setPreMedicalCondition({
                                                    ...preMedicalCondition,
                                                    neurological: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                            </div>

                            {/*Injury*/}
                            <div className="injury col">
                                <h3>Injury</h3>
                                <Form.Group controlId="formHeadInjury">
                                    <Form.Label>Head Injury</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={injury.headInjury === 'Yes'}
                                            onChange={(e) =>
                                                setInjury({
                                                    ...injury,
                                                    headInjury: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={injury.headInjury === 'No'}
                                            onChange={(e) =>
                                                setInjury({
                                                    ...injury,
                                                    headInjury: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formEyeInjury">
                                    <Form.Label>Eyes Injury</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={injury.eyeInjury === 'Yes'}
                                            onChange={(e) =>
                                                setInjury({
                                                    ...injury,
                                                    eyeInjury: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={injury.eyeInjury === 'No'}
                                            onChange={(e) =>
                                                setInjury({
                                                    ...injury,
                                                    eyeInjury: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formEarInjury">
                                    <Form.Label>Ears Injury</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={injury.earInjury === 'Yes'}
                                            onChange={(e) =>
                                                setInjury({
                                                    ...injury,
                                                    earInjury: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={injury.earInjury === 'No'}
                                            onChange={(e) =>
                                                setInjury({
                                                    ...injury,
                                                    earInjury: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formNoseInjury">
                                    <Form.Label>Nose Injury</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={injury.noseInjury === 'Yes'}
                                            onChange={(e) =>
                                                setInjury({
                                                    ...injury,
                                                    noseInjury: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={injury.noseInjury === 'No'}
                                            onChange={(e) =>
                                                setInjury({
                                                    ...injury,
                                                    noseInjury: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formThroatInjury">
                                    <Form.Label>Throat Injury</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={injury.throatInjury === 'Yes'}
                                            onChange={(e) =>
                                                setInjury({
                                                    ...injury,
                                                    throatInjury: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={injury.throatInjury === 'No'}
                                            onChange={(e) =>
                                                setInjury({
                                                    ...injury,
                                                    throatInjury: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                        </Row>

                        <Row className="text-start mt-5">
                            {/*Lifestyle*/}
                            <div className="lifestyle col">
                                <h3>Lifestyle</h3>
                                <Form.Group controlId="formAlcohol">
                                    <Form.Label>Alcohol</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={lifestyle.alcohol === 'Yes'}
                                            onChange={(e) =>
                                                setLifestyle({
                                                    ...lifestyle,
                                                    alcohol: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={lifestyle.alcohol === 'No'}
                                            onChange={(e) =>
                                                setLifestyle({
                                                    ...lifestyle,
                                                    alcohol: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formSmoking">
                                    <Form.Label>Smoking</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={lifestyle.smoking === 'Yes'}
                                            onChange={(e) =>
                                                setLifestyle({
                                                    ...lifestyle,
                                                    smoking: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={lifestyle.smoking === 'No'}
                                            onChange={(e) =>
                                                setLifestyle({
                                                    ...lifestyle,
                                                    smoking: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                            </div>


                            {/*Health History*/}
                            <div className="health-history col">
                                <h3>Health History</h3>
                                <Form.Group controlId="formCardio">
                                    <Form.Label>Cardiovascular</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={healthHistory.cardiovascular === 'Yes'}
                                            onChange={(e) =>
                                                setHealthHistory({
                                                    ...healthHistory,
                                                    cardiovascular: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={healthHistory.cardiovascular === 'No'}
                                            onChange={(e) =>
                                                setHealthHistory({
                                                    ...healthHistory,
                                                    cardiovascular: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formGastro">
                                    <Form.Label>Gastrointestinal</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={healthHistory.gastro === 'Yes'}
                                            onChange={(e) =>
                                                setHealthHistory({
                                                    ...healthHistory,
                                                    gastro: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={healthHistory.gastro === 'No'}
                                            onChange={(e) =>
                                                setHealthHistory({
                                                    ...healthHistory,
                                                    gastro: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formRenal">
                                    <Form.Label>Renal-Genitourinary</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={healthHistory.renal === 'Yes'}
                                            onChange={(e) =>
                                                setHealthHistory({
                                                    ...healthHistory,
                                                    renal: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={healthHistory.renal === 'No'}
                                            onChange={(e) =>
                                                setHealthHistory({
                                                    ...healthHistory,
                                                    renal: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formBloodCell">
                                    <Form.Label>Blood-cell Production</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={healthHistory.bloodCell === 'Yes'}
                                            onChange={(e) =>
                                                setHealthHistory({
                                                    ...healthHistory,
                                                    bloodCell: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={healthHistory.bloodCell === 'No'}
                                            onChange={(e) =>
                                                setHealthHistory({
                                                    ...healthHistory,
                                                    bloodCell: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formSurgical">
                                    <Form.Label>Surgical Procedure</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            value="Yes"
                                            checked={healthHistory.surgical === 'Yes'}
                                            onChange={(e) =>
                                                setHealthHistory({
                                                    ...healthHistory,
                                                    surgical: e.target.value,
                                                })
                                            }
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            value="No"
                                            checked={healthHistory.surgical === 'No'}
                                            onChange={(e) =>
                                                setHealthHistory({
                                                    ...healthHistory,
                                                    surgical: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                        </Row>
                    </Container>

                    <Button variant="primary" type="submit" className="mt-4">
                        Submit
                    </Button>
                    {/*<p>Result {result.prob6Months}</p>*/}
                </form>
            </Container>
        </Container>
    );
};

export default SecondPage;