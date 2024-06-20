import * as React from 'react';
import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Clock from '@mui/icons-material/AccessTimeOutlined';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import EditIcon from '@mui/icons-material/Edit';
import '../css/back.css';
import Img1 from '../images/sbi.png';
import Img2 from '../images/card.png'
import Img3 from '../images/upi.png';
import Ic1 from '@mui/icons-material/AccountBalanceWalletOutlined';
import Ic2 from '@mui/icons-material/ChevronRightTwoTone';

const steps = ['Fill OTR', 'Apply job', 'Payment', 'Applied jobs','step5'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [isFormCompleted, setIsFormCompleted] = React.useState(false);
  const [setShowHello] = React.useState(false);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsFormCompleted(false);
    setShowHello(false);
  };

  /*vpa and Qr code javascript*/
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  

  const [formData, setFormData] = useState({
    employmentDetails: '',
    employmentDuration: '',
    employmentPosition: '',
    employmentReason: '',
    examCenter: '',
    courtConviction: '',
    dismissal: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      alert('All details submitted successfully');
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setErrors(validationErrors);
    }
  };
  const next = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const initialTime = 300; // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);
  
   useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  },[timeLeft]);

 

  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const calculateStrokeDashoffset = () => {
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const progress = timeLeft / initialTime;
    return circumference * (1 - progress);
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40vh',
    fontFamily: 'Arial, sans-serif',
  };

  const timerContainerStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const timerStyle = {
    position: 'absolute',
    color: 'red',
    fontSize: '1rem',
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <div style={{ border: '1px solid black', width: 780, height: 450, borderRadius: 20 }}>
              <h3 style={{ paddingLeft: 20, paddingTop: 10, textDecoration: 'underline' }}>Medical & Health Department</h3>
              <p style={{ paddingLeft: 20, paddingTop: 10, fontWeight: 1000 }}>POST NAME:</p>
              <p style={{ paddingLeft: 140, marginTop: -40, fontWeight: 1000 }}>Arogya Mitras & Team Leaders -19 POSTS</p>
              <br />
              <p style={{ paddingLeft: 20, fontWeight: 1000 }}>Apply Through OTR</p>
              <div style={{ border: '1px solid black', width: 400, height: 60, marginLeft: 180, borderRadius: 20 }}>
                <div style={{ padding: 20 }}>
                  <FormatAlignCenterIcon />
                </div>
                <div className='bt1' style={{ marginTop: -55, marginLeft: 80, width: 130, height: 35, borderRadius: 10 }}>
                  <b style={{ padding: 20 }}>OTR FORM</b>
                </div>
                <div style={{ marginTop: -28, marginLeft: 350 }}>
                  <input
                    type='radio'
                    name='step1Radio'
                    value='selected'
                    onChange={() => setIsFormCompleted(true)}
                  />
                </div>
              </div>
              {isFormCompleted && (
                <Typography sx={{ marginTop: 2, marginLeft: 20, color: 'green' }}>OTR form completed successfully</Typography>
              )}
              <br />
              <div style={{ marginLeft: 300, marginTop: 30 }}>
                <button style={{ backgroundColor: '#a1a09d', width: 150, height: 40, border: 'none', borderRadius: 10 }}>Continue</button>
              </div>
            </div>

            {/*sumbit*/}
            <Button style={{ backgroundColor:'rgb(3, 62, 95)',color:'white', width: 100, height: 40, border: 'none', borderRadius: 10,marginLeft:650,marginTop:30 }} onClick={next}>
                Next
            </Button>
            
          </Box>
        );

      case 1:
        return (
          <Box>
            <div style={{ border: '1px solid black', width: 780, height: 1300, borderRadius: 20 }}>
              <h3 style={{ paddingLeft: 20, paddingTop: 10, textDecoration: 'underline' }}>Medical & Health Department</h3>
              <p style={{ paddingLeft: 20, paddingTop: 10, fontWeight: 1000 }}>POST NAME:</p>
              <p style={{ paddingLeft: 140, marginTop: -40, fontWeight: 1000 }}>Arogya Mitras & Team Leaders -19 POSTS</p>
              <br />
              <p style={{ paddingLeft: 20, fontWeight: 1000 }}>Apply Through OTR</p>
              <div style={{ border: '1px solid black', width: 400, height: 60, marginLeft: 180, borderRadius: 20 }}>
                <div style={{ padding: 20 }}>
                  <FormatAlignCenterIcon />
                </div>
                <div className='bt1' style={{ marginTop: -70, marginLeft: 80, width: 130, height: 35, borderRadius: 10 }}>
                  <p style={{ paddingTop: 5, paddingLeft: 15, fontWeight: 1000 }}>OTR FORM</p>
                </div>
                <div style={{ marginTop: -28, marginLeft: 350 }}>
                  <EditIcon  />
                </div>
              </div>

              {/*edit button*/}
           
                <Box>
                  <p style={{ paddingLeft: 22, marginTop: 50, fontWeight: 1000 }}>Your SPN ID:</p>
                  <br />
                  <div style={{ marginLeft: 180, marginTop: -70 }}>
                    <button style={{ backgroundColor: '#a1a09d', width: 150, height: 40, border: 'none', borderRadius: 10, fontWeight: 1000 }}>ABX123XXXX</button>
                  </div>
                  <p style={{ paddingLeft: 22, marginTop: 50, fontWeight: 1000 }}>Add Some more Details</p>
                  {/*details*/}
                  <p style={{ paddingLeft: 22, fontWeight: 1000, marginTop: -5 }}>Do you have any previous employment details to share?</p>
                  <div style={{ marginLeft: 30 }}>
                    <input
                      style={{ width: 650, borderRadius: 10, height: 40 }}
                      type='text'
                      name='employmentDetails'
                      value={formData.employmentDetails}
                      onChange={handleInputChange}
                    />
                    {errors.employmentDetails && (
                      <Typography sx={{ color: 'red' }}>{errors.employmentDetails}</Typography>
                    )}
                  </div>
                  <br></br>
                  <p style={{ paddingLeft: 22, fontWeight: 1000, marginTop: -5 }}>What was the duration of your previous employment?</p>
                  <div style={{ marginLeft: 30 }}>
                    <input
                      style={{ width: 650, borderRadius: 10, height: 40 }}
                      type='text'
                      name='employmentDuration'
                      value={formData.employmentDuration}
                      onChange={handleInputChange}
                    />
                    {errors.employmentDuration && (
                      <Typography sx={{ color: 'red' }}>{errors.employmentDuration}</Typography>
                    )}
                  </div>
                  <br></br>
                  <p style={{ paddingLeft: 22, fontWeight: 1000, marginTop: -5 }}>What was your position in your previous employment?</p>
                  <div style={{ marginLeft: 30 }}>
                    <input
                      style={{ width: 650, borderRadius: 10, height: 40 }}
                      type='text'
                      name='employmentPosition'
                      value={formData.employmentPosition}
                      onChange={handleInputChange}
                    />
                    {errors.employmentPosition && (
                      <Typography sx={{ color: 'red' }}>{errors.employmentPosition}</Typography>
                    )}
                  </div>
                  <br></br>
                  <p style={{ paddingLeft: 22, fontWeight: 1000, marginTop: -5 }}>Reason for leaving previous employment?</p>
                  <div style={{ marginLeft: 30 }}>
                    <input
                      style={{ width: 650, borderRadius: 10, height: 40 }}
                      type='text'
                      name='employmentReason'
                      value={formData.employmentReason}
                      onChange={handleInputChange}
                    />
                    {errors.employmentReason && (
                      <Typography sx={{ color: 'red' }}>{errors.employmentReason}</Typography>
                    )}
                  </div>
                  <br></br>
                  <p style={{ paddingLeft: 22, fontWeight: 1000, marginTop: -5 }}>Preferred exam center</p>
                  <div style={{ marginLeft: 30 }}>
                    <input
                      style={{ width: 650, borderRadius: 10, height: 40 }}
                      type='text'
                      name='examCenter'
                      value={formData.examCenter}
                      onChange={handleInputChange}
                    />
                    {errors.examCenter && (
                      <Typography sx={{ color: 'red' }}>{errors.examCenter}</Typography>
                    )}
                  </div>
                  <br></br>
                  <p style={{ paddingLeft: 22, fontWeight: 1000, marginTop: -5 }}>Have you ever been convicted by any court of law?</p>
                  <div style={{ marginLeft: 30 }}>
                    <input
                      style={{ width: 650, borderRadius: 10, height: 40 }}
                      type='text'
                      name='courtConviction'
                      value={formData.courtConviction}
                      onChange={handleInputChange}
                    />
                    {errors.courtConviction && (
                      <Typography sx={{ color: 'red' }}>{errors.courtConviction}</Typography>
                    )}
                  </div>
                  <br></br>
                  <p style={{ paddingLeft: 22, fontWeight: 1000, marginTop: -5 }}>Have you ever been dismissed from service of any organization?</p>
                  <div style={{ marginLeft: 30 }}>
                    <input
                      style={{ width: 650, borderRadius: 10, height: 40 }}
                      type='text'
                      name='dismissal'
                      value={formData.dismissal}
                      onChange={handleInputChange}
                    />
                    {errors.dismissal && (
                      <Typography sx={{ color: 'red' }}>{errors.dismissal}</Typography>
                    )}
                  </div>
                  <br></br>
                  <input type='checkbox'/>
                  <p style={{paddingLeft:40,marginTop:-20,width:700}}>I hereby declare that all the information provided above is true to the best of my knowledge and belief.</p>
                </Box>
            </div>
            {/*submit*/}
            <div style={{ marginLeft: 650,}}>
                    <Button
                      style={{ backgroundColor: 'rgb(3, 62, 95)',color:'white', width: 150, height: 40, border: 'none', borderRadius: 10,marginTop:30 }}
                      onClick={handleSubmit}
                    >
                    submit
                    </Button>
                  </div>
            {/*back*/}
            <Button style={{ backgroundColor:'rgb(3, 62, 95)',color:'white', width: 100, height: 40, border: 'none', borderRadius: 10,marginTop:-62 }} onClick={handleBack}>
                back
            </Button>
          </Box>
        );

      case 2:
        return (
          <Box>
            <div style={{ border: '1px solid black', width: 800, marginLeft: -10, height: 1300, borderRadius: 10, marginTop: 20 }}>
              <h2 style={{ paddingLeft: 350, textDecoration: 'underline' }}>Payment Details</h2>
              <div style={{ marginLeft: 30 }}>
                <p style={{ paddingTop: 80, fontWeight: 800 }}>Post Name:</p>
                <p style={{ paddingLeft: 150, marginTop: -34 }}>Arogya Mitras & Team Leaders-19 POSTS</p>
                <p style={{ paddingTop: 20, fontWeight: 800 }}>Your SPN ID:</p>
                <div style={{ marginTop: -38, marginLeft: 150 }}>
                  <button style={{ width: 150, height: 30, borderRadius: 10, border: 'none', backgroundColor: '#939599', fontWeight: 1000 }}>ABX123XXXX</button>
                </div>
                <p style={{ paddingTop: 20, fontWeight: 800 }}>Application Fee:</p>
                <p style={{ paddingLeft: 150, marginTop: -40 }}>Rs100/-</p>
                <p style={{ paddingTop: 20, fontWeight: 800 }}>Service Fee:</p>
                <p style={{ paddingLeft: 150, marginTop: -40 }}>Rs100/-</p>
                <button style={{ marginTop: 10, height: 30, backgroundColor: '#f0306d', color: 'white', border: 'none' }}>Application Fee:</button>
                <button style={{ marginLeft: 40, marginTop: 35, height: 30, backgroundColor: '#f2a049', border: 'none' }}>Rs110/-</button>
                <br></br>
                <br></br>
{/*wallet*/}
                <h3>Payment Mode:</h3>
                <div style={{ marginLeft: 130 }}>
                  <div>
                    <label>
                      <input
                        type="radio"
                       
                   
                      />
                      <p style={{paddingLeft:30,marginTop:-25}}>Wallet</p>
                    </label>
                  </div>
            
                    <div style={{marginLeft:10, border: '1px solid black', width: 500, height: 50,borderRadius:10}}>
                      <Ic1 style={{fontSize:40,padding:5}}/>
                      
                      <p style={{paddingLeft:120,marginTop:-50,fontWeight:1000}}>Pay through Wallet</p>
                      <p style={{paddingLeft:120,marginTop:-20}}>Bank Charges</p>
                      {/*arrow icons*/}
                      <div style={{marginLeft:430,marginTop:-65}}>
                      <Ic2 style={{fontSize:40,padding:5}}/>
                      </div>
                     
                    </div>
                  
        {/*net banking*/}
                  <br></br>
                  <div style={{marginTop:-10}}>
                    <label>
                      <input
                        type="radio"
                        
                      
                      />
                      <p style={{paddingLeft:30,marginTop:-25}}>Net Banking</p>
                    </label>
                  </div>
                 
                    <div>
        {/*net banking with icons*/}
                    <div style={{marginLeft:10, border: '1px solid black', width: 500, height: 50,borderRadius:10}}>
                      <img style={{width:70,height:25,padding:10}}src={Img1} alt='Img1'/>
                      <p style={{paddingLeft:120,marginTop:-50,fontWeight:1000}}>SBI Net Banking</p>
                      <p style={{paddingLeft:120,marginTop:-15,fontSize:15}}>Bank charge:0.0</p>
          {/*arrow icons*/}
                      <div style={{marginLeft:430,marginTop:-65}}>
                      <Ic2 style={{fontSize:40,padding:5}}/>
                      </div>
                      
                    </div>
                    <br></br>
                    <div style={{marginLeft:10, border: '1px solid black', width: 500, height: 50,borderRadius:10}}>
                    <img style={{width:70,height:25,padding:10}}src={Img1} alt='Img1'/>
                      <p style={{paddingLeft:120,marginTop:-50,fontWeight:1000}}>SBI Net Banking</p>
                      <p style={{paddingLeft:120,marginTop:-15,fontSize:15}}>Bank charge:0.0</p>
                   {/*arrow icons*/}
                      <div style={{marginLeft:430,marginTop:-65}}>
                      <Ic2 style={{fontSize:40,padding:5}}/>
                      </div>
                    </div>
                    </div>
                    

      {/*card payments*/}
               
                <div style={{ marginTop:30 }}>
                  <div>
                    <label>
                      <input
                        type="radio"
                        
                       
                      />
                      <p style={{paddingLeft:30,marginTop:-25}}>Card Payment</p>
                    </label>
                  </div>
                 
                    <div>

                    <div style={{marginLeft:10, border: '1px solid black', width: 500, height: 50,borderRadius:10}}>
                    <img style={{width:70,height:45,padding:5,paddingLeft:10}}src={Img2} alt='Img2'/>
                      <p style={{paddingLeft:120,marginTop:-60,fontWeight:1000}}>State Bank debit Cards</p>
                      <p style={{paddingLeft:120,marginTop:-15,fontSize:15}}>Bank charges</p>
                      {/*arrow*/}
                      <div style={{marginLeft:430,marginTop:-65}}>
                      <Ic2 style={{fontSize:40,padding:5}}/>
                      </div>
                    </div>
                    <br></br>
                    <div style={{marginLeft:10, border: '1px solid black', width: 500, height: 50,borderRadius:10}}>
                      <img style={{width:70,height:45,padding:5,paddingLeft:10}}src={Img2} alt='Img2'/>
                      <p style={{paddingLeft:120,marginTop:-60,fontWeight:1000}}>State Bank debit Cards</p>
                      <p style={{paddingLeft:120,marginTop:-15,fontSize:15}}>Bank charges</p>
                      {/*arrow icons*/}
                      <div style={{marginLeft:430,marginTop:-65}}>
                      <Ic2 style={{fontSize:40,padding:5}}/>
                      </div>
                    </div>
                    <br></br>
                    <div style={{marginLeft:10, border: '1px solid black', width: 500, height: 50,borderRadius:10}}>
                    <img style={{width:70,height:45,padding:5,paddingLeft:10}}src={Img2} alt='Img2'/>
                      <p style={{paddingLeft:120,marginTop:-60,fontWeight:1000}}>State Bank debit Cards</p>
                      <p style={{paddingLeft:120,marginTop:-15,fontSize:15}}>Bank charges</p>
                   {/*arrow icons*/}
                      <div style={{marginLeft:430,marginTop:-65}}>
                      <Ic2 style={{fontSize:40,padding:5}}/>
                      </div>
                    </div>  
                    
                    </div>
              
  {/* other payments modes*/}
                  <div style={{marginTop:30}}>
                    <label>
                      <input
                        type="radio"
                      />
                      <p style={{paddingLeft:30,marginTop:-25}}>Other Payments Modes</p>
                    </label>
                  </div>
                 
                    <div style={{marginLeft:10, border: '1.5px solid black', width: 500, height: 50,borderRadius:10}}>
                      <img style={{width:70,height:45,padding:5,paddingLeft:10}}src={Img3} alt='Img3'/>
                      <p style={{paddingLeft:120,marginTop:-60,fontWeight:1000}}>State Bank debit Cards</p>
                      <p style={{paddingLeft:120,marginTop:-15,fontSize:15}}>Bank charges</p>
                      {/*arrow icons*/}
                      <div style={{marginLeft:430,marginTop:-65}}>
                      <Ic2 style={{fontSize:40,padding:5}}/>
                      </div>
                       {/*sumbit*/}
            
                    </div>
                
                </div>
                </div>
                
              </div>
              
            </div>
            <Button style={{ backgroundColor:'rgb(3, 62, 95)',color:'white', width: 100, height: 40, border: 'none', borderRadius: 10,marginLeft:690,marginTop:30 }} onClick={next}>
                Next
            </Button>
            {/*back*/}
            <Button style={{ backgroundColor:'rgb(3, 62, 95)',color:'white', width: 100, height: 40, border: 'none', borderRadius: 10,marginTop:-62 }} onClick={handleBack}>
                back
            </Button>
          </Box>
        );

      case 3:
        return (
          <Box>
            <div style={{border:'1px solid black',width: 800, marginLeft: -10, height: 500, borderRadius: 10, marginTop: 20}}>
              <p style={{textDecoration:'underline',paddingLeft:300,fontWeight:1000,fontSize:25}}>Payment Details</p>
              <div style={{ marginLeft: 30 }}>
                <p style={{ paddingTop: 80, fontWeight: 800 }}>Post Name:</p>
                <p style={{ paddingLeft: 150, marginTop: -38 }}>Arogya Mitras & Team Leaders-<span style={{color:'blue'}}>19 POSTS</span></p>
                <p style={{ paddingTop: 20, fontWeight: 800 }}>Total Amount:</p>
                <p style={{ paddingLeft: 150, marginTop: -38 }}>Rs 110/-</p>
                <p style={{ paddingTop: 20, fontWeight: 800 }}>Post Name:</p>
                <div style={{ paddingLeft: 150, marginTop: -38 }}>
                <div>
        <input
          type="radio"
          id="yes"
          name="option"
          value="yes"
          checked={selectedOption === 'yes'}
          onChange={handleOptionChange}
        />
        <label htmlFor="yes">VPA</label>
      </div>
      <div style={{marginLeft:160,marginTop:-23}}> 
        <input
          type="radio"
          id="no"
          name="option"
          value="no"
          checked={selectedOption === 'no'}
          onChange={handleOptionChange}
        />
        <label htmlFor="no">QR Code</label>
      </div>
      <div style={{marginLeft:20}}>
        {selectedOption === 'yes' && <p>UPI</p>}
        {selectedOption === 'no' && <p>QR Code</p>}
      </div>
                </div>
              </div>
            <div style={{marginTop:100}}>
            <p style={{textDecoration:'underline',fontweight:1000,paddingLeft:180}}>ClickHere</p>
            <p style={{marginLeft:260,marginTop:-35}}>to abort this transaction and return to the SCC</p>
            </div>
            </div>
            <br></br>
            <br></br>
             {/*back*/}
            
             {/*next*/}
             <div>
             <Button style={{ backgroundColor:'rgb(3, 62, 95)',color:'white', width: 150, height: 40, border: 'none', borderRadius: 10,marginLeft:650 }} onClick={next}>
                Next
            </Button>
            <Button style={{ backgroundColor:'rgb(3, 62, 95)',color:'white', width: 100, height: 40, border: 'none', borderRadius: 10,marginTop:-62 }} onClick={handleBack}>
                back
            </Button>
            </div>
          </Box>
        );
    
  /*step5*/
      case 4:
        return (
          <Box>
            <div style={{ border: '1px solid black', width: 800, height: 600, marginTop: 80, marginLeft: -10, borderRadius: 10 }}>
      <p style={{ paddingLeft: 300, marginTop: -60, fontWeight: 700, fontSize: 25, textDecoration: 'underline' }}>Remittance Details</p>
      <p style={{ paddingLeft: 150, marginTop: 140, fontWeight: 700, fontSize: 25 }}>Complete Your Transaction within next </p>
      
      <div style={{ color: 'white', marginLeft: 630, marginTop: -100, background: 'linear-gradient(to left,blue,#d163f2)', width: 150, height: 150, borderRadius: 80 }}>
        <div style={{ paddingLeft: 60, paddingTop: 25 }}>
          <Clock style={{ width: 30 }} />
         
          <br />
          <br />
          {formatTime(timeLeft)}
          <p style={{marginTop:-19,marginLeft:-10}}>0</p>
          <p>Mins</p>
        </div>
      </div>
      <br />

      <p style={{ fontSize: 25, paddingLeft: 40, paddingTop: 40, textDecoration: 'underline' }}>Remittance Information Form</p>
      <hr style={{ width: 700 }} />
      <div style={{ marginLeft: 40 }}>
        <div style={{ display: 'flex' }}>
          <div>
            <p style={{ fontSize: 23, fontWeight: 700 }}>SBI Reference Number:</p>
            <p>CPAC12XXXXX</p>
          </div>

          <div style={{ paddingLeft: 150, paddingTop: 5 }}>
            <p style={{ fontSize: 23, fontWeight: 700 }}>Merchant Reference Number:</p>
            <p>502466789992</p>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div>
            <p style={{ fontSize: 23, fontWeight: 700 }}>Amount to Be Remitted</p>
            <p>Rs 110/-</p>
          </div>

          <div style={{ paddingLeft: 150, paddingTop: 5 }}>
            <p style={{ fontSize: 23, fontWeight: 700 }}>Transaction Status</p>
            <p>Collect Request Initiated Successfully</p>
          </div>
        </div>
        <p style={{marginTop:30}}>Please Note that is only a remittance form not an acknowledgement of remittance</p>
          <br></br>
      </div>

      <div style={containerStyle}>
        <div style={timerContainerStyle}>
          <svg width="100" height="100" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="#ccc"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="black"
              strokeWidth="10"
              fill="none"
              strokeDasharray="565.48"
              strokeDashoffset={calculateStrokeDashoffset()}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
          </svg>
         
          <div style={timerStyle}>
            <br></br>
            {formatTime(timeLeft)}
            <p style={{marginTop:-19,marginLeft:-10}}>0</p>
            <p style={{ marginTop:-10,marginleft:-10 }}>Mins</p>
          </div>
        </div>
      </div>
            <Button style={{ backgroundColor:'rgb(3, 62, 95)',color:'white', width: 100, height: 40, border: 'none', borderRadius: 10,marginTop:-62 }} onClick={handleBack}>
                back
            </Button>
    </div>
          </Box>
        );
    }
  };

  return (
    
      <Box sx={{ width: '60%', marginLeft: 30, marginTop: 10}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
          
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button
                
                onClick={handleSkip}
                sx={{ mr: 1 }}
              >
                
              </Button>
            )}
            <div >
            
            </div>
            
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
