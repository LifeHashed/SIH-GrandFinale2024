import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    //uniqueId:'',
    username: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: '',
  });
  interface FormErrors {
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    //uniqueId?: string;
    confirmPassword?: string;
    securityQuestion?: string;
    securityAnswer?: string;
    general?: string;
  }
  
  const [errors, setErrors] = useState<FormErrors>({});
  const securityQuestions = [
    'Name of pet',
    "Mother's maiden name",
    'Your favorite food',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): FormErrors => {
      const newErrors: FormErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim())
      newErrors.lastName = 'Last name is required';
    if (!formData.username.trim())
      newErrors.username = 'Username is required';
    if (!formData.password.trim() || formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.securityQuestion)
      newErrors.securityQuestion = 'Security question is required';
    if (!formData.securityAnswer.trim())
      newErrors.securityAnswer = 'Security answer is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        // Send the form data to the FastAPI backend
        const response = await fetch("http://127.0.0.1:8000/submit-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: formData.firstName.trim(),
            last_name: formData.lastName.trim(),
            username: formData.username.trim(),
            password: formData.password,
            confirm_password: formData.confirmPassword,
            security_question: formData.securityQuestion,
            security_answer: formData.securityAnswer.trim(),
          }),
        });
  
        if (response.ok) {
          // If the registration is successful, navigate to the login page
          navigate("/login");
        } else {
          const data = await response.json();
          if (data.detail === "Username already exists") {
            setErrors({
              username: "Username already taken, please choose a different one.",
            });
          } else {
            setErrors({
              general: "An unexpected error occurred. Please try again.",
            });
          }
        }
      } catch (error) {
        // Handle network or other errors
        setErrors({
          general: "Unable to connect to the server. Please try again later.",
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full p-6 flex items-center justify-center bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          {/*<div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            { <span className="text-gray-500 text-sm">Logo</span> }
          </div>*/}
          <h1 className="text-4xl font-bold text-gray-800">Redact X</h1>
        </div>
      </div>

      <div className="w-full max-w-md px-6 mt-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            Register New User
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-describedby="firstNameError"
            />
            {errors.firstName && (
              <p id="firstNameError" className="text-red-500">
                {errors.firstName}
              </p>
            )}

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-describedby="lastNameError"
            />
            {errors.lastName && (
              <p id="lastNameError" className="text-red-500">
                {errors.lastName}
              </p>
            )}

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-describedby="usernameError"
            />
            {errors.username && (
              <p id="usernameError" className="text-red-500">
                {errors.username}
              </p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-describedby="passwordError"
            />
            {errors.password && (
              <p id="passwordError" className="text-red-500">
                {errors.password}
              </p>
            )}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-describedby="confirmPasswordError"
            />
            {errors.confirmPassword && (
              <p id="confirmPasswordError" className="text-red-500">
                {errors.confirmPassword}
              </p>
            )}

            <select
              name="securityQuestion"
              value={formData.securityQuestion}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-describedby="securityQuestionError"
            >
              <option value="">Select a security question</option>
              {securityQuestions.map((question, index) => (
                <option key={index} value={question}>
                  {question}
                </option>
              ))}
            </select>
            {errors.securityQuestion && (
              <p id="securityQuestionError" className="text-red-500">
                {errors.securityQuestion}
              </p>
            )}

            <input
              type="password"
              name="securityAnswer"
              placeholder="Answer"
              value={formData.securityAnswer}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-describedby="securityAnswerError"
            />
            {errors.securityAnswer && (
              <p id="securityAnswerError" className="text-red-500">
                {errors.securityAnswer}
              </p>
            )}

            <button
              type="submit"
              className="w-full text-white p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300"
            >
              Create New User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
