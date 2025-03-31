import React, { useState } from 'react'
import axios from "axios"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { userStore } from '@/store';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import './style.css'
const Auth = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [name,setName] = useState('');
  const handleLogin = async function(){
    if(!email) {
      toast('Enter Email address');
      return;
    }
    if(!password){
      toast('Enter password');
      return;
    }
    const response = await axios.post("http://localhost:5174/api/auth/login",{email,password},{ withCredentials: true });
    console.log(response);
    if(response.data.user){
      userStore.getState().setUserInfo(response.data.user);
      console.log(userStore.getState().userInfo);
      navigate("/project-view");
  }
  };
  
  const handleSignup=async function(){
    if(!email) {
      toast.error('Enter Email address');
      return;
    }
    if(!password || !confirmPassword){
      toast.error('Enter password');
      return;
    }
    if(!name) {
      toast.error('Enter name');
      return;
    }
    if(password != confirmPassword) {
      toast.error('Passwords didnt match');
      return;
    }
    try {
    const response  = await axios.post("http://127.0.0.1:5174/api/auth/signup", { email, password,name }, { withCredentials: true });
    console.log(response);
    if(!response.data) {
      toast.error("Email id already exist.\nPlease log in")
    }
    else if(response.data.message == "user already exists") 
      toast.error("Username already exists,Try other name")
    if(response.data.user.id){
        userStore.getState().setUserInfo(response.data.user);
        navigate("/project-view");
    }
    }
    catch(error){
      toast.error("Username already exist (Try by Log in)")
    }
  };  
  
  return (
    <>
      <div className="container">
        <div className="box">
            <h1>Welcome ✌️</h1>
            <p >Fill in the details to get started with Fire chat</p>
            <Tabs defaultValue="login">
              <TabsList className="w-[400px] mt-30">
                <TabsTrigger value="login" className="w-[200px]">Login</TabsTrigger>
                <TabsTrigger value="sign-up" className="w-[200px]">Sign up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <input type="email" placeholder="Enter your email-id" className="border border-gray-950 appearance-none w-[350px] h-[50px] m-10 mb-5 p-3 rounded block" value={email} onChange={(e)=>{
                  setEmail(e.target.value)
                }}></input>
                <input type="password" placeholder="Enter password" className="border border-gray-950 appearance-none w-[350px] h-[50px] m-10 mt-5 p-3 rounded block" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                <Button className="w-[350px]" onClick={handleLogin}>Login</Button>
              </TabsContent>
              <TabsContent value="sign-up">
                <input type="email" placeholder="Enter your email-id" className="border border-gray-950 appearance-none w-[350px] h-[50px] m-10 mb-5 p-3 rounded block" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input type="text" placeholder="Enter your name" className="border border-gray-950 appearance-none w-[350px] h-[50px] m-10 mt-5 mb-5 p-3 rounded block" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
                <input type="password" placeholder="Enter password" className="border border-gray-950 appearance-none w-[350px] h-[50px] m-10 mt-5 mb-5 p-3 rounded block" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                <input type="password" placeholder="Confirm password" className="border border-gray-950 appearance-none w-[350px] h-[50px] m-10 mt-0 p-3 rounded block" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></input>
                <Button className="w-[350px]" onClick={handleSignup}>Sign up</Button>
              </TabsContent>
            </Tabs>
        </div>
      </div>
    </>
  )
}

export default Auth
