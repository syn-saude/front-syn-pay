"use client"

import React from "react"

import withAuth from "@/components/with-auth"

const Home = () => {
  return <div className="container py-5">Home page</div>
}

export default withAuth(<Home />, true)
