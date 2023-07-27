import React from 'react'

export default function Footer() {
  return (

    <footer className='py-5 bg-light fixed-bottom '>
      <div className="container">
      <h2>GET The FreshCartApp</h2>
      <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing. </p>
      <form>
        <div className="row">
          <div className="col-md-10">
            <input placeholder='email' className='form-control'/>
          </div>
          <div className="col-md-2">
            <button className='btn btn-success'>Share App Link</button>
          </div>
        </div>
      </form>
      </div>
    </footer>
  )
}
