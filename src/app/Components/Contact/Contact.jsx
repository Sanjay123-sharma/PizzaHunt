import React from 'react'
import Header from '../Header and Footer/Header'
import Footer from '../Header and Footer/Footer'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

export default function Contact() {

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    onSubmit: (values,{ resetForm }) => {
      handleMail()
     resetForm()
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This is a required field'),
      email: Yup.string()
        .email('Enter a valid email')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email')
        .required('This is a required field'),
      message: Yup.string().required('This is a required field')
    })
  })

   const handleMail=async()=>{
        const query=formik.values.message

         await fetch(`${process.env.REACT_APP_API_URL}/contact-us-mail`,{
              method:'POST',
              headers:{
                'content-type':'application/json'
              },
              body:JSON.stringify({
                to:formik.values.email,
                name:formik.values.name,
               query
              })
            }).then((res)=>{
              res.text().then((data)=>{
                Swal.fire({
          title: "",
          text: "Query Submitted We Will get Back you soon !",
          icon: "success",
          iconColor:"orange"
        });
              })
            }).catch((err)=>{
              console.log(err)
              Swal.fire({
          title: "",
          text: "Sorry There was Some Server Issue",
          
          iconColor:'orange'
        });
            })
        

    
  }

  

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header /><br /><br />
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">Contact Us</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">

            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
              )}
            </div>

           
            <div>
              <textarea
                name="message"
                placeholder="Enter Query"
                rows={5}
                cols={5}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              />
              {formik.touched.message && formik.errors.message && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.message}</p>
              )}
            </div>

           
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
