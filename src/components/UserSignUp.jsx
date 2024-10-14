import React, { useState } from 'react';
import '../CSS/AdminLogin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import Logo from '../Images/logo.jpeg';

const UserSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '', // New field for confirming password
    phoneNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation for matching passwords
    if (formData.password !== formData.confirmPassword) {
      Swal.fire('Error!', 'Passwords do not match!', 'error');
      return;
    }

    setIsSubmitting(true);

    // Show loading spinner
    Swal.fire({
      title: 'Loading...',
      text: 'Creating user account...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await axios.post('https://www.heovin.com.ng/api/api4users/user_signup.php', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password, // Only send password, not confirmPassword
        phoneNumber: formData.phoneNumber
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      Swal.close();

      if (response.data.success) {
        Swal.fire('Success!', 'Account created. Please check your email indox or spam for verification.', 'success');
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phoneNumber: ''
        });
        navigate('/userlogin');
      } else {
        Swal.fire('Error!', response.data.error, 'error');
      }
    } catch (error) {
      Swal.close();
      Swal.fire('Error!', 'Something went wrong. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='ContactFormWrap' style={{backgroundColor:"white"}}>
      <div className='contact-form-container' style={{padding:"5px",boxShadow:"none"}}>
        <h2>User Sign Up</h2>
        <img src={Logo} alt='Logo' style={{ position: 'relative', width: '70px' }} />
        <form onSubmit={handleSubmit} style={{width:"100%"}}>
          <div className='form-group'>
            <label htmlFor='fullName'>Full Name</label>
            <input
              type='text'
              id='fullName'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              style={{width:"98%"}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              style={{width:"98%"}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter a strong password"
              style={{width:"98%"}}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '10px', top: '65%', cursor: 'pointer', transform: 'translateY(-50%)' }}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <div className='form-group'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='confirmPassword'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter your password"
              style={{width:"98%"}}
            />
             <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '10px', top: '65%', cursor: 'pointer', transform: 'translateY(-50%)' }}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <div className='form-group'>
            <label htmlFor='phoneNumber'>Phone Number</label>
            <input
              type='tel'
              id='phoneNumber'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
              style={{width:"98%"}}
            />
          </div>
          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? (
              <ClipLoader color={'#ffffff'} loading={isSubmitting} css={override} size={15} />
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        <p style={{ marginTop: '10px', position: 'relative', cursor: 'pointer', color: '#003366' }} onClick={() => navigate('/userlogin')}>
          Already a user? Log In
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
